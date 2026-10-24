import type { GameSave } from './types'

export type PhoneNotice = { id: string; title: string; text: string; thread: 'unknown' | 'sophie' | 'group' | 'maya' | 'lucas' | 'eli' | 'nora' | 'archive' | 'alerts' | 'eli-lucas' | 'maya-lucas'; avatar: string }
const names: Record<string, string> = { sophie: 'Sophie Mercer', maya: 'Maya Chen', lucas: 'Lucas Grey', eli: 'Eli Ward', nora: 'Nora Vance', relay: 'Relay' }
/** Presentation of delivered events only; never advances story or grants knowledge. */
export function phoneNotices(save: GameSave): PhoneNotice[] {
  const scene = save.prologue?.scene01
  if (scene) {
    const incoming: PhoneNotice[] = scene.messages.filter(line => line.sender === 'sophie').map(line => ({ id: line.id, title: scene.introduced ? 'Sophie' : 'Unknown number', text: line.text, thread: 'sophie', avatar: scene.introduced ? 'sophie' : 'unknown' }))
    for(const line of save.chapter1?.sender.messages??[])if(line.sender==='unknown')incoming.push({id:line.id,title:scene.scriptRevision?'Unknown Number':'Unknown Sender',text:line.text,thread:'unknown',avatar:'unknown'})
    for(const line of save.messages)if(line.id.startsWith('CH1-')&&line.sender!=='player'&&['nora','eli','maya','lucas'].includes(line.sender))incoming.push({id:line.id,title:names[line.sender],text:line.text,thread:line.sender as PhoneNotice['thread'],avatar:line.sender})
    incoming.push(...scene.groupMessages.filter(line => line.sender !== 'system' && line.sender !== 'player').map(line => ({ id: line.id, title: 'FIND DANIEL', text: `${line.sender[0].toUpperCase() + line.sender.slice(1)}: ${line.text}`, thread: 'group' as const, avatar: line.sender })))
    if (scene.invitation === 'ready' || scene.invitation === 'declined') incoming.push({ id: scene.invitation === 'ready' ? 'OPEN-S01-INVITATION' : 'OPEN-S01-DECLINED', title: 'Sophie', text: 'Group invitation · FIND DANIEL', thread: 'sophie', avatar: 'sophie' })
    for (const line of save.chapter2Access?.messages ?? []) if (line.sender === 'unknown') incoming.push({ id: line.id, title: 'Unknown', text: line.text, thread: 'unknown', avatar: 'unknown' })
    for (const line of save.chapter2Access?.groupMessages ?? []) if(!['system','player'].includes(line.sender)) incoming.push({ id: line.id, title: 'FIND DANIEL', text: `${names[line.sender] ?? line.sender}: ${line.text}`, thread: 'group', avatar: line.sender })
    for (const n of save.notifications) if (['scene04_archive_index_available','C2-INTEGRATION','C2-MIRROR-HINT','C2S11_AVAILABLE','C2S13_RECOVERY_READY'].includes(n.id)) incoming.push({ id: n.id, title: n.id === 'C2-INTEGRATION' ? 'Messages' : 'THE ARCHIVE', text: n.text, thread: n.id === 'C2-INTEGRATION' ? 'alerts' : 'archive', avatar: 'unknown' })
    for(const who of ['maya','eli','sophie','lucas','nora'] as const)for(const line of save.chapter2Access?.story?.privateMessages[who]??[])if(line.sender===who)incoming.push({id:line.id,title:names[who],text:line.text,thread:who,avatar:who})
    for(const id of ['eli-lucas','maya-lucas'] as const){const notice=save.notifications.find(n=>n.id===(id==='eli-lucas'?'C2-SPY-ELI-UNLOCK':'C2-SPY-MAYA-UNLOCK'));if(notice)incoming.push({id:notice.id,title:'SPY · READ ONLY',text:notice.text,thread:id,avatar:'unknown'})}
    return incoming
  }
  const identified = save.deliveredEvents.some(id => id.startsWith('OPEN-V4-FIRST-ANSWER-')) || save.prologue?.restored || !!save.prologue && save.prologue.dialogueVersion !== 4
  const notices: PhoneNotice[] = []
  for (const line of save.prologue?.messages ?? []) if (line.sender !== 'player' && line.id !== 'OPEN-V4-FIRST-PAGE') notices.push({ id: line.id, title: identified ? names.sophie : 'Unknown number', text: line.text, thread: 'sophie', avatar: identified ? 'sophie' : 'unknown' })
  for (const line of save.prologue?.social?.messages ?? []) if (line.sender !== 'player' && line.sender !== 'system') notices.push({ id: line.id, title: 'FIND DANIEL', text: `${names[line.sender] ?? line.sender}: ${line.text}`, thread: 'group', avatar: line.sender })
  for (const line of save.messages) if (['maya','sophie','lucas','eli','nora'].includes(line.sender)) notices.push({ id: line.id, title: names[line.sender], text: line.text, thread: line.sender as PhoneNotice['thread'], avatar: line.sender })
  for (const line of save.prologue?.recoverySequence?.messages ?? []) if (line.sender === 'relay') notices.push({ id: line.id, title: 'MIRROR', text: line.text, thread: 'archive', avatar: 'unknown' })
  for (const item of save.notifications) if (item.id === 'OPEN-GROUP-ADD' || item.id === 'OPEN-V4-PENDING-RECOVERY') notices.push({ id: item.id, title: item.id === 'OPEN-GROUP-ADD' ? 'FIND DANIEL' : 'Connection request', text: item.text, thread: item.id === 'OPEN-GROUP-ADD' ? 'group' : 'alerts', avatar: item.id === 'OPEN-GROUP-ADD' ? 'sophie' : 'unknown' })
  return [...new Map(notices.map(item => [item.id, item])).values()]
}

export function openingPresence(save: GameSave, person: string): 'online' | 'offline' {
  const presence=save.chapter2Access?.story?.presence
  if(presence && Object.hasOwn(presence,person))return presence[person as 'maya']?'online':'offline'
  if(person==='sophie'&&!save.chapter2Access&&save.pendingEvents.some(e=>['CH1-SENDER-SOPHIE','CH1-ELI-INTRO','CH1-S04-LEAD','CH1-S04-FOLLOWUP'].includes(e.id)))return 'online'
  const opening = save.prologue
  if (!opening) return 'offline'
  if (opening.scene01) {
    if (save.chapter2Access?.groupMessages.some(m => m.sender === person)) return 'online'
    if (person === 'sophie' && !!save.chapter1?.publicStory?.reading && !save.chapter1.publicStory.complete && !['OPEN-S04-ARCHIVE-GATE','OPEN-S04-FOLLOWUP-WAIT','OPEN-S04-C10','OPEN-S04-C11','OPEN-S04-INDEX-ACK','OPEN-S04-RETURN-DEVICE'].includes(opening.scene01.nodeId)) return 'online'
    if (person === 'sophie' && opening.scene01.privateScene03?.complete) return 'offline'
    if (person === 'sophie' && opening.scene01.privateHandoff?.deliveredAt !== undefined) return 'online'
    if (opening.scene01.groupScript && ['sophie','maya','lucas'].includes(person)) return opening.scene01.groupPresence?.[person as 'sophie'] ? 'online' : 'offline'
    return person === 'sophie' && (opening.scene01.queue.length || !['declined','ready','joined'].includes(opening.scene01.invitation) && !opening.scene01.complete) ? 'online' : 'offline'
  }
  if (opening.social?.queue?.some(line => line.sender === person)) return 'online'
  if (person === 'sophie') return opening.queue?.length || opening.privateBeat || opening.social?.phase === 'second' || opening.beat && opening.beat !== 'ready' || opening.v4Beat && ['first','name','address','question','invite'].includes(opening.v4Beat) ? 'online' : 'offline'
  return opening.stage === 'group' && !!opening.social?.members.includes(person as 'maya') && opening.social.phase !== 'departure' ? 'online' : 'offline'
}
