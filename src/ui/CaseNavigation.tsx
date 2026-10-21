import { createContext, useContext } from 'react'
import type { FollowupContact } from '../content/characterFollowups'

export const CaseNavigation = createContext({ openMaya: () => {}, openSophie: () => {}, openCharacter: (_contact: FollowupContact) => {}, openBulletin: () => {} })
export const useCaseNavigation = () => useContext(CaseNavigation)
