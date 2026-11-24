import { captureId } from './masterScene08'
import { referenceCardId } from './masterScene09'
import { storyPhotos } from './storyPhotos'

export type MayaMedia = 'capture' | 'photo' | 'card'
export type MayaPart = string | { kind: MayaMedia; id: string }
export interface MayaTurn {
  choices: readonly string[]
  after: readonly MayaPart[]
}

export const mayaOpening = ['Hey.', 'Sophie said you were looking into the contact export.', "I hope you don't mind me messaging you directly."]
export const captureFollowup = ["That's the part I kept.", "I wish I'd asked him more questions."]
export const mayaCheckIn: readonly MayaTurn[] = [
  {
    choices: ['Not at all. How are you doing?', 'Sophie mentioned you found something.', "Of course. What's on your mind?"],
    after: ["I've been going through some old messages.", 'Between me and Daniel.', "I keep opening them, hoping I'll notice something I missed.", 'Most of them are just ordinary things.', 'Dinner plans. Work. Him forgetting to answer me.', 'But one conversation feels different now.'],
  },
  {
    choices: ['Different how?'],
    after: ['He mentioned Lucas.', 'And something about another copy.', "I didn't really understand it at the time.", 'I thought it was another one of his work problems.'],
  },
  {
    choices: ['What exactly did Daniel say?', 'Would you be comfortable showing me?', 'Did he ever explain what he meant?'],
    after: ["No. He didn't.", 'But I saved part of the conversation.', 'Give me a second.', 'Okay. Here.', {kind:'capture', id:captureId}],
  },
  {
    choices: ["We don't know what he meant by another copy.", 'Lucas might know more about that conversation.', 'Do you remember why Daniel mentioned this?'],
    after: ["I don't know.", "And I don't want to put words in his mouth.", "But it's been bothering me.", 'Especially now.', {kind:'photo', id:storyPhotos.mayaMugs.id}, 'I still catch myself making tea for two.'],
  },
  { choices: ['Thank you for showing me.'], after: ['I just want him back.'] },
]

export const mayaCardOpening = ["There's something else.", "I wasn't sure whether to mention it."]
export const mayaCard: readonly MayaTurn[] = [
  {
    choices: ['What is it?', 'You can tell me.', 'Does it have something to do with Daniel?'],
    after: ['Maybe.', 'I went back through an old shared folder.', 'There were photographs in there.', "Most of them were things I'd forgotten about.", 'But one of them was a picture of a card.'],
  },
  {
    choices: ['A card?'],
    after: ['Yeah.', 'Not a greeting card.', 'It looked like something from an old records file.'],
  },
  {
    choices: ['Do you know why it was in the folder?', 'Did Daniel ever mention it?', 'Can you show me the photograph?'],
    after: ["I don't know why it was there.", 'Daniel never explained it to me.', "But there's a number on it.", "Maybe you'll recognise what it means.", {kind:'card',id:referenceCardId}, "That's it.", 'See the number?'],
  },
  {
    choices: ['GH-DSC-03-A. That looks like a reference code.', 'Do you know who took this photograph?', "We shouldn't assume this is connected to the other copy."],
    after: ["I don't know what the code means.", "And I don't know who originally took the photo.", 'I just found this copy.'],
  },
  { choices: ['We could try looking up the reference.'], after: ['Yeah.', 'That might be worth trying.', "I don't want to get my hopes up over another dead end."] },
]

export const mayaCaptureLines = [
  {sender:'maya',text:"You said you'd call when you got in."},
  {sender:'daniel',text:'I know. Sorry.'},
  {sender:'maya',text:'Everything alright?'},
  {sender:'daniel',text:'Just trying to work something out.'},
  {sender:'maya',text:'About the records?'},
  {sender:'daniel',time:'21:14',text:'Lucas checked in. He said there was another copy.'},
  {sender:'maya',text:'Another copy of what?'},
  {sender:'daniel',text:"I'll explain when I can."},
] as const

export const disclosureTopics = {
  reference: {
    title: 'Photographed reference',
    text: 'Maya found a photograph with this reference: GH-DSC-03-A.',
    replies: [['Where did she find it?'], ['And the original?'], ['Then the reference is all we have.', 'Try the public inventory.', 'See if anything comes up.']],
    followups: ['In a shared folder.', "We don't know where it is."],
  },
  folder: {
    title: 'Shared-folder description',
    text: 'Maya found a photograph of an old records card in a shared folder.',
    replies: [['Was there a reference on it?'], ['Try the public inventory.', 'See if anything comes up.']],
    followups: ['The photographed card reads GH-DSC-03-A.'],
  },
  copy: {
    title: 'Limited message excerpt',
    text: 'A message Maya showed me says, “Lucas checked in. He said there was another copy.”',
    replies: [['Another copy of what?'], ["Then we don't know what was copied."]],
    followups: ["The message doesn't say."],
  },
} as const
export type DisclosureTopic = keyof typeof disclosureTopics
