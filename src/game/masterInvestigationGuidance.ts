import type { GameSave } from './types'

type Guidance = { title: string; direction: string; focus: string; assistance: string }

const guidance = {
  recovery: { title: 'Recover the first fragments', direction: 'The accepted archive is the starting point.', focus: 'Look for the recovery operation on the TRACE home screen.', assistance: 'Start recovery on the archive. Messages and Notes will become available at 12%.' },
  fragments: { title: 'Find something worth following', direction: 'Start with a recovered message or a note.', focus: 'Look for a detail that says something concrete, or compare two fragments with a shared subject.', assistance: 'Highlight a line or use Compare fragments. Save the supported observation, then return to Unknown.' },
  discuss: { title: 'Follow up with Unknown', direction: 'Your observation is in the case file.', focus: 'Unknown can discuss what the partial record supports.', assistance: 'Return to the Unknown conversation in Messages. Your private notes stay on this device.' },
  deeper: { title: 'Look beyond the first pass', direction: 'Unknown mentioned another segment of the archive.', focus: 'The next recovery operation concerns device activity.', assistance: 'Start The Missing Hour when ready, then use Activity Logs in TRACE.' },
  gap: { title: 'Continue investigating', direction: 'The recovered data remains available in TRACE.', focus: 'Consider what the records can and cannot establish.', assistance: 'You can discuss discoveries with Unknown.' },
  timelineFollowup: { title: 'Talk to Unknown', direction: 'You found a part of the evening the records cannot explain.', focus: 'What do you make of it?', assistance: 'Return to Unknown in Messages and choose a reply.' },
  sophie: { title: 'Hear Sophie’s account', direction: 'There is a new lead in Sophie’s conversation.', focus: 'Her account may help put the original contact in context.', assistance: 'Open Sophie’s conversation in Messages when you’re ready.' },
  export: { title: 'Check the contact export', direction: 'Open the copy Sophie sent in your chat.', focus: 'Separate the visible entry from the source history and the damaged text.', assistance: 'Return to Sophie and tell her what you can read.' },
  maya: { title: 'Follow Maya’s lead', direction: 'Check Messages for Maya’s follow-up.', focus: 'Maya has been looking through her old messages.', assistance: 'Open your conversation with Maya.' },
  capture: { title: 'Talk to Maya', direction: 'Read the messages Maya kept.', focus: 'Daniel mentioned another copy.', assistance: 'Ask Maya what she remembers about their conversation.' },
  card: { title: 'Follow up about the card', direction: 'Look closely at the photo Maya sent.', focus: 'Distinguish the printed code from the markings and the claimed source.', assistance: 'Discuss the reference with Maya in Messages.' },
  inventory: { title: 'Follow the public reference', direction: 'Use Maya’s photographed reference to search the public inventory.', focus: 'Compare the two references and check what the listing does not supply.', assistance: 'Use a matching reference and at least one discovered clue to save a working theory. Leave an open question for later.' },
} satisfies Record<string, Guidance>

export function selectInvestigationGuidance(save: GameSave): Guidance | undefined {
  const five = save.masterScene05
  if (five?.packageStatus !== 'installed') return
  if(five.discussion&&!five.recovered)return {title:'Recover the first fragments',direction:'The accepted archive is ready.',focus:'Start recovery in TRACE when you are ready.',assistance:'Recovery will preserve the available data if the source connection is interrupted.'}
  if(five.discussion&&!five.complete)return five.discussion.discovered.length?{title:'Discuss a discovery',direction:'You have opened recovered content.',focus:'Choose what to discuss with Unknown.',assistance:'Select a topic and a reply, then press Send. Finish when you are ready.'}:{title:'Explore recovered data',direction:'The first part of the archive is available.',focus:'Open Messages, Notes or Activity Logs.',assistance:'Read a recovered item, then return to Unknown.'}
  if (!five.recovered) return guidance.recovery
  if (!five.discussion&&!five.saved.length) return guidance.fragments
  if (!five.complete) return guidance.discuss

  const six = save.masterScene06
  if(five.discussion&&!six)return {title:'Continue the investigation',direction:'The recovered data remains available.',focus:'Unknown may have more to say.',assistance:'Return to the conversation with Unknown.'}
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
  if (nine.conversationRevision==='conversation-v3') {
    if(!save.masterScene10?.matched)return { ...guidance.inventory, focus:'The photographed reference can be searched in the public index.', assistance:'Open Greyhaven Public Inventory on the Home screen and enter the reference on the card.' }
    return
  }
  if (!save.masterScene10?.saved) return guidance.inventory
}
