import { writeFileSync } from 'node:fs'
import { masterScene03Nodes as graph, masterScene03Start } from '../../src/content/masterScene03.ts'
const out = ['# Chapter 1 Scene 3 — Just Between Us', '', 'The existing Scene 2 handoff delivers “Hey. Are you okay after all of that?” Opening Sophie manually starts this scene. Each player choice requires Send.', '']
function lines(id, stop) {
  const result=[]
  while(id && !stop(id)) {
    const node=graph[id]
    if(!node) throw Error(`Missing ${id}`)
    if(node.kind==='npc') result.push(`**Sophie:** ${node.text}`)
    if(!('next' in node)) break
    id=node.next
  }
  return result
}
out.push(...lines(masterScene03Start,id=>id==='TA-S03-C01').flatMap(s=>[s,'']))
for(let i=1;i<=10;i++){
  const n=String(i).padStart(2,'0'),node=graph[`TA-S03-C${n}`]
  if(node.kind!=='choice')throw Error('Missing choice')
  out.push(`## Decision ${n}`,'')
  for(const choice of node.choices){out.push(`**Player ${choice.id.toUpperCase()}:** ${choice.text}`,'',...lines(choice.next,id=>id.startsWith(`TA-S03-AFTER-${n}`)).flatMap(s=>[s,'']))}
  out.push('**Then:**','',...lines(`TA-S03-AFTER-${n}-1`,id=>id===`TA-S03-C${String(i+1).padStart(2,'0')}`||id==='TA-S03-COMPLETE').flatMap(s=>[s,'']))
}
out.push('Sophie goes offline. Scene 4 is unlocked without introducing Unknown or TRACE.','')
writeFileSync('docs/THEARCHIVE_CH1_SCENE3_SCREENPLAY.md',out.join('\n'))
