import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, FileQuestion, Fingerprint, Link2, MapPinned, Network, ScanSearch, Unlink2, ZoomIn, ZoomOut } from 'lucide-react'
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { caseLinkAssessments, type CaseLinkAssessment, type MasterCaseFileAction, type MasterCaseFileView } from '../game/masterCaseFile'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import './master-case-file.css'

interface CaseModuleProps {
  caseFile: MasterCaseFileView
  onAction: (action: MasterCaseFileAction) => void
}

type CaseNode = MasterCaseFileView['nodes'][number]
type CaseQuestion = MasterCaseFileView['questions'][number]

const nodeTypes: Record<CaseNode['kind'], string> = {
  photo: 'Photograph', message: 'Message', note: 'Note', log: 'Activity log', finding: 'Finding', document: 'Document', statement: 'Testimony',
}

export function EvidenceComparison({ entries, children }: {
  entries: { title: string; description: string; source: string; image?: string; timestamp?: string }[]
  children?: ReactNode
}) {
  return <section className="trace-comparison" aria-label="Evidence comparison">
    <div>{entries.map(entry => <article key={entry.title}>
      <h3>{entry.title}</h3>
      {entry.image&&<img src={entry.image} alt={entry.title} loading="lazy"/>}
      <p>{entry.description}</p><small>{entry.source}</small>
      {entry.timestamp&&<small>{entry.timestamp}</small>}
    </article>)}</div>
    {children}
  </section>
}

function EvidenceImage({ node }: { node: CaseNode }) {
  const [unavailable, setUnavailable] = useState(false)
  if (!node.image) return null
  if (unavailable) return <span className="trace-case-image-fallback">Image unavailable</span>
  return <img src={node.image} alt={node.title} loading="lazy" onError={() => setUnavailable(true)} />
}

function QuestionWorkspace({ question, note, nodes, onAction }: {
  question: CaseQuestion
  note?: MasterCaseFileView['notes'][string]
  nodes: CaseNode[]
  onAction: CaseModuleProps['onAction']
}) {
  const [text, setText] = useState(note?.text ?? '')
  const [references, setReferences] = useState(note?.evidenceIds ?? [])
  const [counterEvidence, setCounterEvidence] = useState(note?.counterEvidenceIds ?? [])
  const [alternative, setAlternative] = useState(note?.alternative ?? '')
  const [saved, setSaved] = useState(false)
  return <details className="trace-case-question">
    <summary>{question.prompt}{note?.text && <small>Hypothesis saved</small>}</summary>
    <form onSubmit={event => {
      event.preventDefault()
      onAction({ type: 'save-note', questionId: question.id, text, evidenceIds: references, alternative, counterEvidenceIds: counterEvidence })
      setSaved(true)
    }}>
      <label>Private hypothesis
        <textarea value={text} maxLength={2000} rows={4} placeholder="Record an observation, a possible explanation or an alternative." onChange={event => { setText(event.target.value); setSaved(false) }} />
      </label>
      {nodes.length > 0 && <fieldset>
        <legend>Evidence references <span>Optional</span></legend>
        <div className="trace-case-references">
          {nodes.map(node => <label key={node.id}>
            <input type="checkbox" checked={references.includes(node.id)} disabled={counterEvidence.includes(node.id)} onChange={event => {
              setReferences(event.target.checked ? [...references, node.id] : references.filter(id => id !== node.id))
              setSaved(false)
            }} />
            {node.title}
          </label>)}
        </div>
      </fieldset>}
      <details>
        <summary>Alternative or contrary evidence</summary>
        <label>Alternative explanation<textarea value={alternative} maxLength={2000} rows={3} onChange={event => { setAlternative(event.target.value); setSaved(false) }}/></label>
        {nodes.length>0&&<label>Contrary evidence
          <select multiple size={3} value={counterEvidence} onChange={event => { setCounterEvidence(Array.from(event.target.selectedOptions, option => option.value)); setSaved(false) }}>
            {nodes.map(node=><option key={node.id} value={node.id} disabled={references.includes(node.id)}>{node.title}</option>)}
          </select>
        </label>}
      </details>
      <button type="submit" className="trace-case-button" disabled={!text.trim() && !note?.text}>Save hypothesis</button>
      {saved && <small className="trace-case-feedback" role="status">Private workspace updated.</small>}
    </form>
  </details>
}

export function MasterCaseFile({ caseFile, onAction, onOpenBoard }: CaseModuleProps & { onOpenBoard: () => void }) {
  const summary=caseFile.summary
  const evidenceNames=(ids:string[])=>ids.map(id=>caseFile.nodes.find(node=>node.id===id)?.title).filter(Boolean).join(' · ')
  return <section className="trace-module trace-case" aria-label="Case Files">
    <header className="trace-case-hero">
      <Fingerprint size={26} aria-hidden="true" />
      <div><small>CASE FILES / LOCAL RECORD</small><h1>{caseFile.title}</h1></div>
    </header>
    <dl className="trace-case-facts-grid">
      <div><dt>Subject</dt><dd>{caseFile.subject}</dd></div>
      <div><dt>Status</dt><dd className="trace-case-missing">{caseFile.status}</dd></div>
      <div><dt>Primary Contact</dt><dd>{caseFile.primaryContact}</dd></div>
      <div><dt>Investigation Status</dt><dd className="trace-case-active">{caseFile.investigationStatus}</dd></div>
    </dl>
    <section className="trace-case-panel">
      <h2>Known facts</h2>
      <ul>{caseFile.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
    </section>
    <section className="trace-case-panel">
      <h2>Discovered evidence</h2>
      {caseFile.nodes.length > 0
        ? <ul className="trace-case-evidence-list">{caseFile.nodes.map(node => <li key={node.id}>{node.title}<small>{nodeTypes[node.kind]}</small></li>)}</ul>
        : <p>Evidence you discover will appear here.</p>}
      <button className="trace-case-button" onClick={onOpenBoard}><Network size={17} aria-hidden="true" /> Open Investigation Board</button>
    </section>
    <section className="trace-case-panel">
      <h2>Open questions</h2>
      <p>Keep private hypotheses and cite evidence as the case develops. Revisit a question whenever you have something to add.</p>
      {caseFile.questions.map(question => <QuestionWorkspace key={question.id} question={question} note={caseFile.notes[question.id]} nodes={caseFile.nodes} onAction={onAction} />)}
    </section>
    {summary&&<section className="trace-case-panel" aria-label="Saved investigation summary">
      <h2>Saved investigation summary</h2><p>{caseFile.questions.find(question=>question.id===summary.questionId)?.prompt}</p><p>{summary.hypothesis}</p>
      {summary.alternative&&<p><strong>Alternative</strong> {summary.alternative}</p>}
      <p><strong>Supporting clues</strong> {evidenceNames(summary.supportingIds)}</p>
      {summary.contradictingIds.length>0&&<p><strong>Contrary clues</strong> {evidenceNames(summary.contradictingIds)}</p>}
      {summary.outstanding&&<p><strong>Still open</strong> {summary.outstanding}</p>}
    </section>}
    <aside className="trace-case-panel trace-case-guidance" aria-label="Optional investigation guidance">
      <details>
        <summary><FileQuestion size={18} aria-hidden="true" /> Investigation guidance <small>Optional</small></summary>
        <ul>{caseFile.questions.map(question => <li key={question.id}>{question.hint}</li>)}</ul>
      </details>
    </aside>
  </section>
}

const boardDirections = [
  { label: 'Move evidence left', icon: ArrowLeft, x: -10, y: 0 },
  { label: 'Move evidence up', icon: ArrowUp, x: 0, y: -10 },
  { label: 'Move evidence down', icon: ArrowDown, x: 0, y: 10 },
  { label: 'Move evidence right', icon: ArrowRight, x: 10, y: 0 },
]
const zoomLevels = [0.8, 1, 1.25]
const withinBoard = (coordinate: number) => Math.max(0, Math.min(100, coordinate))

export function MasterInvestigationBoard({ caseFile, onAction, onOpenCase }: CaseModuleProps & { onOpenCase: () => void }) {
  const [selection, setSelection] = useState('')
  const [connectionStart, setConnectionStart] = useState('')
  const [zoom, setZoom] = useState(1)
  const [comparison, setComparison] = useState('')
  const [photo, setPhoto] = useState<CaseNode>()
  const [dragPosition, setDragPosition] = useState<{ id: string; x: number; y: number }>()
  const plane = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: string; pointer: number; x: number; y: number; start: CaseNode['position'] } | null>(null)
  const scale = zoomLevels[zoom]
  const rows = Math.ceil(caseFile.nodes.length / 3)
  const wallStyle = { '--board-scale': scale, minWidth: `${500 * scale}px`, height: `${(160 + 140 * Math.max(1, rows - 1)) * scale}px` } as CSSProperties
  const nodesById = new Map(caseFile.nodes.map(node => [node.id, node]))
  const selected = nodesById.get(selection)
  const compared = nodesById.get(comparison)
  const origin = nodesById.get(connectionStart)
  const linked = selected && origin && caseFile.links.some(({ from, to }) =>
    (from === selected.id && to === origin.id) || (from === origin.id && to === selected.id),
  )
  const toggleConnection = (from: string, to: string) => {
    onAction({ type: 'toggle-link', from, to })
    setConnectionStart('')
  }
  const positionFor = (node: CaseNode) => dragPosition?.id === node.id ? dragPosition : node.position
  const startDrag = (event: PointerEvent<HTMLButtonElement>, node: CaseNode) => {
    if (event.button !== 0 || !event.isPrimary) return
    drag.current = { id: node.id, pointer: event.pointerId, x: event.clientX, y: event.clientY, start: node.position }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const dragAt = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current
    const bounds = plane.current?.getBoundingClientRect()
    if (!state || state.pointer !== event.pointerId || !bounds?.width || !bounds.height) return
    const dx = event.clientX - state.x, dy = event.clientY - state.y
    if (Math.hypot(dx, dy) < 5) return
    return { id: state.id, x: withinBoard(state.start.x + dx / bounds.width * 100), y: withinBoard(state.start.y + dy / bounds.height * 100) }
  }
  const endDrag = (event: PointerEvent<HTMLButtonElement>, save: boolean) => {
    if (drag.current?.pointer !== event.pointerId) return
    const position = save ? dragAt(event) : undefined
    drag.current = null
    setDragPosition(undefined)
    if (position) {
      setSelection(position.id)
      onAction({ type: 'move-node', ...position })
    }
  }

  return <section className="trace-module trace-case" aria-label="Investigation Board">
    <header className="trace-case-hero">
      <Network size={26} aria-hidden="true" />
      <div><small>CASE FILE 001 / PRIVATE BOARD</small><h1>Investigation Board</h1></div>
    </header>
    <p>Select evidence to see its source. Drag a pin or use the position controls. Connections record your own assessment.</p>
    {caseFile.nodes.length === 0 ? <div className="trace-empty"><ScanSearch aria-hidden="true" /><p>No evidence discovered yet.</p></div> : <>
      <div className="trace-board-toolbar">
        <label>Evidence index <select value={selection} onChange={event => setSelection(event.target.value)}>
          <option value="">Choose evidence</option>
          {caseFile.nodes.map(node => <option value={node.id} key={node.id}>{node.title}</option>)}
        </select></label>
        <div className="trace-board-controls" aria-label="Board zoom">
          <button className="trace-case-button" aria-label="Zoom out" disabled={zoom === 0} onClick={() => setZoom(zoom - 1)}><ZoomOut size={17} aria-hidden="true" /></button>
          <output aria-label="Zoom level">{scale * 100}%</output>
          <button className="trace-case-button" aria-label="Zoom in" disabled={zoom === zoomLevels.length - 1} onClick={() => setZoom(zoom + 1)}><ZoomIn size={17} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="trace-board-viewport" tabIndex={0} aria-label="Scrollable evidence wall">
        <div className="trace-board-wall" style={wallStyle}>
          <div className="trace-board-plane" ref={plane}>
            <svg className="trace-board-strings" aria-hidden="true">
              {caseFile.links.map(({ from, to }) => {
                const a = nodesById.get(from), b = nodesById.get(to)
                if(!a||!b)return null
                const start=positionFor(a), end=positionFor(b)
                return <line key={`${from}-${to}`} x1={`${start.x}%`} y1={`${start.y}%`} x2={`${end.x}%`} y2={`${end.y}%`} />
              })}
            </svg>
            {caseFile.nodes.map(node => <button type="button" className="trace-board-node" key={node.id}
              aria-label={`Select evidence: ${node.title}`} aria-pressed={selection === node.id}
              data-connection-origin={connectionStart === node.id || undefined}
              style={{ left: `${positionFor(node).x}%`, top: `${positionFor(node).y}%` }}
              onPointerDown={event=>startDrag(event,node)}
              onPointerMove={event=>{if(drag.current?.pointer===event.pointerId)setDragPosition(dragAt(event))}}
              onPointerUp={event=>endDrag(event,true)}
              onPointerCancel={event=>endDrag(event,false)}
              onClick={() => setSelection(node.id)}>
              <span className="trace-board-pin" aria-hidden="true" />
              <EvidenceImage node={node} />
              <small>{nodeTypes[node.kind]}</small><strong>{node.title}</strong>
            </button>)}
          </div>
        </div>
      </div>
      {selected && <section className="trace-case-panel trace-board-inspector" aria-label="Selected evidence">
        <div className="trace-board-inspector-top"><MapPinned size={20} aria-hidden="true" /><div><small>{nodeTypes[selected.kind]}</small><h2>{selected.title}</h2></div></div>
        <EvidenceImage key={selected.id} node={selected} />
        {selected.image&&<button className="trace-case-button" onClick={()=>setPhoto(selected)}>Enlarge source image</button>}
        <p>{selected.description}</p>
        <dl><div><dt>Source</dt><dd>{selected.source}</dd></div>{selected.timestamp && <div><dt>Source timestamp</dt><dd>{selected.timestamp}</dd></div>}</dl>
        {caseFile.nodes.length>1&&<label>Compare with <select value={comparison===selected.id?'':comparison} onChange={event=>setComparison(event.target.value)}>
          <option value="">Choose another clue</option>{caseFile.nodes.filter(node=>node.id!==selected.id).map(node=><option key={node.id} value={node.id}>{node.title}</option>)}
        </select></label>}
        {compared&&compared.id!==selected.id&&<EvidenceComparison entries={[selected,compared]}/>}
        <div className="trace-board-controls" aria-label="Evidence position">
          {boardDirections.map(({ label, icon: Icon, x, y }) => {
            const nextX = withinBoard(selected.position.x + x)
            const nextY = withinBoard(selected.position.y + y)
            return <button key={label} className="trace-case-button" aria-label={label} title={label}
              disabled={nextX === selected.position.x && nextY === selected.position.y}
              onClick={() => onAction({ type: 'move-node', id: selected.id, x: nextX, y: nextY })}><Icon size={17} aria-hidden="true" /></button>
          })}
        </div>
        {!origin && <button className="trace-case-button" disabled={caseFile.nodes.length < 2} onClick={() => setConnectionStart(selected.id)}><Link2 size={17} aria-hidden="true" /> Start a connection</button>}
        {origin && <div className="trace-board-connect">
          <p role="status">Connect {origin.title} to another clue. New connections start as tentative.</p>
          {selected.id !== origin.id && <button className="trace-case-button" disabled={linked} onClick={() => toggleConnection(origin.id, selected.id)}><Link2 size={17} aria-hidden="true" />{linked ? 'Already connected' : `Connect to ${selected.title}`}</button>}
          <button className="trace-case-button" onClick={() => setConnectionStart('')}>Cancel connection</button>
        </div>}
      </section>}
      <section className="trace-case-panel">
        <h2>Evidence connections</h2><p>These labels are your interpretation. Source provenance stays separate.</p>
        {caseFile.links.length === 0 ? <p>No connections proposed.</p> : <ul className="trace-case-connections">
          {caseFile.links.map(({ from, to, label, assessment }) => {
            const a = nodesById.get(from)
            const b = nodesById.get(to)
            return a && b && <li key={`${from}-${to}`}>
              <span>{a.title} <span aria-hidden="true">↔</span><span className="trace-case-sr-only"> and </span> {b.title}</span>
              <button className="trace-case-button" aria-label={`Remove connection between ${a.title} and ${b.title}`} onClick={() => toggleConnection(from, to)}><Unlink2 size={17} aria-hidden="true" /></button>
              <details className="trace-link-editor">
                <summary>{label ? `${label} · ${assessment ?? 'tentative'}` : `Edit ${assessment ?? 'tentative'} connection`}</summary>
                <form onSubmit={event=>{
                  event.preventDefault()
                  const fields=new FormData(event.currentTarget)
                  onAction({type:'update-link',from,to,label:String(fields.get('label')??''),assessment:fields.get('assessment') as CaseLinkAssessment})
                }}>
                  <label>Relationship label<input name="label" maxLength={120} defaultValue={label}/></label>
                  <label>Player assessment<select name="assessment" defaultValue={assessment??'tentative'}>
                    {caseLinkAssessments.map(value=><option key={value} value={value}>{value}</option>)}
                  </select></label>
                  <button type="submit" className="trace-case-button">Save connection</button>
                </form>
              </details>
            </li>
          })}
        </ul>}
      </section>
    </>}
    <button className="trace-case-button" onClick={onOpenCase}><ArrowLeft size={17} aria-hidden="true" /> Open Case File 001</button>
    {photo?.image&&<ChatPhotoViewer src={photo.image} alt={photo.title} onClose={()=>setPhoto(undefined)}/>}
  </section>
}
