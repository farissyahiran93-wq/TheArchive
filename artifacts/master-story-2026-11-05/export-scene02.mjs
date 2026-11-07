import { writeFileSync } from 'node:fs'
import { masterScene02Nodes as graph, masterScene02Start } from '../../src/content/masterScene02.ts'
const out = ['# Chapter 1 Scene 2 — The Uninvited Guest', '', 'This screenplay is generated from the implemented graph. Each player line requires selection and Send. All branches rejoin at the next beat.', '']
function lines(id, until) {
  const result=[]
  while (id && !until(id)) {
    const node=graph[id]
    if (!node) throw Error(`Missing ${id}`)
    if(node.kind==='npc') result.push(`**${node.sender}:** ${node.text}`)
    else if(node.kind==='event'&&node.event==='leave') result.push('**System:** Lucas Grey left the group.')
    if(!('next' in node)) break
    id=node.next
  }
  return result
}
out.push(...lines(masterScene02Start,id=>id==='TA-S02-C01').flatMap(s=>[s,'']))
for(let i=1;i<=9;i++){
  const n=String(i).padStart(2,'0'), node=graph[`TA-S02-C${n}`]
  if(node.kind!=='choice')throw Error('Missing choice')
  out.push(`## Decision ${n}`,'')
  for(const choice of node.choices){
    out.push(`**Player ${choice.id.toUpperCase()}:** ${choice.text}`,'')
    out.push(...lines(choice.next,id=>id.startsWith(`TA-S02-AFTER-${n}`)).flatMap(s=>[s,'']))
  }
  out.push('**Then:**','',...lines(`TA-S02-AFTER-${n}-1`,id=>id===`TA-S02-C${String(i+1).padStart(2,'0')}`||id==='TA-S02-COMPLETE').flatMap(s=>[s,'']))
}
out.push('## Private handoff','','After the group completes and the saved handoff delay expires, Sophie sends:','',`**Sophie:** ${graph['TA-S03-FIRST-MESSAGE'].text}`,'','The player must manually open the private conversation. Scene 3 does not start.','')
writeFileSync('docs/THEARCHIVE_CH1_SCENE2_SCREENPLAY.md',out.join('\n'))
