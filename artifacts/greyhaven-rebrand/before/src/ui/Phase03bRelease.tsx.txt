import { useState } from 'react'
import { gcroPages } from '../content/gcroExport'
import { assessGcroIssue, type GcroAssessment } from '../game/phase03b'
import { recordPuzzleRetry } from '../game/devTelemetry'
import { useGameStore } from '../game/store'
import { s27Question, s29Disclosure, s30Disclosure } from '../content/e01Phase03b'
import { DraftChoices, StageThread } from './Phase03bScenes'

export function GcroRequestScene() {
  const s = useGameStore(v => v.save.e01)!
  const hasChannel = useGameStore(v => v.save.deliveredEvents.includes('R01') && !!v.save.e01?.editorChecked)
  const select = useGameStore(v => v.selectS27Scope)
  const submit = useGameStore(v => v.submitS27Request)
  const recordReview = useGameStore(v => v.recordS27Review)
  const checkin = useGameStore(v => v.openS25Checkin)
  const [review,setReview] = useState(false)
  const status = s.s27Status
  return <>
    <h2>Ask the office that holds the past</h2>
    {hasChannel && <><StageThread stage="27"/>{!s.s27Share && <DraftChoices choices={s27Question} label="OPTIONAL OFFICE QUESTION · SELECT THEN SEND"/>}</>}
    {!s.s25Opened && !status && !!s.s13Primary && ['image','text','defer'].includes(s.s14Share ?? '') && <button className="choice" onClick={checkin}>Open Maya's optional check-in</button>}
    <article className="utility-card"><small>FICTIONAL GREYHAVEN · GCRO · PUBLIC-INTEREST REQUEST</small><p>Record: GH-NQ-BUS4-2019-11-23</p><p>Requested view: v1/v2 lineage and public escort field</p><p>An adult civilian may request a case-scoped, four-page redacted view. A duty officer checks eligibility and resident redactions. This form cannot open private resident records.</p></article>
    <h3>Choose the narrowest request that answers your question</h3>
    <div className="choices">
      <button className={s.s27Scope === 'redacted' ? 'choice selected' : 'choice'} disabled={status === 'reviewing' || status === 'delayed' || status === 'unavailable'} onClick={() => select('redacted')}>Redacted v1/v2 lineage and public escort field.</button>
      <button className={s.s27Scope === 'residents' ? 'choice selected' : 'choice'} disabled={status === 'reviewing' || status === 'delayed' || status === 'unavailable'} onClick={() => select('residents')}>Full list of residents and destinations.</button>
      <button className={s.s27Scope === 'logs' ? 'choice selected' : 'choice'} disabled={status === 'reviewing' || status === 'delayed' || status === 'unavailable'} onClick={() => select('logs')}>Who logged into the correction portal today?</button>
    </div>
    {s.s27Scope && <p className="utility-note">{s.s27Scope === 'redacted' ? 'Eligible for public-interest review. The office still has to review this request.' : s.s27Scope === 'residents' ? 'Protected fields cannot be released to this civilian route. Narrow your request.' : 'Private account logs are outside this archived-version request.'}</p>}
    <button className="choice" disabled={!s.s27Scope} onClick={() => setReview(true)}>Review request</button>
    {review && <article className="utility-card"><p>Recipient: this request session only. Bulletin return token is separate.</p><p>{s.s27Scope === 'redacted' ? 'Included: redacted lineage and public escort field. Excluded: resident names, contacts, care details, destinations and unrelated logs.' : 'This scope is too broad for this public-interest release.'}</p></article>}
    {status === 'reviewing' && <p role="status">Request received by GCRO. Reference REQ-20261008-041. Status: REVIEWING. No export has been issued.</p>}
    {status === 'refused' && <p role="status">Release refused. A refusal is a process result, not evidence that June was absent. Correct an overbroad scope or request recorded review; no export or R04 exists.</p>}
    {status === 'delayed' && <p role="status">{s.s28CorrectionRequested ? 'Correction request recorded. The earlier file remains unverified. No revised copy has been issued.' : 'Still under redaction review. The office has your question; it has not answered it.'} Keep the public comparison as a lead.</p>}
    {status === 'unavailable' && <p role="status">Release unavailable. The record status is unknown; absence of a file here does not prove the older row was absent.</p>}
    {['refused','delayed','unavailable'].includes(status ?? '') && !s.s27ReviewRecorded && <button className="choice" onClick={recordReview}>Request recorded review</button>}
    {s.s27ReviewRecorded && <p className="utility-note">Review request recorded. Status remains pending; no corrected file, receipt or verification has been granted.</p>}
    {(!status || status === 'refused') && <button className="action-button slice-action" disabled={!review || !s.s27Scope || status === 'refused'} onClick={submit}>Submit request</button>}
    <p className="utility-note">A request receipt proves only that a question was submitted. It is not E012 or R04. Public Search, Maps and Bulletin remain available from Home while review is pending.</p>
  </>
}

const checks = [
  { kind: 'office', title: 'Check office', good: 'GCRO', choices: [['GCRO','GCRO duty records officer · GCRO-REG-01'],['portal','Civic Portal current-page desk']] },
  { kind: 'lineage', title: 'Check version chain', good: 'full-chain', choices: [['full-chain','Same root record ID, v1 snapshot, correction reference, v2 public reference'],['title','Both pages mention Bus 4'],['today','The export was created today']] },
  { kind: 'pages', title: 'Check pages and redactions', good: 'four-redacted', choices: [['four-redacted','Pages 1–4 and RED-041 suppression list'],['one-page','Page 2 alone is enough']] },
  { kind: 'transfer', title: 'Check transfer and actual file bytes', good: 'own-session', choices: [['own-session','This one-use request session and its own delivery record'],['maya','A copy forwarded by Maya'],['logo','Any file with a GCRO logo']] },
] as const

export function GcroReleaseScene() {
  const s = useGameStore(v => v.save.e01)!
  const open = useGameStore(v => v.openS28Page)
  const openDirectory = useGameStore(v => v.openS28Directory)
  const check = useGameStore(v => v.checkS28)
  const finish = useGameStore(v => v.finishS28)
  const correction = useGameStore(v => v.requestS28Correction)
  const [feedback,setFeedback] = useState('')
  const [assessment,setAssessment] = useState<GcroAssessment | null>(null)
  const [verifying,setVerifying] = useState(false)
  const pages = gcroPages(s.s28Payload ?? '')
  const explain: Record<Exclude<GcroAssessment,'valid'>,string> = {
    'not-issued': 'No eligible export has been issued. The request receipt is not R04.',
    'missing': 'The delivered file is missing. Keep the public comparison as a lead and request a corrected release.',
    'incomplete': 'The source package is incomplete or its version/redaction fields do not match. Do not cite it.',
    'wrong-issuer': 'The issuer does not match the independent GCRO directory. Request a corrected release.',
    'wrong-recipient': 'This issue is not addressed to the originating one-use request session. It cannot grant R04.',
    'integrity-mismatch': 'SHA-256 or byte length does not match the delivered file. Keep it in quarantine and request a fresh certified copy.',
  }
  return <>
    <h2>Four pages, one claim</h2>
    <article className="utility-card"><small>FICTIONAL IN-WORLD GCRO RELEASE · REQ-20261008-041</small><p>Issue received for review. It cannot be used as verified evidence until the actual delivered file passes all checks.</p><p>Issuer: {s.s28Issue?.issuer ?? 'unavailable'}. Reference: GCRO-EXP-20261008-041. Reader: originating one-use request session only.</p><p>The file stays with this session. Its contents are not sent to Maya.</p></article>
    <button className="choice" onClick={openDirectory} disabled={s.s28DirectorySeen}>Open GCRO-REG-01 office directory</button>
    {s.s28DirectorySeen && <article className="utility-card"><small>GCRO-REG-01 · PUBLIC DIRECTORY</small><p>Greyhaven Civic Records Office · independent archived-version releases · public-interest redacted requests · duty records officer role.</p><p>The Civic Portal Validation Desk handles the current public page. The Memory Project publishes community material.</p></article>}
    <h3>Read the four pages</h3>
    {!pages.length && <p role="status">No delivered page is available to inspect. A request reference alone cannot prove the missing row.</p>}
    {pages.map((page,index) => <article className="utility-card" key={index}><button className="choice" disabled={index >= 4} onClick={() => open(index+1)}>Open page {index+1} of {pages.length}</button>{s.s28OpenedPages?.includes(index+1) && <pre className="phase-export-page">{page}</pre>}</article>)}
    <p className="utility-note">A matching digest establishes which bytes were issued. It does not prove that every event described in 2019 happened as written.</p>
    <button className="choice" disabled={verifying} onClick={() => { setVerifying(true); void assessGcroIssue(useGameStore.getState().save).then(result => { setAssessment(result); setVerifying(false) }) }}>Check delivered-file status</button>
    {verifying && <p role="status">Checking the delivered bytes and issue envelope…</p>}
    {assessment && <p role="status" className="slice-feedback">{assessment === 'valid' ? 'The issued bytes and envelope match. Complete the four source checks before R04.' : explain[assessment]}</p>}
    {assessment && assessment !== 'valid' && <button className="choice" onClick={correction}>Request corrected release</button>}
    {checks.map(task => <article className="utility-card" key={task.kind}><h3>{task.title} {s.s28Checks?.includes(task.kind) ? '✓' : ''}</h3>{task.choices.map(([id,label]) => <button className="choice" key={id} onClick={() => { const wasPassed = useGameStore.getState().save.e01?.s28Checks?.includes(task.kind); void check(task.kind,id).then(() => { const passed = useGameStore.getState().save.e01?.s28Checks?.includes(task.kind); if (!passed && !wasPassed) recordPuzzleRetry(); setFeedback(passed ? task.kind === 'transfer' ? 'Actual UTF-8 bytes match the fictional GCRO issue envelope and this request session.' : 'Check recorded. Continue checking the other parts of the release.' : 'Not validated. Review the directory, relevant page, identifiers, complete redactions or own-session transfer.') }) }}>{label}</button>)}</article>)}
    {feedback && <p role="status" className="slice-feedback">{feedback}</p>}
    <button className="action-button slice-action" disabled={verifying || checks.some(task => !s.s28Checks?.includes(task.kind))} onClick={() => { setVerifying(true); void finish().then(() => { if (useGameStore.getState().save.e01?.sceneId === 'E01-S28') setFeedback('Validation refused. Recheck the actual delivered file; no R04 or K02 was granted.'); setVerifying(false) }) }}>Validate release · R04</button>
    <p className="utility-note">Until all four checks pass, the public comparison remains a lead. An incomplete or mismatched release cannot grant K02.</p>
  </>
}

export function CorroborationScene() {
  const s = useGameStore(v => v.save.e01)!
  const cite = useGameStore(v => v.citeS29)
  const save = useGameStore(v => v.saveS29Finding)
  const [feedback,setFeedback] = useState('')
  const prompts = ['Older field and authenticated v1','Version order and correction approval','Current public escort field']
  const ids = ['E012','E003','E002']
  const current = s.s29Citations?.length ?? 0
  return <><h2>After verification</h2><p>The export is validated for this request session. Build a narrow cited claim. The player must save it before K02 exists.</p><h3>{prompts[current] ?? 'All sources cited'}</h3>{['E001','E012','E003','E002'].map(id => <button className="choice" key={id} onClick={() => { if (id === ids[current]) { cite(id); setFeedback('Source placed. A dated revision does not identify motive or operator.') } else { recordPuzzleRetry(); setFeedback(id === 'E001' ? 'The crop led you here. The GCRO release must authenticate v1.' : 'Match this source to the exact fact its issuer can support.') } }}>{id}{id === 'E001' ? ' · cropped preview' : id === 'E012' ? ' · GCRO lineage' : id === 'E003' ? ' · public revision notice' : ' · current civic copy'}</button>)}{feedback && <p role="status" className="slice-feedback">{feedback}</p>}<p className="utility-note">Citations: {(s.s29Citations ?? []).join(' + ') || 'none'}</p>{current === 3 && <><article className="utility-card"><h3>K02 · narrow corroborated finding</h3><p>The independently archived v1 retained June Ellis in the escort field when marked verified on 24 Nov 2019 at 15:20. The public correction was approved on 25 Nov 2019 at 08:40. The current v2 view omits that field.</p><p>Unknown: whether the correction was justified, who operated the queue now and who directed events in 2019.</p></article><button className="action-button slice-action" onClick={save}>Save corroborated finding</button></>}</>
}

export function RoleCliffhangerScene() {
  const state = useGameStore(v => v.save)
  const check = useGameStore(v => v.checkS30Role)
  const saveQuestion = useGameStore(v => v.saveS30Question)
  const complete = useGameStore(v => v.completeS30)
  const openLateTip = useGameStore(v => v.openLateTip)
  const [feedback,setFeedback] = useState('')
  const s = state.e01!
  const eligible = state.deliveredEvents.includes('R01') && s.editorChecked
  const closingLine = s.s30Hook === 'valid'
    ? 'The archive kept the older line. The public page did not. The queue that can change what everyone sees is still enabled—and the public card will not say whose hand is on it.'
    : 'A verified record was changed. The public process still accepts corrections. The status of any individual role remains out of view.'
  if (s.e01Complete) return <div className="phase-finale">
    <p className="section-caption">THE ARCHIVE · EPISODE 01 COMPLETE</p><h2>The Missing Entry</h2><p>{closingLine}</p>
    <article className="utility-card"><small>CASE BOARD · VERIFIED QUESTION</small><p>One answer: the versions changed after verification.</p><p>One question: who checks the next change?</p><p>No operator identified. No new submission established.</p></article>
    <p className="utility-note">Your GCRO export remains with this request session. Nothing was sent to Maya without your Send.</p>
  </div>
  const pending = state.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  return <>
    <h2>The part that is still open</h2>
    <article className="utility-card"><h3>Case Board · one answer</h3><p>The versions changed after verification. The GCRO copy remains private to your request session.</p></article>
    {eligible && <><StageThread stage="29"/>{!s.s29Share && <DraftChoices choices={s29Disclosure} label="OPTIONAL PUBLIC FINDING · SELECT THEN SEND"/>}</>}
    <button className="choice" disabled={s.s30RoleChecked} onClick={check}>Compare public directory and open status card</button>
    {s.s30RoleChecked && <>
      <article className="utility-card"><small>CIVIC PORTAL VALIDATION DESK · GH-PV-02 v1</small><h3>Public correction queue status</h3>{s.s30Hook === 'valid' ? <><p>Service: public record correction queue. Role class: correction queue submitter. Capability: ENABLED. As of 8 Oct 2026.</p><p>This public card lists no individual account, login, submission or operator.</p></> : <p>Public correction-service notice: the portal continues to accept correction requests under published review rules. Individual role status is unavailable in this view.</p>}</article>
      <h3>What does this add?</h3>
      <button className="choice" disabled={s.s30QuestionSaved} onClick={() => { saveQuestion(s.s30Hook === 'valid' ? 'role-class' : 'process-open'); setFeedback(s.s30Hook === 'valid' ? 'Supported: the role class can still submit correction work. Who uses it remains unknown.' : 'Process is open; role status is unknown.') }}>{s.s30Hook === 'valid' ? 'The role can still submit correction work.' : 'The public process continues; role status is unknown.'}</button>
      <button className="choice" onClick={() => setFeedback('The card names a role class, not an operator or new action. Rephrase the question.')}>The same person is changing records now.</button>
      <button className="choice" onClick={() => setFeedback('Current capability cannot establish a 2019 motive.')}>The office must have removed June deliberately.</button>
      {feedback && <p role="status" className="slice-feedback">{feedback}</p>}
      <article className="utility-card"><p>{closingLine}</p><p>Board question: Who reviews changes to a record once a verified version exists? No operator identified. No new submission established.</p></article>
      {eligible && <><StageThread stage="30"/>{!s.s30Share && <DraftChoices choices={s30Disclosure.filter(item => s.s30Hook === 'valid' ? item.id !== 'P-S30-C' : item.id === 'P-S30-C')} label="OPTIONAL STATUS DISCLOSURE · SELECT THEN SEND"/>}</>}
      {eligible ? <button className="action-button slice-action" disabled={!s.s30QuestionSaved || pending} onClick={complete}>End episode</button> : <><p className="utility-note">Your checked finding is saved privately. The public status page remains readable. A case-brief tip and editor-channel check are still needed for the finale; E012 stays in your Files.</p>{!state.deliveredEvents.includes('R01') && <button className="choice" onClick={openLateTip}>Prepare public-observation tip</button>}</>}
    </>}
  </>
}
