/** Proposed 26 October device times; source and clock offset are unverified. */
export const activityEvents = [
 {id:'TA-PH-ACTIVITY-01-NOTE',time:'18:30',raw:'2026-10-26T18:30:00',kind:'Note modification',text:'A note record was modified.',uncertainty:'The record does not identify the person or expose the note body.',units:20},
 {id:'TA-PH-ACTIVITY-01-MESSAGE',time:'18:50',raw:'2026-10-26T18:50:00',kind:'Message activity',text:'A message database write was recorded.',uncertainty:'A database write does not establish who sent or read a message.',units:20},
 {id:'TA-PH-ACTIVITY-01-FILE',time:'19:00',raw:'2026-10-26T19:00:00',kind:'File access',text:'An archive-related file was accessed.',uncertainty:'The actor and location are unavailable.',units:20},
 {id:'TA-PH-ACTIVITY-01-SYNC',time:'20:00',raw:'2026-10-26T20:00:00',kind:'Automatic backup sync',text:'A scheduled backup synchronisation was recorded.',uncertainty:'Automatic sync is not proof that a person used the phone.',units:20},
] as const

export const missingHourSources = [activityEvents[2].id, activityEvents[3].id] as const
export const partialSyncReceipt = { id: 'TA-PH-ACTIVITY-01-SYNC-RECEIPT', title: 'Partial sync receipt', time: '20:02 UTC' } as const
export const scene06Beats = [
 {choices:['What can activity records tell us?', 'You mentioned another protected segment. What is in it?', 'What do you want me to look for?'],replies:['They may show device events and their recorded times. They cannot tell you everything that happened around the phone.', 'Possibly a partial activity log. I cannot promise the segment is complete.', 'The order of whatever events are actually recoverable, and the places where the record stops.']},
 {choices:['Would an event prove Daniel used the phone?', 'Could someone else have used it?', 'I do not want a device event treated as a witness.'],replies:['No. A record can show what the device logged, not who held it.', 'It is possible. The log alone cannot identify the person.', 'Agreed. Keep the event separate from any claim about its user.']},
 {choices:['Are the timestamps reliable?', 'What if the phone clock was wrong?', 'Can TRACE verify the times independently?'],replies:['They are recorded device times. The clock and offset need independent checking.', 'Then the ordering or comparison with outside records may be affected.', 'Not from the log alone. It can show the timestamp and the missing verification.']},
 {choices:['Why were the logs missing from the first pass?', 'Did TRACE skip them?', 'Is another recovery necessary?'],replies:['They are in a separate segment. The first operation did not process it.', 'The first pass was limited to its designated segments. That does not prove the rest is intact.', 'Yes. You would need to start a separate operation yourself.']},
 {choices:['Can TRACE reconstruct deleted activity?', 'Will it fill in the missing hour?', 'Do not let it invent what is absent.'],replies:['It can present recoverable fragments. It cannot reliably recreate entries that are not there.', 'No. An empty interval in this copy is a question, not a reconstruction.', 'It should leave missing material marked as missing.']},
 {choices:['Could the backup have been modified?', 'How can I trust these logs?', 'You still cannot prove the chain of custody.'],replies:['Yes. We do not have enough to rule that out.', 'Compare specific records with independent sources. Readable is not the same as authenticated.', 'That is true. Treat this copy and my account as unverified.']},
 {choices:['What should I compare first?', 'Should I revisit the messages and notes?', 'How do I avoid mixing fact and inference?'],replies:['Inspect each event and its timestamp, then arrange only the records you can support.', 'You can revisit them. Their missing timestamps should stay missing.', 'Label what the device recorded, what might be automatic, and what remains your hypothesis.']},
 {choices:['I will inspect the next segment myself.', 'I need to control the recovery.', 'I am willing to look, without promising a conclusion.'],replies:['Open TRACE and start it when you are ready.', 'You decide when to start. The operation will not send me your private work.', 'That is enough. You can leave uncertainty in the timeline.']},
 {choices:['The gap still does not tell us where he was.', 'Could the missing records be elsewhere?', 'I will not call this a disappearance time.'],replies:['Right. A gap in this copy does not establish a location.', 'Possibly, but we need another source rather than an invented record.', 'You should not. The log cannot establish that.']},
 {choices:['What independent source can we check?', 'Sophie found my number in an export. Could she revisit it?', 'We need to compare this with something outside the backup.'],replies:['Sophie still has the contact export she used. You could ask her to revisit it.', 'That export is separate from this backup. Asking Sophie about it is a sensible next step.', 'Yes. Sophie may be able to re-examine her contact export; the timeline alone cannot explain the starred number.']},
] as const
export const reportChoices = [
 'The available log has ordered events and a gap from 19:00 to 20:00. The sync is automatic; the actor and location are unknown.',
 'I found a one-hour gap in this partial log. The recorded sync does not prove Daniel was using the phone.',
 'The recovered records leave a one-hour interval unresolved. I am keeping my interpretation private.',
] as const

export const reconstructionReportBeat = {
  choices: [
    'The file access and the automatic sync leave a one-hour gap in this copy.',
    'The last readable events are an access and an automatic sync. The clock still needs checking.',
    'I documented the gap. I’m keeping my interpretation private.',
  ],
  replies: [
    'That gives us a specific interval to check against an independent record. The gap alone cannot tell us what happened.',
    'Keep both limits attached to those times. An automatic sync does not identify who used the phone, and the clock has no independent check.',
    'All right. Keep your notes on your device. We can look for a separate source without sharing your theory.',
  ],
} as const
