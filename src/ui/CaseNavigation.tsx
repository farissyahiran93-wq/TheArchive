import { createContext, useContext } from 'react'
import type { FollowupContact } from '../content/characterFollowups'

export const CaseNavigation = createContext({ openMaya: () => {}, openSophie: () => {}, openCharacter: (_contact: FollowupContact | 'unknown') => {}, openBulletin: () => {}, openArchive: () => {}, openPublicArticle: () => {}, openGroup: () => {} })
export const useCaseNavigation = () => useContext(CaseNavigation)
