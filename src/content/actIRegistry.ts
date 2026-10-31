import type { Scene01Node } from './scene01'
import { alignedScene04Nodes, conversationNodes } from './versionHistoryConversation'
import { sourceInvestigationNodes } from './sourceInvestigations'
import { scene06Nodes } from './scene06Final'
import { scene05Nodes } from './scene05Final'
import { scene04Nodes } from './scene04Final'
import { actIFinalNodes } from './actIFinal'
import { scene02DinnerRevision } from './scene02DinnerRevision'
import { scene01Nodes } from './scene01'
import type { OpeningState } from '../game/types'

const finalNodes = { ...scene02DinnerRevision(actIFinalNodes), ...scene04Nodes, ...scene05Nodes, ...scene06Nodes, ...sourceInvestigationNodes, ...conversationNodes }

const alignedNodes:Record<string,Scene01Node>={...finalNodes,...alignedScene04Nodes, 'OPEN-S03-FINAL-AFTER-19-6':{...finalNodes['OPEN-S03-FINAL-AFTER-19-6'],text:'Goodbye.'} as typeof finalNodes[string]}

const introNodes: Record<string, Scene01Node> = {
  'OPEN-ORIGIN-EXPLAIN-2-1': { id:'OPEN-ORIGIN-EXPLAIN-2-1', kind:'npc', channel:'unknown', sender:'unknown', text:'The one connected to Daniel.', next:'OPEN-ORIGIN-INTRO-TRACES' },
  'OPEN-ORIGIN-INTRO-TRACES': { id:'OPEN-ORIGIN-INTRO-TRACES', kind:'npc', channel:'unknown', sender:'unknown', text:'Some original material is missing, but references may still exist.', next:'OPEN-ORIGIN-INTRO-TOOL' },
  'OPEN-ORIGIN-INTRO-TOOL': { id:'OPEN-ORIGIN-INTRO-TOOL', kind:'npc', channel:'unknown', sender:'unknown', text:"There's a tool that can help you examine what's missing. It's called TRACE.", next:'OPEN-ORIGIN-EXPLAIN-4' },
  'OPEN-ORIGIN-EXPLAIN-4': { id:'OPEN-ORIGIN-EXPLAIN-4', kind:'choice', channel:'unknown', choices:[
    {id:'continue',text:'What exactly is TRACE?',next:'OPEN-ORIGIN-INTRO-CURIOUS'},
    {id:'continue-tone-1',text:"How did you get access to Daniel's files?",next:'OPEN-ORIGIN-INTRO-SUSPICIOUS'},
    {id:'continue-tone-2',text:'Why should I install something you sent?',next:'OPEN-ORIGIN-INTRO-CAUTIOUS'},
  ] },
  'OPEN-ORIGIN-INTRO-CURIOUS': { id:'OPEN-ORIGIN-INTRO-CURIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"A tool for examining references. It can't tell you which ones to trust.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
  'OPEN-ORIGIN-INTRO-SUSPICIOUS': { id:'OPEN-ORIGIN-INTRO-SUSPICIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"I can't verify where the collection came from, or whether these references came from Daniel's files.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
  'OPEN-ORIGIN-INTRO-CAUTIOUS': { id:'OPEN-ORIGIN-INTRO-CAUTIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"You shouldn't install it just because I sent it. Inspect the package and decide for yourself.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
}
// New starts use distinct intentions while existing saves retain their pinned text and IDs.
const revisedChoiceTexts: Record<string, readonly [string,string,string]> = {
  'OPEN-VH-NEW-C01': ["I'll start with the article.", "Before I look, tell me what the index can establish.", "I'll check the sources myself before trusting either one."],
  'OPEN-VH-NEW-C02': ["It says the page was updated, but not what changed.", "Can the label tell us who made the update?", "I won't treat an update label as proof of a changed passage."],
  'OPEN-VH-NEW-C03': ["A reference, but no original article text.", "Who assembled the index is still unknown.", "I can't use this reference as an earlier copy."],
  'OPEN-VH-NEW-C04': ["It explains updates generally, not what happened to this article.", "Does this policy identify the change made here?", "We should keep the general policy separate from the article's history."],
  'OPEN-VH-NEW-C05': ["The references match, but there's no earlier text to compare.", "The matching reference doesn't tell us who made the index.", "We have a public article and a reference, not a before-and-after comparison."],
  'OPEN-VH-NEW-C06': ["I'll ask the publisher what records are available.", "I'd like to check for an independent copy as well.", "For now, I want to keep the uncertainty clear."],
  'OPEN-VH-NEW-C07': ["The references match, but a wording change remains unverified.", "We still can't determine whether the article wording changed.", "Keep the public article separate from the unverified index."],
  'OPEN-VH-NEW-C09': ["Can I ask what you remember about the article?", "Would you be comfortable talking about the article?", "I'd like your perspective, but only if you're willing."],
  'OPEN-VH-NEW-C10': ["Only what you're comfortable sharing. We can leave it there.", "Would you prefer that I don't bring this up again?", "We can stop here. Your memories don't need to prove anything."],
  'OPEN-VH-NEW-C11': ["The article and index display the same reference. That doesn't prove the text changed.", "The index source is unverified, so I wouldn't treat it as an original.", "We haven't found an earlier copy to compare with the article."],
}
const revisedIntroNodes: Record<string, Scene01Node> = { ...alignedNodes, ...introNodes }
// Synthetic tone-only alternatives all share the exact same action. New routes
// show the authored response once; original routes keep their pinned choices.
for (const [id, node] of Object.entries(revisedIntroNodes)) {
  if (id === 'OPEN-ORIGIN-EXPLAIN-4' || node.kind !== 'choice' || node.choices.length !== 3) continue
  if (node.choices[1].id === `${node.choices[0].id}-tone-1` && node.choices[2].id === `${node.choices[0].id}-tone-2` && node.choices.every(choice => choice.next === node.choices[0].next)) revisedIntroNodes[id] = { ...node, choices: [node.choices[0]] }
}
for (const [id, texts] of Object.entries(revisedChoiceTexts)) {
  const node = revisedIntroNodes[id]
  if (node?.kind === 'choice' && node.choices.length === texts.length) revisedIntroNodes[id] = { ...node, choices: node.choices.map((choice, index) => ({ ...choice, text: texts[index] })) }
}

const strategyReply = revisedIntroNodes['OPEN-VH-NEW-REPLY-06-1']
if (strategyReply?.kind === 'npc') revisedIntroNodes[strategyReply.id] = { ...strategyReply, text: 'Decide what you can verify.' }

// Branch-specific acknowledgement precedes the established convergence; no new facts are granted.
const intentReplies: Record<string, readonly [string,string]> = {
  'OPEN-VH-NEW-C01': ["It's an unverified reference, not an earlier article copy.", "That's fair. Check each source for yourself."],
  'OPEN-VH-NEW-C02': ["No. The label doesn't identify an editor.", "Agreed. It doesn't establish a changed passage."],
  'OPEN-VH-NEW-C03': ["I can't verify who assembled it.", "Right. A reference isn't an earlier copy."],
  'OPEN-VH-NEW-C04': ["No. It describes a general process, not this article's edit.", "Yes. A general policy isn't an individual record."],
  'OPEN-VH-NEW-C05': ["That's still unknown.", "Right. We can't compare missing text."],
  'OPEN-VH-NEW-C06': ["An independent copy could help, if one can be found.", "Keeping the uncertainty clear is a reasonable choice."],
  'OPEN-VH-NEW-C07': ["We can't determine that from these records.", "They should stay separate until their sources are verified."],
  'OPEN-VH-NEW-C09': ["I'm willing to talk about what I remember.", "I can share what I remember, with that limit."],
  'OPEN-VH-NEW-C10': ["I'd rather take this one conversation at a time.", "Thank you. Memory isn't the same as a record."],
  'OPEN-VH-NEW-C11': ["Right. We don't know who made that index.", "Then we can't compare an earlier copy yet."],
}
for (const [id, replies] of Object.entries(intentReplies)) {
  const node=revisedIntroNodes[id]
  if(node?.kind!=='choice')continue
  revisedIntroNodes[id]={...node,choices:node.choices.map((choice,index)=>{
    if(index===0)return choice
    const replyId=`${id}-INTENT-${choice.id}`
    const channel=node.channel==='sophie'?'sophie':node.channel==='group'?'group':'unknown'
    revisedIntroNodes[replyId]={id:replyId,kind:'npc',channel,sender:channel==='group'?'maya':channel,text:replies[index-1],next:choice.next}
    return {...choice,next:replyId}
  })}
}

/** Historical saves keep their pinned graph. Stable main choice IDs are shared, internal IDs aren't. */
export const actINodes = (scene?: Pick<NonNullable<OpeningState['scene01']>, 'scriptRevision'|'articleAlignment'|'traceIntroRevision'>) => scene?.scriptRevision === 'final-2026-10-23' ? scene.articleAlignment ? scene.traceIntroRevision ? revisedIntroNodes : alignedNodes : finalNodes : scene01Nodes

/** Union lookup for checkpoints: original IDs keep their old definitions, new IDs remain valid. */
export const conversationNodeForValidation = (id: string) => finalNodes[id] ?? revisedIntroNodes[id]
