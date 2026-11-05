import { naturalDeskAck, naturalDeskInstruction, naturalInquiryChoice, naturalInquiryOffer } from '../content/naturalConversation'
import type { GameSave } from './types'

export const investigationLocksApply=(s:GameSave)=>s.prologue?.scene01?.articleAlignment==='2026-10-28'&&s.chapter1?.versionHistory?.revision==='conversation-2026-10-28'
export const naturalConversation=(s:GameSave)=>s.prologue?.scene01?.articleAlignment==='2026-10-28'&&s.prologue.scene01.naturalFlowRevision==='2026-11-03'
export const naturalCore=(s:GameSave)=>!!s.chapter1?.versionHistory?.flags.includes('natural_flow')
function received(s:GameSave,id:string){return s.deliveredEvents.includes(id)&&!!s.chapter1?.versionHistory?.receipts?.some(r=>r.eventId===id&&r.recipient==='player')}
function sent(s:GameSave,id:string,choice:string){const event=`${id}-PLAYER-${choice}`;return s.choices[id]===choice&&s.deliveredEvents.includes(event)&&!!s.chapter1?.versionHistory?.receipts?.some(r=>r.eventId===event&&r.recipient==='unknown')}
export function legitimateCompletedDesk(s:GameSave){const d=s.chapter1?.correctionsDesk;return !!d?.complete&&s.chapter1!.completed.includes(6)&&!!d.choices['S06-C14']}
export function canOpenScene6Register(s:GameSave):boolean {
  if(!s.chapter1?.versionHistory?.complete||s.chapter2Access)return false
  if(!investigationLocksApply(s))return true
  return legitimateCompletedDesk(s)||received(s,naturalDeskInstruction)&&['a','b','c'].some(c=>sent(s,naturalDeskAck,c))
}
export function canOpenPublisherInquiry(s:GameSave):boolean {
  if(!investigationLocksApply(s))return !!s.chapter1?.versionHistory
  return canOpenScene6Register(s)&&received(s,naturalInquiryOffer)&&sent(s,naturalInquiryChoice,'a')
}
export function hasPublisherReceipt(s:GameSave):boolean {
  const vh=s.chapter1?.versionHistory?.inquiry,desk=s.chapter1?.correctionsDesk?.inquiry
  return !!(vh?.status==='delivered'&&vh.receipt?.id==='R-GB-VH-001'&&s.deliveredEvents.includes(vh.receipt.id)||desk?.status==='delivered'&&desk.receipt?.id==='R-GB-CD-002'&&s.deliveredEvents.includes(desk.receipt.id))
}
