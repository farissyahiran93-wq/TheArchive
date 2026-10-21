import { openDB } from 'idb'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'

export const DB_NAME = 'the-archive-reboot'
const KEY = 'primary'
const PENDING_KEY = 'the-archive-reboot:pending-save:v1'

type PendingSave = { baseRevision: number; save: GameSave }

function pendingSave(): PendingSave | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as PendingSave
    if (!Number.isSafeInteger(value.baseRevision) || value.baseRevision < 0) throw new Error('Invalid pending save base')
    normalizeSave(value.save)
    return value
  } catch { return null }
}

export function stagePendingSave(save: GameSave, expectedRevision: number): void {
  try {
    const prior = pendingSave()
    sessionStorage.setItem(PENDING_KEY,JSON.stringify({ baseRevision: prior?.baseRevision ?? expectedRevision, save } satisfies PendingSave))
  } catch { /* IndexedDB remains the primary store; a failed journal never blocks play. */ }
}

export function clearPendingSave(revision: number): void {
  try { if (pendingSave()?.save.saveRevision === revision) sessionStorage.removeItem(PENDING_KEY) } catch { /* Best effort. */ }
}

export function discardPendingSave(): void {
  try { sessionStorage.removeItem(PENDING_KEY) } catch { /* Best effort. */ }
}

export class SaveConflictError extends Error {
  constructor() { super('This save changed in another tab.') }
}

async function database() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('saves')) db.createObjectStore('saves')
    },
  })
}

export async function loadGame(): Promise<{ save: GameSave; error?: string; recoveryRequired?: boolean; raw?: unknown }> {
  let raw: unknown
  try {
    const db = await database()
    raw = await db.get('saves', KEY)
    const stored = raw === undefined ? newGame() : normalizeSave(raw)
    const pending = pendingSave()
    if (!pending) return { save: stored }
    const storedRevision = stored.saveRevision ?? 0
    if (storedRevision === pending.save.saveRevision) {
      if (JSON.stringify(stored) !== JSON.stringify(pending.save)) return { save: stored, error: 'The stored and pending saves have the same revision but different content. Download the pending local backup before choosing which version to keep.', recoveryRequired: true, raw: pending.save }
      discardPendingSave()
      return { save: stored }
    }
    if (storedRevision === pending.baseRevision) {
      try {
        await writeGame(pending.save,storedRevision)
        discardPendingSave()
        return { save: pending.save }
      } catch (error) {
        if (!(error instanceof SaveConflictError)) throw error
        const refreshed = normalizeSave(await db.get('saves',KEY))
        if (refreshed.saveRevision === pending.save.saveRevision && JSON.stringify(refreshed) === JSON.stringify(pending.save)) {
          discardPendingSave()
          return { save: refreshed }
        }
        return { save: refreshed, error: 'A concurrent save used the same revision with different content. Download the pending local backup before choosing which version to keep.', recoveryRequired: true, raw: pending.save }
      }
    }
    return { save: stored, error: 'A previous write was interrupted after some progress was stored. Download the pending local backup before choosing which version to keep.', recoveryRequired: true, raw: pending.save }
  } catch (error) {
    const pending = pendingSave()
    return { save: newGame(), error: error instanceof Error ? error.message : 'Save could not be loaded', recoveryRequired: true, raw: pending ? { persisted: raw, pending: pending.save } : raw }
  }
}

export async function writeGame(save: GameSave, expectedRevision?: number): Promise<void> {
  const db = await database()
  const tx = db.transaction('saves','readwrite')
  if (expectedRevision !== undefined) {
    const stored = await tx.store.get(KEY) as GameSave | undefined
    if ((stored?.saveRevision ?? 0) !== expectedRevision) {
      tx.abort()
      await tx.done.catch(() => undefined)
      throw new SaveConflictError()
    }
  }
  await tx.store.put(save, KEY)
  await tx.done
}

export async function downloadBackup(save: unknown): Promise<void> {
  const blob = new Blob([JSON.stringify(save, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'the-archive-save-backup.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
