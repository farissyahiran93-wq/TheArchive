/** Final releases opt out of testing controls while playtest builds retain them. */
export const developmentToolsEnabled = import.meta.env?.VITE_FINAL_RELEASE !== 'true'
