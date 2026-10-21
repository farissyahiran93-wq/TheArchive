import { CharacterAvatar } from './CharacterAvatar'
import { useLayoutEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { editorHints, s12Replies, s13Followups, s13Replies, s14Defer, s14Share, s15Followups, s15PublicNote, s15Replies, s16Followups, s16Replies, s18Hints, s18SourceLabels, s25Followups, s25Replies, s26Frames } from '../content/e01Phase03b'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'

type Stage = '12' | '13' | '14' | '15' | '16' | '20' | '24' | '25' | '26' | '27' | '29' | '30'

export function StageThread({ stage }: { stage: Stage }) {
  const save = useGameStore(state => state.save)
  const { openMaya } = useCaseNavigation()
  const lines = save.messages.filter(message => message.id.startsWith(`EV-E01-P03B:S${stage}_`) || message.id.startsWith(`EV-E01-P03B:P-S${stage}`) || message.id.startsWith(`player.P-S${stage}`) || stage === '14' && (message.id.startsWith('EV-E01-P03B:C02') || message.id.startsWith('player.C02')) || stage === '26' && (message.id.startsWith('EV-E01-P03B:C03') || message.id.startsWith('player.C03')))
  const pending = save.pendingEvents.some(event => event.id.startsWith(`EV-E01-P03B:S${stage}_`) || event.id.startsWith(`EV-E01-P03B:P-S${stage}`) || stage === '14' && event.id.startsWith('EV-E01-P03B:C02') || stage === '26' && event.id.startsWith('EV-E01-P03B:C03'))
  const scroller = useRef<HTMLDivElement>(null)
  const nearLatest = useRef(true)
  const [jump, setJump] = useState(false)
  useLayoutEffect(() => {
    const el = scroller.current
    if (el && nearLatest.current) el.scrollTop = el.scrollHeight
    else if (el) setJump(true)
  }, [lines.length, pending])
  if (save.deliveredEvents.includes('CONN-E01-01') && ['20','24','25','26','27','29','30'].includes(stage)) return <button className="choice maya-handoff" onClick={openMaya}>Open Maya in Messages</button>
  if (!lines.length && !pending) return null
  const messagesChannel = lines.some(line => line.channel === 'messages') || save.deliveredEvents.includes('CONN-E01-01') && ['20','24','25','26','27','29','30'].includes(stage)
  return <section className="phase-thread" aria-label={messagesChannel ? 'Maya Messages conversation' : 'Bulletin case conversation'}><p className="section-caption">{messagesChannel ? 'MESSAGES · MAYA CHEN' : 'BULLETIN RETURN INBOX · MP-DM-07'}</p><div className="phase-thread-scroll" ref={scroller} onScroll={event => { const el = event.currentTarget; nearLatest.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70; if (nearLatest.current) setJump(false) }}>{lines.map(line => <div key={line.id} className={`phase-line ${line.sender === 'player' ? 'outgoing' : 'incoming'}`}>{line.sender !== 'player' && <CharacterAvatar character="maya" fallback="M" className="bubble-avatar"/>}<small>{line.sender === 'player' ? 'You · sent' : 'Maya Chen'}</small><p>{line.text}</p>{line.attachmentIds?.includes('E001.cropped-public-escort-row') && <img src="/e001-public-escort-row.svg" alt="E001 public preview row extract. Escort: June Ellis. No resident details."/>}</div>)}{pending && <p className="phase-typing" role="status">Maya is replying…</p>}</div>{jump && <button className="choice" onClick={() => { nearLatest.current = true; setJump(false); if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight }}>Jump to latest Maya message</button>}</section>
}

export function DraftChoices({ choices, label = 'OPTIONAL REPLY · SELECT THEN SEND' }: { choices: readonly { id: string; text: string }[]; label?: string }) {
  const messagesOnly = useGameStore(state => state.save.deliveredEvents.includes('CONN-E01-01') && Number(state.save.e01?.sceneId.slice(-2)) >= 18)
  const draft = useGameStore(state => state.save.e01?.draftChoice)
  const select = useGameStore(state => state.draftPhase03b)
  const send = useGameStore(state => state.sendPhase03b)
  const pending = useGameStore(state => state.save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:')))
  if (!choices.length || messagesOnly) return null
  return <section className="phase-draft"><p className="section-caption">{label}</p><div className="choices">{choices.map(choice => <button key={choice.id} className={draft === choice.id ? 'choice selected' : 'choice'} aria-pressed={draft === choice.id} onClick={() => select(choice.id)}>{choice.text}</button>)}</div><button className="send-button" disabled={!draft || !choices.some(choice => choice.id === draft) || pending} onClick={send}><Send size={17}/>Send</button><p className="utility-note">Selecting a reply keeps it on your device. Maya sees it only after Send.</p></section>
}

export function EditorContinuation() {
  const save = useGameStore(state => state.save)
  const hint = useGameStore(state => state.editorHint)
  const next = useGameStore(state => state.enterAfterEditor)
  const returnToFinding = useGameStore(state => state.returnToFinding)
  const count = save.e01?.editorHintCount ?? 0
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  return <><button className="choice" onClick={hint} disabled={!!save.e01?.editorChecked}>Hint {Math.min(count+1,3)}</button>{count > 0 && <p className="utility-note" role="status">{editorHints[count-1]}</p>}{save.e01?.editorChecked && <><StageThread stage="12"/><DraftChoices choices={save.e01.s12Choice ? [] : s12Replies}/>{save.knowledge.player.includes('K02') ? <button className="action-button slice-action" disabled={pending} onClick={returnToFinding}>Return to saved finding</button> : <button className="choice" disabled={pending} onClick={next}>Continue to the exact row</button>}</>}</>
}

export function ExactRowScene() {
  const save = useGameStore(state => state.save)
  const ask = useGameStore(state => state.askMayaAboutRow)
  const next = useGameStore(state => state.continueToShare)
  const s = save.e01!
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  const quiet = !s.s11Primary || s.s11Primary === 'P-S11-C' || s.s12Choice === 'P-S12-C'
  const conversationOpen = !quiet || s.s13Asked
  const choices = !conversationOpen ? [] : !s.s13Primary ? s13Replies : ['P-S13-A','P-S13-B'].includes(s.s13Primary) && !s.s13Followup ? s13Followups : []
  return <><h2>The exact row</h2><p>The editor channel is checked. A matching inbox does not certify the older image.</p>{!conversationOpen && <article className="utility-card"><p>The editor channel is checked. You can read the public page yourself or ask Maya about the exact row.</p><button className="choice" onClick={ask}>Ask Maya</button></article>}<StageThread stage="13"/><DraftChoices choices={choices}/><button className="action-button slice-action" disabled={pending} onClick={next}>Continue public source</button></>
}

export function ShareRowScene() {
  const save = useGameStore(state => state.save)
  const select = useGameStore(state => state.draftPhase03b)
  const close = useGameStore(state => state.closeShareWithoutSend)
  const next = useGameStore(state => state.continueToEditorNote)
  const s = save.e01!
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  const chosen = s.s14Share
  return <><h2>What to share</h2><p>To: Maya Chen · checked Bulletin return inbox. Public escort row only. Your private Board, phone number, location and resident fields stay private.</p><StageThread stage="14"/>{!chosen && <><article className="utility-card"><h3>Cropped public row only</h3><img className="phase-share-preview" src="/e001-public-escort-row.svg" alt="E001 public preview row extract. Escort: June Ellis. No resident details."/><p>This is a row extract from the preview, not the original audit.</p></article><DraftChoices choices={[...s14Share,s14Defer]} label="CHOOSE EXACT CONTENT · SEND IS SEPARATE"/><button className={s.draftChoice === 'C02-SHARE.C' ? 'choice selected' : 'choice'} aria-pressed={s.draftChoice === 'C02-SHARE.C'} onClick={() => select('C02-SHARE.C')}>Not now. No image or text sent.</button><button className="action-button slice-action" disabled={pending} onClick={close}>Continue without sharing</button></>}{chosen && <><article className="utility-card"><h3>{chosen === 'image' ? 'R02 · cropped public row' : chosen === 'text' ? 'R02 · text only' : chosen === 'defer' ? 'Deferral sent' : 'No disclosure'}</h3><p>{chosen === 'none' ? 'Maya received no new message or attachment.' : chosen === 'defer' ? 'Maya received only your refusal message; no row or image was sent.' : 'Maya received only the selected public observation. The original audit and your private Board were not shared.'}</p></article><button className="action-button slice-action" disabled={pending} onClick={next}>Open editor note</button></>}</>
}

export function EditorNoteScene() {
  const save = useGameStore(state => state.save)
  const offer = useGameStore(state => state.openOptionalConnections)
  const publicSources = useGameStore(state => state.enterPublicSources)
  const direct = save.e01?.s14Share !== 'none'
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  const choices = !save.e01?.s15Primary ? s15Replies : ['image','text'].includes(save.e01.s14Share ?? '') && !save.e01.s15Followup ? s15Followups : []
  return <><h2>The thing Maya chose to post</h2>{direct && <><StageThread stage="15"/><DraftChoices choices={choices}/></>}<article className="utility-card"><small>MEMORY PROJECT · PUBLIC EDITOR NOTE</small><p>{s15PublicNote}</p></article><article className="utility-card"><h3>Transfer note · reported source</h3><p>Sender: Daniel Mercer (claimed by Memory Project transfer record). Recipient: Maya Chen. Date: 3 Oct. Attached: cropped preview. Original audit export: not held by Memory Project.</p><p>A transfer record can support that Maya received this crop. It cannot certify what the 2019 original said.</p></article>{direct && <button className="choice" disabled={pending} onClick={offer}>Review optional connections</button>}<button className="action-button slice-action" disabled={pending} onClick={publicSources}>Continue with public sources</button></>
}

export function MayaCheckinScene() {
  const save = useGameStore(state => state.save)
  const discuss = useGameStore(state => state.openS26Frame)
  const publicRequest = useGameStore(state => state.returnToS27)
  const s = save.e01!
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  if (save.deliveredEvents.includes('CONN-E01-01')) return <><h2>Maya's check-in</h2><StageThread stage="25"/></>
  const choices = !s.s25Primary ? s25Replies : s.s25Primary === 'P-S25-A' && !s.s25Followup ? s25Followups.filter(item => ['P-S25-D','P-S25-E','P-S25-F'].includes(item.id)) : s.s25Primary === 'P-S25-B' && !s.s25Followup ? s25Followups.filter(item => ['P-S25-G','P-S25-H'].includes(item.id)) : []
  return <><h2>A question that isn't about the file</h2><StageThread stage="25"/><DraftChoices choices={choices}/><button className="choice" disabled={pending} onClick={discuss}>Discuss the revision notice</button><button className="action-button slice-action" disabled={pending} onClick={publicRequest}>Continue public request</button></>
}

export function FramingScene() {
  const save = useGameStore(state => state.save)
  const keepPrivate = useGameStore(state => state.keepS26Private)
  const publicRequest = useGameStore(state => state.returnToS27)
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  if (save.deliveredEvents.includes('CONN-E01-01')) return <><h2>Discuss the revision with Maya</h2><StageThread stage="26"/></>
  return <><h2>What to say aloud</h2><StageThread stage="26"/>{!save.e01?.s26Frame && <DraftChoices choices={s26Frames} label="FRAME A CLAIM · SELECT THEN SEND"/>}<button className="choice" disabled={pending || !!save.e01?.s26Frame} onClick={keepPrivate}>Keep this private for now</button><button className="action-button slice-action" disabled={pending} onClick={publicRequest}>Continue public request</button></>
}

export function PermissionOfferScene() {
  const save = useGameStore(state => state.save)
  const openTerms = useGameStore(state => state.continueToPermissionSheet)
  const publicSources = useGameStore(state => state.enterPublicSources)
  const s = save.e01!
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  const choices = !s.s16Primary ? s16Replies : ['P-S16-A','P-S16-B'].includes(s.s16Primary) && !s.s16Followup ? s16Followups : []
  return <><h2>Two invitations</h2><p>These are independent choices. Reading the terms accepts neither connection.</p><StageThread stage="16"/><DraftChoices choices={choices}/><button className="action-button slice-action" disabled={pending} onClick={openTerms}>Review both permissions</button><button className="choice" disabled={pending} onClick={publicSources}>Stay with public records</button><p className="utility-note">No connection has opened yet. The same civic and GCRO sources remain available.</p></>
}

export function PermissionSheetScene() {
  const save = useGameStore(state => state.save)
  const decide = useGameStore(state => state.decideConnection)
  const next = useGameStore(state => state.enterPublicSources)
  const s = save.e01!
  return <><h2>Your case connections</h2><p>Messages and the read-only Archive are separate. You can continue with neither.</p><article className="utility-card phase-permission"><h3>Connect in Messages</h3><p>Maya can message this case profile. She sees the display name you choose for this connection and the messages you explicitly send there. She does not receive your phone number, contacts, GPS, Files or Case Board.</p>{s.messagesConsent === true ? <p role="status">Messages connection accepted · CONN-E01-01. Existing Bulletin tips are not copied into Messages.</p> : <div className="phase-permission-actions"><button className="choice" onClick={() => decide('messages',true)}>Connect in Messages</button><button className="choice" onClick={() => decide('messages',false)}>Not now · Messages</button></div>}{s.messagesConsent === false && <small>Messages remains disconnected. Maya can reply to your Bulletin token.</small>}</article><article className="utility-card phase-permission"><h3>Open read-only Archive</h3><p>Owner: Greyhaven Memory Project. Folder: Daniel Mercer public case sources. You may read permitted cards and save your own notes. This does not share your files or join a group. Source labels show what is a preview, a public link or an issued copy.</p>{s.archiveConsent === true ? <p role="status">Read-only access accepted · R03 · folder: Daniel Mercer public case sources.</p> : <div className="phase-permission-actions"><button className="choice" onClick={() => decide('archive',true)}>Open read-only Archive</button><button className="choice" onClick={() => decide('archive',false)}>Not now · Archive</button></div>}{s.archiveConsent === false && <small>Archive not opened. Public Bulletin and civic records remain available.</small>}</article><button className="action-button slice-action" onClick={next}>Continue with public records</button></>
}

export function SourceStatusScene() {
  const save = useGameStore(state => state.save)
  const inspect = useGameStore(state => state.inspectSourceStatus)
  const hint = useGameStore(state => state.showSourceStatusHint)
  const answer = useGameStore(state => state.answerSourceStatus)
  const reopen = useGameStore(state => state.reopenConnections)
  const [feedback,setFeedback] = useState('')
  const s = save.e01!
  const count = s.s18HintCount ?? 0
  const detail = s.s18Inspected === 'preview' ? 'This cropped image arrived from Daniel on 3 Oct. Maya’s receipt can document that transfer, not the 2019 original.' : s.s18Inspected === 'current' ? 'The civic portal publishes the current redacted v2. It does not hold the independent archived-version release.' : 'The public notice dates an approval. It does not show the source that justified the correction or name an operator.'
  return <><h2>{s.s18Route === 'archive' ? 'THE ARCHIVE · Memory Project · read-only' : 'Public research path'}</h2><p>{s.s18Route === 'archive' ? 'Inside a workspace is not the same as verified. Open a card to see who holds its original.' : 'The Bulletin preview and civic portal are still open. You can save public links to your private Case Board. No Archive folder is required.'}</p><div className="phase-source-list">{s18SourceLabels.map(item => <button className={s.s18Inspected === item.id ? 'selected' : ''} key={item.id} aria-pressed={s.s18Inspected === item.id} onClick={() => inspect(item.id)}><strong>{item.title}</strong><small>{item.source} · {item.status}</small></button>)}</div>{s.s18Inspected && <p className="utility-note">{detail}</p>}<h3>Which label tells you most about the older image?</h3><div className="choices"><button className="choice" disabled={!s.s18Inspected} onClick={() => { setFeedback('Right. It explains why a separate audit request matters.'); answer('preview') }}>Cropped preview; original not held here.</button><button className="choice" onClick={() => setFeedback('A trusted sender can pass on a crop. The 2019 original needs its own source.')}>Daniel sent it, so it is certified.</button></div>{feedback && <p className="slice-feedback" role="status">{feedback}</p>}{!s.s18Inspected && <p className="utility-note">Open one source card before answering.</p>}<button className="choice" onClick={hint}>Hint {Math.min(count+1,3)}</button>{count > 0 && <p className="utility-note">{s18Hints[count-1]}</p>}{s.s16OfferSeen && <button className="choice" onClick={reopen}>Review connection permissions</button>}<p className="utility-note">Public places on Maps do not show a historical Bus 4 route or Daniel's location.</p></>
}
