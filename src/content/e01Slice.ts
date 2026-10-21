// Phase 02C Episode 01, scenes S01–S12. Text is copied from the accepted screenplay/props.
export const storyClockByScene: Record<string, string> = {
  'E01-S02': '09:00', 'E01-S03': '09:03', 'E01-S04': '09:08', 'E01-S05': '09:11',
  'E01-S06': '09:14', 'E01-S07': '09:17', 'E01-S08': '09:19', 'E01-S09': '09:20',
  'E01-S10': '09:21', 'E01-S11': '09:23', 'E01-S12': '09:28',
  'E01-S13': '09:32', 'E01-S14': '09:37', 'E01-S15': '09:40', 'E01-S16': '09:44', 'E01-S17': '09:49', 'E01-S18': '10:04',
  'E01-S19': '10:15', 'E01-S20': '10:27', 'E01-S21': '10:38', 'E01-S22': '11:05', 'E01-S23': '11:22', 'E01-S24': '11:46',
  'E01-S25': '13:00', 'E01-S26': '13:05', 'E01-S27': '15:06', 'E01-S28': '15:42', 'E01-S29': '16:32', 'E01-S30': '17:45',
}
export const storyMessageAt = (minute: number, second = 0) => Date.UTC(2026, 9, 8, 9, minute, second)
export const briefParagraphs = [
  'Daniel Mercer was last confirmed in contact on 4 October. His sister reported him missing on 5 October. The search is active; we do not know where he is or what happened after that confirmed contact.',
  "On records days, Daniel sat at the far end of our table with a pencil and a stack of labels. He noticed when a donor's photograph had the wrong street written beneath it. He would ask us to keep the old label beside the correction. It was slower. It meant someone coming after him could see why the caption changed.",
  'Daniel worked with civic records. Last week he sent our editor an older cropped view of a North Quay evacuation record and asked her to keep it. The current public civic copy is linked below. We are sharing only the public-facing rows and covering resident details. We cannot authenticate an entire 2019 file from a cropped image.',
  'We are publishing this because Daniel is missing, and because people who may have spoken to him about a record should have a safe way to contact us. His family gave permission for this portrait and missing-person notice. Please do not search buildings, follow strangers, or post guesses about where he is.',
  "The preview is one of the last work items he shared with us. It is incomplete. If you saw Daniel or have information about the record, use this Bulletin's case tip form. You can request an anonymous return token. Tell us what you can point to and where you saw it. You may keep reading without submitting anything. Please do not post a private name or a theory about someone's guilt in the comments. The family needs information that can be checked.",
  'Known dates: 4 Oct last confirmed contact · 5 Oct missing-person report · 7 Oct this brief.',
  'Editor: Maya Chen, Greyhaven Memory Project. Case inbox: MP-DM-07.',
  'Related public material: Older Bus 4 preview (cropped image) · Current civic copy (public redacted link).',
] as const

export const previewText = `NORTH QUAY EVACUATION / BUS 4
Record GH-NQ-BUS4-2019-11-23 / v1
23 NOV 2019
Residents: 12 / identifying fields [REDACTED]
Escort: JUNE ELLIS
Destination fields: [REDACTED IN PUBLIC PREVIEW]
...
VERIFIED 24 NOV 2019 15:20
[page edge outside crop]`

export const currentText = `GREYHAVEN CIVIC PORTAL
NORTH QUAY EVACUATION / BUS 4
Record GH-NQ-BUS4-2019-11-23 / v2
Event date: 23 NOV 2019
Residents: 12 / identifying fields [REDACTED]
Escort: —
Destination fields: [REDACTED IN PUBLIC VIEW]
Public status: CURRENT COPY
Revision history: available`

export const comparisonAnswers = [
  { id: 'escort', text: 'Escort: June Ellis → blank', feedback: 'Visible difference saved. It is an observation, not proof that either full file is authentic.' },
  { id: 'residents', text: 'The resident names', feedback: 'Those fields are redacted in both public views. Try a field whose text is visible.' },
  { id: 'bus', text: 'The bus number', feedback: 'Both headers say Bus 4. Look below the header.' },
  { id: 'uncertain', text: "I can't tell yet", feedback: 'Open text comparison; the escort row is the only fully readable changed field here.' },
] as const

export const comparisonHints = [
  'Match the record title and date first.',
  'Read the escort field on each copy.',
  'Preview: June Ellis. Current view: blank.',
] as const

export const leadChoices = [
  { id: 'P-S07-A', text: 'The visible escort field changed.', feedback: 'Saved as a source-limited observation.' },
  { id: 'P-S07-B', text: 'Maybe the older image was cropped or mislabeled.', feedback: 'Saved as an alternative to test. The visible field still differs.' },
  { id: 'P-S07-C', text: "I don't know what happened.", feedback: 'Saved with uncertainty. You can still report exactly what the two views show.' },
] as const

export const tipText = "I compared the older Bus 4 preview in your brief with the current civic copy. The escort field shows June Ellis in the preview and is blank now. I can't tell which full version was verified."

export const mayaOpening = [
  "Hi. I'm Maya. I edited the Daniel Mercer brief.",
  "I started typing 'thank you' and then realised I haven't told you why I'm in this inbox. Sorry.",
  'I can open the two links. The escort line you described is there.',
  'Which part are you most worried I missed?',
  "I've read that sentence three times. The word ‘escort’ is clear in the image Daniel sent me. The blank on the portal is clear too. What I can't see is the page between them.",
] as const

export const primaryReplies = [
  { id: 'P-S11-A', text: 'First, how do I know this is really the editor?', reply: ["Good question. Don't take my word for it. The public editor card has this inbox's case code.", "I'll wait while you check.", "The card proves this inbox belongs to the brief. It doesn't prove I made a good call posting the crop."] },
  { id: 'P-S11-B', text: 'June is named in the preview and missing in the current copy.', reply: ["That's the line I see too. I don't want to pretend the crop tells us the whole version history.", 'Please check the editor card before you send me anything else.', "I can re-open your two public links. Please don't send a different file just because I'm asking questions."] },
  { id: 'P-S11-C', text: "I don't want to share more yet.", reply: ["Understood. The public records are still public. You don't owe me a file.", 'If you do come back, check my editor card first.', "All right. I won't chase you into another app."] },
] as const

export const mayaOptional = [
  "I was making tea when your tip came in. It's gone cold. That's not your problem; I'm just explaining the dramatic pause.",
  'People have sent us photos of three different men in bus shelters this week. One was a local councillor opening a bus stop.',
  "I called one of the people back before checking the date on the picture. Daniel's sister had already seen it. I won't do that twice.",
  'So I ask too many questions now. Sometimes I ask the wrong one first.',
] as const

export const followupReplies = [
  { id: 'P-S11-D', text: "I'd ask questions too.", reply: ['Thank you. I still owe you a clear answer when I have one.'] },
  { id: 'P-S11-E', text: "That sounds exhausting, but it doesn't make my tip wrong.", reply: ["No, it doesn't. Sorry if I made it sound that way.", 'I can be tired and you can be right about what you saw.'] },
  { id: 'P-S11-F', text: "I wasn't trying to solve where Daniel is.", reply: ["I know. That's partly why I answered. You gave me a line I can check instead of a location guess."] },
] as const

export const editorAnswers = [
  { id: 'code-route', text: 'Case code and return route', feedback: 'The code and return route match the public listing. Channel checked.' },
  { id: 'name-photo', text: 'Her first name and profile photo', feedback: 'A name or image can be copied. Check the case code printed on the public listing.' },
  { id: 'delivery-time', text: "The tip's delivery time", feedback: 'Delivery tells you the tip arrived; it does not identify the editor.' },
] as const
