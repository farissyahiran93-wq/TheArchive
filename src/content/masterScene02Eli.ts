import type { Scene01Node } from './scene01'
import { masterScene02Nodes } from './masterScene02'
import type { GroupSpeaker } from '../game/types'

type Line = readonly [GroupSpeaker | 'pause' | 'system' | 'player', string]
type Beat = { choices: readonly [string, string, string]; replies: readonly [readonly Line[], readonly Line[], readonly Line[]]; after: readonly Line[] }

const opening: readonly Line[] = [
  ["sophie", "Okay."],
  ["sophie", "They're here."],
  ["noah", "Who's here?"],
  ["ana", "The person you were telling us about?"],
  ["sophie", "Yeah."],
  ["noah", "Ohhh."],
  ["noah", "Well, hello there 👋"],
  ["lucas", "Sophie."],
  ["sophie", "What?"],
  ["lucas", "Seriously?"],
  ["noah", "Can we at least say hi before the interrogation starts?"],
  ["eli", "Hi. I'm Eli."],
  ["eli", "Ignore Noah. He's like this with everyone."],
  ["noah", "Excuse me."],
  ["ana", "He's not wrong."],
  ["maya", "Hey."],
  ["maya", "I'm Maya."],
  ["maya", "Sorry. This is probably a strange way to meet everyone."]
]
const beats: readonly Beat[] = [
  {
    choices: ["Hi, everyone. Sophie invited me. I hope I'm not interrupting anything.", "I'm a little confused about why I'm here, to be honest.", "Looks like not everyone was expecting me."],
    replies: [
      [["noah", "See? Perfectly polite."], ["noah", "We're off to a great start."], ["ana", "Hi. Welcome."], ["lucas", "That depends on what they're here for."]],
      [["eli", "Fair enough."], ["eli", "This is a lot to walk into without an explanation."], ["sophie", "Sorry. I should've warned you."]],
      [["lucas", "We weren't."], ["maya", "Lucas."], ["lucas", "What? It's true."], ["sophie", "I told you I was going to contact them."], ["lucas", "Contact them. Not bring them into our group."]]
    ],
    after: [
      ["sophie", "Can we not fight about this already?"],
      ["ana", "Sophie, did everyone agree to the invitation?"],
      ["sophie", "I thought you guys would understand."],
      ["lucas", "That's not an answer."],
      ["noah", "Okay, but yelling at each other isn't helping."],
      ["eli", "Maybe we should hear why Sophie invited them before deciding this was a terrible idea."],
      ["maya", "Agreed."],
      ["sophie", "Thank you."],
      ["sophie", "I found something in Daniel's files."],
      ["sophie", "A phone number."],
      ["sophie", "And it belongs to the person I just added."],
      ["noah", "Wait."],
      ["noah", "Seriously?"],
      ["ana", "Daniel had their number?"],
      ["sophie", "It was in a contact export."],
      ["lucas", "With no name."],
      ["sophie", "Yes."],
      ["lucas", "That's the part you keep leaving out."],
      ["maya", "Sophie told me about it."],
      ["maya", "But I don't understand what it means either."]
    ],
  },
  {
    choices: ["I've never met Daniel Mercer.", "I don't know how my number ended up in his contacts.", "I think there must be some kind of mistake."],
    replies: [
      [["ana", "You've never spoken to him?"], ["player", "No. Not that I'm aware of."], ["noah", "Well, that's unexpected."], ["eli", "It doesn't necessarily mean the entry is wrong. Just that we don't know why it's there."]],
      [["maya", "Neither do we."], ["maya", "That's what Sophie was hoping to understand."], ["lucas", "And we're supposed to accept that nobody knows anything?"], ["ana", "Sometimes people genuinely don't know, Lucas."]],
      [["sophie", "I thought that too."], ["sophie", "But I checked the number more than once."], ["sophie", "It's the one I used to message you."], ["eli", "Then we know the number matches."], ["eli", "Not why it was in the file."]]
    ],
    after: [
      ["noah", "Okay, wait."],
      ["noah", "Back up a second."],
      ["noah", "What exactly is a contact export?"],
      ["ana", "A copy of somebody's saved contacts."],
      ["noah", "Right."],
      ["noah", "Why didn't we just say that?"],
      ["eli", "Because apparently we enjoy making simple things sound complicated."],
      ["noah", "Thank you, Eli."],
      ["sophie", "Daniel had a folder he shared with me."],
      ["sophie", "Family stuff, mostly."],
      ["sophie", "That's where I found the file."],
      ["maya", "Was there anything else beside the number?"],
      ["sophie", "A star."],
      ["sophie", "The number was marked with a star."],
      ["ana", "Like a favourite contact?"],
      ["sophie", "Maybe?"],
      ["sophie", "I honestly don't know."],
      ["lucas", "And nobody knows who marked it."],
      ["sophie", "No."]
    ],
  },
  {
    choices: ["Could somebody else have added the star?", "Are you sure the export came from Daniel?", "Does the star actually mean anything?"],
    replies: [
      [["ana", "That's possible."], ["ana", "We don't know who made the copy."], ["lucas", "Which is exactly why I'm uncomfortable with this."], ["eli", "We should be careful about treating the mark as something Daniel deliberately added."]],
      [["sophie", "I found it in the folder he shared with me."], ["sophie", "That's all I can tell you for certain."], ["maya", "So we know where Sophie found it."], ["maya", "Not necessarily where it originated."]],
      [["noah", "My phone has starred contacts."], ["noah", "Half of them are restaurants."], ["ana", "Noah."], ["noah", "I'm making a point."], ["eli", "A surprisingly reasonable one."], ["eli", "The star could mean several things. We don't have enough to choose one."]]
    ],
    after: [
      ["pause", ""],
      ["maya", "Can I ask something?"],
      ["maya", "Why would Daniel keep a number he didn't recognise?"],
      ["sophie", "I don't know."],
      ["maya", "He normally remembered people."],
      ["maya", "Even people he'd only met once."],
      ["noah", "Yeah."],
      ["noah", "He was annoyingly good at that."],
      ["ana", "Maybe the number was related to his work."],
      ["eli", "Could be."],
      ["eli", "But I can't remember him mentioning it to me."],
      ["lucas", "And now we can't ask him."],
      ["pause", ""],
      ["sophie", "I've been trying to reach him every day."],
      ["sophie", "Sometimes I leave messages even though I know he isn't answering."],
      ["maya", "Sophie..."],
      ["sophie", "I know."],
      ["sophie", "I just keep thinking maybe this time he'll pick up."]
    ],
  },
  {
    choices: ["When was the last time anyone actually heard from him?", "Was he acting differently before he disappeared?", "Have you told the police about the number?"],
    replies: [
      [["maya", "We've been trying to put that together."], ["maya", "But not every message tells us where he was."], ["lucas", "And some of us remember things differently."], ["ana", "Which is why we shouldn't pretend the timeline is settled."]],
      [["eli", "He seemed distracted at work sometimes."], ["eli", "But that isn't unusual when he's juggling several things."], ["maya", "He was tired."], ["maya", "I remember that much."], ["maya", "I wish I'd asked what was keeping him up."]],
      [["sophie", "I've been speaking to Detective Hayes."], ["sophie", "I want to make sure she gets anything that might matter."], ["ana", "That's probably the right thing to do."], ["lucas", "Provided we don't start making claims we can't support."]]
    ],
    after: [
      ["noah", "You know what I keep thinking about?"],
      ["noah", "That night at the restaurant."],
      ["ana", "Oh, no."],
      ["maya", "Which night?"],
      ["noah", "The one where Daniel insisted he knew how to order in Italian."],
      ["sophie", "HAHAHA."],
      ["sophie", "I forgot about that."],
      ["eli", "He ordered the wrong thing, didn't he?"],
      ["noah", "He ordered enough food for six people."],
      ["ana", "There were four of us."],
      ["noah", "Exactly."],
      ["maya", "And he refused to admit it was a mistake."],
      ["sophie", "\"It's called planning ahead.\""],
      ["noah", "YES."],
      ["noah", "That's what he said!"],
      ["eli", "Sounds like him."],
      ["eli", "He once volunteered me to give a presentation before asking whether I was free."],
      ["ana", "Was it a good presentation?"],
      ["eli", "It was after he helped me rewrite half of it."],
      ["eli", "So, annoyingly, yes."],
      ["noah", "Classic Daniel."],
      ["maya", "He always thought he could fix everything."],
      ["maya", "Even when nobody asked him to."],
      ["pause", ""],
      ["maya", "Sorry."],
      ["maya", "I didn't mean for that to sound sad."],
      ["sophie", "You don't have to apologise."]
    ],
  },
  {
    choices: ["He sounds like someone who made people laugh without trying.", "You all seem to have a lot of good memories together.", "I can tell how much you miss him."],
    replies: [
      [["noah", "Oh, he absolutely tried."], ["noah", "Some of his jokes were terrible."], ["ana", "Most of them."], ["eli", "He had a very specific talent for making bad jokes worse."], ["maya", "I still laughed at them."]],
      [["sophie", "We do."], ["sophie", "That's probably why this is so hard."], ["ana", "We've all known each other for years."], ["eli", "Daniel was good at bringing people together."], ["eli", "Including people who had absolutely nothing in common."]],
      [["maya", "Every day."], ["maya", "Sometimes I forget for a second."], ["maya", "Then something reminds me he's not here."], ["noah", "Yeah."], ["noah", "I know what you mean."]]
    ],
    after: [
      ["ana", "Sophie, can I ask about the contact file again?"],
      ["sophie", "Sure."],
      ["ana", "Has anyone else seen the actual export?"],
      ["sophie", "Not the whole thing."],
      ["lucas", "Good."],
      ["noah", "What do you mean, good?"],
      ["lucas", "It has other people's information in it."],
      ["lucas", "We shouldn't be passing it around."],
      ["eli", "That's a fair concern."],
      ["eli", "Especially if we don't know when the copy was made."],
      ["sophie", "I wasn't going to post the whole thing here."],
      ["maya", "Then don't."],
      ["maya", "Not until you understand what you're looking at."],
      ["sophie", "I know."],
      ["sophie", "I just wanted everyone to know why I contacted someone outside the group."]
    ],
  },
  {
    choices: ["You don't have to share the file with everyone.", "It's probably better to keep other people's contact details private.", "Maybe we should first understand what the starred entry means."],
    replies: [
      [["sophie", "Thanks."], ["sophie", "I don't want to make things worse."], ["maya", "Nobody's asking you to."]],
      [["ana", "I agree."], ["ana", "There's no reason to expose everyone else's details."], ["eli", "We can discuss a question without distributing an entire document."]],
      [["lucas", "That's what I've been saying."], ["sophie", "And I've been listening."], ["sophie", "But understanding it isn't exactly easy."], ["noah", "Can we acknowledge that both things can be true?"]]
    ],
    after: [
      ["lucas", "Look."],
      ["lucas", "I'm not trying to be difficult."],
      ["ana", "You've been doing a pretty convincing impression."],
      ["lucas", "Ana, please."],
      ["lucas", "Daniel is missing."],
      ["lucas", "We have a number nobody can explain."],
      ["lucas", "And now there's someone we've never met sitting in a private group."],
      ["sophie", "I invited them because I was trying to find out whether they knew something."],
      ["lucas", "I understand that."],
      ["lucas", "But I don't know them."],
      ["eli", "None of us does."],
      ["eli", "That doesn't automatically make them a threat."],
      ["lucas", "I didn't say they were a threat."],
      ["noah", "You're kind of implying it."],
      ["lucas", "I'm saying we need to be careful."],
      ["maya", "We know, Lucas."]
    ],
  },
  {
    choices: ["You don't have to trust me. I understand.", "I'm not here to take advantage of anyone.", "I think you're being unfair to Sophie."],
    replies: [
      [["lucas", "Good."], ["lucas", "Because I don't."], ["lucas", "Not yet."], ["eli", "Fair enough."], ["eli", "Trust usually takes longer than one conversation."]],
      [["lucas", "Then I hope that's true."], ["noah", "Come on, man."], ["lucas", "What?"], ["noah", "You could at least give them a chance."]],
      [["lucas", "This isn't about Sophie."], ["sophie", "It obviously is."], ["ana", "Lucas, you're upset about the situation."], ["ana", "Don't turn the player into the reason for it."]]
    ],
    after: [
      ["maya", "Can everybody please stop?"],
      ["maya", "We're supposed to be helping each other."],
      ["lucas", "That's what I thought."],
      ["sophie", "What is that supposed to mean?"],
      ["lucas", "Nothing."],
      ["sophie", "Lucas."],
      ["lucas", "You keep making decisions for everyone."],
      ["sophie", "Because if I don't do something, nothing happens!"],
      ["noah", "Okay."],
      ["noah", "This is getting out of hand."],
      ["eli", "Lucas, I get why you're worried."],
      ["eli", "But we're all trying to figure this out."],
      ["lucas", "And we're getting nowhere."],
      ["ana", "Then we change how we're doing things."],
      ["lucas", "That's easy to say."],
      ["maya", "We are all scared."],
      ["maya", "Do you think Sophie isn't scared?"],
      ["lucas", "I never said that."],
      ["sophie", "You don't have to."],
      ["lucas", "Sophie, that's not fair."],
      ["sophie", "Neither is making me feel like everything I do is wrong!"],
      ["pause", ""],
      ["noah", "Guys..."],
      ["noah", "Please."]
    ],
  },
  {
    choices: ["I think everyone needs a moment. This isn't helping Daniel.", "Lucas is worried about protecting Daniel's privacy. That doesn't make him wrong.", "Sophie was trying to help. She shouldn't be blamed for that."],
    replies: [
      [["ana", "I agree."], ["maya", "Me too."], ["lucas", "Maybe that's exactly what we need."]],
      [["lucas", "Thank you."], ["sophie", "I never said his privacy didn't matter."], ["eli", "I don't think anyone believes that, Sophie."]],
      [["sophie", "Thank you."], ["lucas", "I'm not blaming her for wanting to help."], ["lucas", "I'm questioning how we're doing it."], ["maya", "Then talk about that without tearing each other apart."]]
    ],
    after: [
      ["lucas", "You know what?"],
      ["lucas", "I can't keep doing this."],
      ["noah", "Doing what?"],
      ["lucas", "Every conversation turns into the same argument."],
      ["lucas", "We talk about what Daniel might have done."],
      ["lucas", "What he might have meant."],
      ["lucas", "What someone else might know."],
      ["lucas", "And we don't actually get any closer to finding him."],
      ["ana", "We're trying."],
      ["lucas", "I know."],
      ["lucas", "But trying doesn't mean every decision is a good one."],
      ["sophie", "So what do you want us to do?"],
      ["lucas", "I don't know anymore."],
      ["maya", "Lucas..."],
      ["lucas", "I'm serious."],
      ["lucas", "I need a break from this group."],
      ["noah", "You don't have to leave."],
      ["lucas", "Maybe not."],
      ["lucas", "But I want to."],
      ["eli", "Take some time if you need it."],
      ["eli", "Nobody's asking you to stop caring about Daniel."],
      ["lucas", "I know."],
      ["lucas", "That's not what this is."]
    ],
  },
  {
    choices: ["Leaving the group doesn't mean you've stopped looking for Daniel.", "I'm sorry my being here has made things harder.", "I hope we can talk again when you're ready."],
    replies: [
      [["lucas", "Exactly."], ["lucas", "Thank you for understanding that."]],
      [["lucas", "This isn't entirely about you."], ["lucas", "We've been arguing long before you got here."], ["lucas", "Just... don't take everything you hear at face value."]],
      [["lucas", "Maybe."], ["lucas", "I just need some time."]]
    ],
    after: [
      ["pause", ""],
      ["lucas", "For what it's worth..."],
      ["lucas", "I still want to find him."],
      ["lucas", "More than anything."],
      ["system", "Lucas left the group."],
      ["pause", ""],
      ["sophie", "..."],
      ["sophie", "I didn't want that to happen."],
      ["maya", "I know."],
      ["noah", "He's upset."],
      ["noah", "He'll come around."],
      ["ana", "Maybe."],
      ["ana", "But we shouldn't pretend this was just one argument."],
      ["eli", "We've all been on edge for days."],
      ["eli", "Lucas probably needs some space."],
      ["sophie", "I feel awful."],
      ["maya", "Sophie, please don't."],
      ["sophie", "I asked someone for help."],
      ["sophie", "And somehow I've managed to make everything worse."],
      ["noah", "You didn't make Daniel disappear."],
      ["noah", "You need to stop carrying everything like it's your fault."],
      ["ana", "Noah's right."],
      ["eli", "We're not going to solve anything by turning on each other."],
      ["maya", "I don't want us to fall apart over this."],
      ["pause", ""],
      ["maya", "Daniel wouldn't want that either."]
    ],
  },
  {
    choices: ["Maybe we should focus on what we actually know instead of guessing.", "I still want to help, but I won't pressure anyone into trusting me.", "If any of you finds something useful, you can always reach out to me."],
    replies: [
      [["ana", "That's a good place to start."], ["ana", "Facts first. Questions after."], ["eli", "Agreed."], ["eli", "We can be careful without giving up."]],
      [["maya", "Thank you."], ["maya", "I appreciate that."], ["noah", "For what it's worth, I think you've handled this pretty well."], ["eli", "Same here."]],
      [["noah", "Will do."], ["ana", "I'll let you know if I come across anything relevant."], ["eli", "Thanks."], ["eli", "And sorry about the welcome you got."]]
    ],
    after: [
      ["sophie", "Thanks, everyone."],
      ["sophie", "I know this wasn't how any of us expected today to go."],
      ["noah", "Understatement of the year."],
      ["ana", "Noah."],
      ["noah", "Sorry. Bad timing."],
      ["maya", "I think I'm going to get some rest."],
      ["maya", "I'll check in later."],
      ["sophie", "Okay."],
      ["sophie", "Love you."],
      ["maya", "Love you too."],
      ["ana", "Let me know if you need anything, Maya."],
      ["maya", "I will."],
      ["eli", "I should get going too."],
      ["eli", "I've got a few things to finish."],
      ["noah", "Actual work?"],
      ["eli", "Unfortunately."],
      ["noah", "Tragic."],
      ["eli", "Tell me about it."],
      ["ana", "Night, you two."],
      ["noah", "Night."],
      ["eli", "Take care, everyone."],
      ["pause", ""],
      ["pause", ""]
    ],
  }
]
export const eliGroupNodes: Record<string, Scene01Node> = {
  'TA-S02-COMPLETE': masterScene02Nodes['TA-S02-COMPLETE'],
  'TA-S03-FIRST-MESSAGE': { ...masterScene02Nodes['TA-S03-FIRST-MESSAGE'], text: 'Hey. Can we talk privately for a minute?' } as Scene01Node,
  'TA-S03-AWAIT-OPEN': masterScene02Nodes['TA-S03-AWAIT-OPEN'],
}

function chain(prefix: string, lines: readonly Line[], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const [sender, text] = lines[i]
    const id = `${prefix}-${i + 1}`
    if (sender === 'system') eliGroupNodes[id] = { id, kind: 'event', event: 'leave', actor: 'lucas', text, next }
    else if (sender === 'player') eliGroupNodes[id] = { id, kind:'choice', channel:'group', choices:[{id:'continue',text,next}] }
    else if (sender === 'pause') eliGroupNodes[id] = { id, kind: 'wait', duration: 1100, typing: false, next }
    else {
      eliGroupNodes[id] = { id, kind: 'npc', channel: 'group', sender, text, next }
      const gap = `${id}-GAP`
      eliGroupNodes[gap] = { id: gap, kind: 'wait', duration: 220, typing: false, next: id }
      next = gap
      continue
    }
    next = id
  }
  return next
}
const decisionId = (index: number) => `TA-S02-ELI-C${String(index + 1).padStart(2, '0')}`
const reactions: Record<string, Partial<Record<GroupSpeaker, { trust?: number; affinity?: number }>>> = {
  '1-a': { noah: { affinity: 1 } },
  '1-b': { ana: { trust: 1 } },
  '5-a': { maya: { affinity: 1 } },
  '6-b': { noah: { trust: 1 } },
  '7-a': { lucas: { trust: 1 } },
  '8-c': { sophie: { trust: 1 } },
}
beats.forEach((beat, index) => {
  const id = decisionId(index)
  const after = chain(`${id}-AFTER`, beat.after, index === beats.length - 1 ? 'TA-S02-COMPLETE' : decisionId(index + 1))
  eliGroupNodes[id] = { id, kind: 'choice', number: String(index + 1).padStart(2, '0'), channel: 'group', choices: beat.choices.map((text, i) => {
    const option = ['a', 'b', 'c'][i]
    const effects = reactions[`${index + 1}-${option}`]
    const target = effects ? `${id}-${option}-REACTION` : after
    if (effects) eliGroupNodes[target] = { id: target, kind: 'event', event: 'effects', effects, next: after }
    return { id: option, text, next: chain(`${id}-${option}`, beat.replies[i], target) }
  }) }
})
export const eliGroupStart = chain('TA-S02-ELI-OPEN', opening, decisionId(0))
