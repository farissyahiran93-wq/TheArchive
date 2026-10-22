import type { Scene01Node } from './scene01'
import { scene02Continuation } from './scene02ContinuationScript'

export const scene02Id = 'ch01_sc02_uninvited_guest'
export const scene02Nodes: Record<string, Scene01Node> = {}
type Actor = 'sophie' | 'maya' | 'lucas'
type Effects = Partial<Record<Actor, { trust?: number; affinity?: number; suspicion?: number }>>
const add = (node: Scene01Node) => { scene02Nodes[node.id] = node; return node.id }
/** One authored line per record. P = explicit player Send, W = silence in seconds. */
function chain(script: string, prefix: string, target: string): string {
  const lines = script.trim().split('\n').filter(Boolean)
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i], actor = line.slice(0, 1), text = line.slice(2), id = `OPEN-S02-${prefix}-${i + 1}`
    if (actor === 'W') target = add({ id, kind: 'wait', duration: Number(text) * 1000, typing: false, next: target })
    else if (actor === 'P') target = add({ id, kind: 'choice', choices: [{ id: 'continue', text, next: target }] })
    else if (actor === 'O' || actor === 'I') target = add({ id, kind: 'event', event: 'presence', actor: text.toLowerCase().startsWith('maya') ? 'maya' : 'sophie', online: actor === 'I', next: target })
    else if (actor === 'T') target = add({ id, kind: 'wait', duration: 2000, typing: true, actor: text.toLowerCase().startsWith('lucas') ? 'lucas' : 'sophie', next: target })
    else if (actor === 'D' || actor === 'X') target = add({ id, kind: 'event', event: actor === 'D' ? 'deleted' : 'leave', actor: actor === 'D' ? 'maya' : 'lucas', next: target })
    else {
      const sender: Actor = actor === 'S' ? 'sophie' : actor === 'M' ? 'maya' : 'lucas'
      target = add({ id, kind: 'npc', sender, channel: 'group', text, next: target,
        heardFacts: text === "Because that was the last time anyone could confirm where Daniel was." ? ['OPEN-S02-LUCAS-TIMELINE-CLAIM'] : ["We don't agree on what was confirmed.", "We don't even agree about what happened that night."].includes(text) ? ['OPEN-S02-DISPUTED-TIMELINE'] : text === 'Then maybe we need to try differently.' ? ['OPEN-S02-NO-VERIFIED-SHARED-TIMELINE'] : text === "I don't have a clear copy." ? ['OPEN-S02-SOPHIE-NO-CLEAR-COPY'] : text === "Some kind of note." ? ['OPEN-S02-SOPHIE-NOTE-CLAIM'] : [],
      })
    }
  }
  return target
}
type Branch = { text: string; script: string; premium?: boolean; effects?: Effects }
function choice(number: string, branches: Branch[], after: string, target: string) {
  const converge = chain(after, `AFTER-${number}`, target)
  add({ id: `OPEN-S02-C${number}`, kind: 'choice', number: `G${number}`, choices: branches.map((branch, i) => {
    const id = String.fromCharCode(97 + i)
    const reward = branch.effects ? add({ id: `OPEN-S02-EFFECT-${number}-${id}`, kind: 'event', event: 'effects', effects: branch.effects, next: converge }) : converge
    return { id, text: branch.text, premiumChoice: branch.premium, next: chain(branch.script, `C${number}-${id}`, reward) }
  }) })
}
const completed = add({ id: 'OPEN-S02-COMPLETE', kind: 'event', event: 'group-complete' })
add({ id: 'OPEN-S03-FIRST-MESSAGE', kind: 'npc', channel: 'sophie', sender: 'sophie', text: 'Hey.', next: 'OPEN-S03-AWAIT-OPEN' })
add({ id: 'OPEN-S03-AWAIT-OPEN', kind: 'event', event: 'private-ready' })
for (const beat of scene02Continuation.choices) choice(beat.id, [...beat.branches], beat.after, beat.id === '13' ? completed : `OPEN-S02-C${String(Number(beat.id) + 1).padStart(2, '0')}`)
export const scene02After08 = chain(scene02Continuation.before09, 'AFTER-08', 'OPEN-S02-C09')
// Retain this old cursor so earlier saves resume without deleting choices, receipts or effects.
add({ id: 'OPEN-S02-SOURCE-BOUNDARY', kind: 'event', event: 'source-boundary', next: scene02After08 })
choice('08', [
  { text: "I can leave if that's what everyone wants.", script: `S No.
S That's not what I want.
M And we haven't asked you to leave.
L I might.
M Lucas.` },
  { text: 'Sophie was only trying to help.', script: `S Thank you.
L Good intentions don't automatically make something a good idea.
M That's true.
M But attacking her isn't helping either.` },
  { text: "Lucas isn't completely wrong.", script: `W 2
L Thank you.
S ...
P But that doesn't mean Sophie was trying to hurt anyone.
M Exactly.
S I know I should've asked first.
S I've said that.`, effects: { lucas: { suspicion: -2 }, sophie: { trust: -1 } } },
  { text: 'Maybe you should discuss this without me.', script: scene02Continuation.missing08D },
], '', scene02After08)
choice('07', [
  { text: 'Because Sophie asked me to stay.', script: `M Okay.
M That's a fair answer.
L You're going to need a better reason eventually.
M They don't owe us a lifelong commitment, Lucas.` },
  { text: 'Because I want to know why Daniel had my number.', script: `L At least that makes sense.
M It does.
L Doesn't mean I trust you.
M Nobody said you had to.` },
  { text: 'Because this has become interesting.', script: `L Interesting?
L Someone's missing and you think it's interesting?
M I don't think they meant it like that.
L Then maybe they should choose their words more carefully.`, effects: { lucas: { suspicion: 3 } } },
  { text: "Honestly? I'm not sure.", script: `M That's okay.
M Sometimes you don't know what you're getting involved in until you're already involved.
L Which is exactly why people should be careful.
M We're not disagreeing about that.` },
  { text: "Because someone is missing, and I'd rather find out this was all a misunderstanding than walk away and wonder if I could've helped.", premium: true, script: `W 3
M ...
M I can respect that.
L It sounds nice.
P You don't have to believe me.
L Good. Because I don't.
M Lucas.
L What?
L I'm being honest.
M There's a difference between being honest and refusing to listen.
W 2
L Maybe.`, effects: { maya: { trust: 4 }, lucas: { suspicion: -1 } } },
], `I Sophie is online.
S Okay, I'm back.
S What did I miss?
M Nothing.
L Plenty.
S ...
S Oh no.
S Please tell me you didn't start another argument.
M We were having a conversation.
L A very educational one.
S Lucas.
L Sophie.
M Children.
S 🙄
W 2
S Look, I know adding someone without asking wasn't ideal.
L It wasn't ideal?
S Fine.
S It was a bad call.
S Is that what you want me to say?
L I want you to understand why it was a bad call.
S I understand.
L Then why did you do it?
S Because I'm tired of sitting here doing nothing!
W 3
S Sorry.
S I didn't mean to snap.
M It's okay.
L No, it's not.
M Lucas...
L We're making decisions because we're scared.
L And we don't even know what we're risking.
S I know!
S Do you think I don't think about that?
L Then start acting like it.
W 3`, 'OPEN-S02-C08')
choice('06', [
  { text: "I can read everything you're saying, you know.", script: `M Exactly.
L I wasn't trying to hide it.
P Clearly.
M Lucas, just stop digging.` },
  { text: "For what it's worth, I don't trust this situation either.", script: `M That's probably sensible.
L At least you're admitting it's weird.
M We all know it's weird.
M We're trying to figure out what to do about it.` },
  { text: 'You can ask me directly if you have a problem.', script: `L I have a problem with not knowing who you are.
P Then say that.
M Well.
M At least we're being direct now.` },
  { text: "I don't blame you for being suspicious.", script: `W 2
L ...
L Good.
M See?
M That wasn't so difficult.
L Don't start.` },
], `W 2
M Listen.
M I'm not going to pretend this isn't strange.
M I don't know you.
M And I don't know what your number means.
M But I also don't think it's fair to assume the worst just because we don't have an answer.
L That goes both ways.
M It does.
L Fine.
W 2
L Then answer one thing.
L Why are you still here?`, 'OPEN-S02-C07')
choice('05', [
  { text: 'Maya has a point. You all sound exhausted.', script: `M Thank you.
S I probably am.
L I'm fine.
M That's exactly what an exhausted person would say.` },
  { text: 'I could use some food too, actually.', script: `M SEE?
M Someone understands.
S What is this, a food intervention?
M If that's what it takes.
L I regret opening this chat.` },
  { text: 'Lucas is right. We should focus.', script: `L Thank you.
M Fine.
M But focusing doesn't mean making everyone feel worse.
S Can we agree on that, at least?
L Sure.` },
  { text: 'Is arguing a normal thing in this group?', script: `M Unfortunately, we're getting very good at it.
S We're not always like this.
L That's true.
L We used to be worse at it.
M Was that a joke?
L Don't get used to it.` },
  { text: "Maybe take five minutes. None of you can help Daniel if you're running yourselves into the ground.", premium: true, script: `W 2
S I know.
S I just feel guilty whenever I stop.
M Soph...
S I know how that sounds.
P It sounds like you're scared.
S Yeah.
S I am.
W 2
M I'm scared too.
L ...
L Same.
W 3
S Thanks.`, effects: { sophie: { trust: 3 }, maya: { trust: 2 }, lucas: { suspicion: -1 } } },
], `S Okay.
S I'm getting some water.
M Finally.
S Don't celebrate yet.
S I'll be back in like two minutes.
M Progress is progress.
W 4
O Sophie is offline.
W 5
L Maya.
M What?
L You're being awfully relaxed about this.
M About what?
L This person.
M I'm not relaxed.
L You're joking with them.
M That doesn't mean I trust them.
W 2
L Good.
L Because I don't.
M You made that pretty clear.
L I don't understand why Sophie is doing this.
M She's scared.
L We're all scared.
M I know.
L And that doesn't mean we invite strangers into everything.
W 2
M You're still here, by the way.
L What?
M The person you're talking about.
M They're still in the group.
L I know.
M Then maybe stop talking about them like they aren't.`, 'OPEN-S02-C06')
choice('04', [
  { text: 'Can I see the note?', script: `S I don't have a clear copy.
S And I don't want to send you something I haven't checked.
L For once, I agree with Sophie.
M Could you at least keep the original?
S Of course.` },
  { text: 'Maybe the number was saved for work.', script: `M That's possible.
L Possible isn't the same as likely.
M I didn't say it was likely.
S I honestly hadn't thought much about that.` },
  { text: "That doesn't necessarily mean anything.", script: `S I know.
S It might be nothing.
L Finally, something we agree on.
M Don't sound so pleased about it.` },
  { text: 'Why are you so sure the note is important?', script: `S I'm not sure.
S I wish I was.
S It's just one of the few things I haven't been able to explain.
M That's different from proving it matters.
S I know, Maya.` },
], `W 2
M Sophie, can you check something for me?
S Yeah?
M Was the note already damaged when you found it?
S I think so.
M You think?
S I'm pretty sure.
L Pretty sure isn't exactly reassuring.
S Lucas, I am trying.
L I know.
L But we can't keep building theories around things nobody's verified.
M For once, that part is fair.
S Okay.
S I'll look at it again.
T Sophie is typing...
W 3
M Can we talk about something else for a second?
L Like what?
M Whether anyone's actually eaten today.
S Maya...
M I'm serious.
M You were still awake when I went to bed.
S I slept.
M For how long?
S Enough.
M That's not a number.
S You're starting to sound like my mother.
M Someone has to.
W 2
L I ate.
M Congratulations, Lucas.
L You asked.
M I did.
S 😂
M There. See?
M She still remembers how to laugh.
S Barely.
W 2
L It isn't funny.
M Nobody said the situation was funny.
L Then can we stay focused?
M We can be worried and still act like human beings.
W 3`, 'OPEN-S02-C05')
choice('03', [
  { text: "That's none of your business.", script: `L See?
L Already being difficult.
M No, they're setting a boundary.
S I wouldn't answer that either.
L Of course you wouldn't.`, effects: { maya: { trust: 2 }, lucas: { suspicion: 2 } } },
  { text: 'Probably at home. Why?', script: `L Probably?
P It was three nights ago.
P I wasn't exactly keeping a diary.
M Neither was I.
L Nobody asked you.
M You know, you could try being less charming.`, effects: { lucas: { suspicion: -1 } } },
  { text: 'Are you seriously treating me like a suspect?', script: `L Shouldn't I?
S No!
S You shouldn't.
M We haven't even established that a crime happened.
L I didn't say they committed a crime.
M You didn't have to.`, effects: { lucas: { suspicion: 3 } } },
  { text: 'Where were you?', script: `L Excuse me?
P You heard me.
L I'm not the stranger here.
M Neither of you is answering anything useful.
S Can we please move on?`, effects: { lucas: { suspicion: 2 }, maya: { affinity: 1 } } },
  { text: "I'll answer questions that make sense. Start by explaining why that night matters.", premium: true, script: `W 2
L ...
L Because that was the last time anyone could confirm where Daniel was.
M Lucas.
L What?
M We agreed we weren't going to speculate about the timeline.
L It's not speculation.
M We don't agree on what was confirmed.
P Then maybe that's the part you should figure out first.
W 3
S They're right.
M Yeah.
M They are.
L Unbelievable.`, effects: { maya: { trust: 3 }, sophie: { trust: 2 } } },
], `M Okay.
M Enough with the questions about where people were.
M We barely know who's on the other side of the screen.
L Exactly my point.
M No. Your point was to accuse them before we know anything.
L I'm trying to be careful.
M Then be careful.
M Not cruel.
W 3
S Can I explain why I thought adding them was a good idea?
L You could try.
M Go ahead, Soph.
S There was a contact list.
S Daniel's.
S I already told you about it.
M Right.
S And the number didn't have a name.
L We know.
S I'm getting there.
S There was something beside it.
S Some kind of note.
M You said you couldn't read it.
S I couldn't.
S Not properly.
L So we have a number and a note you can't read.
L Fantastic.
S Could you not?
W 2
M Did you find anything new in the note?
S No.
M Then why bring it up?
S Because Daniel didn't usually keep numbers like that.
W 3
L ...
L What do you mean?
S Just that.
S It stood out.
M You've been going through a lot of his things.
M Maybe you're seeing patterns that aren't there.
S Maybe.
S But what if I'm not?`, 'OPEN-S02-C04')
choice('02', [
  { text: "No. I've never met him.", script: `L Then why was your number saved?
P That's what I'd like to know.
M Fair enough.
S See? That's why I added them.
L That doesn't answer anything.` },
  { text: 'Not that I know of.', script: `L What's that supposed to mean?
M It means they don't know.
L Thanks, Maya. Very helpful.
M Anytime.` },
  { text: 'Sophie already asked me that.', script: `L And now I'm asking you.
S They told me they didn't know him.
L I'd rather hear it from them.
M You just did.` },
  { text: 'Why does everyone keep asking me the same question?', script: `L Because your number is the one thing we can't explain.
S Lucas.
L What? That's true.
M Maybe try saying it without sounding like you're interrogating someone.` },
], `L So let me get this straight.
L Daniel had your number.
L You don't know Daniel.
L And you have absolutely no idea why he saved it.
S That's what we're trying to figure out.
L Doesn't that seem a little convenient to anyone else?
M Convenient for who?
L I don't know, Maya.
L That's the problem.
W 2
S Maybe he saved the wrong number.
M Possible.
L Sure.
L And maybe this is all one big misunderstanding.
M It could be.
L You don't actually believe that.
M I believe we don't have enough information.
W 2
L Fine.
L Let's ask something else.
S Lucas, don't start.
L It's a question, Sophie.
L Where were you three nights ago?
M Oh, come on.
S Lucas!
L What?
L We don't know anything about this person.
M And you think asking for an alibi is going to help?
L It might.`, 'OPEN-S02-C03')
choice('01', [
  { text: "Hi. I'm just as confused as you are.", script: `L Great.
L That makes two of us.
M At least they're being honest.
L Or they know how to sound honest.
S Lucas.
L What?
L I'm allowed to have questions.`, effects: { maya: { trust: 1 } } },
  { text: "Sophie invited me. That's all I know.", script: `L Sophie, did you hear that?
S Yes, Lucas.
L Even they don't know why they're here.
S I already explained why I contacted them.
M You explained it to us. After you'd done it.` },
  { text: 'Is this how you welcome everyone?', script: `M Usually there's a cake.
S Maya.
M What? There should be cake.
L Are we seriously joking about this?
M Apparently that's not allowed either.`, effects: { maya: { affinity: 2 }, lucas: { suspicion: 2 } } },
  { text: 'Maybe I should leave.', script: `S No, wait.
S You haven't done anything wrong.
L We don't know that.
M Lucas, seriously.
S I asked them to join.
S If anyone's responsible, it's me.`, effects: { sophie: { trust: 1 } } },
  { text: "I know this looks strange. But if you're worried about Daniel, maybe we can start by not arguing.", premium: true, script: `W 2
M ...
M That's actually a fair point.
L You don't get to walk in here and tell us how to handle this.
P I'm not telling you how to handle anything.
P I'm saying we won't get very far if everyone's too busy fighting.
S Thank you.
L Oh, brilliant.
L Now the stranger's the reasonable one.
M Someone has to be.
S Maya 😭
M Sorry.
M Couldn't help myself.`, effects: { sophie: { trust: 2 }, maya: { trust: 2 }, lucas: { suspicion: 1 } } },
], `W 3
L Alright.
L Let's start with something simple.
L Do you know Daniel?`, 'OPEN-S02-C02')
export const scene02Opening = chain(`W 2
S Hey, everyone.
W 2
S Before anyone says anything...
S I added someone.
M You added someone?
S Yes.
M Sophie.
M We literally talked about this.
S I know.
L Who?
W 2
L Who did you add?
S The number I told you about.
M Wait.
M You actually contacted it?
S Yeah.
L You've got to be kidding me.
S Lucas, please.
L Please what?
L We don't even know who this is.
M Can we just calm down for a second?
L I'm calm.
M You're really not.
L Fine.
L Then maybe our new guest would like to explain why they're here.
W 2`, 'OPENING', 'OPEN-S02-C01')
