import { describe, expect, it } from 'vitest'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { NaturalFixture, naturalScene04 } from '../../tests/helpers/naturalConversation'
import { bridgeEnd, bridgeFindingsWait, bridgeInstallWait, bridgeReportChoice, traceBridgePrefix, traceBridgeNodes } from '../content/traceBridgeV3'
import { naturalSources } from '../content/naturalConversation'
import { traceAnalysisId, traceDurationMs } from '../content/traceReference'
import { archiveInstallProgress, originAction } from './archiveOrigin'
import { chapter1Action } from './chapter1'
import { normalizeSave } from './engine'
import { canOpenPublisherInquiry, canOpenScene6Register } from './investigationAccess'
import { phoneNotices } from './phonePresentation'
import { draftActIChoice, pauseScene03, scene01Choices, sendScene01Choice } from './scene01'
import { traceAction } from './trace'
import { bridgeComparisonEvent, visibleUnknownMessages } from './traceBridge'
import { naturalCoreReady } from './naturalConversation'

const fixture = () => new ConversationFixture(naturalScene04().at('complete04').save)
const round = (save: ConversationFixture['save']) => normalizeSave(JSON.parse(JSON.stringify(save)))

function offer(f = fixture(), choice = 'a') {
  f.tickOne().origin('open')
  for (let beat = 0; beat < 6; beat++) f.send(choice)
  return f
}

function install(f: ConversationFixture) {
  f.origin('security').origin('install')
  for (let stage = 0; stage < 4; stage++) f.tickOne()
  return f.origin('cancel').origin('open')
}

describe('TRACE intro V3', () => {
  it('replaces an unanswered legacy preview on load while retaining the saved transcript', () => {
    const f = new NaturalFixture().tickOne().origin('open')
    const original = f.save
    f.save = round(draftActIChoice(f.save, 'b'))
    expect(f.save.chapter1!.sender.messages).toEqual(original.chapter1!.sender.messages)
    expect(visibleUnknownMessages(f.save)).toEqual(original.chapter1!.sender.messages.filter(m =>
      m.id !== 'CH1-ARCHIVE-FIRST' && !m.id.startsWith('OPEN-ORIGIN-NAT-'),
    ))
    expect(round(f.save)).toEqual(f.save)
    f.origin('open')
    expect(f.node().id).toBe(traceBridgePrefix + 'C01')
    expect(f.save.prologue!.scene01!.draft).toBeUndefined()
    expect(f.save.chapter1!.archiveOrigin!.packageDelivered).toBe(false)
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
  })

  for (const installed of [false, true]) {
    it(`restarts the trust conversation after the old package offer (installed: ${installed})`, () => {
      const old = new NaturalFixture().bridge()
      if (installed) old.install()
      const stored = old.save.chapter1!.sender.messages
      old.save = round(old.save)
      expect(old.save.chapter1!.sender.messages).toEqual(stored)
      expect(old.save.chapter1!.archiveOrigin!.installed).toBe(installed)
      expect(old.save.chapter1!.archiveOrigin!.packageDelivered).toBe(installed)
      expect(round(old.save)).toEqual(old.save)
      old.origin('open')
      for (let beat = 1; beat <= 6; beat++) {
        expect(old.node().id).toBe(traceBridgePrefix + 'C0' + beat)
        expect(visibleUnknownMessages(old.save).some(m => m.attachment === 'archive-package')).toBe(false)
        old.send('a')
      }
      expect(visibleUnknownMessages(old.save).filter(m => m.attachment === 'archive-package')).toHaveLength(1)
      expect(old.save.chapter1!.versionHistory).toBeUndefined()
    })
  }

  it('preserves an actual Scene 5 save and its completed history', () => {
    const f = new NaturalFixture().main()
    expect(round(f.save)).toEqual(f.save)
  })
  it('waits for the saved article read and Sophie ending, then delivers one notice without opening chat', () => {
    const early = naturalScene04().at('OPEN-S04-ARTICLE-GATE')
    expect(chapter1Action(early.save, { type: 'tick' }, early.now + 30_000).chapter1?.archiveOrigin?.contacted).toBeFalsy()
    early.do({ type: 'open-article' }).do({ type: 'mark-read' })
    expect(chapter1Action(early.save, { type: 'tick' }, early.now + 30_000).chapter1?.archiveOrigin?.contacted).toBeFalsy()
    const f = fixture()
    const before = f.save
    f.tickOne().tickOne()
    expect(f.save.prologue!.scene01!.messages).toEqual(before.prologue!.scene01!.messages)
    expect(f.save.chapter1!.archiveOrigin!.reading).toBeFalsy()
    expect(f.save.chapter1!.sender.messages.filter(m => m.id === 'CH1-ARCHIVE-FIRST')).toHaveLength(1)
    expect(phoneNotices(f.save).find(m => m.id === 'CH1-ARCHIVE-FIRST')).toMatchObject({ title: 'Unknown Number', text: 'New message' })
  })

  for (const choice of ['a', 'b', 'c']) {
    it(`delivers the selected authored replies for branch ${choice} without changing trust`, () => {
      const f = fixture().tickOne().origin('open')
      const relationships = f.save.relationships
      for (let beat = 1; beat <= 6; beat++) {
        const node = f.node()
        expect(node.id).toBe(traceBridgePrefix + 'C0' + beat)
        expect(scene01Choices(f.save)).toHaveLength(3)
        expect(sendScene01Choice(f.save, choice, '', true, f.now)).toBe(f.save)
        f.save = draftActIChoice(f.save, choice)
        f.save = round(pauseScene03(f.save, f.now))
        f.origin('open')
        expect(f.save.prologue!.scene01!.draft?.choiceId).toBe(choice)
        const selected = scene01Choices(f.save).find(o => o.id === choice)!
        f.send(choice)
        expect(f.save.chapter1!.sender.messages.find(m => m.id === selected.next)?.text).toBe(
          (traceBridgeNodes[selected.next] as { text: string }).text,
        )
      }
      expect(f.save.relationships).toEqual(relationships)
      expect(f.save.chapter1!.archiveOrigin!.packageDelivered).toBe(choice !== 'c')
    })
  }

  it('keeps a refusal resumable, cancels a partial install and resumes a saved retry exactly once', () => {
    const f = offer(fixture(), 'c')
    expect(originAction(f.save, { type: 'security' }, f.now)).toBe(f.save)
    f.save = round(pauseScene03(f.save, f.now))
    f.origin('open').send('again')
    expect(f.node().id).toBe(bridgeInstallWait)
    expect(f.save.chapter1!.sender.messages.filter(m => m.attachment === 'archive-package')).toHaveLength(1)
    f.origin('security').origin('cancel').origin('security').origin('install').tickOne()
    expect(archiveInstallProgress(f.save, f.now)).toBe(25)
    f.origin('cancel')
    expect(f.save.pendingEvents.some(e => e.id === 'CH1-TRACE-V3-INSTALL')).toBe(false)
    expect(f.save.chapter1!.archiveOrigin!.installed).toBe(false)
    f.origin('security').origin('install').tickOne()
    f.save = round(f.save)
    f.tickOne().tickOne().tickOne().origin('cancel').origin('open')
    expect(f.node().id).toBe(bridgeFindingsWait)
    expect(f.save.deliveredEvents.filter(id => id === 'CH1-TRACE-V3-INSTALL')).toHaveLength(1)
    expect(f.save.chapter1!.sender.messages.filter(m => m.attachment === 'archive-package')).toHaveLength(1)
    expect(originAction(f.save, { type: 'install' }, f.now)).toBe(f.save)
  })

  it('keeps scan and comparison private and opens Scene 5 only after the authored sent report', () => {
    const f = install(offer())
    f.save = pauseScene03(f.save, f.now)
    expect(traceAction(f.save, { type: 'start' }, f.now)).toBe(f.save)
    f.save = traceAction(f.save, { type: 'inspect-reference' }, f.now)
    f.save = traceAction(f.save, { type: 'start' }, f.now)
    f.save = round(traceAction(f.save, { type: 'checkpoint', status: 'paused', elapsedMs: 2100 }, f.now))
    f.save = traceAction(f.save, { type: 'start' }, f.now)
    expect(f.save.chapter1!.trace!.scan.elapsedMs).toBe(2100)
    f.save = traceAction(f.save, { type: 'checkpoint', status: 'complete', elapsedMs: traceDurationMs }, f.now)
    expect(f.save.evidence[traceAnalysisId]).toBeUndefined()
    const receipts = f.save.chapter1!.archiveOrigin!.receipts
    f.save = traceAction(f.save, { type: 'findings' }, f.now)
    expect(traceAction(f.save, { type: 'compare', field: 'TITLE' }, f.now)).toBe(f.save)
    f.save = round(traceAction(f.save, { type: 'compare', field: 'PUBLIC_ARTICLE' }, f.now))
    expect(f.save.deliveredEvents.filter(id => id === bridgeComparisonEvent)).toHaveLength(1)
    const analysis = f.save.evidence[traceAnalysisId]
    expect(analysis.verified).toBe(false)
    f.save = traceAction(f.save, { type: 'findings' }, f.now + 100)
    expect(f.save.evidence[traceAnalysisId]).toEqual(analysis)
    expect(f.save.chapter1!.archiveOrigin!.receipts).toEqual(receipts)
    f.do({ type: 'enter' }).origin('open')
    expect(f.node().id).toBe(bridgeReportChoice)
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
    f.save = round(draftActIChoice(f.save, 'c'))
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
    f.send('c')
    expect(f.node().id).toBe(naturalSources.article.wait)
    expect(f.save.deliveredEvents).toContain(bridgeEnd)
    expect(f.save.chapter1!.versionHistory!.flags).toContain('public')
    expect(f.save.chapter1!.versionHistory!.flags).not.toContain('update_analysis_saved')
    expect(f.save.chapter1!.versionHistory!.receipts).toEqual([
      expect.objectContaining({ eventId: bridgeReportChoice + '-PLAYER-c', recipient: 'unknown' }),
    ])
    expect(canOpenScene6Register(f.save)).toBe(false)
    expect(canOpenPublisherInquiry(f.save)).toBe(false)
    expect(round(f.save)).toEqual(f.save)
    f.do({type:'panel',panel:'public'}).do({type:'inspect-metadata'}).do({type:'save-update-analysis'}).unknown().send('a')
    f.send('a').do({type:'panel',panel:'policy'}).do({type:'read-policy'}).unknown().send('a')
    f.send('a').send('a').send('a')
    expect(naturalCoreReady(f.save)).toBe(true)
    expect(canOpenScene6Register(f.save)).toBe(false)
  })
})
