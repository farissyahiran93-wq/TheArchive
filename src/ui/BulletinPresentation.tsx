import { ArrowLeft, ArrowUpRight, BookOpen, FileText, LockKeyhole, ScanLine } from 'lucide-react'
import { briefParagraphs } from '../content/e01Slice'

export function BulletinHeader({ back, scene }: { back: () => void; scene?: string }) {
  const step = Number(scene?.slice(-2) ?? 2)
  const active = step <= 3 ? 0 : step <= 7 ? 1 : step <= 10 ? 2 : 3
  return <header className="bulletin-header">
    <div className="bulletin-brand"><button onClick={back} aria-label="Back to home"><ArrowLeft size={22}/></button><div><span>GREYHAVEN MEMORY PROJECT</span><h1>Bulletin<span className="bulletin-brand-dot">.</span></h1></div><span className="bulletin-edition">LOCAL<br/>RECORDS</span></div>
    <ol className="bulletin-sections" aria-label="Case reading progress">{['The brief','Records','Your tip','Research'].map((label,index) => <li key={label} className={index === active ? 'current' : index < active ? 'visited' : ''} aria-current={index === active ? 'step' : undefined}><span>{String(index+1).padStart(2,'0')}</span>{label}</li>)}</ol>
  </header>
}

export function BriefCover() {
  return <article className="brief-cover">
    <div className="brief-cover-image" role="img" aria-label="Greyhaven canal, an editorial city image"><span>GREYHAVEN<br/><b>Memory Project</b></span><span className="cover-image-label">CITY & COMMUNITY</span></div>
    <div className="brief-cover-copy"><span className="bulletin-kicker"><i/> MISSING PERSON · PUBLIC BRIEF</span><h2>Daniel Mercer<br/>is missing</h2><p>Daniel Mercer was last confirmed in contact on 4 October. His sister reported him missing on 5 October.</p><div className="brief-byline"><span className="editor-monogram">M</span><div><strong>Maya Chen</strong><small>Case brief editor · 7 October</small></div><ArrowUpRight size={17}/></div></div>
    <div className="brief-timeline" aria-label="Known dates"><div><b>04</b><span>OCTOBER</span><small>Last contact</small></div><div><b>05</b><span>OCTOBER</span><small>Reported missing</small></div><div><b>07</b><span>OCTOBER</span><small>Brief published</small></div></div>
  </article>
}

export function FullBrief({ expanded }: { expanded: boolean }) {
  return <article className="bulletin-article" aria-label={expanded ? 'Full Daniel Mercer brief' : 'Daniel Mercer brief introduction'}>
    <span className="bulletin-kicker"><i/> MISSING PERSON</span><h2>Daniel Mercer<br/>is missing</h2>
    <div className="article-byline"><span className="editor-monogram">M</span><div><strong>By Maya Chen</strong><small>Greyhaven Memory Project · 7 October</small></div></div>
    <div className="article-body">{(expanded ? briefParagraphs : briefParagraphs.slice(0,1)).map((paragraph,index) => <p className={index === 0 ? 'article-lead' : undefined} key={index}>{paragraph}</p>)}</div>
    {expanded && <div className="article-end"><span>G</span><p>GREYHAVEN MEMORY PROJECT<br/><small>Case inbox · MP-DM-07</small></p></div>}
  </article>
}

function RecordLine({ line }: { line: string }) {
  if (line === '...') return <div className="record-omission" aria-label="Content outside this extract">· · ·</div>
  if (line.startsWith('VERIFIED')) return <div className="record-print-mark"><small>MARKING VISIBLE IN CROP</small><span>{line}</span></div>
  if (line.startsWith('[page')) return <div className="record-crop-note">{line}</div>
  const colon = line.indexOf(':')
  if (colon > 0) return <dl className="record-field"><dt>{line.slice(0,colon)}</dt><dd>{line.slice(colon+1).trim()}</dd></dl>
  return <div className={line.startsWith('Record ') ? 'record-reference' : 'record-heading'}>{line}</div>
}

export function SourceCard({ title, source, text }: { title: string; source: string; text: string }) {
  const preview = source.startsWith('E001')
  return <article className={`source-reader ${preview ? 'source-preview' : 'source-current'}`}>
    <div className="source-topline"><span><FileText size={14}/>{preview ? 'E001' : 'E002'}</span><span>{preview ? 'Partial source' : 'Public view'}</span></div>
    <h2>{title}</h2><p className="source-credit">{source.split(' · ').slice(1).join(' · ')}</p>
    <div className="record-paper"><div className="record-paper-label"><span>{preview ? 'MEMORY PROJECT / SAVED CROP' : 'GREYHAVEN / PUBLIC RECORD'}</span>{preview ? <ScanLine size={18}/> : <FileText size={18}/>}</div><div className="record-lines">{text.split('\n').map((line,index) => <RecordLine line={line} key={index}/>)}</div></div>
    <div className="source-boundary"><LockKeyhole size={13}/>{preview ? 'A preview is a lead, not a certified full file.' : 'Public-facing fields only. Resident details withheld.'}</div>
    <details className="source-text-view"><summary><BookOpen size={14}/>Plain text transcription</summary><pre>{text}</pre></details>
  </article>
}

export function RecordComparison() {
  return <section className="record-comparison" aria-label="Compare older preview and current civic copy">
    <div className="comparison-shared"><FileText size={16}/><span><strong>North Quay · Bus 4</strong><small>Same record · 23 November 2019</small></span></div>
    <div className="comparison-columns"><div><span>E001 · LEAD ONLY</span><h3>Older preview</h3><small>Partial image</small></div><div><span>E002 · PUBLIC VIEW</span><h3>Current copy</h3><small>Version 2</small></div></div>
    <div className="comparison-field"><h4>Record</h4><div><span>North Quay / Bus 4<br/>23 Nov 2019</span><span>North Quay / Bus 4<br/>23 Nov 2019</span></div></div>
    <div className="comparison-field"><h4>Escort</h4><div><span>JUNE ELLIS</span><span aria-label="Escort field blank">—</span></div></div>
    <div className="comparison-field"><h4>Resident details</h4><div><span className="redacted-field">[REDACTED]</span><span className="redacted-field">[REDACTED]</span></div></div>
    <p className="comparison-footnote"><ScanLine size={14}/>Compare visible fields. Keep the source limits.</p>
  </section>
}
