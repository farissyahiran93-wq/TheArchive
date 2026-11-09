import { useState, type ReactNode } from 'react'
import { assessmentLabel, type StatementAssessment } from '../content/masterSceneAssessments'
import './master-assessment.css'

export function MasterStatementAssessment({ options, saved, savedId, legacyFinding, onSave, compare, saveLabel }: {
  options: readonly StatementAssessment[]
  saved: boolean
  savedId?: string
  legacyFinding?: string
  onSave: (id: string) => void
  compare: (assessment: StatementAssessment) => ReactNode
  saveLabel: string
}) {
  const [draft, setDraft] = useState('')
  const selected = options.find(item => item.id === (savedId ?? draft))
  return <div className="trace-assessment">
    {!saved && <fieldset><legend>Choose a point to compare</legend>{options.map(option =>
      <button key={option.id} type="button" className="trace-action" aria-pressed={draft === option.id} onClick={() => setDraft(option.id)}>{option.title}</button>,
    )}</fieldset>}
    {selected && <><div className="trace-assessment-sources">{compare(selected)}</div><section className="trace-summary"><strong>{assessmentLabel(selected.outcome)}</strong><p>{selected.finding}</p></section></>}
    {saved && <p role="status">Private finding saved.{!savedId && legacyFinding ? ` ${legacyFinding}` : ''}</p>}
    {!saved && selected && <button type="button" className="trace-action" onClick={() => onSave(selected.id)}>{saveLabel}</button>}
  </div>
}
