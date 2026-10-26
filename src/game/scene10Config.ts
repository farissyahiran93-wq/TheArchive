import type {GameSave} from './types'
import {scene10Investigation} from '../content/scene10Final'
import {sourcePut,type SourceAction,type SourceInvestigationState} from './sourceInvestigation'
import {pauseScene03} from './scene01'

export const scene10Tiles=['source','box03','public-coverage','series','box','item','descriptor-row','box-date','access-note','search-limit']
export const scene10Passes={2:'b',3:'c',4:'a',5:'c',6:'b',7:'a',8:'c',9:'b',10:'a',19:'b'}
export const scene10Required=['box-index-read','reference-read','access-read','compare-read','search-run','search-limit','case-board-opened',...Object.keys(scene10Passes).map(i=>'pass-'+i)]
export const scene10Matches={
 'transfer-summary':{label:'TRANSFER ROW → SERIES SUMMARY',to:'GH-INV-2022-063'},
 'summary-extract':{label:'SERIES SUMMARY → SEPARATE BOX EXTRACT',to:'GH-INV-2022-063-EX1'},
 'box-descriptor':{label:'BOX 03 → DESCRIPTOR LABEL',to:'GH-DSC-03-A (REFERENCE ONLY)'},
 'publisher-unlinked':{label:'GB-REF-017',to:'UNLINKED'},
 'receipt-communication':{label:'R-GH-INV-001',to:'COMMUNICATION ONLY'},
} as const
export const scene10Prepared=(p:SourceInvestigationState)=>scene10Required.filter(f=>f!=='case-board-opened').every(f=>p.flags.includes(f))&&scene10Tiles.every(f=>p.inspections.includes(f))&&Object.keys(scene10Matches).every(f=>p.matches?.includes(f))
export function scene10LocalEligible(s:GameSave,i:number){
 const p=s.chapter1?.inventorySheet;if(!p)return false;const has=(f:string)=>p.flags.includes(f),inspected=(f:string)=>p.inspections.includes(f)
 if(i===1)return true
 if(i===2||i===3)return has('box-index-read')
 if(i===4)return has('box-index-read')&&['series','box','item'].every(inspected)
 if(i===5)return has('box-index-read')&&inspected('descriptor-row')
 if(i===6)return has('box-index-read')&&inspected('box-date')
 if(i===7)return has('compare-read')&&has('reference-read')
 if(i===8)return has('access-read')
 if(i===9)return has('search-run')&&has('search-limit')
 if(i===10||i===11)return has('compare-read')&&has('reference-read')&&has('access-read')
 if(i===12)return has('box-index-read')&&has('reference-read')&&has('access-read')&&has('pass-10')
 if(i===19)return Object.keys(scene10Matches).every(k=>p.matches?.includes(k))&&Object.keys(scene10Passes).filter(i=>i!=='19').every(i=>has('pass-'+i))
 if(i===20)return !p.complete&&has('case-board-opened')&&scene10Prepared(p)
 return false
}
const put=(s:GameSave,p:Partial<SourceInvestigationState>)=>sourcePut(s,10,p)
function observed(s:GameSave,flag:string,event:string):GameSave{
 const p=s.chapter1!.inventorySheet!;s=put(s,{flags:[...new Set([...p.flags,flag])]})
 return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,event])],knowledge:{...s.knowledge,player:[...new Set([...s.knowledge.player,event+':observed'])]}}
}
export function scene10Action(s:GameSave,a:SourceAction,now:number):GameSave|undefined{
 const p=s.chapter1?.inventorySheet;if(!p)return s
 if(a.type==='stance-draft'){return p.panel==='case-board'&&!p.complete&&scene10Prepared(p)&&['a','b','c'].includes(a.choice)?put(s,{finalDraft:a.choice}):s}
 if(a.type==='panel'){
  if(!['box-index','fields','descriptor','dates','compare','access','search','puzzle','case-board','status','home','form'].includes(a.panel))return s
  if(a.panel==='form'&&!scene10LocalEligible(s,12)||a.panel==='case-board'&&!scene10Prepared(p))return s
  s=put(pauseScene03(s,now),{panel:a.panel,feedback:undefined,flags:[...new Set([...p.flags,a.panel+'-opened'])]});return s
 }
 if(a.type==='inspect'){
  const allowed:Record<string,string[]>={'box-index':['source','box03','public-coverage'],fields:['series','box','item'],descriptor:['descriptor-row'],dates:['box-date'],access:['access-note'],search:['search-limit']}
  if(!allowed[p.panel]?.includes(a.id)||a.id==='search-limit'&&!p.searches?.length)return s
  s=put(s,{inspections:[...new Set([...p.inspections,a.id])]})
  if(a.id==='search-limit')s=observed(s,'search-limit','EV-S10-SEARCH-LIMIT-INSPECTED')
  if(['series','box','item','box-date'].every(i=>s.chapter1!.inventorySheet!.inspections.includes(i)))s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S10-BOX-FIELDS-INSPECTED'])]}
  return s
 }
 if(a.type==='read'){
  if(a.page!==p.panel)return s
  if(a.page==='box-index'&&['source','box03','public-coverage'].every(i=>p.inspections.includes(i)))return observed(s,'box-index-read','EV-S10-BOX-INDEX-READ')
  if(a.page==='descriptor'&&p.inspections.includes('descriptor-row')&&p.flags.includes('pass-5'))return observed(put(s,{descriptorReference:{code:'GH-DSC-03-A',source:'GH-BOX-INDEX-EXTRACT-001',bodyObserved:false}}),'reference-read','EV-S10-DESCRIPTOR-REFERENCE-NOTED')
  if(a.page==='access'&&p.inspections.includes('access-note'))return observed(s,'access-read','EV-S10-ACCESS-LIMITS-READ')
  if(a.page==='compare'&&p.flags.includes('box-index-read')&&p.flags.includes('reference-read'))return observed(s,'compare-read','EV-S10-SOURCE-COMPARISON-READ')
  return s
 }
 if(a.type==='query'){
  if(p.panel!=='search'||!scene10Investigation.queries.some(q=>q.term===a.term))return s
  return put(s,{searches:[...new Set([...p.searches??[],a.term])],lastQuery:a.term,flags:[...new Set([...p.flags,'search-run'])]})
 }
 if(a.type==='match'){
  if(p.panel!=='puzzle'||p.complete||!p.flags.includes('box-index-read')||!p.flags.includes('reference-read')||!p.flags.includes('compare-read'))return s
  const expected=(scene10Matches as Record<string,{to:string}>)[a.from]
  if(expected?.to!==a.to)return put(s,{feedback:'Those sources do not establish that link. Review the printed reference.'})
  return put(s,{matches:[...new Set([...p.matches??[],a.from])],feedback:'Catalogue relationship recorded privately; no item equivalence or publisher match.'})
 }
 if(a.type==='unmatch'){
  if(p.panel!=='puzzle'||p.complete)return s
  const choices={...p.choices};delete choices['S10-C19']
  return put(s,{matches:(p.matches??[]).filter(k=>a.from&&k!==a.from),choices,flags:p.flags.filter(f=>f!=='pass-19'),feedback:'Comparison reset. No false link was saved.'})
 }
 return undefined
}
