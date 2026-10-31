import { chapter1ScenePlan } from './chapter1Plan'
import { followupEntry, reunionNodes, reunionOpening, scene09Reflection, spyUnknownEntry, spyUnknownPost } from './chapter2Reunion'
import { revisedReunionOpening } from './noraReunion'
import { disclosureA, disclosureB, disclosureCNew, disclosureCKnown, eli14Entry, lucas10Entry, nora14Entry, scene10Entry, scene12Entry, scene15FinalEntry } from './chapter2Continuation'

/** Presentation metadata for the existing stable event namespaces. Never use
 * sender, text, wall clock, unread state or the currently active scene here.
 * Old saves retain these IDs, so their history needs no migration or replay. */
const chapter1 = (number: number) => chapter1ScenePlan.find(scene => scene.number === number)?.id
const storyScenes = new Map<string, string>()
function register(entry: string, sceneId: string) {
  if (storyScenes.has(entry)) return
  storyScenes.set(entry, sceneId)
  const node = reunionNodes[entry]
  if (!node) return
  const next = node.kind === 'choice' ? node.options.map(option => option.next) : node.kind === 'if' ? [node.yes, node.no] : node.next ? [node.next] : []
  next.forEach(id => register(id, sceneId))
}
// All branches from an authored scene entrance share its scene, including
// embedded Send choices, waits and actor changes.
for (const entry of [reunionOpening, revisedReunionOpening, ...Object.values(followupEntry), spyUnknownEntry, spyUnknownPost]) register(entry, 'C2_ACCESS_008')
register(scene09Reflection, 'ch02_sc09')
for (const [number, entries] of [[10, [scene10Entry, lucas10Entry]], [12, [scene12Entry]], [14, [eli14Entry, nora14Entry]], [15, [disclosureA, disclosureB, disclosureCNew, disclosureCKnown, scene15FinalEntry]]] as const) {
  entries.forEach(entry => register(entry, `ch02_sc${number}`))
}

const chapter1Events: Record<string, number> = {
  'CH1-SENDER-FIRST': 2, 'CH1-SENDER-SOPHIE': 3,
  'CH1-NORA-INTRO': 7, 'CH1-NORA-PAGE-REPLY': 8,
  'CH1-ELI-INTRO': 12, 'CH1-ELI-WARNING': 12,
  'CH1-MAYA-CONTEXT': 13, 'CH1-LUCAS-CONTEXT': 14,
  'CH1-NORA-REQUEST': 16, 'CH1-MAYA-REQUEST': 16, 'CH1-LUCAS-REQUEST': 16,
}

export function chatSceneId(eventId: string): string | undefined {
  if(eventId.startsWith('OPEN-VH-')||eventId.startsWith('CH1-VH-'))return 'ch02_scene05_version_history'
  if(eventId.startsWith('OPEN-ORIGIN-')||eventId.startsWith('CH1-ARCHIVE-'))return 'archive_origin_bridge'
  const chapter1Number = /^(?:OPEN-|EV-|CH1-)S(\d{2})-/.exec(eventId)
  if (chapter1Number) return chapter1(Number(chapter1Number[1]))
  if (eventId.startsWith('scene04_')) return chapter1(4)
  if (chapter1Events[eventId]) return chapter1(chapter1Events[eventId])
  if (eventId.startsWith('C2-STORY-')) {
    const nodeId = eventId.replace(/^C2-STORY-(?:group|unknown|maya|eli|sophie|lucas|nora)-/, '')
    return storyScenes.get(nodeId)
  }
  if (eventId.startsWith('C2S08_')) return 'C2_ACCESS_008'
  if (eventId.startsWith('C2-GROUP-')) return 'C2_ACCESS_008'
  if (/^C2-UNKNOWN-(?:U07Q_|DECLINE-|ACCEPT-)/.test(eventId)) return 'C2_ACCESS_003'
  if (eventId.startsWith('C2-UNKNOWN-')) return 'C2_ACCESS_002'
  if (eventId.startsWith('C2-SPY-eli-lucas-')) return 'C2_ACCESS_008'
  if (eventId.startsWith('C2-SPY-maya-lucas-')) return 'ch02_sc09'
  // Pinned pre-screenplay routes keep their own historical scene identities.
  if (eventId.startsWith('OPEN-SECOND-')) return 'legacy-opening-private-second'
  if (eventId.startsWith('OPEN-GROUP-') || eventId.startsWith('OPEN-V4-GROUP-')) return 'legacy-opening-group'
  if (eventId.startsWith('OPEN-V4-') || eventId.startsWith('OPEN-SOPHIE-')) return 'legacy-opening-first-contact'
  if (eventId.startsWith('ARC-E01-GROUP-')) return 'legacy-group-followup'
  const followup = /^ARC-E01-(LUCAS|ELI|NORA)-/.exec(eventId)
  if (followup) return `legacy-followup-${followup[1]}`
  const legacyScene = /E01-S(\d{2})/.exec(eventId) ?? /P-S(\d{2})-/.exec(eventId)
  if (legacyScene) return `E01-S${legacyScene[1]}`
  if (eventId.startsWith('EV-E01-P03B:C03-FRAME.')) return 'E01-S26'
  return undefined
}
