import type { GameSave } from './types'

const KEY = 'the-archive-reboot:dev-playtest:v1'
const idleAfterMs = 45_000
let lastInteractionAt = Date.now()

export interface DevTelemetry {
  version: 1
  startedAt: number
  lastSampleAt: number
  visibleMs: number
  activeMs: number
  investigationMs: number
  dialogueMs: number
  idleMs: number
  backgroundMs: number
  puzzleRetries: number
  route?: { complete: boolean; tip: string; messages: boolean; archive: boolean; checkin: boolean }
}

function read(): DevTelemetry | null {
  if (!import.meta.env.DEV) return null
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as DevTelemetry
    return value.version === 1 && Number.isFinite(value.startedAt) ? value : null
  } catch { return null }
}

function write(value: DevTelemetry) {
  try { sessionStorage.setItem(KEY,JSON.stringify(value)) } catch { /* Telemetry never blocks story progress. */ }
}

export function markDevActivity() { lastInteractionAt = Date.now() }

export function sampleDevTelemetry(save: GameSave, app: string | null, visible: boolean) {
  if (!import.meta.env.DEV || !save.player) return
  const now = Date.now()
  const current = read() ?? { version: 1, startedAt: now, lastSampleAt: now, visibleMs: 0, activeMs: 0, investigationMs: 0, dialogueMs: 0, idleMs: 0, backgroundMs: 0, puzzleRetries: 0 }
  const span = Math.max(0,Math.min(now-current.lastSampleAt,300_000))
  const active = visible && now-lastInteractionAt <= idleAfterMs
  const scene = Number(save.e01?.sceneId.slice(-2) ?? 0)
  const dialogue = app === 'messages' || scene >= 8 && scene <= 17 || scene >= 25 && scene <= 26
  const investigation = app === 'search' || app === 'maps' || app === 'board' || app === 'files' || scene >= 4 && scene <= 7 || scene >= 18 && scene <= 24 || scene >= 27 && scene <= 30
  const route = save.e01?.e01Complete ? { complete: true, tip: save.e01.tipMode ?? 'deferred', messages: save.e01.messagesConsent === true, archive: save.e01.archiveConsent === true, checkin: save.e01.s25Opened === true } : current.route
  write({ ...current, lastSampleAt: now, visibleMs: current.visibleMs + (visible ? span : 0), activeMs: current.activeMs + (active ? span : 0), dialogueMs: current.dialogueMs + (active && dialogue ? span : 0), investigationMs: current.investigationMs + (active && !dialogue && investigation ? span : 0), idleMs: current.idleMs + (visible && !active ? span : 0), backgroundMs: current.backgroundMs + (!visible ? span : 0), route })
}

export function recordPuzzleRetry() {
  const current = read()
  if (current) write({ ...current, puzzleRetries: current.puzzleRetries+1 })
}

export function readDevTelemetry(): (DevTelemetry & { elapsedMs: number }) | null {
  const current = read()
  return current ? { ...current, elapsedMs: Math.max(0,Date.now()-current.startedAt) } : null
}

export function downloadDevTelemetry() {
  const snapshot = readDevTelemetry()
  if (!snapshot) return
  const blob = new Blob([JSON.stringify(snapshot,null,2)],{ type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'the-archive-dev-playtest.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url),1000)
}
