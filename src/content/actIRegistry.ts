import { masterScene01Nodes } from './masterScene01'
import { masterScene02Nodes } from './masterScene02'
import { masterScene03Nodes } from './masterScene03'
import { traceBridgeNodes } from './traceBridgeV3'
import { revisedScene0607Nodes } from './scene0607Revision'
import { naturalNodes, naturalSophieOverrides } from './naturalConversation'
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

const finalNodes = { ...scene02DinnerRevision(actIFinalNodes), ...scene04Nodes, ...scene05Nodes, ...scene06Nodes, ...sourceInvestigationNodes, ...revisedScene0607Nodes, ...conversationNodes, ...naturalNodes }

const alignedNodes:Record<string,Scene01Node>={...finalNodes,...alignedScene04Nodes, 'OPEN-S03-FINAL-AFTER-19-6':{...finalNodes['OPEN-S03-FINAL-AFTER-19-6'],text:'Goodbye.'} as typeof finalNodes[string]}

const introNodes: Record<string, Scene01Node> = {
  'OPEN-ORIGIN-EXPLAIN-2-1': { id:'OPEN-ORIGIN-EXPLAIN-2-1', kind:'npc', channel:'unknown', sender:'unknown', text:'A reference to the Bulletin article about Daniel.', next:'OPEN-ORIGIN-INTRO-TRACES' },
  'OPEN-ORIGIN-INTRO-TRACES': { id:'OPEN-ORIGIN-INTRO-TRACES', kind:'npc', channel:'unknown', sender:'unknown', text:"The title is there, but the original article text isn't.", next:'OPEN-ORIGIN-INTRO-TOOL' },
  'OPEN-ORIGIN-INTRO-TOOL': { id:'OPEN-ORIGIN-INTRO-TOOL', kind:'npc', channel:'unknown', sender:'unknown', text:'You can view the entry in an app called TRACE.', next:'OPEN-ORIGIN-EXPLAIN-4' },
  'OPEN-ORIGIN-EXPLAIN-4': { id:'OPEN-ORIGIN-EXPLAIN-4', kind:'choice', channel:'unknown', choices:[
    {id:'continue',text:'What exactly is TRACE?',next:'OPEN-ORIGIN-INTRO-CURIOUS'},
    {id:'continue-tone-1',text:"How did you get access to Daniel's files?",next:'OPEN-ORIGIN-INTRO-SUSPICIOUS'},
    {id:'continue-tone-2',text:'Why should I install something you sent?',next:'OPEN-ORIGIN-INTRO-CAUTIOUS'},
  ] },
  'OPEN-ORIGIN-INTRO-CURIOUS': { id:'OPEN-ORIGIN-INTRO-CURIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"It's how you open the collection. You'll still have to check whether the records are reliable.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
  'OPEN-ORIGIN-INTRO-SUSPICIOUS': { id:'OPEN-ORIGIN-INTRO-SUSPICIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"I haven't established that these came from Daniel's files. I don't know who first assembled the collection.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
  'OPEN-ORIGIN-INTRO-CAUTIOUS': { id:'OPEN-ORIGIN-INTRO-CAUTIOUS', kind:'npc', channel:'unknown', sender:'unknown', text:"You don't have to. Look at the package details first, then decide whether you want to install it.", next:'OPEN-ORIGIN-EXPLAIN-5-1' },
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

// The new entry is selected only before Version History begins. Delivered text and
// already-started conversations remain pinned to the graph they were using.
export const traceUnknownEntrance = 'OPEN-VH-TRACE-INTRO-1'
const traceNodes: Record<string, Scene01Node> = { ...revisedIntroNodes }
const traceIntro = ["You've already seen the Bulletin article.", "Good. You don't need to read it again.", "I've added a reference to TRACE.", 'ARC-IDX-GB-041.', "Track the reference. Don't assume it's an older version.", 'Tell me what the index actually contains.']
traceIntro.forEach((text,i) => {
  const id=`OPEN-VH-TRACE-INTRO-${i+1}`
  traceNodes[id]={id,kind:'npc',channel:'unknown',sender:'unknown',text,next:i===traceIntro.length-1?'OPEN-VH-NEW-C01':`OPEN-VH-TRACE-INTRO-${i+2}`,...(i===traceIntro.length-1?{attachment:'index' as const}:{})}
})
const traceChoice = traceNodes['OPEN-VH-NEW-C01']
if(traceChoice.kind==='choice')traceNodes[traceChoice.id]={...traceChoice,choices:[
  {id:'a',text:"I'll trace the reference and see what it holds.",next:'OPEN-VH-TRACE-REPLY-a'},
  {id:'b',text:'Why should I trust a reference you added?',next:'OPEN-VH-TRACE-REPLY-b'},
  {id:'c',text:"I'll check the fields. A match won't prove an edit.",next:'OPEN-VH-TRACE-REPLY-c'},
]}
for(const [id,text] of Object.entries({a:'Look at the available fields, then decide what they support.',b:"You shouldn't trust its origin. Inspect what it actually contains.",c:'Keep that distinction. A reference is not an earlier copy.'})){
  const key=`OPEN-VH-TRACE-REPLY-${id}`
  traceNodes[key]={id:key,kind:'npc',channel:'unknown',sender:'unknown',text,next:'OPEN-VH-NEW-SOURCE-HUB'}
}

const naturalGraph:Record<string,Scene01Node>={...traceNodes,...naturalNodes,...naturalSophieOverrides}
const sophieRead=naturalGraph['OPEN-S04-C03']
if(sophieRead.kind==='choice')naturalGraph[sophieRead.id]={...sophieRead,choices:sophieRead.choices.map((c,i)=>{
  if(i>2)return c
  const id=`OPEN-S04-NAT-READ-${c.id}`
  naturalGraph[id]={id,kind:'npc',channel:'sophie',sender:'sophie',text:["Me too. I thought it might make things clearer.","That's what I was afraid of.","I know. It was just the only public thing I could find."][i],next:c.next}
  return {...c,text:["Yeah. I read it. I'm still thinking about what it says.","I read it. Some of it raises more questions than answers.","I saw the report, but I don't want to assume it's all accurate."][i],next:id}
})}

/** Historical saves keep their pinned graph. Stable main choice IDs are shared, internal IDs aren't. */
const bridgeGraph = { ...naturalGraph, ...traceBridgeNodes }
type GraphRevision = Pick<NonNullable<OpeningState['scene01']>,
  'scriptRevision' | 'masterScene01' | 'articleAlignment' | 'traceIntroRevision' | 'traceUiRevision' | 'naturalFlowRevision' | 'traceBridgeRevision'>
export function actINodes(scene?: GraphRevision) {
  if (scene?.masterScene01) return { ...masterScene01Nodes, ...masterScene02Nodes, ...masterScene03Nodes }
  if (scene?.scriptRevision !== 'final-2026-10-23') return scene01Nodes
  if (!scene.articleAlignment) return finalNodes
  if (scene.naturalFlowRevision) return scene.traceBridgeRevision ? bridgeGraph : naturalGraph
  if (scene.traceUiRevision) return traceNodes
  return scene.traceIntroRevision ? revisedIntroNodes : alignedNodes
}

/** Union lookup for checkpoints: original IDs keep their old definitions, new IDs remain valid. */
export const conversationNodeForValidation = (id: string) => finalNodes[id] ?? revisedIntroNodes[id] ?? traceNodes[id] ?? bridgeGraph[id]
