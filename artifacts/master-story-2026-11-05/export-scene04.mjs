import { writeFileSync } from 'node:fs'
import { masterScene04Beats, masterArchiveIdentifier } from '../../src/content/masterScene04.ts'
const out=['# Chapter 1 Scene 4 — The Unknown Sender','','Unknown opens with: **“I know you’re looking for Daniel.”**','','Each player line requires a selected reply and Send. Branches rejoin after the matching response.','']
for(const [i,beat] of masterScene04Beats.entries()){
 out.push(`## Decision ${String(i+1).padStart(2,'0')}`,'')
 for(const [j,choice] of beat.choices.entries())out.push(`**Player ${String.fromCharCode(65+j)}:** ${choice}`,'',`**Unknown:** ${beat.replies[j]}`,'')
}
out.push('## Encrypted archive','','Unknown offers **'+masterArchiveIdentifier+'**. The player can inspect the metadata, defer, decline for now, reconsider or explicitly accept. Inspection and acceptance are separate actions. The archive remains locked; no phone records are recovered. Both inspection and acceptance are required before Scene 5 unlocks.','')
writeFileSync('docs/THEARCHIVE_CH1_SCENE4_SCREENPLAY.md',out.join('\n'))
