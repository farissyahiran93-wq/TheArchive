import { danielNote } from '../content/opening'

/** Keep the photograph primary; the accessible transcription is available on demand. */
export function DanielNoteContent() {
  return <div className="daniel-note-content">
    <img src="/daniel-note.svg" alt="Daniel's handwritten note. Select Read text for a transcription."/>
    <details className="daniel-note-transcript">
      <summary>Read text</summary>
      <div>{danielNote.map(line => <p key={line}>{line}</p>)}</div>
    </details>
    <p className="daniel-note-caption">Photo received from Sophie · handwriting and source unverified.</p>
  </div>
}
