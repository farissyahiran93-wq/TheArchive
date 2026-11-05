import { useState } from 'react'
import { scene04Article } from '../content/scene04Final'
import { canonicalIndexFields } from '../content/versionHistoryConversation'
import { bridgeComparisonEvent } from '../game/traceBridge'
import { useGameStore } from '../game/store'
import { GuidanceDot } from './GuidanceDot'

export function TraceBridgeFindings() {
  const save = useGameStore(state => state.save)
  const act = useGameStore(state => state.traceAction)
  const [field, selectField] = useState<'PUBLIC_ARTICLE' | 'TITLE'>()
  const compared = save.deliveredEvents.includes(bridgeComparisonEvent)
  const indexArticle = canonicalIndexFields[1][1]
  return <div className="trace-bridge-findings">
    <article className="trace-card">
      <h2>Article reference match</h2>
      <p>The displayed public article identifier matches.</p>
      <button className="trace-button secondary" aria-pressed={field === 'PUBLIC_ARTICLE'} onClick={() => selectField('PUBLIC_ARTICLE')}>
        PUBLIC_ARTICLE · {indexArticle}
        {!compared && field !== 'PUBLIC_ARTICLE' && <GuidanceDot save={save} action="compare-reference"/>}
      </button>
      <button className="trace-button secondary" aria-pressed={field === 'TITLE'} onClick={() => selectField('TITLE')}>
        TITLE · {scene04Article.title}
      </button>
      {field === 'TITLE' && <p role="status">Titles can match without proving identity. Try the article identifier.</p>}
      {field === 'PUBLIC_ARTICLE' && !compared && <button className="trace-button" onClick={() => act({ type: 'compare', field })}>
        COMPARE WITH PUBLIC COPY <GuidanceDot save={save} action="compare-reference"/>
      </button>}
      {compared && <dl className="trace-id-comparison" aria-label="Public article identifier comparison">
        <div><dt>Recovered reference</dt><dd>{indexArticle}</dd></div>
        <div><dt>Public copy</dt><dd>{scene04Article.id}</dd></div>
        <div><dt>Source status</dt><dd>SOURCE NOT AUTHENTICATED</dd></div>
      </dl>}
    </article>
    <details className="trace-fields"><summary>Source / date</summary><p>Index origin and capture time cannot be authenticated.</p></details>
    <details className="trace-fields"><summary>Original article content</summary><p>The body is unavailable. No earlier wording is available for comparison.</p></details>
    <details className="trace-fields"><summary>Decryption</summary><p>No encrypted payload was detected. Decoding the reference header reads existing metadata fields.</p></details>
  </div>
}
