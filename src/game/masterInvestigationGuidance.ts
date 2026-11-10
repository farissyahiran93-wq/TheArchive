import type { GameSave } from './types'

type Guidance = { title: string; direction: string; focus: string; assistance: string }

const guidance = {
  recovery: { title: 'Recover the first fragments', direction: 'The accepted archive is the starting point.', focus: 'Look for the recovery operation on the TRACE home screen.', assistance: 'Start recovery on the archive. Messages and Notes will become available at 12%.' },
  fragments: { title: 'Find something worth following', direction: 'Start with a recovered message or a note.', focus: 'Look for a detail that says something concrete, or compare two fragments with a shared subject.', assistance: 'Highlight a line or use Compare fragments. Save the supported observation, then return to Unknown.' },
  discuss: { title: 'Follow up with Unknown', direction: 'Your observation is in the case file.', focus: 'Unknown can discuss what the partial record supports.', assistance: 'Return to the Unknown conversation in Messages. Your private notes stay on this device.' },
  deeper: { title: 'Look beyond the first pass', direction: 'Unknown mentioned another segment of the archive.', focus: 'The next recovery operation concerns device activity.', assistance: 'Start The Missing Hour when ready, then use Activity Logs in TRACE.' },
  gap: { title: 'Explain what the timeline can establish', direction: 'Start with the device timestamps in Activity Logs.', focus: 'Look for the last readable event before the unexplained interval and the first one after it.', assistance: 'Compare the 19:00 file access with the 20:00 automatic backup. The gap does not tell you who used the device.' },
  timelineFollowup: { title: 'Discuss the gap', direction: 'The missing-hour finding is saved in the case file.', focus: 'The report can describe what the copy shows without guessing why the gap exists.', assistance: 'Return to Unknown in Messages and choose how to describe the finding.' },
  sophie: { title: 'Hear Sophie’s account', direction: 'There is a new lead in Sophie’s conversation.', focus: 'Her account may help put the original contact in context.', assistance: 'Open Sophie’s incoming call from Messages when you’re ready.' },
  export: { title: 'Check the contact export', direction: 'Use the export alongside Sophie’s account.', focus: 'Separate the visible entry from the source history and the damaged text.', assistance: 'Record what the export corroborates or leave its origin or meaning unresolved. The damaged remark does not establish a warning.' },
  maya: { title: 'Follow Maya’s lead', direction: 'Check Messages for Maya’s follow-up.', focus: 'Ask what she can establish about the evidence she found.', assistance: 'Open Maya’s conversation, then compare her account with the material she shares.' },
  capture: { title: 'Compare the captured exchange', direction: 'Maya’s crop and the testimony are separate sources.', focus: 'Compare the wording and the visible boundaries with what Maya said about the original chat.', assistance: 'Record the wording the crop supports or leave the original or the subject of “another copy” unresolved.' },
  card: { title: 'Establish a usable reference', direction: 'Look closely at the photo Maya sent.', focus: 'Distinguish the printed code from the markings and the claimed source.', assistance: 'Compare the photographed reference with an earlier clue. Record a search lead without authenticating the underlying record.' },
  inventory: { title: 'Follow the public reference', direction: 'Use Maya’s photographed reference to search the public inventory.', focus: 'Compare the two references and check what the listing does not supply.', assistance: 'Use a matching reference and at least one discovered clue to save a working theory. Leave an open question for later.' },
} satisfies Record<string, Guidance>

export function selectInvestigationGuidance(save: GameSave): Guidance | undefined {
  const five = save.masterScene05
  if (five?.packageStatus !== 'installed') return
  if (!five.recovered) return guidance.recovery
  if (!five.saved.length) return guidance.fragments
  if (!five.complete) return guidance.discuss

  const six = save.masterScene06
  if (!six?.recovered) return guidance.deeper
  if (!six.saved) return guidance.gap
  if (!six.complete) return guidance.timelineFollowup

  const seven = save.masterScene07
  if (!seven || ['ringing', 'missed', 'playing', 'waiting'].includes(seven.phase)) return guidance.sophie
  if (seven.phase !== 'complete') return guidance.export
  const eight = save.masterScene08
  if (!eight?.received) return guidance.maya
  if (!eight.complete) return guidance.capture
  const nine = save.masterScene09
  if (!nine?.received) return guidance.maya
  if (!nine.complete) return guidance.card
  if (!save.masterScene10?.saved) return guidance.inventory
}
