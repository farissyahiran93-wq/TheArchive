import type { Scene01Node } from './scene01'

/** Owner's 26 October dinner/photo revision. Earlier delivered messages retain their saved text. */
export function scene02DinnerRevision(base: Record<string, Scene01Node>): Record<string, Scene01Node> {
  const nodes: Record<string, Scene01Node> = { ...base }
  const bridge = 'OPEN-S02-FINAL-AFTER-07-7'
  const original = nodes[bridge]
  if (!original || original.kind !== 'npc' || original.text !== 'We can verify the bread later.') return nodes
  const lines: { sender?: 'sophie'|'maya'|'lucas'; text?: string; wait?: number; photo?: string }[] = [
    {sender:'sophie',text:'😂'},
    {sender:'sophie',text:"You're both ridiculous."},
    {sender:'sophie',text:'Fine. One photo.'},
    {wait:1800},
    {sender:'sophie',text:'Photo',photo:'/sophie-dinner.png'},
    {sender:'sophie',text:'There. Actual dinner. Happy now?'},
    {sender:'maya',text:'Okay, that actually looks good.'},
    {sender:'maya',text:'I take back the bread allegations.'},
    {sender:'sophie',text:'Wow. Thank you for your approval.'},
    {sender:'lucas',text:'For the record, the bread is still unverified.'},
    {sender:'sophie',text:'😂'},
    {sender:'sophie',text:'Wait.'},
  ]
  const ids=lines.map((_,i)=>`OPEN-S02-DINNER-REV-${String(i+1).padStart(2,'0')}`)
  nodes[bridge]={...original,next:ids[0]}
  lines.forEach((line,i)=>{const id=ids[i],next=ids[i+1]??'OPEN-S02-FINAL-AFTER-07-11';nodes[id]=line.wait?{id,kind:'wait',duration:line.wait,typing:true,actor:'sophie',next}:{id,kind:'npc',sender:line.sender!,channel:'group',text:line.text!,...(line.photo?{photo:line.photo}:{}),next,heardFacts:[]}})
  const after='OPEN-S02-FINAL-AFTER-07-14',opening=nodes[after]
  if(opening?.kind==='wait'){
    const compact:[string,'sophie'|'maya'|'lucas'][]=[
      ['Soph, one thing before we move on.','maya'],
      ['I should have asked before adding someone. I’m sorry.','sophie'],
      ['That’s what I needed to hear.','lucas'],
      ['Then we check with each other before sharing anything private.','maya'],
      ['Agreed.','sophie'],
      ['Agreed.','lucas'],
    ]
    const cids=compact.map((_,i)=>`OPEN-S02-CONSENT-REV-${i+1}`)
    nodes[after]={...opening,next:cids[0]}
    compact.forEach(([text,sender],i)=>{nodes[cids[i]]={id:cids[i],kind:'npc',sender,channel:'group',text,next:cids[i+1]??'OPEN-S02-C08',heardFacts:[]}})
  }
  const later='OPEN-S02-FINAL-AFTER-08-1',laterOpening=nodes[later]
  if(laterOpening?.kind==='npc'){
    const concise:[string,'sophie'|'maya'|'lucas',string[]?][]=[
      ['Can we put the invitation argument down for tonight?','maya'],
      ['If we stop treating the timeline as settled, too.','lucas'],
      ["Agreed. Someone remembers a time; someone else remembers a message. Nobody has confirmed how they fit together.",'maya',['OPEN-S02-DISPUTED-TIMELINE']],
      ["I'll check what the export actually shows.",'sophie'],
      ['Thank you.','lucas'],
      ["That's one thing we can do without guessing.",'maya'],
    ]
    const ids=concise.map((_,i)=>`OPEN-S02-TIMELINE-REV-${i+1}`)
    nodes[later]={...laterOpening,text:concise[0][0],sender:concise[0][1],next:ids[1]}
    concise.slice(1).forEach(([text,sender,heardFacts],offset)=>{const i=offset+1;nodes[ids[i]]={id:ids[i],kind:'npc',sender,channel:'group',text,next:ids[i+1]??'OPEN-S02-C09',heardFacts:heardFacts??[]}})
  }
  return nodes
}
