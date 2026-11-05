import { bridgeFindingsWait, bridgeInstallWait, traceBridgeEntrance } from '../content/traceBridgeV3'
import { naturalConversation } from './investigationAccess'
import type { GameSave } from './types'

export const bridgeInspectionEvent = 'TRACE_V3_REFERENCE_INSPECTED'
export const bridgeComparisonEvent = 'TRACE_V3_PUBLIC_ID_COMPARED'
const supersededPreview = 'TRACE_V3_SUPERSEDED_PREVIEW'
const isOldPreview = (id: string) => id === 'CH1-ARCHIVE-FIRST' || id.startsWith('OPEN-ORIGIN-NAT-')

export function visibleUnknownMessages(save: GameSave) {
  const messages = save.chapter1?.sender.messages ?? []
  return save.deliveredEvents.includes(supersededPreview)
    ? messages.filter(message => !isOldPreview(message.id))
    : messages
}

/** Replace the superseded Scene 4 introduction, retaining its stored history. */
export function upgradeUnansweredTraceBridge(save: GameSave): GameSave {
  const prologue = save.prologue
  const scene = prologue?.scene01
  const chapter = save.chapter1
  const origin = chapter?.archiveOrigin
  if (!prologue || !scene || !chapter || !naturalConversation(save) || traceBridgeV3(save) ||
    save.chapter2Access || chapter.versionHistory) return save

  const tagged = { ...scene, traceBridgeRevision: '2026-11-04' as const }
  if (!origin?.contacted) return { ...save, prologue: { ...prologue, scene01: tagged } }
  if (!chapter.publicStory?.complete || !chapter.publicStory.flags.includes('article-inspected') ||
    !chapter.sender.messages.some(message => message.id.startsWith('OPEN-ORIGIN-NAT-') || message.id === 'CH1-ARCHIVE-FIRST')) return save

  const nextScene = scene.nodeId.startsWith('OPEN-ORIGIN-NAT-')
    ? { ...tagged, nodeId: traceBridgeEntrance, draft: undefined, queue: [] }
    : tagged
  return {
    ...save,
    prologue: { ...prologue, scene01: nextScene },
    chapter1: {
      ...chapter,
      archiveOrigin: {
        ...origin, reading: false, scroll: undefined, securityOpen: false,
        packageDelivered: origin.installed,
        installStage: origin.installed ? origin.installStage : undefined,
        checkpoint: { nodeId: traceBridgeEntrance },
      },
    },
    deliveredEvents: [...save.deliveredEvents, supersededPreview],
    pendingEvents: save.pendingEvents.filter(event =>
      !event.id.startsWith('CH1-ARCHIVE-INSTALL-') &&
      event.id !== 'CH1-ARCHIVE-FOLLOWUP' && event.id !== 'CH1-VH-NAT-START'),
    notifications: save.notifications.map(notice => isOldPreview(notice.id) ? { ...notice, read: true } : notice),
  }
}

export function traceBridgeV3(save: GameSave) {
  return naturalConversation(save) && save.prologue?.scene01?.traceBridgeRevision === '2026-11-04'
}

export function bridgeFindingsReviewed(save: GameSave) {
  const origin = save.chapter1?.archiveOrigin
  return !!origin?.installed && origin.initialInspected && save.deliveredEvents.includes('TRACE_INDEX_FINDINGS_VIEWED')
}

export function bridgeGateReady(save: GameSave, id: string) {
  if (!traceBridgeV3(save)) return false
  const origin = save.chapter1?.archiveOrigin
  if (id === bridgeInstallWait) return !!origin?.installed && !origin.securityOpen
  return id === bridgeFindingsWait && bridgeFindingsReviewed(save)
}
