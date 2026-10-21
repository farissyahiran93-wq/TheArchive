import { useState } from 'react'
import { artworkForCharacter } from '../content/characters'

/** Identity illustration only. Unknown senders keep their existing anonymous fallback. */
export function CharacterAvatar({ character, fallback = '?', className = '' }: { character: string; fallback?: string; className?: string }) {
  const artwork = artworkForCharacter(character)
  const [failed, setFailed] = useState('')
  return <span className={`character-avatar ${className}`} aria-hidden="true">{artwork && failed !== artwork.avatar ? <img src={artwork.avatar} alt="" loading="lazy" decoding="async" onError={() => setFailed(artwork.avatar)}/> : fallback}</span>
}
