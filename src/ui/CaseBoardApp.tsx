import { MirrorEvidenceBoard } from './MirrorEvidenceBoard'
import { useState } from 'react'
import { boardPairFeedback, boardPairKey, boardSourceStatus, boardSources, canBoardLink, type BoardSourceId } from '../game/board'
import { useGameStore } from '../game/store'

export function CaseBoardApp() {
  const save = useGameStore(state => state.save)
  const link = useGameStore(state => state.linkBoardPair)
  const unlink = useGameStore(state => state.unlinkBoardPair)
  const [selected,setSelected] = useState<BoardSourceId[]>([])
  const [feedback,setFeedback] = useState('')
  const links = save.e01?.boardLinks ?? []
  const mayaFacts = [...new Set(save.messages.filter(message => message.sender === 'player' && message.recipient === 'maya').flatMap(message => message.disclosedFactIds ?? []))]
  const choose = (id: BoardSourceId) => {
    setFeedback('')
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current.slice(-1),id])
  }
  const connect = () => {
    if (selected.length !== 2) return
    const [a,b] = selected
    const response = boardPairFeedback(save,a,b)
    if (canBoardLink(save,a,b)) link(a,b)
    setFeedback(response)
  }
  return <div className="utility-content case-board" aria-label="Private Case Board">
    <p className="section-caption">PRIVATE WORKSPACE · EPISODE 01</p>
    <h2>What can you actually connect?</h2>
    <p className="utility-note">Collected, verified, inferred and shared are different states. Your links are private notes and cannot create evidence or send a message.</p>
    <div className="case-board-sources">{boardSources.map(source => {
      const status = boardSourceStatus(save,source.id)
      return <button key={source.id} className={selected.includes(source.id) ? 'case-board-source selected' : 'case-board-source'} aria-pressed={selected.includes(source.id)} onClick={() => choose(source.id)}>
        <span className="case-board-source-head"><strong>{source.id} · {source.title}</strong><small>{status.toUpperCase()}</small></span>
        <span>{status === 'locked' ? 'Not yet opened in this case.' : source.scope}</span>
        {status !== 'locked' && <small>Source: {source.custodian}</small>}
      </button>
    })}</div>
    <button className="action-button" disabled={selected.length !== 2} onClick={connect}>Link selected sources</button>
    {selected.length === 2 && <p className="utility-note">{selected.join(' + ')} · {boardPairKey(selected[0],selected[1])}</p>}
    {feedback && <p className="slice-feedback" role="status">{feedback}</p>}
    <h3>Working links</h3>
    {links.length ? links.map(key => <div className="case-board-link" key={key}><span>{key.replace('|',' ↔ ')} <small>Private association · no automatic conclusion</small></span><button className="choice" onClick={() => unlink(key)} aria-label={`Unlink ${key}`}>Unlink</button></div>) : <p className="utility-note">No sources linked yet. Read the case in Bulletin, then return here to compare what was actually collected.</p>}
    {save.prologue?.restored && <MirrorEvidenceBoard/>}
    <h3>Findings and recipients</h3>
    <div className="case-board-status"><strong>K01 · visible difference</strong><span>{save.knowledge.player.includes('K01') ? 'Observed lead. E001 is a crop, so its older original is not authenticated.' : 'Locked until the E001/E002 comparison is saved.'}</span></div>
    <div className="case-board-status"><strong>2019 chronology</strong><span>{save.deliveredEvents.includes('EV-E01-S21-TENTATIVE-ORDER') ? 'Tentative order from the notice and visible dates. The reason is not proven.' : 'Unresolved. Approval, publication and the event date must be separated.'}</span></div>
    <div className="case-board-status"><strong>K02 · checked lineage</strong><span>{save.knowledge.player.includes('K02') && save.deliveredEvents.includes('R04') ? 'Corroborated source-limited finding. No operator or culprit identified.' : 'Locked until E012 is validated and cited with E003 and E002.'}</span></div>
    <div className="case-board-status"><strong>Maya · disclosed knowledge</strong><span>{mayaFacts.length ? mayaFacts.join(' · ') : 'No selected case fact has been sent to Maya.'}</span></div>
    <p className="utility-note">Return to Bulletin for the current investigation. Source links here never satisfy a story receipt by themselves.</p>
  </div>
}
