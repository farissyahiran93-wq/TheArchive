import type { Scene01Node } from './scene01'

type Beat = { choices: readonly [string, string, string]; replies: readonly [string, string, string]; after: readonly string[] }
const beats: readonly Beat[] = [
  { choices: ["I'm okay. Are you?", "I'm all right. That got tense quickly.", "I need a little time to process it."], replies: ["I've been better. Thank you for asking.", "It did. I didn't mean to put you in the middle of it.", "Of course. We can take this slowly."], after: ["I'm sorry about the group.", "Maya and Lucas are worried about Daniel too. They just show it differently.", "I should have talked to them before I invited you."] },
  { choices: ["You were trying to help your brother.", "Lucas seemed worried about privacy.", "I'd rather not be caught between you."], replies: ["I was. That doesn't mean I handled it perfectly.", "He was. He's protective of Daniel, and I understand why.", "That's fair. I won't ask you to take sides."], after: ["Daniel's my older brother. Somehow he still manages to make me feel like the younger one, even when he's the one who needs help."] },
  { choices: ["What was he like as an older brother?", "Did you two see each other often?", "You sound close."], replies: ["Protective, mostly. Annoying too, when we were kids.", "As often as we could manage. Sometimes it was just a quick meal.", "We are. We don't always agree, but he's my brother."], after: ["When I was younger, I once told him I was too old to need a lift home.", "He said fine, and drove behind the bus anyway.", "I was furious when I spotted him. He tried to pretend he just happened to be going the same way.", "I didn't believe him for a second."] },
  { choices: ["That sounds like him looking out for you.", "Did he ever admit he followed the bus?", "I can see why that annoyed you."], replies: ["It was. I'd never have admitted that to him at the time.", "Years later. He still insisted it was a coincidence, then started laughing.", "Right? He could be thoughtful and impossible in exactly the same minute."], after: ["He'd remember the little things too. If I mentioned I had a difficult day coming up, he'd ask about it afterwards.", "Lately I've been reaching for my phone to tell him things, and then remembering why he hasn't answered."] },
  { choices: ["How is Maya coping?", "Were Maya and Daniel doing all right?", "You don't have to speak for Maya."], replies: ["She's trying to keep going. I think the not knowing is exhausting her.", "They're engaged. Like anyone, they could disagree, but I can't tell you what was happening privately between them.", "Thank you. I can only tell you what she's chosen to tell me."], after: ["Maya's his fiancée. She's been there for him through a lot, and she cares about him deeply.", "They had ordinary disagreements. I don't want to turn that into an explanation for him being missing."] },
  { choices: ["And Lucas?", "Did Daniel usually confide in Lucas?", "I can understand Lucas wanting to protect him."], replies: ["He's Daniel's best friend. They've known each other a long time.", "Sometimes. There are things Daniel told Lucas that he didn't tell me, and that's okay.", "So can I. I just wish we could have talked without hurting each other."], after: ["Lucas has always cared about giving Daniel space to decide what he wants to share.", "His leaving the chat doesn't mean he's stopped looking for him."] },
  { choices: ["Did you notice anything different before Daniel disappeared?", "Was there something that made you worry?", "Only if you're comfortable: how had he seemed lately?"], replies: ["He seemed distracted the last few times we spoke.", "He'd go quiet in the middle of a conversation, like his thoughts had gone somewhere else.", "I can talk about what I noticed. I just don't know what it meant."], after: ["I asked once if work was bothering him. He said he was tired and changed the subject.", "Maybe he was only tired. I can't tell you what he was thinking."] },
  { choices: ["What was your last ordinary conversation with him?", "Do you remember what you talked about last?", "It's okay if you don't want to revisit it."], replies: ["We talked about dinner.", "Yes. It was something completely ordinary: dinner.", "I do want to remember it. We were talking about dinner."], after: ["He'd promised to bring dessert next time we saw each other.", "I told him that didn't count if he bought the same biscuits he always does.", "He said the biscuits were a family tradition. They aren't. He just likes them.", "I keep thinking about how normal it sounded. I didn't know it would be the last time we'd speak before he went missing."] },
  { choices: ["You couldn't have known that.", "Thank you for telling me about him.", "Would it help if I gave you some space?"], replies: ["I know. I have to keep reminding myself of that.", "Thank you for listening. I didn't want him to become just a name on a screen.", "I think I need that. Thank you for asking."], after: ["I'm getting tired, and I should try to rest for a while.", "You don't have to do anything else for me tonight."] },
  { choices: ["Rest, Sophie. I'll be here when you're ready.", "Take the time you need. We can talk later.", "I'll give you space. Goodbye for now."], replies: ["Thank you. That means a lot.", "I will. Thank you for listening.", "Thank you for understanding."], after: ['Goodbye.'] },
]

export const masterScene03Nodes: Record<string, Scene01Node> = {}
export const masterScene03Start = 'TA-S03-OPEN-1'
const complete='TA-S03-COMPLETE'
masterScene03Nodes[complete] = { id: complete, kind: 'event', event: 'private-complete' }
function chain(prefix: string, lines: readonly string[], next: string): string {
  for (let i=lines.length-1;i>=0;i--) {
    const id=`${prefix}-${i+1}`
    const facts: Record<string, string> = {
      "Daniel's my older brother. Somehow he still manages to make me feel like the younger one, even when he's the one who needs help.": 'TA-S03-SOPHIE-SIBLING',
      "Maya's his fiancée. She's been there for him through a lot, and she cares about him deeply.": 'TA-S03-MAYA-FIANCEE',
      "Lucas has always cared about giving Daniel space to decide what he wants to share.": 'TA-S03-LUCAS-PRIVACY',
      'He said fine, and drove behind the bus anyway.': 'TA-S03-BROTHER-MEMORY',
      'I asked once if work was bothering him. He said he was tired and changed the subject.': 'TA-S03-SOPHIE-WORK-OBSERVATION',
      "He'd promised to bring dessert next time we saw each other.": 'TA-S03-LAST-CONVERSATION',
    }
    masterScene03Nodes[id]={id,kind:'npc',channel:'sophie',sender:'sophie',text:lines[i],next,...(facts[lines[i]]?{heardFacts:[facts[lines[i]]]}:{})}
    next=id
  }
  return next
}
for(let i=beats.length-1;i>=0;i--){
  const beat=beats[i],n=String(i+1).padStart(2,'0'),id=`TA-S03-C${n}`
  const after=chain(`TA-S03-AFTER-${n}`,beat.after,i===beats.length-1?complete:`TA-S03-C${String(i+2).padStart(2,'0')}`)
  masterScene03Nodes[id]={id,kind:'choice',number:n,channel:'sophie',choices:beat.choices.map((text,j)=>({id:String.fromCharCode(97+j),text,next:chain(`TA-S03-C${n}-${j}`,[beat.replies[j]],after)}))}
}
chain('TA-S03-OPEN',["I'm sorry for how that went in the group.","I wanted to check on you before I put my phone down."],'TA-S03-C01')
