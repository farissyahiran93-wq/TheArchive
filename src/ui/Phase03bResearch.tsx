import { useState } from 'react'
import { useGameStore } from '../game/store'
import { s20Question, s23Results, s24Questions } from '../content/e01Phase03b'
import { DraftChoices, StageThread } from './Phase03bScenes'

const dates = [
  ['23 Nov 2019','Event described by the Bus 4 record'],
  ['24 Nov 2019 15:20','Verification stamp reported in the crop'],
  ['3 Oct 2026','Preview transfer to the Memory Project'],
  ['7 Oct 2026','Bulletin publication'],
]
const labels = [['event','Record event'],['stamp','Reported verification stamp'],['transfer','Image transfer'],['publication','Bulletin publication']]

export function PreviewDateScene() {
  const s = useGameStore(v => v.save.e01)!
  const record = useGameStore(v => v.recordS19Observation)
  const label = useGameStore(v => v.labelS19Date)
  const finish = useGameStore(v => v.finishS19)
  const [feedback,setFeedback] = useState('')
  return <><h2>The date printed on an image</h2><article className="utility-card"><h3>Older Bus 4 preview · source details</h3><p>Visible footer in crop: GH-NQ-BUS4-2019-11-23/v1 · VERIFIED 24 NOV 2019 15:20.</p><p>Carrier: cropped image transferred to the Memory Project on 3 Oct 2026. The audit original is not in this folder.</p></article><h3>What can you write down now?</h3><div className="choices"><button className="choice" onClick={() => { record('reported'); setFeedback('Saved as reported by E001. You have not authenticated the stamp.') }}>The preview displays a 24 Nov verification stamp.</button><button className="choice" onClick={() => { record('full'); setFeedback('That may be true, but this crop alone does not prove the full audit state. Save the stamp as a lead.') }}>The full v1 was verified at that time.</button><button className="choice" onClick={() => { record('publication'); setFeedback('The article is dated 7 Oct 2026. This footer claims a 2019 record event.') }}>This date is when Maya published the article.</button></div>{feedback && <p role="status" className="slice-feedback">{feedback}</p>}{s.s19Observation && <><h3>Label what each date belongs to</h3>{dates.map(([date,description],index) => <label className="utility-card phase-date-row" key={date}><strong>{date}</strong><small>{description}</small><select aria-label={`Label ${date}`} value={s.s19Dates?.[index] ?? ''} onChange={event => label(index,event.target.value)}><option value="">Choose carrier</option>{labels.map(([value,text]) => <option value={value} key={value}>{text}</option>)}</select></label>)}<p className="utility-note">Hint: 2019 event and reported stamp; 2026 image transfer and public post. A precise crop is still provisional.</p><button className="action-button slice-action" disabled={s.s19Dates?.join('|') !== 'event|stamp|transfer|publication'} onClick={finish}>Save date carriers</button></>}</>
}

export function RevisionNoticeScene() {
  const s = useGameStore(v => v.save.e01)!
  const hasChannel = useGameStore(v => v.save.deliveredEvents.includes('R01') && !!v.save.e01?.editorChecked)
  const inspect = useGameStore(v => v.inspectS20Notice)
  const answer = useGameStore(v => v.answerS20Approval)
  const [feedback,setFeedback] = useState('')
  return <><h2>A notice about change</h2><button className="choice" onClick={inspect}>Open civic portal revision history</button>{s.s20NoticeSeen && <><article className="utility-card"><small>E003 · CIVIC PORTAL VALIDATION DESK · PUBLIC NOTICE</small><h3>Revision history · GH-NQ-BUS4-2019-11-23</h3><p>v1 · verification recorded 24 Nov 2019 15:20.</p><p>v2 · correction approved 25 Nov 2019 08:40. Reference COR-20191125-B4.</p><p>Public reason: route reconciliation. Public view redacted. Approval and publication are separate steps; this notice does not display the publication actor.</p></article><p>The notice describes a workflow. It does not certify that the corrected description is historically accurate.</p>{hasChannel && <><StageThread stage="20"/>{!s.s20Share && <DraftChoices choices={s20Question} label="OPTIONAL QUESTION · SELECT THEN SEND"/>}</>}<h3>Which moment does 08:40 name?</h3><div className="choices"><button className="choice" onClick={() => answer('approval')}>Correction approval.</button><button className="choice" onClick={() => setFeedback('The route event was on 23 November. This is a record-workflow time on the 25th.')}>The bus departure.</button><button className="choice" onClick={() => setFeedback('The notice does not identify a publisher or publication hour. Do not merge those actions.')}>The instant Daniel published v2.</button></div>{feedback && <p role="status" className="slice-feedback">{feedback}</p>}</> }</>
}

export function TimelineScene() {
  const s = useGameStore(v => v.save.e01)!
  const place = useGameStore(v => v.placeS21Card)
  const reset = useGameStore(v => v.resetS21Order)
  const classify = useGameStore(v => v.classifyS21)
  const [feedback,setFeedback] = useState('')
  const order = s.s21Order ?? []
  return <><h2>Put the cards in order</h2><p>Tap the three dated statements from earliest to latest.</p><div className="choices">{[['verification','24 Nov 2019 15:20 · v1 verification shown on crop and notice'],['approval','25 Nov 2019 08:40 · v2 correction approval'],['event','23 Nov 2019 · Bus 4 record date']].map(([id,text]) => <button key={id} className="choice" disabled={order.includes(id)} onClick={() => place(id)}>{text}</button>)}</div><p className="utility-note">Your order: {order.length ? order.join(' → ') : 'no cards placed'}</p>{order.length > 0 && <button className="choice" onClick={reset}>Undo ordering</button>}{order.length === 3 && <p role="status" className="slice-feedback">{order.join('|') === 'event|verification|approval' ? 'Provisional sequence saved. The archived v1 is still needed to confirm the lineage.' : 'Read the day before the hour: event on the 23rd, reported verification on the 24th, approval on the 25th.'}</p>}{order.join('|') === 'event|verification|approval' && <><h3>Which claim still needs an independent release?</h3><button className="choice" onClick={() => classify('archive-needed')}>The archived v1 escort field is intact.</button><button className="choice" onClick={() => setFeedback('The public notice already reports a later approval; it does not show the older escort field.')}>The notice reports a later approval.</button></>}{feedback && <p role="status" className="slice-feedback">{feedback}</p>}</>
}

export function CorrectionTheoryScene() {
  const s = useGameStore(v => v.save.e01)!
  const answer = useGameStore(v => v.answerS22)
  const [feedback,setFeedback] = useState('')
  return <><h2>The boring explanation</h2><article className="utility-card"><small>P06 · PUBLIC CORRECTION GUIDE</small><h3>How a public record changes</h3><p>A verified version stays in the archive. An accepted correction creates a new version; the public page may show only the current one.</p><p>The reason line can be brief. A correction notice does not, by itself, prove the older version was false.</p><p>The portal desk handles the current page. GCRO holds an independent archived-version view for eligible public-interest requests.</p></article><h3>Could route reconciliation still be a good correction?</h3><div className="choices">{[['yes','Yes. A proper update remains possible. Find its source before arguing motive.'],['no','The name disappearing feels alarming, but the reason label alone cannot rule out a good correction.'],['uncertain','Uncertainty is useful. Your next action can test it.']].map(([id,text]) => <button className="choice" key={id} onClick={() => { answer('alternative',id); setFeedback(text) }}>{id === 'yes' ? 'Yes' : id === 'no' ? 'No' : 'Uncertain'}</button>)}</div>{feedback && <p role="status" className="slice-feedback">{feedback}</p>}{s.s22Alternative && <><h3>What would distinguish a justified update from an unexplained removal?</h3><button className="choice" onClick={() => answer('test','lineage')}>Check the archived field and revision trail.</button><button className="choice" onClick={() => setFeedback('Official describes the current publisher, not the accuracy of every underlying event.')}>The current copy is official, so the old name must be wrong.</button><button className="choice" onClick={() => setFeedback('Posting a crop cannot establish motive. Ask what the record service retained.')}>Maya posted it, so the current copy is a cover-up.</button></>}</>
}

export function PublicSearchScene() {
  const s = useGameStore(v => v.save.e01)!
  const query = useGameStore(v => v.setS23Query)
  const open = useGameStore(v => v.openS23Result)
  const match = useGameStore(v => v.matchS23Source)
  const finish = useGameStore(v => v.finishS23)
  const [feedback,setFeedback] = useState('')
  const aliases = ['bus 4','north quay','escort','correction','archive','daniel','version']
  const visible = aliases.some(alias => (s.s23Query ?? '').toLowerCase().includes(alias)) ? s23Results : []
  const expected = ['SR-02','SR-04','SR-01'][s.s23Matches?.length ?? 0]
  return <><h2>Search without a secret door</h2><p>Search Greyhaven public records and Memory Project pages. Compare publisher, date and record type.</p><input className="slice-input" aria-label="Search public Greyhaven index" placeholder="Bus 4 2019 version" value={s.s23Query ?? ''} onChange={event => query(event.target.value)}/>{s.s23Query && !visible.length && <p className="utility-note">No public result for that wording. Try the record title, year or office; private records are not indexed here.</p>}{visible.map(result => <article className="utility-card" key={result.id}><small>{result.id} · {result.source}</small><h3>{result.title}</h3><button className="choice" onClick={() => open(result.id)}>Open result · inspect publisher</button>{s.s23Opened?.includes(result.id) && <p>{result.detail}</p>}</article>)}{visible.length > 0 && <><h3>Build a source map</h3><p>{['Who published the current v2?','Who posted the older crop?','Who holds an archived version independently?'][s.s23Matches?.length ?? 0] ?? 'All sources matched.'}</p>{s23Results.filter(result => result.id !== 'SR-03').map(result => <button className="choice" key={result.id} onClick={() => { if (result.id !== expected) setFeedback('Check the publisher line. Portal = current; Memory Project = crop; GCRO = independent archived lineage.'); else { match(result.id); setFeedback('Source matched. This does not issue or verify an export.') } }}>{result.id} · {result.title.split(' · ')[0]}</button>)}{feedback && <p role="status" className="slice-feedback">{feedback}</p>}<button className="action-button slice-action" disabled={s.s23Matches?.join('|') !== 'SR-02|SR-04|SR-01'} onClick={finish}>Save source map</button></>}<p className="utility-note">Maps shows named public places, not a 2019 Bus 4 route or Daniel's location.</p></>
}

export function DanielNoteScene() {
  const hasAccess = useGameStore(v => v.save.deliveredEvents.includes('R03'))
  const s = useGameStore(v => v.save.e01)!
  const pending = useGameStore(v => v.save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:')))
  const view = useGameStore(v => v.viewS24Note)
  const finish = useGameStore(v => v.finishS24)
  return <><h2>A note with a closed door</h2>{hasAccess ? <>{!s.s24NoteViewed ? <><article className="utility-card"><p>Memory Project · Daniel note fragment · read-only. The complete private correspondence is not offered.</p></article><button className="choice" onClick={view}>Open permitted note fragment</button></> : <><article className="utility-card"><small>MEMORY PROJECT · REPORTED FRAGMENT · READ-ONLY</small><p>Transferred 3 Oct with the cropped preview. Maya retained only the line Daniel permitted for this case folder.</p><blockquote>Keep the earlier view. If they call the newest copy the only copy, ask for the version record. 7-14 is in my notes; it may matter later.</blockquote><p>The label 7-14 has no verified meaning here. Do not expand it from a guess.</p></article><StageThread stage="24"/>{!s.s24Share && <DraftChoices choices={s24Questions} label="OPTIONAL QUESTION TO MAYA · SELECT THEN SEND"/>}<button className="choice" disabled={pending} onClick={() => finish(true)}>Save literal note as undecoded</button></>}<button className="choice" disabled={pending} onClick={() => finish(false)}>Leave note alone</button></> : <><article className="utility-card"><p>Optional Memory Project note unavailable. The public revision and GCRO request do not depend on it.</p></article><button className="action-button slice-action" onClick={() => finish(false)}>Continue to public request</button></>}</>
}
