import { traceTools, type TraceToolId } from '../content/traceTools'
import { archiveInstalled } from './archiveOrigin'
import { canStartAccessRecovery } from './chapter2Access'
import type { GameSave } from './types'

/** Read-only projection of existing story gates; no new unlock flags or migration.
 * Future modules stay locked until an authored capability and its reducer exist.
 * Availability never authorizes a source read, recovery completion or disclosure.
 */
export function traceToolAvailable(save: GameSave, id: TraceToolId): boolean {
  if (!archiveInstalled(save)) return false
  switch (id) {
    case 'evidence-vault': return true
    case 'file-recovery': return canStartAccessRecovery(save) || !!save.chapter2Access?.recovery
    case 'record-comparison': return ['public', 'index'].every(flag => save.chapter1?.versionHistory?.flags.includes(flag))
    default: return false
  }
}

export const traceToolStates = (save: GameSave) => traceTools.map(tool => ({ ...tool, available: traceToolAvailable(save, tool.id) }))
