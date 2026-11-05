import type { GameSave } from '../game/types'
import { naturalSources } from '../content/naturalConversation'
import { canOpenPublisherInquiry, canOpenScene6Register, hasPublisherReceipt } from '../game/investigationAccess'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'
import { GuidanceDot } from './GuidanceDot'
import { traceBridgeV3 } from '../game/traceBridge'

/** One contextual action for the actual waiting conversation, never a source checklist. */
export function NaturalConversationActions({save}:{save:GameSave}) {
  const nav=useCaseNavigation(),id=save.prologue?.scene01?.nodeId
  const source=(['article','index','policy'] as const).find(source=>naturalSources[source].wait===id)
  if (source === 'article' && traceBridgeV3(save)) return null // The delivered bridge attachment is the action.
  if(source==='article')return <div className="natural-context"><button className="opening-choice" onClick={nav.openPublicArticle}>OPEN BULLETIN<GuidanceDot save={save} app="bulletin"/></button></div>
  if(source==='index')return <div className="natural-context"><button className="opening-choice" onClick={()=>{useGameStore.getState().traceAction({type:'findings'});nav.openArchive()}}>VIEW TRACE FINDINGS<GuidanceDot save={save} action="view-findings"/></button></div>
  if(source==='policy')return <div className="natural-context"><button className="opening-choice" onClick={()=>nav.openPublication('policy')}>OPEN BULLETIN POLICY<GuidanceDot save={save} action={['open-policy','read-policy']}/></button></div>
  if(id==='OPEN-VH-NAT-REGISTER-WAIT'&&canOpenScene6Register(save))return <div className="natural-context"><button className="opening-choice" onClick={()=>nav.openPublication('register')}>OPEN PUBLIC CORRECTIONS REGISTER<GuidanceDot save={save} action="open-register"/></button></div>
  if(save.chapter1?.correctionsDesk?.complete&&canOpenPublisherInquiry(save))return <div className="natural-context"><button className="opening-choice" onClick={()=>nav.openPublication('form')}>{hasPublisherReceipt(save)?'VIEW REQUEST HISTORY':'OPEN OPTIONAL REQUEST'}<GuidanceDot save={save} action="open-inquiry"/></button></div>
  if(save.chapter1?.correctionsDesk?.complete&&!hasPublisherReceipt(save)&&save.chapter1.versionHistory?.threads.unknown?.complete)return <div className="natural-context"><button className="opening-choice" onClick={()=>useGameStore.getState().versionHistoryAction({type:'revisit-inquiry'})}>REVIEW PUBLISHER CONTACT OPTION</button></div>
  return null
}

/** Resume a pinned historical graph with one contextual action at a time. */
export function LegacySourceAction({save}:{save:GameSave}) {
  const nav=useCaseNavigation(),p=save.chapter1!.versionHistory!
  const source=(['article','index','policy'] as const).find((_,i)=>!p.chatChoices?.[['s05_c02_update_label','s05_c03_index_meaning','s05_c04_policy_meaning'][i]])
  if(!source)return null
  const ready=source==='article'?p.flags.includes('article_metadata_inspected')&&p.flags.includes('update_analysis_saved'):p.flags.includes(source)
  return <div className="natural-context"><button className="opening-choice" onClick={()=>ready?useGameStore.getState().versionHistoryAction({type:'discuss-source',source}):source==='article'?nav.openPublicArticle():source==='index'?nav.openTraceTracker():nav.openPublication('policy')}>{ready?`DISCUSS · ${source.toUpperCase()}`:source==='article'?'OPEN BULLETIN':source==='index'?'VIEW TRACE FINDINGS':'OPEN BULLETIN POLICY'}<GuidanceDot save={save} action={source==='article'?'discuss-article':source==='index'?'discuss-index':'discuss-policy'}/></button></div>
}
