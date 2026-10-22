import { playtestEnabled } from './playtest'
import { reunionAction } from './chapter2Reunion'
import { saveMirrorEvidence, linkMirrorEvidence, unlinkMirrorEvidence, navigateMirror } from './mirror'
import { chapter2Access, type AccessAction } from './chapter2Access'
import { beginScene01, beginScene02, deliverScene01, draftScene03Choice, markScene01Read, openScene03, pauseScene03, resumeScene02, scene01Invitation, sendScene01Choice } from './scene01'
import { continueMessageFlow, sendRecoveryReply, swapRecoveryCards, hintRecovery, assistRecovery, resetRecovery, verifyRecovery, retainRecovery } from './recoverySequence'
import { deliverPhoneOpeningEvent, deliverOpening, compareMirrorIndex, finishOpening, inspectMirrorDetail, revealMirrorHint, unlockMirrorRecord, inspectMirrorRecord, inspectRecoveryOffer, readDanielNote, replyToSophie, restoreDanielMirror, sendGroupChoice, markOpeningRead, startPhoneOpening, sendOpeningName, decidePendingRecovery } from './opening'
import type { MirrorArea, MirrorLockId } from '../content/opening'
import { create } from 'zustand'
import { dueEvent, enterFixture, markMessagesRead, registerPlayer, sendFixtureChoice } from './engine'
import { clearPendingSave, discardPendingSave, loadGame, stagePendingSave, writeGame } from './save'
import { newGame, type GameSave, type Pronouns } from './types'
import { linkBoardPair, unlinkBoardPair, type BoardSourceId } from './board'
import { advanceSlice, answerComparison, answerEditor, beginSlice, inspectPreview, openSliceInbox, readBrief, readSliceMessages, recheckComparison, saveLead, sendS11Choice, sendTip, setS11Draft, setTipDraft, showComparisonHint } from './slice'
import { answerSourceStatus, askMayaAboutRow, closeShareWithoutSend, continueToEditorNote, continueToPermissionSheet, continueToShare, decideConnection, draftPhase03b, enterAfterEditor, enterPublicSources, inspectSourceStatus, onEditorChecked, openOptionalConnections, reopenConnections, sendPhase03b, showEditorHint, showSourceStatusHint } from './phase03b'
import { answerS20Approval, answerS22, classifyS21, finishS19, finishS23, finishS24, inspectS20Notice, labelS19Date, matchS23Source, openS23Result, placeS21Card, recordS19Observation, resetS21Order, setS23Query } from './phase03b'
import { checkS28, checkS30Role, citeS29, completeS30, finishS28, openS28Directory, openS28Page, recordS27Review, requestS28Correction, saveS29Finding, saveS30Question, selectS27Scope, submitS27Request } from './phase03b'
import { continuePublicWithoutTip, keepS26Private, openLateTip, openS25Checkin, openS26Frame, returnToFinding, returnToS27, viewS24Note } from './phase03b'
import { answerGroupFollowup, readFollowup, scheduleGroupProposal, scheduleMayaReferral, sendFollowupChoice, sendFollowupIntro } from './characterFollowups'
import type { FollowupContact } from '../content/characterFollowups'

interface GameStore {
  accessAction: (action: AccessAction) => void
  sendScene01: (id: string, name?: string) => void
  scene01Invitation: (action: 'accept' | 'join' | 'dismiss' | 'show') => void
  openSophiePrivate: () => void
  pauseSophiePrivate: () => void
  draftSophiePrivate: (choiceId: string) => void
  continueMessageFlow: () => void
  sendRecoveryReply: (id: string) => void
  swapRecoveryCards: (a: number, b: number) => void
  hintRecovery: () => void
  assistRecovery: () => void
  resetRecovery: () => void
  verifyRecovery: () => void
  retainRecovery: () => void
  save: GameSave
  ready: boolean
  saveError: string | null
  recoveryRequired: boolean
  recoveryRaw: unknown
  hydrate: () => Promise<void>
  reloadPersisted: () => Promise<void>
  register: (name: string, pronouns?: Pronouns) => void
  startPhone: () => void
  sendOpeningName: (name: string) => void
  decidePendingRecovery: (decision: 'accepted' | 'rejected' | 'retry') => void
  openFixture: () => void
  replySophie: (choice: string) => void
  sendGroup: (choice: string) => void
  readOpening: (thread: 'sophie' | 'group') => void
  readDanielNote: () => void
  inspectRecovery: () => void
  restoreMirror: () => void
  inspectMirror: (area: MirrorArea) => void
  inspectMirrorDetail: (area: MirrorArea, title: string) => void
  unlockMirror: (id: MirrorLockId, answer: string) => void
  mirrorHint: (id: MirrorLockId) => void
  saveMirrorEvidence: (id: string) => void
  linkMirrorEvidence: (a: string, b: string) => void
  unlinkMirrorEvidence: (key: string) => void
  navigateMirror: (id?: string) => void
  compareMirrorIndex: () => void
  finishOpening: () => void
  tick: () => void
  send: (choiceId: string) => void
  readMessages: () => void
  setReduceMotion: (value: boolean) => void
  restartStory: () => Promise<boolean>
  beginEpisodeSlice: () => void
  nextSliceScene: () => void
  openBrief: () => void
  inspectPreview: () => void
  compare: (answer: string) => void
  recheckComparison: () => void
  hint: () => void
  saveLead: (choiceId: string) => void
  setTip: (mode: 'anonymous' | 'handle', handle: string) => void
  sendTip: () => void
  openSliceInbox: () => void
  sendS11: (choiceId: string) => void
  draftS11: (choiceId?: string) => void
  answerEditor: (answer: string) => void
  readSliceMessages: () => void
  sendFollowupIntro: (contact: FollowupContact) => void
  sendFollowupChoice: (contact: FollowupContact, choiceId: string) => void
  readFollowup: (contact: FollowupContact) => void
  editorHint: () => void
  enterAfterEditor: () => void
  askMayaAboutRow: () => void
  continueToShare: () => void
  draftPhase03b: (id?: string) => void
  sendPhase03b: () => void
  closeShareWithoutSend: () => void
  continueToEditorNote: () => void
  openOptionalConnections: () => void
  continueToPermissionSheet: () => void
  decideConnection: (kind: 'messages' | 'archive', accept: boolean) => void
  enterPublicSources: () => void
  reopenConnections: () => void
  inspectSourceStatus: (source: 'preview' | 'current' | 'notice') => void
  showSourceStatusHint: () => void
  answerSourceStatus: (answer: string) => void
  recordS19Observation: (answer: string) => void
  labelS19Date: (index: number, label: string) => void
  finishS19: () => void
  inspectS20Notice: () => void
  answerS20Approval: (answer: string) => void
  placeS21Card: (card: string) => void
  resetS21Order: () => void
  classifyS21: (answer: string) => void
  answerS22: (kind: 'alternative' | 'test', answer: string) => void
  setS23Query: (query: string) => void
  openS23Result: (id: string) => void
  matchS23Source: (id: string) => void
  finishS23: () => void
  finishS24: (viewed: boolean) => void
  viewS24Note: () => void
  selectS27Scope: (scope: 'redacted' | 'residents' | 'logs') => void
  submitS27Request: () => void
  recordS27Review: () => void
  requestS28Correction: () => void
  openS28Page: (page: number) => void
  openS28Directory: () => void
  checkS28: (kind: 'office' | 'lineage' | 'pages' | 'transfer', choice: string) => Promise<void>
  finishS28: () => Promise<void>
  citeS29: (source: string) => void
  saveS29Finding: () => void
  checkS30Role: () => void
  saveS30Question: (answer: string) => void
  completeS30: () => void
  openS25Checkin: () => void
  openS26Frame: () => void
  returnToS27: () => void
  keepS26Private: () => void
  continuePublicWithoutTip: () => void
  openLateTip: () => void
  returnToFinding: () => void
  linkBoardPair: (a: BoardSourceId, b: BoardSourceId) => void
  unlinkBoardPair: (key: string) => void
}

let writeQueue = Promise.resolve()
let hydration: Promise<void> | undefined
let restarting = false
function commit(next: GameSave) {
  if (restarting) return
  if (useGameStore.getState().recoveryRequired) return
  const current = useGameStore.getState().save
  if (next === current) return
  const expectedRevision = current.saveRevision ?? 0
  const revised = { ...next, saveRevision: expectedRevision+1 }
  stagePendingSave(revised,expectedRevision)
  useGameStore.setState({ save: revised, saveError: null })
  writeQueue = writeQueue.then(async () => { if (useGameStore.getState().recoveryRequired) return; await writeGame(revised,expectedRevision); clearPendingSave(revised.saveRevision) }).catch(error => {
    useGameStore.setState({ saveError: error instanceof Error ? error.message : 'Save failed', recoveryRequired: true, recoveryRaw: useGameStore.getState().save })
  })
}

export const useGameStore = create<GameStore>((set, get) => ({
  accessAction: action => commit(chapter2Access(get().save, action, Date.now(), playtestEnabled)),
  sendScene01: (id, name) => commit(sendScene01Choice(get().save, id, name, playtestEnabled)),
  scene01Invitation: action => commit(scene01Invitation(get().save, action)),
  openSophiePrivate: () => commit(openScene03(get().save)),
  pauseSophiePrivate: () => commit(pauseScene03(get().save)),
  draftSophiePrivate: choiceId => commit(draftScene03Choice(get().save, choiceId)),
  continueMessageFlow: () => commit(continueMessageFlow(get().save)),
  sendRecoveryReply: id => commit(sendRecoveryReply(get().save, id)),
  swapRecoveryCards: (a, b) => commit(swapRecoveryCards(get().save, a, b)),
  hintRecovery: () => commit(hintRecovery(get().save)),
  assistRecovery: () => commit(assistRecovery(get().save)),
  resetRecovery: () => commit(resetRecovery(get().save)),
  verifyRecovery: () => commit(verifyRecovery(get().save)),
  retainRecovery: () => commit(retainRecovery(get().save)),
  save: newGame(), ready: false, saveError: null, recoveryRequired: false, recoveryRaw: undefined,
  hydrate: async () => {
    if (get().ready) return
    if (hydration) return hydration
    hydration = (async () => {
      const result = await loadGame()
      set({ save: result.save, ready: true, saveError: result.error ?? null, recoveryRequired: result.recoveryRequired ?? false, recoveryRaw: result.raw })
      if (!result.recoveryRequired && result.save.prologue?.scene01?.invitation === 'joined' && !result.save.prologue.scene01.groupScript) { commit(beginScene02(result.save)); return }
      if (!result.recoveryRequired && result.save.prologue?.scene01?.nodeId === 'OPEN-S02-SOURCE-BOUNDARY') { commit(resumeScene02(result.save)); return }
      if (!result.recoveryRequired && result.save.prologue?.scene01?.privateScene03?.reading) { commit(pauseScene03(result.save)); return }
    if (!result.recoveryRequired && result.save.chapter2Access?.story?.active) { commit(reunionAction(result.save,{type:'story-close',thread:result.save.chapter2Access.story.active},Date.now())); return }
      if (!result.recoveryRequired && !(import.meta.env.DEV && new URLSearchParams(window.location.search).has('legacyopening')) && (result.save.prologue || result.save.player) && !result.save.prologue?.scene01) commit(beginScene01(result.save))
      else if (!result.recoveryRequired && !result.save.prologue?.scene01 && result.save.prologue?.dialogueVersion === 4 && result.save.prologue.stage === 'complete' && !result.save.e01) commit(beginSlice(result.save))
    })()
    try { await hydration } finally { hydration = undefined }
  },
  reloadPersisted: async () => {
    await writeQueue
    discardPendingSave()
    const result = await loadGame()
    set({ save: result.save, ready: true, saveError: result.error ?? null, recoveryRequired: result.recoveryRequired ?? false, recoveryRaw: result.raw })
    if (!result.recoveryRequired && result.save.prologue?.scene01?.invitation === 'joined' && !result.save.prologue.scene01.groupScript) { commit(beginScene02(result.save)); return }
    if (!result.recoveryRequired && result.save.prologue?.scene01?.nodeId === 'OPEN-S02-SOURCE-BOUNDARY') { commit(resumeScene02(result.save)); return }
    if (!result.recoveryRequired && result.save.prologue?.scene01?.privateScene03?.reading) { commit(pauseScene03(result.save)); return }
    if (!result.recoveryRequired && result.save.chapter2Access?.story?.active) { commit(reunionAction(result.save,{type:'story-close',thread:result.save.chapter2Access.story.active},Date.now())); return }
    if (!result.recoveryRequired && !(import.meta.env.DEV && new URLSearchParams(window.location.search).has('legacyopening')) && (result.save.prologue || result.save.player) && !result.save.prologue?.scene01) commit(beginScene01(result.save))
    else if (!result.recoveryRequired && !result.save.prologue?.scene01 && result.save.prologue?.dialogueVersion === 4 && result.save.prologue.stage === 'complete' && !result.save.e01) commit(beginSlice(result.save))
  },
  register: (name, pronouns) => commit(registerPlayer(get().save, name, pronouns)),
  startPhone: () => commit(startPhoneOpening(get().save)),
  sendOpeningName: name => commit(sendOpeningName(get().save, name)),
  decidePendingRecovery: decision => commit(decidePendingRecovery(get().save, decision)),
  openFixture: () => commit(enterFixture(get().save, Date.now())),
  replySophie: choice => commit(replyToSophie(get().save, choice)),
  sendGroup: choice => commit(choice === 'public' || choice === 'wait' && get().save.prologue?.social?.reactivation ? answerGroupFollowup(get().save, choice, Date.now()) : sendGroupChoice(get().save, choice)),
  readOpening: thread => commit(get().save.prologue?.scene01 ? markScene01Read(get().save, thread) : markOpeningRead(get().save, thread)),
  readDanielNote: () => commit(readDanielNote(get().save)),
  inspectRecovery: () => commit(inspectRecoveryOffer(get().save)),
  restoreMirror: () => commit(restoreDanielMirror(get().save)),
  inspectMirror: area => commit(inspectMirrorRecord(get().save, area)),
  inspectMirrorDetail: (area, title) => commit(inspectMirrorDetail(get().save, area, title)),
  unlockMirror: (id, answer) => commit(unlockMirrorRecord(get().save, id, answer)),
  mirrorHint: id => commit(revealMirrorHint(get().save, id)),
  saveMirrorEvidence: id => commit(saveMirrorEvidence(get().save, id, Date.now())),
  linkMirrorEvidence: (a, b) => commit(linkMirrorEvidence(get().save, a, b)),
  unlinkMirrorEvidence: key => commit(unlinkMirrorEvidence(get().save, key)),
  navigateMirror: id => commit(navigateMirror(get().save, id)),
  compareMirrorIndex: () => commit(compareMirrorIndex(get().save)),
  finishOpening: () => commit(finishOpening(get().save)),
  tick: () => {
    const current = get().save
    const now = Date.now()
    if (current.prologue?.scene01) { commit(chapter2Access(deliverScene01(current, now), { type: 'tick' }, now)); return }
    if (current.prologue?.flow === 'mirror-first') {
      const next = deliverOpening(current, now)
      commit(next === current ? deliverPhoneOpeningEvent(current, now) : next)
      return
    }
    const primed = scheduleGroupProposal(scheduleMayaReferral(current, now), now)
    const openingDue = Math.min(primed.prologue?.queue?.[0]?.dueAt ?? Infinity, primed.prologue?.social?.queue?.[0]?.dueAt ?? Infinity, primed.prologue?.recoverySequence?.queue[0]?.dueAt ?? Infinity)
    const eventDue = primed.pendingEvents.reduce((earliest, event) => Math.min(earliest, event.dueAt), Infinity)
    const delivered = primed.prologue?.dialogueVersion === 4
      ? openingDue <= eventDue ? deliverOpening(primed, now) : dueEvent(primed, now)
      : dueEvent(deliverOpening(primed, current.settings.reduceMotion || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) ? Number.MAX_SAFE_INTEGER : now), now)
    const next = scheduleGroupProposal(delivered, now)
    if (next !== current) commit(next)
  },
  send: choiceId => commit(sendFixtureChoice(get().save, choiceId, Date.now())),
  readMessages: () => commit(markMessagesRead(get().save)),
  setReduceMotion: value => commit({ ...get().save, settings: { reduceMotion: value } }),
  restartStory: async () => {
    if (restarting || get().recoveryRequired) return false
    restarting = true
    try {
      await writeQueue
      if (get().recoveryRequired) return false
      const current = get().save
      const revision = current.saveRevision ?? 0
      const fresh = { ...newGame(), saveRevision: revision + 1, settings: { reduceMotion: current.settings.reduceMotion } }
      await writeGame(fresh, revision)
      discardPendingSave()
      set({ save: fresh, saveError: null })
      return true
    } catch (error) {
      set({ saveError: error instanceof Error ? error.message : 'Restart failed' })
      return false
    } finally { restarting = false }
  },
  beginEpisodeSlice: () => commit(beginSlice(get().save)),
  nextSliceScene: () => commit(advanceSlice(get().save, Date.now())),
  openBrief: () => commit(readBrief(get().save)),
  inspectPreview: () => commit(inspectPreview(get().save, Date.now())),
  compare: answer => commit(answerComparison(get().save, answer)),
  recheckComparison: () => commit(recheckComparison(get().save)),
  hint: () => commit(showComparisonHint(get().save)),
  saveLead: choiceId => commit(saveLead(get().save, choiceId, Date.now())),
  setTip: (mode, handle) => commit(setTipDraft(get().save, mode, handle)),
  sendTip: () => commit(sendTip(get().save, Date.now())),
  openSliceInbox: () => commit(openSliceInbox(get().save)),
  sendS11: choiceId => commit(sendS11Choice(get().save, choiceId, Date.now())),
  draftS11: choiceId => commit(setS11Draft(get().save, choiceId)),
  answerEditor: answer => { const now = Date.now(); commit(scheduleMayaReferral(onEditorChecked(answerEditor(get().save, answer), now), now)) },
  readSliceMessages: () => commit(readSliceMessages(get().save)),
  sendFollowupIntro: contact => commit(sendFollowupIntro(get().save, contact, Date.now())),
  sendFollowupChoice: (contact, choiceId) => commit(sendFollowupChoice(get().save, contact, choiceId, Date.now())),
  readFollowup: contact => commit(readFollowup(get().save, contact)),
  editorHint: () => commit(showEditorHint(get().save)),
  enterAfterEditor: () => commit(enterAfterEditor(get().save, Date.now())),
  askMayaAboutRow: () => commit(askMayaAboutRow(get().save, Date.now())),
  continueToShare: () => commit(continueToShare(get().save, Date.now())),
  draftPhase03b: id => commit(draftPhase03b(get().save, id)),
  sendPhase03b: () => commit(sendPhase03b(get().save, Date.now())),
  closeShareWithoutSend: () => commit(closeShareWithoutSend(get().save)),
  continueToEditorNote: () => commit(continueToEditorNote(get().save, Date.now())),
  openOptionalConnections: () => commit(openOptionalConnections(get().save, Date.now())),
  continueToPermissionSheet: () => commit(continueToPermissionSheet(get().save)),
  decideConnection: (kind, accept) => commit(scheduleMayaReferral(decideConnection(get().save, kind, accept), Date.now())),
  enterPublicSources: () => commit(enterPublicSources(get().save)),
  reopenConnections: () => commit(reopenConnections(get().save)),
  inspectSourceStatus: source => commit(inspectSourceStatus(get().save, source)),
  showSourceStatusHint: () => commit(showSourceStatusHint(get().save)),
  answerSourceStatus: answer => commit(answerSourceStatus(get().save, answer)),
  recordS19Observation: answer => commit(recordS19Observation(get().save, answer)),
  labelS19Date: (index,label) => commit(labelS19Date(get().save,index,label)),
  finishS19: () => commit(finishS19(get().save)),
  inspectS20Notice: () => commit(inspectS20Notice(get().save)),
  answerS20Approval: answer => commit(answerS20Approval(get().save,answer)),
  placeS21Card: card => commit(placeS21Card(get().save,card)),
  resetS21Order: () => commit(resetS21Order(get().save)),
  classifyS21: answer => commit(classifyS21(get().save,answer)),
  answerS22: (kind,answer) => commit(answerS22(get().save,kind,answer)),
  setS23Query: query => commit(setS23Query(get().save,query)),
  openS23Result: id => commit(openS23Result(get().save,id)),
  matchS23Source: id => commit(matchS23Source(get().save,id)),
  finishS23: () => commit(finishS23(get().save)),
  finishS24: viewed => commit(finishS24(get().save,viewed)),
  viewS24Note: () => commit(viewS24Note(get().save)),
  selectS27Scope: scope => commit(selectS27Scope(get().save,scope)),
  submitS27Request: () => commit(submitS27Request(get().save,Date.now())),
  recordS27Review: () => commit(recordS27Review(get().save)),
  requestS28Correction: () => commit(requestS28Correction(get().save)),
  openS28Page: page => commit(openS28Page(get().save,page)),
  openS28Directory: () => commit(openS28Directory(get().save)),
  checkS28: async (kind,choice) => { const before = get().save; const next = await checkS28(before,kind,choice); if (get().save === before) commit(next) },
  finishS28: async () => { const before = get().save; const next = await finishS28(before); if (get().save === before) commit(next) },
  citeS29: source => commit(citeS29(get().save,source)),
  saveS29Finding: () => commit(saveS29Finding(get().save)),
  checkS30Role: () => commit(checkS30Role(get().save)),
  saveS30Question: answer => commit(saveS30Question(get().save,answer)),
  completeS30: () => commit(completeS30(get().save)),
  openS25Checkin: () => commit(openS25Checkin(get().save,Date.now())),
  openS26Frame: () => commit(openS26Frame(get().save,Date.now())),
  returnToS27: () => commit(returnToS27(get().save)),
  keepS26Private: () => commit(keepS26Private(get().save)),
  continuePublicWithoutTip: () => commit(continuePublicWithoutTip(get().save)),
  openLateTip: () => commit(openLateTip(get().save)),
  returnToFinding: () => commit(returnToFinding(get().save)),
  linkBoardPair: (a,b) => commit(linkBoardPair(get().save,a,b)),
  unlinkBoardPair: key => commit(unlinkBoardPair(get().save,key)),
}))
