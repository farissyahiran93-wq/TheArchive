import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, FileQuestion, Fingerprint, Link2, MapPinned, Network, ScanSearch, Unlink2, ZoomIn, ZoomOut } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import type { MasterCaseFileAction, MasterCaseFileView } from '../game/masterCaseFile'
import './master-case-file.css'

interface CaseModuleProps {
  caseFile: MasterCaseFileView
  onAction: (action: MasterCaseFileAction) => void
}

type CaseNode = MasterCaseFileView['nodes'][number]
type CaseQuestion = MasterCaseFileView['questions'][number]

const nodeTypes: Record<CaseNode['kind'], string> = {
  photo: 'Photograph', message: 'Message', note: 'Note', log: 'Activity log', finding: 'Finding', document: 'Document',
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
  const [saved, setSaved] = useState(false)
  return <details className="trace-case-question">
    <summary>{question.prompt}{note?.text && <small>Hypothesis saved</small>}</summary>
    <form onSubmit={event => {
      event.preventDefault()
      onAction({ type: 'save-note', questionId: question.id, text, evidenceIds: references })
      setSaved(true)
    }}>
      <label>Private hypothesis
        <textarea value={text} maxLength={2000} rows={4} placeholder="Record an observation, a possible explanation or an alternative." onChange={event => { setText(event.target.value); setSaved(false) }} />
      </label>
      {nodes.length > 0 && <fieldset>
        <legend>Evidence references <span>Optional</span></legend>
        <div className="trace-case-references">
          {nodes.map(node => <label key={node.id}>
            <input type="checkbox" checked={references.includes(node.id)} onChange={event => {
              setReferences(event.target.checked ? [...references, node.id] : references.filter(id => id !== node.id))
              setSaved(false)
            }} />
            {node.title}
          </label>)}
        </div>
      </fieldset>}
      <button type="submit" className="trace-case-button" disabled={!text.trim() && !note?.text}>Save hypothesis</button>
      {saved && <small className="trace-case-feedback" role="status">Private workspace updated.</small>}
    </form>
  </details>
}

export function MasterCaseFile({ caseFile, onAction, onOpenBoard }: CaseModuleProps & { onOpenBoard: () => void }) {
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
  const scale = zoomLevels[zoom]
  const rows = Math.ceil(caseFile.nodes.length / 3)
  const wallStyle = { '--board-scale': scale, minWidth: `${500 * scale}px`, height: `${(160 + 140 * Math.max(1, rows - 1)) * scale}px` } as CSSProperties
  const nodesById = new Map(caseFile.nodes.map(node => [node.id, node]))
  const selected = nodesById.get(selection)
  const origin = nodesById.get(connectionStart)
  const linked = selected && origin && caseFile.links.some(({ from, to }) =>
    (from === selected.id && to === origin.id) || (from === origin.id && to === selected.id),
  )
  const toggleConnection = (from: string, to: string) => {
    onAction({ type: 'toggle-link', from, to })
    setConnectionStart('')
  }

  return <section className="trace-module trace-case" aria-label="Investigation Board">
    <header className="trace-case-hero">
      <Network size={26} aria-hidden="true" />
      <div><small>CASE FILE 001 / PRIVATE BOARD</small><h1>Investigation Board</h1></div>
    </header>
    <p>Select evidence to see its source. Link two clues to keep track of a possible relationship.</p>
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
          <div className="trace-board-plane">
            <svg className="trace-board-strings" aria-hidden="true">
              {caseFile.links.map(({ from, to }) => {
                const a = nodesById.get(from)?.position
                const b = nodesById.get(to)?.position
                return a && b && <line key={`${from}-${to}`} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`} />
              })}
            </svg>
            {caseFile.nodes.map(node => <button type="button" className="trace-board-node" key={node.id}
              aria-label={`Select evidence: ${node.title}`} aria-pressed={selection === node.id}
              data-connection-origin={connectionStart === node.id || undefined}
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
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
        <p>{selected.description}</p>
        <dl><div><dt>Source</dt><dd>{selected.source}</dd></div>{selected.timestamp && <div><dt>Source timestamp</dt><dd>{selected.timestamp}</dd></div>}</dl>
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
          <p role="status">Connect {origin.title} to another clue. Connections are tentative.</p>
          {selected.id !== origin.id && <button className="trace-case-button" disabled={linked} onClick={() => toggleConnection(origin.id, selected.id)}><Link2 size={17} aria-hidden="true" />{linked ? 'Already connected' : `Connect to ${selected.title}`}</button>}
          <button className="trace-case-button" onClick={() => setConnectionStart('')}>Cancel connection</button>
        </div>}
      </section>}
      <section className="trace-case-panel">
        <h2>Tentative connections</h2>
        {caseFile.links.length === 0 ? <p>No connections proposed.</p> : <ul className="trace-case-connections">
          {caseFile.links.map(({ from, to }) => {
            const a = nodesById.get(from)
            const b = nodesById.get(to)
            return a && b && <li key={`${from}-${to}`}>
              <span>{a.title} <span aria-hidden="true">↔</span><span className="trace-case-sr-only"> and </span> {b.title}</span>
              <button className="trace-case-button" aria-label={`Remove connection between ${a.title} and ${b.title}`} onClick={() => toggleConnection(from, to)}><Unlink2 size={17} aria-hidden="true" /></button>
            </li>
          })}
        </ul>}
      </section>
    </>}
    <button className="trace-case-button" onClick={onOpenCase}><ArrowLeft size={17} aria-hidden="true" /> Open Case File 001</button>
  </section>
}
