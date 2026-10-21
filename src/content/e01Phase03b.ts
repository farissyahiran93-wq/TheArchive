// Verbatim outgoing and reply lines from the accepted Phase 02C Act 02 screenplay.
export const editorHints = [
  "Open the byline's public directory entry.",
  'Compare MP-DM-07 in the listing and reply header.',
  'The same case code and Bulletin return route appear in both places.',
] as const

export const s12Replies = [
  { id: 'P-S12-A', text: 'How did you end up editing this brief?', reply: [
    'The Memory Project collects old neighbourhood records. Daniel brought in a box of ordinary things first—flyers, minutes, a photo of a school roof before the repair.',
    "Then he brought the cropped bus record. It's the first time I wished he'd brought something boring instead.",
  ] },
  { id: 'P-S12-B', text: 'Does the Memory Project work for the city?', reply: [
    "No. We ask permission, keep copies when people give them, and sometimes annoy the city by asking why a public page moved.",
    "We aren't the records office. I wish that distinction were printed bigger on our site.",
  ] },
  { id: 'P-S12-C', text: "A verified inbox doesn't make you a reliable source.", reply: [
    'Correct. It tells you this is my inbox. For the image, all I can tell you is how it reached me.',
  ] },
] as const

export const s12CheckReplies = {
  'P-S11-A': 'Thanks for checking. I wish more people did.',
  'P-S11-B': "Now that you know the inbox is mine, tell me which copy you mean when you say 'older'.",
  quiet: 'The listing is mine. The file still needs its own check.',
} as const
export const s12QuietReply = 'You can use the portal without asking me. If my crop is wrong, I want the correction in the brief.'

export const s13Opening = [
  "I have the image Daniel sent me. It's a crop, so we might be looking at the same few lines.",
  'Was the blank field on the portal page itself, or in another screenshot?',
  "I'm asking because I caught myself writing ‘the city removed June’ in a draft note. I deleted it. A blank field doesn't tell me who touched it.",
] as const
export const s13Replies = [
  { id: 'P-S13-A', text: 'On the civic portal page. I opened the link from your brief.', reply: [
    "Okay. That's useful because we can both reopen it. The portal may have changed since Daniel saw it, but we're not comparing two random screenshots.",
  ] },
  { id: 'P-S13-B', text: 'I saw it on the page, but I still think your image could be misleading.', reply: [
    "That's fair. I posted the crop to ask for leads, not to certify the original.",
    'I should probably put that sentence higher on the brief.',
  ] },
  { id: 'P-S13-C', text: "I'd rather check the public source myself before saying more.", reply: [
    "Do that. I'll leave the link here. You can come back when you have a sentence you trust.",
  ] },
] as const
export const s13OptionalIntro = [
  "The page was slow when I checked this morning. I thought it was my connection and took a screenshot. That screenshot isn't a second source either.",
  "I'm trying not to collect more copies of the same thing and call them confirmation.",
] as const
export const s13Followups = [
  { id: 'P-S13-D', text: 'What would count as a second source to you?', reply: [
    'A record held somewhere other than my folder or the live page. An archived version with a release trail.',
    "It might still describe the wrong event. But we'd know the old field wasn't something I invented with a crop.",
    "A copy held by the office that archived v1 would help. We'd still need to read what it actually certifies.",
  ] },
  { id: 'P-S13-E', text: "Could June's name have been removed for privacy?", reply: [
    "Maybe. The residents are covered for that reason. June's field is marked Escort, but I don't know their public-name rule from looking at this page.",
    "That's exactly the sort of reason I'd want the revision trail before making a claim.",
    "That privacy explanation is possible. I won't turn June's name into a contact lead.",
  ] },
  { id: 'P-S13-F', text: 'What if the older file was simply wrong?', reply: [
    "Then the correction could be proper. I'd rather learn that than turn a mistake into a story about Daniel.",
    'Then the changed page might be what a careful office was supposed to do. I can live with that answer if the record supports it.',
  ] },
] as const

export const s14Request = [
  "Could you send me what you're reading? Text is enough. Please crop out anything you don't mean to give me.",
  "Actually—don't send me a whole page if there's more on it. Just the public row.",
  "I know it's a strange request from the person who posted a crop. I should have explained that posting mine didn't give me permission to collect yours.",
] as const
export const s14Share = [
  { id: 'C02-SHARE.A', text: "Cropped public row image attached. Caption: The current portal's Escort field is blank; the older preview shows June Ellis.", reply: [
    'The crop is readable. Thanks for keeping the other fields out.',
    'I can see the difference, not why it happened.',
    "Daniel sent me the older preview on the third. I can show you the transfer note, if you want. It still won't certify the original.",
  ] },
  { id: 'C02-SHARE.B', text: "Text only: the older preview's Escort field says June Ellis. The current public page leaves it blank. I haven't checked an audit copy.", reply: [
    "Text is fine. It tells me exactly what you observed and what you haven't established.",
    "I'll check the revision tab from my side.",
    "Daniel sent me the older preview on the third. I can show you the transfer note, if you want. It still won't certify the original.",
  ] },
] as const
export const s14Defer = {
  id: 'P-S14-DEFER', text: "I'm not sharing the row yet. I want to check the source.", reply: [
    'Okay. Keep the public link. You can use the records request without me.',
    "The preview's transfer note is mine to explain. The public audit path is yours to check.",
  ],
} as const

export const s15PublicNote = 'Editor note, 7 Oct: Daniel transferred a cropped earlier view on 3 Oct. The Memory Project posted the crop after his disappearance. The editor cannot certify the complete source from this image. Resident details were removed before publication.'
export const s15Direct = [
  "He sent it on the third with a short note: 'Keep the earlier view.' I didn't ask why. I thought there'd be time.",
  'When he went missing, I put the crop in the brief. That was my decision, not an instruction from Daniel.',
  "I worried it would bring people looking for him. I also worried it would send people after anyone named in a document. That's why the resident fields are covered.",
] as const
export const s15Replies = [
  { id: 'P-S15-A', text: 'Did you ask his family before posting his picture?', reply: ["The portrait, yes. His sister approved that for the missing-person brief.", 'The document crop was my call. I should have said that more clearly.'] },
  { id: 'P-S15-B', text: 'Why did he trust you with it?', reply: ["We'd worked on two memory projects. I kept the raw submissions separate from what we published.", "That doesn't mean he told me everything."] },
  { id: 'P-S15-C', text: 'You might have put someone at risk.', reply: ["I might have. I'm not going to argue that away.", "If you see an identifying detail we missed, tell me here. Don't post it.", 'I have put a correction note on the public brief. It says the decision to publish the crop was mine.'] },
] as const
export const s15Personal = [
  'The first thing Daniel ever gave me was an event programme with half the names misspelled. He made me keep both versions.',
  "He said, 'If you fix it, leave the bad copy where people can see what changed.' Annoying habit. Useful habit.",
  "I didn't tell his sister about this crop before I posted it. I had her permission for the missing-person photo. Those were separate decisions, and I was wrong to let them blur in the brief.",
] as const
export const s15Followups = [
  { id: 'P-S15-D', text: 'Are you going to correct the brief?', reply: ['Yes. The editor note should say the document decision was mine.', 'I can do that without changing the image or pretending I have the original.'] },
  { id: 'P-S15-E', text: 'Why tell me that now?', reply: ['Because if I want you to be careful about a source, I should be clear about mine.', "And because Daniel's family doesn't need another neat story that skips the awkward part."] },
  { id: 'P-S15-F', text: "You don't have to tell me about his family.", reply: ["You're right. I won't give you anything private about them.", "I'll stick to what I published and what I can check."] },
] as const

export const s16Opening = [
  'I have two things I can offer. They are separate.',
  "One is a Messages connection so you don't have to keep reopening this little token inbox.",
  "The other is a read-only Memory Project workspace. It's called the Archive. It has our source cards and the crop Daniel sent me.",
  'Neither gives me access to your phone. And neither makes our copy the original.',
  "I keep wanting to say ‘come into the folder’ as if a folder were a room with people in it. It isn't. You'd be reading cards. You can leave whenever you want.",
] as const
export const s16Replies = [
  { id: 'P-S16-A', text: 'Can I look at the Archive without joining Messages?', reply: [
    'Yes. Read-only is its own choice. The token inbox still works if you never connect Messages.',
    "I don't need a new way to reach you for you to read a source card.",
  ] },
  { id: 'P-S16-B', text: 'Who owns the workspace?', reply: [
    "The Memory Project. I'm the editor for this case folder. We don't control the civic portal or its audit office.",
    "We hold Daniel's transfer note. We don't hold the old civic audit. I should have led with that.",
  ] },
  { id: 'P-S16-C', text: "I'm not joining either right now.", reply: [
    "All right. The civic records are public. I'll leave the offer here if you change your mind.",
    'Understood. If the office releases a redacted version, it releases it to you, not through me.',
  ] },
] as const
export const s16OptionalIntro = [
  "I used to write 'safe workspace' on the invitation. It sounded reassuring and explained almost nothing.",
  'The folder is useful because each card says what it is. A crop says crop. A public link says public link.',
  "There are mornings I wish a source card could tell me what a person meant. It can't.",
] as const
export const s16Followups = [
  { id: 'P-S16-D', text: 'Why call it the Archive if most of this is links?', reply: [
    'Because we preserve the context with them. Who gave us a copy, when we received it, what we\'re allowed to show.',
    'The name is probably grander than the room. The room has two folding chairs.',
  ] },
  { id: 'P-S16-E', text: 'Do other people read this case folder?', reply: [
    "Only people the Memory Project permits for this folder. Right now I'm offering a read-only view of public case sources, not an open chat with everyone who has ever volunteered.",
    'Your private board stays yours.',
  ] },
  { id: 'P-S16-F', text: "I don't like being invited into a group I didn't ask to join.", reply: [
    "Then don't join one. This isn't a group invitation, and I should have said that first.",
    'You can decline both controls and keep using the public links.',
  ] },
] as const

export const s18SourceLabels = [
  { id: 'preview', title: 'Older Bus 4 preview', status: 'Cropped preview; original not held here.', source: 'Greyhaven Memory Project' },
  { id: 'current', title: 'Current civic copy', status: 'Public portal link · v2', source: 'Greyhaven civic portal' },
  { id: 'notice', title: 'Revision notice', status: 'Public portal link', source: 'Greyhaven civic portal' },
] as const
export const s18Hints = [
  'Read the source status, not the folder name.',
  'Who has the complete 2019 record?',
  'Neither the Bulletin nor the Memory Project claims to hold the original audit.',
] as const

export const s25Opening = [
  "Can I say something that isn't about the table? You can tell me no.",
  "People keep asking whether a changed line tells us where Daniel is. I catch myself wanting it to. It doesn't.",
  'Daniel used to bring terrible vending-machine coffee to the archive room because he said at least it was honest about being bad.',
  "I don't want to tell his sister that a changed field means we found him. We haven't.",
  'She asked me this morning whether I had news. I said I had a question about a document. I could hear how small that sounded. It was still the true answer.',
] as const
export const s25Replies = [
  { id: 'P-S25-A', text: 'You can miss him and still check the source.', reply: ['I know. Hearing them together helps.'] },
  { id: 'P-S25-B', text: "I can keep this to the records. You don't have to tell me more.", reply: ["Thank you. That's the boundary I need today."] },
  { id: 'P-S25-C', text: 'I need to step away from the personal part.', reply: ['Of course. The public request link is there when you want it.', "I won't bring his family into the next source question."] },
] as const
export const s25Memory = [
  "He'd correct a caption even if it made his own work look worse. Last winter he found that he'd labeled a photograph one street over.",
  'He came in on his lunch break to write the correction himself. He had a bus ticket in his hand and kept checking the time.',
  "That's the Daniel I know. It isn't the whole Daniel. I keep having to remind myself of that.",
] as const
export const s25Followups = [
  { id: 'P-S25-D', text: "What else don't you know?", reply: ["Why he gave me this crop. Why he stopped answering on the fourth.", "I know how his sentences sound on a page. That isn't the same as knowing where he is."] },
  { id: 'P-S25-E', text: 'Maybe he trusted you with only one part.', reply: ["Maybe. I resent it a little, and then I feel awful for resenting someone who's missing.", "You didn't ask to hear that. Sorry."] },
  { id: 'P-S25-F', text: "You don't need to apologise for being worried.", reply: ["I'm trying to keep the work from becoming my way of avoiding the worry.", "Right. You were looking at the version history. I'll let you get back to it."] },
  { id: 'P-S25-G', text: "I'll follow the public route.", reply: ["Good. If it turns out the crop was misleading, I'd want to know that too."] },
  { id: 'P-S25-H', text: 'You can stop answering for a while.', reply: ["I will. My afternoon shift ends later. The public pages won't vanish because I put my phone down."] },
] as const
export const s26Opening = [
  "The revision notice calls it a route reconciliation. I can't tell if that's a dull explanation or a useful one.",
  'What would you put in one sentence, if you had to defend it?',
  "It might end up in an email to the records desk. It might never leave this inbox. I'd rather hear the sentence with the uncertainty still in it.",
] as const
export const s26Frames = [
  { id: 'C03-FRAME.A', text: "The order of versions is odd. Let's ask the audit office before we say why.", reply: ['Yes. That\'s a sentence I could stand behind.', "I'm going to keep the article as it is until we have the source."] },
  { id: 'C03-FRAME.B', text: 'Someone erased June. The people running the portal must know.', reply: ["Maybe. But 'must know' is doing a lot of work there.", "I won't put that in the brief on a crop and a notice. The audit request is still open."] },
  { id: 'C03-FRAME.C', text: "I'm not sure. The older image could be wrong.", reply: ['It could. The cleanest next question is whether the archive still has that version.', "You don't have to choose a side to ask for it."] },
] as const

export const s23Results = [
  { id: 'SR-01', title: 'GCRO · Request a redacted Bus 4 version lineage', source: 'records.greyhaven.local/gcro/request/bus4-2019', detail: 'Public-interest request; one-use case token; eligibility reviewed. Independent archived-version service.' },
  { id: 'SR-02', title: 'Civic portal · North Quay Bus 4 current copy and revision notice', source: 'records.greyhaven.local/public/evacuation/bus-4', detail: 'Publishes the current page and public revision notice.' },
  { id: 'SR-03', title: 'Harbour Loop Route 4 schedule, 2024', source: 'routes.greyhaven.local/harbour-loop/4', detail: 'Similar number, different year and record type. Not the 2019 evacuation audit.' },
  { id: 'SR-04', title: 'Memory Project · Daniel Mercer brief', source: 'bulletin.greyhaven.local/memory/daniel-mercer', detail: 'Community article and older crop, not an original audit.' },
] as const
export const s20Question = [
  { id: 'P-S20-A', text: "The portal says 'route reconciliation.' Is that a normal reason?", reply: ["It can be. I used to think that label settled things. It doesn't tell me what source they used.", "I read ‘route reconciliation’ and wanted it to mean someone checked the route. The notice doesn't say what they checked against."] },
] as const
export const s27Question = [
  { id: 'P-S27-A', text: 'Can you get me the audit file faster?', reply: ["No. The office decides release. I can tell you which public record number I used, but I can't make an audit original appear."] },
] as const
export const s24Questions = [
  { id: 'P-S24-A', text: 'What does 7-14 mean?', reply: ["I don't know. Daniel didn't explain it to me.", "I'd rather leave the label alone than make up a folder or a date."] },
  { id: 'P-S24-B', text: 'Did he sound frightened?', reply: ['He sounded careful. I can\'t tell from a line of text what he felt.', "I wish I'd asked him."] },
] as const

export const s29Disclosure = [
  { id: 'P-S29-A', text: 'The redacted GCRO release confirms the older escort field and the later correction date. I can share the public finding, not the requester-only file.', reply: ["That's a stronger sentence than the one we had this morning.", "Keep the export in your receipt folder. I won't post a copy I haven't been cleared to see."] },
  { id: 'P-S29-B', text: "I checked the lineage. The version changed after verification, but I don't know why.", reply: ["Good. I can say we're checking a dated revision, not who made it."] },
] as const
export const s30Disclosure = [
  { id: 'P-S30-A', text: "I found a public status card. It says the correction queue submitter role class is still enabled. It doesn't say who uses it.", reply: ["Still enabled? I thought the old case had gone cold enough that nobody was touching that part of the portal.", "No—sorry. That was me turning a status card into a story.", "It tells us what the system allows. It doesn't tell us whether anyone used it today.", "Can you keep the retrieval note? Don't send me a private log or an account name you don't have.", "Daniel would have hated how carefully I'm choosing these words.", 'No. He would have made me choose them twice.', "The queue is open. That's what we know. I'll ask how it is reviewed."] },
  { id: 'P-S30-B', text: "The old record changed after verification. The role card is public, but I don't want to guess who is behind it.", reply: ["Good. We can ask how corrections are reviewed without pretending we know the operator.", "I'll update my notes with your selected finding. I won't put a name in the brief.", "I'll write the question on paper before I put another sentence online."] },
  { id: 'P-S30-C', text: "The public site still accepts corrections, but the role-status card isn't usable. I can't tell whether that role is enabled.", reply: ['Then that is where we stop. Process open, role status unknown.', "It isn't as neat a hook as a name. It's more honest.", 'I can live with an unknown on the page. It\'s harder for someone else to misuse than a name we guessed.'] },
] as const
