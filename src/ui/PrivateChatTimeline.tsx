import type { ReactNode } from 'react'
import { CharacterAvatar } from './CharacterAvatar'
import './private-chat-timeline.css'

type ChatLine = { id: string; sender: string; text: string }

export function PrivateChatTimeline<T extends ChatLine>({ lines, character, renderContent, typing, actorName }: {
  lines: readonly T[]
  character: 'sophie' | 'maya' | 'lucas' | 'unknown'
  renderContent?: (line: T) => ReactNode
  typing?: boolean
  actorName?: string
}) {
  const name = actorName ?? (character === 'unknown' ? 'Unknown' : character[0].toUpperCase() + character.slice(1))
  return <>
    {lines.map((line, index) => {
      const player = line.sender === 'player'
      const startsRun = lines[index - 1]?.sender !== line.sender
      return <div key={line.id} data-message-id={line.id} className={`conversation-line chat-run-line ${startsRun ? 'new-run' : 'same-run'} ${player ? 'outgoing' : 'incoming'}`}>
        {!player && (startsRun
          ? <CharacterAvatar character={character} className="message-avatar"/>
          : <span className="chat-avatar-space" aria-hidden="true"/>)}
        <div className="conversation-body">{renderContent?.(line) ??
          <div className={`opening-bubble ${player ? 'player' : 'sophie'}`}>{line.text}</div>}</div>
      </div>
    })}
    {typing && <div key={lines.at(-1)?.id ?? 'typing'} className={`opening-v4-typing ${lines.at(-1)?.sender === character ? 'chat-typing-gap' : ''}`} role="status" aria-label={`${name} is typing`}>
      <CharacterAvatar character={character} className="message-avatar"/><span className="typing-dots" aria-hidden="true"><i/><i/><i/></span>
    </div>}
  </>
}
