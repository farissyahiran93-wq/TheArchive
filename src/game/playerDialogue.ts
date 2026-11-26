import type { Pronouns } from './types'

type Identity = { name: string; pronouns?: Pronouns }

/** Interpolate only explicitly authored player references; never rewrite existing prose. */
export function playerDialogue(text: string, identity: Identity): string {
  const profile = identity.pronouns === 'he/him'
    ? { title: 'Mr.', subject: 'he', object: 'him', possessive: 'his', possessivePronoun: 'his', reflexive: 'himself', subjectIs: "he's" }
    : identity.pronouns === 'she/her'
      ? { title: 'Ms.', subject: 'she', object: 'her', possessive: 'her', possessivePronoun: 'hers', reflexive: 'herself', subjectIs: "she's" }
      : { title: '', subject: 'they', object: 'them', possessive: 'their', possessivePronoun: 'theirs', reflexive: 'themself', subjectIs: "they're" }
  const values: Record<string, string> = { PlayerName: identity.name, PLAYER_NAME: identity.name, PlayerTitle: profile.title, playerTitle: profile.title, ...profile,
    Subject: profile.subject[0].toUpperCase() + profile.subject.slice(1),
    Possessive: profile.possessive[0].toUpperCase() + profile.possessive.slice(1),
    SubjectIs: profile.subjectIs[0].toUpperCase() + profile.subjectIs.slice(1) }
  return text.replace(/\[(PlayerName|PLAYER_NAME|PlayerTitle|playerTitle|subject|Subject|object|possessive|Possessive|possessivePronoun|reflexive|subjectIs|SubjectIs)\]/g, (_, key: string) => values[key])
}
