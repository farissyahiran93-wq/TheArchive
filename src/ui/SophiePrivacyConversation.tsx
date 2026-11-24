import { sophieChatChoices } from '../game/sophieScene07Chat'
import { Send } from 'lucide-react'
import { sophiePrivacyChoices } from '../content/masterScene07'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { chatGroup } from './chatGrouping'

export function SophiePrivacyMessages(){
 const privacy=useGameStore(s=>s.save.masterScene07?.privacy)
 if(!privacy)return null
 return <section aria-label="Sophie private discussion">{privacy.messages.map((line,index)=><div key={line.id} className={`conversation-line ${line.sender==='player'?'outgoing':'incoming'} ${chatGroup(privacy.messages,index).className}`}>
  {line.sender==='sophie'&&chatGroup(privacy.messages,index).last&&<span className="chat-contact-avatar"><CharacterAvatar character="sophie" fallback="S" className="message-avatar"/></span>}<div className="conversation-body"><div className={`opening-bubble ${line.sender==='player'?'player':'sophie'}`}>{line.text}</div></div>
 </div>)}{privacy.pending&&<div className="opening-v4-typing" role="status" aria-label="Sophie is typing"><CharacterAvatar character="sophie" fallback="S" className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}</section>
}
export function SophiePrivacyComposer(){
 const chat=useGameStore(s=>s.save.masterScene07?.chat)
 const privacy=useGameStore(s=>s.save.masterScene07?.privacy),act=useGameStore(s=>s.masterScene07Action)
 const choices=chat?sophieChatChoices(chat):privacy?.stage==='choice'&&!privacy.pending?sophiePrivacyChoices:[]
 if(!choices.length)return null
 const draft=chat?.draft??privacy?.draft
 return <div className="opening-actions opening-v4-composer" aria-label="Reply to Sophie"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{choices.map((text,index)=><button key={text} className={`opening-choice ${draft===index?'selected':''}`} aria-pressed={draft===index} onClick={()=>act({type:chat?'chat-draft':'privacy-draft',index})}>{text}</button>)}</div><button className="opening-primary" disabled={draft===undefined} onClick={()=>act({type:chat?'chat-send':'privacy-send'})}><Send size={17}/> Send</button></div>
}
