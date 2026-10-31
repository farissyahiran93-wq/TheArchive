import { readMenuPreferences } from '../game/menuPreferences'
import { currentObjective } from '../game/guidance'
import { traceToolStates } from '../game/traceTools'
import type { GameSave } from '../game/types'
import './trace-tools.css'

/** Capability summary; navigation and all actions remain in the existing workspaces. */
export function TraceTools({ save }: { save: GameSave }) {
  return <><details className="trace-tools"><summary>TRACE tools · Access overview</summary>
    <ul>{traceToolStates(save).map(tool => <li key={tool.id}>
      <div><strong>{tool.label}</strong><small>{tool.available ? 'AVAILABLE' : 'LOCKED'}</small></div>
      {tool.available && <p>{tool.description}</p>}
    </li>)}</ul>
  </details><CurrentLead save={save}/></>
}

export function CurrentLead({ save }: { save: GameSave }) {
  const objective = currentObjective(save)
  return objective ? <section className="trace-lead" aria-label="Current lead"><h2>Current Lead</h2><small>{save.chapter2Access?'Chapter 2':'Chapter 1'}</small><br/><strong>{objective.title}</strong><p>{objective.detail}</p></section> : null
}

/** Detailed indicators are decorative; Current Lead supplies the accessible explanation. */
export function GuidanceMark({ save, title }: { save: GameSave; title: string }) {
  return readMenuPreferences().guidance === 'on' && currentObjective(save)?.title === title ? <span className="guidance-dot" aria-hidden="true"/> : null
}
