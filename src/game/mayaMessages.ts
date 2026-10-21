import type { GameSave } from './types'

/** Read old mixed-channel check-ins without migrating saves or copying Bulletin tips. */
export function mayaMessages(save: GameSave) {
  if (!save.deliveredEvents.includes('CONN-E01-01')) return []
  const sent = new Set(save.messages.filter(message => message.sender === 'player' && message.recipient === 'maya' && message.channel === 'messages').map(message => message.id))
  return save.messages.filter(message => {
    if (message.sender !== 'maya' && message.recipient !== 'maya') return false
    if (message.channel === 'messages') return true
    const legacyReply = message.sender === 'maya' && message.id.match(/^EV-E01-P03B:(P-S25-[A-H]|C03-FRAME\.[ABC]):\d+$/)
    return !!legacyReply && sent.has(`player.${legacyReply[1]}`)
  })
}
