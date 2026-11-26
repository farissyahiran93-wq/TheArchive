/** Explicit packaged playtest; normal production keeps its original restrictions. */
import { developmentToolsEnabled } from './development'
export const playtestEnabled = developmentToolsEnabled && (import.meta.env.DEV || import.meta.env.VITE_GAME_PLAYTEST === 'true')
