import { readMenuPreferences } from '../game/menuPreferences'
import { currentObjective } from '../game/guidance'
import { traceToolStates } from '../game/traceTools'
import type { GameSave } from '../game/types'
import { GuidanceDot } from './GuidanceDot'
import './trace-tools.css'

/** Capability summary; navigation and all actions remain in the existing workspaces. */
export function TraceTools({ save }: { save: GameSave }) {
  return <><details className="trace-tools"><summary>TRACE tools · Access overview</summary>
    <ul>{traceToolStates(save).map(tool => <li key={tool.id}>
      <div><strong>{tool.label}</strong><small>{tool.available ? 'AVAILABLE' : 'LOCKED'}</small></div>
      {tool.available && <p>{tool.description}</p>}
    </li>)}</ul>
  </details></>
}

export function CurrentLead({ save }: { save: GameSave }) {
  void save
  return null
}

/** Legacy views retain decorative dots without adding an instruction panel. */
export function GuidanceMark({ save, title }: { save: GameSave; title: string }) {
  return <GuidanceDot save={save} active={readMenuPreferences().guidance === 'on' && currentObjective(save)?.title === title}/>
}
