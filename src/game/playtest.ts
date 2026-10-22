/** Explicit packaged playtest; normal production keeps its original restrictions. */
export const playtestEnabled = import.meta.env.DEV || import.meta.env.VITE_GAME_PLAYTEST === 'true'
