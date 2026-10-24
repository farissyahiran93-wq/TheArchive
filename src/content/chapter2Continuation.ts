import { continuationSource as source } from './continuationSource'
import { reunionNodes as nodes, type StoryActor, type StoryOption } from './chapter2Reunion'
export const continuationFacts={mirror:'C2-DISCLOSED-PHONE-MIRROR',unverified:'C2-SOURCE-UNVERIFIED',fragment:'C2-SOPHIE-PICTURE-FRAGMENT',generalEli:'C2-GENERAL-CORRUPT-ID-QUESTION',generalNora:'C2-GENERAL-CONFLICTING-COPIES-QUESTION',discrepancy:'C2-714-DISCREPANCY'} as const
export function continuationEvent(id:string,flag:string,next?:string){nodes[id]={kind:'event',event:'continuation',flag,next};return id}
function talk(key:keyof typeof source,next:string,dropPlayer=false){
 const lines=source[key]
 for(let i=lines.length-1;i>=0;i--){const line=lines[i],id=`C2S${key}_${String(i).padStart(3,'0')}`
  if(dropPlayer&&i===0&&line.actor==='player')continue
  if(line.actor==='wait'){
   if(line.text.includes('typing')){const following=nodes[next];if(following?.kind==='npc')nodes[next]={...following,delay:0,typing:false};nodes[id+'_STOP']={kind:'wait',duration:300,next};nodes[id]={kind:'wait',duration:2500,typingActor:'maya',next:id+'_STOP'}}
   else nodes[id]={kind:'wait',duration:2500,next}
  }
  else if(line.actor==='player')nodes[id]={kind:'choice',options:[{id:'send',text:line.text,next}]}
  else nodes[id]={kind:'npc',actor:line.actor as StoryActor,text:line.text,next}
  next=id
 }return next
}
function conditional(id:string,guard:string,yes:string,no:string){nodes[id]={kind:'if',guard:`next:${guard}`,yes,no};return id}
function choices(id:string,branches:(keyof typeof source)[],next:string,extra:Record<string,Partial<StoryOption>>={}){
 nodes[id]={kind:'choice',options:branches.map((key,i)=>{const actor=source[key][0];const optionId=['a','b','c','d'][i];return {id:optionId,text:actor.actor==='player'?actor.text:'[Read without replying]',silent:actor.actor!=='player',next:extra[optionId]?.next??talk(key,next,true),...extra[optionId]}})};return id
}
const done10=continuationEvent('C2S10_DONE','10-done')
const close10=talk('10_close',done10)
const g2=choices('G10_02',['G10_02_A','G10_02_B','G10_02_C','G10_02_D'],close10)
const g1=choices('G10_01',['G10_01_A','G10_01_B','G10_01_C','G10_01_D'],talk('10_after1',g2))
const common10=talk('10_common',g1)
export const scene10Entry=conditional('C2S10_TONE_A','empathic',talk('10_empathic',common10),conditional('C2S10_TONE_B','skeptical',talk('10_skeptical',common10),talk('10_neutral',common10)))
const lucasDone=continuationEvent('C2S10_LUCAS_DONE','lucas-done')
export const lucas10Entry=talk('10_lucas',choices('L10_01',['L10_01_A','L10_01_B','L10_01_C'],talk('10_lucas_after',choices('L10_02',['L10_02_A','L10_02_B','L10_02_C'],lucasDone))))
const done12=continuationEvent('C2S12_DONE','12-done')
const end12=talk('12_close',conditional('C2S12_TONE','playful',talk('12_playful',done12),talk('12_goodnight',done12)))
const s4=choices('S12_04',['S12_04_A','S12_04_B','S12_04_C','S12_04_D'],end12)
const after3=talk('12_after3',s4)
const followD=choices('S12_03D_FOLLOWUP',['S12_03D_A','S12_03D_B','S12_03D_C'],after3)
const alreadyD=conditional('C2S12_ALREADY_MIRROR','sophie-mirror',followD,talk('S12_03_D',followD,true))
const s3=choices('S12_03',['S12_03_A','S12_03_B','S12_03_C','S12_03_D'],after3,{d:{guard:'next:picture-basis',next:alreadyD,facts:[continuationFacts.mirror,continuationFacts.fragment]}})
export const scene12Entry=talk('12_open',choices('S12_01',['S12_01_A','S12_01_B','S12_01_C'],talk('12_memory',choices('S12_02',['S12_02_A','S12_02_B','S12_02_C'],talk('12_picture',s3)))))
const helpDone=continuationEvent('C2S14_HELP_DONE','14-done')
export const eli14Entry=talk('E14_02_A',choices('E14_02A_FOLLOWUP',['E14_02A_A','E14_02A_B'],helpDone))
export const nora14Entry=talk('E14_02_B',choices('E14_02B_FOLLOWUP',['E14_02B_A','E14_02B_B'],helpDone))
// Player initial drafts for these sessions are always explicit selection + Send.
for(const [entry,facts]of [[eli14Entry,[continuationFacts.generalEli]],[nora14Entry,[continuationFacts.generalNora]]] as const){const n=nodes[entry];if(n.kind==='choice')n.options[0].facts=[...facts]}
const dA=continuationEvent('C2S15_A_DONE','15-limited_group')
export const disclosureA=talk('D15_A',choices('D15_A2',['D15_A2_A','D15_A2_B','D15_A2_C'],talk('15_a_close',dA)),true)
const dB=continuationEvent('C2S15_B_DONE','15-private_nora')
export const disclosureB=talk('D15_B',choices('D15_B2',['D15_B2_A','D15_B2_B','D15_B2_C'],talk('15_b_close',dB)),true)
const dC=continuationEvent('C2S15_C_DONE','15-group_access')
const dC2=choices('D15_C2',['D15_C2_A','D15_C2_B','D15_C2_C'],talk('15_c_close',dC))
export const disclosureCNew=talk('15_c_new',dC2)
export const disclosureCKnown=talk('15_c_known',dC2)
export const disclosureDrafts={a:source.D15_A[0].text,b:source.D15_B[0].text,c:source.D15_C_new[0].text,cKnown:source.D15_C_known[0].text}
const finalDone=continuationEvent('C2S15_FINAL_DONE','15-final-done')
const last=talk('15_final',finalDone)
export const scene15FinalEntry=conditional('C2S15_FINAL_A','limited-group',talk('15_final_a',last),conditional('C2S15_FINAL_C','group-access',talk('15_final_c',last),talk('15_final_other',last)))
