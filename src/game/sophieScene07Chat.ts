import { sophieScene07Chat, sophieScene07Choices } from '../content/masterScene07'
import { npcDeliveryDelay } from './npcDelivery'
import type { MasterScene07, MasterScene07Action } from './masterScene07'
import type { GameSave } from './types'

type Beat = keyof typeof sophieScene07Chat
type Stage = Beat | 'calling' | 'call' | 'attachment' | 'deferred' | 'done'
export type SophieScene07Chat = { stage: Stage; draft?: number; pending?: { index: number; dueAt: number } }
export const scene07AttachmentId = 'TA-S07-EXPORT-RECEIVED'

export function sophieChatChoices(chat: SophieScene07Chat) {
  if (chat.stage==='deferred')return ['Can you send me the copy now?']
  if (chat.pending || !(chat.stage in sophieScene07Choices)) return []
  return sophieScene07Choices[chat.stage as keyof typeof sophieScene07Choices]
}

function queued(stage: Beat, now: number, index = 0): SophieScene07Chat {
  const text = sophieScene07Chat[stage][index]
  const pause = (stage === 'privacy' && index === 4 || stage === 'relay' && index === 1) ? 1400 : 0
  return { stage, pending: { index, dueAt: now + pause + npcDeliveryDelay('sophie', text, index) } }
}

export function beginSophieChat(save: GameSave, now: number) {
  const heyDelivered = save.messages.some(m => m.id === 'TA-S06-SOPHIE-EXPORT' && m.text === sophieScene07Chat.intro[0])
  return queued('intro', now, heyDelivered ? 1 : 0)
}

export function afterSophieCall(p: MasterScene07, now: number): MasterScene07 {
  return {...p, phase:'attachment', chat: p.exportStatus === 'deferred' ? {stage:'deferred'} : queued('export', now)}
}

function deliver(save: GameSave, id: string, text: string, sender: 'sophie'|'player', now: number): GameSave {
  if (save.deliveredEvents.includes(id)) return save
  const message = {id, text, sender, at: now}
  const scene = save.prologue?.scene01
  return {...save, deliveredEvents:[...save.deliveredEvents,id],
    messages:[...save.messages,{...message,...(sender === 'player' ? {recipient:'sophie' as const} : {}),channel:'messages',delivery:'delivered'}],
    ...(scene ? {prologue:{...save.prologue!,scene01:{...scene,messages:[...scene.messages,message]}}} : {}),
  }
}

/** The two private relays give each speaker a legitimate source for their next message. */
function relay(save: GameSave, sender:'sophie'|'maya', recipient:'sophie'|'maya', text:string, now:number):GameSave {
  const id = 'TA-S07-RELAY-' + sender.toUpperCase() + '-' + recipient.toUpperCase()
  if(save.deliveredEvents.includes(id))return save
  const known = save.knowledge.characters
  return {...save,deliveredEvents:[...save.deliveredEvents,id],messages:[...save.messages,{id,sender,recipient,text,channel:'messages',delivery:'delivered',at:now}],
    knowledge:{...save.knowledge,characters:{...known,[recipient]:[...new Set([...known[recipient],id])]}}}
}

export function advanceSophieChat(save: GameSave, p: MasterScene07, action: MasterScene07Action, now: number):GameSave {
  const chat = p.chat!
  const put = (next: SophieScene07Chat, patch: Partial<MasterScene07> = {}) => ({...save, masterScene07:{...p,...patch,chat:next}})
  if(action.type==='analyse-fragment') {
    return p.opened && p.fragmentAnalysedAt === undefined ? put(chat,{fragmentAnalysedAt: now}) : save
  }
  if (action.type === 'open' && chat.stage === 'attachment') return put(queued('opened',now),{opened:true})
  if (action.type === 'chat-draft' && Number.isInteger(action.index) && sophieChatChoices(chat)[action.index] !== undefined) return put({...chat,draft:action.index})
  if (action.type === 'chat-send' && chat.draft !== undefined) {
    const choice = sophieChatChoices(chat)[chat.draft]
    if (!choice) return save
    save = deliver(save,`TA-S07-TEXT-${chat.stage}-P-${chat.draft}`,choice,'player',now)
    if(chat.stage==='deferred')return put(queued('export',now),{exportStatus:'accepted'})
    const next = chat.stage === 'intro' ? 'invite' : chat.stage === 'opened' ? 'privacy' : 'relay'
    return put(queued(next, now), chat.stage==='opened' ? {questioned:true} : {})
  }
  if (action.type !== 'tick' || !chat.pending || now < chat.pending.dueAt) return save
  if(chat.stage==='calling')return put({stage:'call'},{phase:'ringing'})
  const stage = chat.stage as Beat, index = chat.pending.index
  const batch = sophieScene07Chat[stage]
  if(stage==='relay'&&index===1)save=relay(save,'maya','sophie','I found an old conversation with Daniel. There’s something in it I’d like to show them.',now)
  const id = stage === 'export' && index === batch.length-1 ? scene07AttachmentId : `TA-S07-TEXT-${stage}-${index}`
  save = deliver(save,id,batch[index],'sophie',now)
  if (index+1 < batch.length) return put(queued(stage, now, index+1))
  if (stage === 'invite') return put({stage:'calling',pending:{index:0,dueAt:now+1600}})
  if (stage === 'export') return put({stage:'attachment'})
  if (stage === 'relay') {
    save=relay(save,'sophie','maya','I’ve been talking to them about the contact export. You can message them about the conversation you found.',now)
    save={...save,deliveredEvents:[...new Set([...save.deliveredEvents,'TA-S07-COMPLETE','TA-S07-SCENE08-UNLOCKED'])]}
    return put({stage:'done'},{phase:'complete'})
  }
  return put({stage})
}

export function resumeHistoricalSophieChat(save:GameSave,p:MasterScene07,now:number): GameSave {
  if(p.phase!=='attachment'||p.chat||p.privacy||p.saved||p.exportStatus==='deferred'||!p.opened||!p.questioned)return save
  return {...save,masterScene07:{...p,chat:queued('opened',now)}}
}

export function validateSophieChat(p: MasterScene07): boolean {
  const chat=p.chat
  if(!chat)return p.conversationRevision!=='conversation-v3'
  if(![...Object.keys(sophieScene07Chat),'calling','call','attachment','deferred','done'].includes(chat.stage))return false
  if(chat.stage==='calling')return p.phase==='chat'&&chat.pending?.index===0&&Number.isFinite(chat.pending.dueAt)&&chat.draft===undefined
  if(chat.pending){
    const lines=sophieScene07Chat[chat.stage as Beat]
    if(!lines||!Number.isInteger(chat.pending.index)||!lines[chat.pending.index]||!Number.isFinite(chat.pending.dueAt))return false
  }else if(['invite','export','relay'].includes(chat.stage))return false
  if(chat.draft!==undefined&&(!Number.isInteger(chat.draft)||!sophieChatChoices(chat)[chat.draft]))return false
  if(chat.stage==='done')return p.phase==='complete'&&p.opened&&p.questioned
  if(chat.stage==='intro'||chat.stage==='invite')return p.phase==='chat'
  if(chat.stage==='call')return ['ringing','missed','playing','waiting'].includes(p.phase)
  return p.phase==='attachment'
}
