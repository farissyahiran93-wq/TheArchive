import { describe, expect, it } from 'vitest'
import { masterFragments } from '../content/masterScene05'
import { activityEvents } from '../content/masterScene06'
import { normalizeSave } from './engine'
import { masterCaseFileAction as act, selectMasterCaseFile as selectCase, validateMasterCaseFile } from './masterCaseFile'
import { masterScene05Action } from './masterScene05'
import { newGame, type GameSave } from './types'

const [family, june] = masterFragments
const [noteEvent] = activityEvents

function sceneFiveSave(): GameSave {
  let save = masterScene05Action({
    ...newGame(),
    masterScene04: { version: 1, opened: true, beat: 10, messages: [], status: 'accepted', inspected: true, complete: true, preview: false },
  }, { type: 'start' }, 1)
  for (let beat = 0; beat < 8; beat++) {
    save = masterScene05Action(save, { type: 'draft', index: 0 })
    save = masterScene05Action(save, { type: 'send' }, beat + 2)
  }
  save = masterScene05Action(save, { type: 'inspect' })
  return masterScene05Action(save, { type: 'risks' })
}

describe('TRACE Case File 001', () => {
  it('requires installation and never offers unrecovered or unopened evidence as a reference', () => {
    const offered = sceneFiveSave()
    const attempt = { type: 'save-note', questionId: 'disappearance', text: 'Compare accounts.', evidenceIds: [] } as const
    expect(selectCase(offered)).toBeUndefined()
    expect(act(offered, { ...attempt, evidenceIds: [] })).toBe(offered)
    let installed = masterScene05Action(offered, { type: 'install' })
    expect(selectCase(installed)).toMatchObject({ id: 'TA-CASE-001', subject: 'Daniel Mercer', primaryContact: 'Sophie Mercer', status: 'Missing', investigationStatus: 'Active' })
    expect(selectCase(installed)?.nodes.map(node => node.id)).toEqual(['TA-S05-ARCHIVE-ACCEPTED'])
    expect(act(installed, { ...attempt, evidenceIds: [noteEvent.id] })).toBe(installed)
    installed = masterScene05Action(installed, { type: 'open-trace' })
    installed = masterScene05Action(installed, { type: 'select' })
    installed = masterScene05Action(installed, { type: 'recover' })
    installed = masterScene05Action(installed, { type: 'read', id: family.id })
    expect(selectCase(installed)?.nodes.map(node => node.id)).toEqual(['TA-S05-ARCHIVE-ACCEPTED', family.id])
    expect(act(installed, { ...attempt, evidenceIds: [june.id] })).toBe(installed)
    expect(act(installed, { type: 'move-node', id: noteEvent.id, x: 12, y: 34 })).toBe(installed)
  })

  it('carries the same case, revised hypothesis and tentative connection into Scene 6', () => {
    let save = masterScene05Action(sceneFiveSave(), { type: 'install' })
    save = masterScene05Action(save, { type: 'open-trace' })
    save = masterScene05Action(save, { type: 'select' })
    save = masterScene05Action(save, { type: 'recover' })
    save = masterScene05Action(save, { type: 'read', id: family.id })
    save = masterScene05Action(save, { type: 'read', id: june.id })
    const questionId = 'phone-recovery'
    save = act(save, { type: 'save-note', questionId, text: 'Need an independent copy.', evidenceIds: [family.id, june.id, june.id] })
    save = act(save, { type: 'save-note', questionId, text: 'An independent copy might distinguish missing context from a different thread.', evidenceIds: [june.id] })
    save = act(save, { type: 'toggle-link', from: family.id, to: june.id })
    save = act(save, { type: 'move-node', id: family.id, x: 44, y: 57 })
    const before = selectCase(save)!
    expect(before.questions).toHaveLength(4)
    expect(before.links).toEqual([{ from: family.id, to: june.id }])
    expect(before.notes[questionId].evidenceIds).toEqual([june.id])

    save = normalizeSave(JSON.parse(JSON.stringify({
      ...save,
      masterScene06: {
        version: 1, beat: 8, messages: [], recovered: true, inspected: [noteEvent.id], order: [],
        uncertainty: false, syncAcknowledged: false, gapAcknowledged: false, saved: false,
        reportReviewed: false, reportSent: false, complete: false,
      },
    })))
    const after = selectCase(save)!
    expect(after.id).toBe(before.id)
    expect(after.questions).toHaveLength(8)
    expect(after.notes).toEqual(before.notes)
    expect(after.links).toEqual(before.links)
    expect(after.nodes.find(node => node.id === family.id)?.position).toEqual({ x: 44, y: 57 })
    expect(after.nodes.find(node => node.id === noteEvent.id)?.timestamp).toBe(noteEvent.raw)
    expect(after.nodes.some(node => node.id === activityEvents[1].id)).toBe(false)
    expect(act(save, { type: 'toggle-link', from: june.id, to: family.id }).masterCaseFile?.links).toEqual([])
    expect(() => validateMasterCaseFile({ ...save.masterCaseFile, links: [{ from: family.id, to: june.id }, { from: june.id, to: family.id }] })).toThrow(/Duplicate/)
  })

  it('stores revisable interpretations without changing the underlying evidence', () => {
    let save = masterScene05Action(sceneFiveSave(), { type: 'install' })
    for (const type of ['open-trace', 'select', 'recover'] as const) save = masterScene05Action(save, { type })
    for (const fragment of [family, june]) save = masterScene05Action(save, { type: 'read', id: fragment.id })
    const link = { from: family.id, to: june.id }
    const update = { type: 'update-link', ...link, label: 'Different topics', assessment: 'contradicted' } as const
    expect(act(save, update)).toBe(save)
    save = act(save, { type: 'toggle-link', ...link })
    save = act(save, update)
    const note = { type: 'save-note', questionId: 'phone-recovery', text: 'The fragments could refer to different days.', evidenceIds: [family.id], alternative: 'They could also be from the same day.' } as const
    expect(act(save, { ...note, evidenceIds: [family.id], counterEvidenceIds: [noteEvent.id] })).toBe(save)
    save = act(save, { ...note, evidenceIds: [family.id], counterEvidenceIds: [june.id] })
    const restored = normalizeSave(JSON.parse(JSON.stringify(save)))
    expect(selectCase(restored)?.links).toEqual([{ ...link, label: 'Different topics', assessment: 'contradicted' }])
    expect(selectCase(restored)?.notes['phone-recovery']).toMatchObject({ alternative: note.alternative, counterEvidenceIds: [june.id] })
    expect(restored.evidence).toEqual({})
    expect(selectCase(restored)?.nodes.find(node => node.id === family.id)?.source).toContain('source unverified')
  })
})
