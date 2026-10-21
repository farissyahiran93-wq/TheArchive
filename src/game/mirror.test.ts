import { galleryMedia } from '../content/galleryMedia'
import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { mirrorCatalog, mirrorEntry, missingMirrorMedia } from '../content/mirror'
import { mirrorLocks } from '../content/opening'
import { normalizeSave, registerPlayer } from './engine'
import { inspectMirrorDetail, inspectMirrorRecord, revealMirrorHint, unlockMirrorRecord, compareMirrorIndex } from './opening'
import { canInspectMirrorEntry, canMirrorLink, linkMirrorEvidence, navigateMirror, saveMirrorEvidence, unlinkMirrorEvidence } from './mirror'
import { newGame, type GameSave } from './types'
import { discardPendingSave, loadGame, writeGame } from './save'

function recovered(): GameSave {
  const state = registerPlayer(newGame(), 'Rae')
  return { ...state, prologue: { ...state.prologue!, stage: 'mirror', restored: true, queue: [] } }
}
function retain(state: GameSave, id: string): GameSave {
  const entry = mirrorEntry(id)!
  return saveMirrorEvidence(inspectMirrorDetail(state, entry.area, entry.title), id, 100)
}

describe('Phase 04 recovered sources and privacy', () => {
  beforeEach(() => discardPendingSave())
  it('has stable unique IDs and preserves the ordinary source inspection keys', () => {
    expect(new Set(mirrorCatalog.map(record => record.id)).size).toBe(mirrorCatalog.length)
    expect(mirrorEntry('MIR-NOTES-1')?.title).toBe('Untitled \u2014 last saved 22:30')
    expect(mirrorEntry('MIR-INDEX-1')?.title).toBe('Archive Index \u2014 integrity report')
  })
  it('requires actual inspection and explicit saving without upgrading evidence or knowledge', () => {
    const start = recovered()
    const appOnly = inspectMirrorRecord(start, 'mail')
    expect(saveMirrorEvidence(appOnly, 'MIR-MAIL-1', 100)).toBe(appOnly)
    const opened = inspectMirrorDetail(start, 'mail', mirrorEntry('MIR-MAIL-1')!.title)
    expect(opened.evidence['MIR-MAIL-1']).toBeUndefined()
    const saved = saveMirrorEvidence(opened, 'MIR-MAIL-1', 100)
    expect(saved.evidence['MIR-MAIL-1']).toMatchObject({ verified: false, collectedAt: 100 })
    expect(saved.knowledge).toEqual(start.knowledge)
    expect(saved.messages).toEqual(start.messages)
    expect(saveMirrorEvidence(saved, 'MIR-MAIL-1', 200)).toBe(saved)
  })
  it('never records protected containers as inspected or collects their contents', () => {
    let state = recovered()
    for (const id of ['MIR-PROTECTED-1', 'MIR-FILES-4']) {
      const entry = mirrorEntry(id)!
      expect(canInspectMirrorEntry(state, id)).toBe(false)
      expect(inspectMirrorDetail(state, entry.area, entry.title)).toBe(state)
      expect(saveMirrorEvidence(state, id, 100)).toBe(state)
    }
    state = navigateMirror(state, 'MIR-FILES-4')
    expect(state.prologue?.mirrorLocation).toBe('MIR-FILES-4')
    expect(state.evidence['MIR-FILES-4']).toBeUndefined()
  })
  for (const [id, puzzle] of Object.entries(mirrorLocks) as [keyof typeof mirrorLocks, (typeof mirrorLocks)[keyof typeof mirrorLocks]][]) {
    it(`saves each password, all hints and observed source independently: ${id}`, async () => {
      let state = recovered()
      const record = mirrorCatalog.find(entry => entry.lockId === id)!
      expect(canInspectMirrorEntry(state, record.id)).toBe(false)
      expect(retain(state, record.id)).toBe(state)
      expect(unlockMirrorRecord(state, id, 'wrong')).toBe(state)
      for (let tier = 1; tier <= 3; tier++) state = revealMirrorHint(state, id)
      state = unlockMirrorRecord(state, id, puzzle.answer)
      state = retain(state, record.id)
      await writeGame(state)
      const loaded = await loadGame()
      expect(loaded.error).toBeUndefined()
      expect(loaded.save.prologue?.unlockedMirrorRecords).toEqual([id])
      expect(loaded.save.prologue?.mirrorHints?.[id]).toBe(3)
      expect(loaded.save.evidence[record.id].verified).toBe(false)
      expect(loaded.save.knowledge.characters.maya).toEqual([])
    })
  }
  it('requires saved sources and rejects linking the index mismatch to Bus 4', () => {
    const state = recovered()
    expect(canMirrorLink(state, 'MIR-NOTES-1', 'MIR-INDEX-1')).toBe(false)
    const mixed = retain(retain(state, 'MIR-INDEX-1'), 'MIR-MAIL-2')
    expect(linkMirrorEvidence(mixed, 'MIR-INDEX-1', 'MIR-MAIL-2')).toBe(mixed)
    expect(canMirrorLink(mixed, 'MIR-INDEX-1', 'MIR-INDEX-1')).toBe(false)
  })
  it('persists optional associations and navigation with no K01, K02, R04 or NPC receipt', async () => {
    localStorage.setItem('the-archive:game-save:v1', 'keep-legacy')
    const state = retain(retain(recovered(), 'MIR-NOTES-1'), 'MIR-INDEX-1')
    const linked = linkMirrorEvidence(state, 'MIR-NOTES-1', 'MIR-INDEX-1')
    expect(linkMirrorEvidence(linked, 'MIR-NOTES-1', 'MIR-INDEX-1')).toBe(linked)
    const navigated = navigateMirror(linked, 'MIR-MAIL-1')
    await writeGame(navigated)
    const loaded = (await loadGame()).save
    expect(loaded.prologue?.mirrorLinks).toEqual(['MIR-INDEX-1|MIR-NOTES-1'])
    expect(loaded.prologue?.mirrorLocation).toBe('MIR-MAIL-1')
    expect(loaded.knowledge).toEqual(state.knowledge)
    expect(loaded.deliveredEvents).toEqual(state.deliveredEvents)
    expect(localStorage.getItem('the-archive:game-save:v1')).toBe('keep-legacy')
    expect(unlinkMirrorEvidence(loaded, 'MIR-INDEX-1|MIR-NOTES-1').prologue?.mirrorLinks).toEqual([])
  })
  it('keeps optional observations out of the mandatory index gate', () => {
    const state = recovered()
    const note = inspectMirrorDetail(state, 'notes', mirrorEntry('MIR-NOTES-1')!.title)
    const index = inspectMirrorDetail(note, 'index', mirrorEntry('MIR-INDEX-1')!.title)
    const compared = compareMirrorIndex(index, 100)
    expect(compared.prologue?.indexCompared).toBe(true)
    expect(compared.evidence['OPEN-INDEX'].verified).toBe(false)
    expect(compared.prologue?.mirrorLinks).toBeUndefined()
    expect(compared.prologue?.unlockedMirrorRecords).toEqual([])
  })
  it('accepts older reboot saves without mirror UI fields and rejects invalid new IDs', () => {
    const old = recovered()
    expect(normalizeSave(structuredClone(old))).toEqual(old)
    expect(() => normalizeSave({ ...old, prologue: { ...old.prologue, mirrorLocation: 'unknown' } })).toThrow('Invalid mirror location')
    expect(() => normalizeSave({ ...old, prologue: { ...old.prologue, mirrorLinks: ['MIR-INDEX-1|MIR-MAIL-2'] } })).toThrow('Invalid mirror connections')
  })
  it('maps six supplied visual props onto the same two public records and two locked albums', () => {
    expect(missingMirrorMedia).toHaveLength(0)
    expect(galleryMedia.map(item => item.recordId)).toEqual(['MIR-GALLERY-1','MIR-GALLERY-2','MIR-GALLERY-3','MIR-GALLERY-3','MIR-GALLERY-4','MIR-GALLERY-4'])
    expect(galleryMedia.every(item => item.src.endsWith('.png'))).toBe(true)
  })
})
