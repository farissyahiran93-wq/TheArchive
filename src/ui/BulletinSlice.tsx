import { CharacterAvatar } from './CharacterAvatar'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ChevronLeft, LockKeyhole, Send } from 'lucide-react'
import { comparisonAnswers, comparisonHints, currentText, editorAnswers, followupReplies, leadChoices, previewText, primaryReplies, tipText } from '../content/e01Slice'
import { useGameStore } from '../game/store'
import { BriefCover, BulletinHeader, FullBrief, RecordComparison, SourceCard } from './BulletinPresentation'
import { EditorContinuation, EditorNoteScene, ExactRowScene, FramingScene, MayaCheckinScene, PermissionOfferScene, PermissionSheetScene, ShareRowScene, SourceStatusScene } from './Phase03bScenes'
import { CorrectionTheoryScene, DanielNoteScene, PreviewDateScene, PublicSearchScene, RevisionNoticeScene, TimelineScene } from './Phase03bResearch'
import { CorroborationScene, GcroReleaseScene, GcroRequestScene, RoleCliffhangerScene } from './Phase03bRelease'

function StoryButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button className="action-button slice-action" onClick={onClick} disabled={disabled}>{children}</button>
}

function SliceChat({ back }: { back: () => void }) {
  const save = useGameStore(s => s.save)
  const draft = useGameStore(s => s.draftS11)
  const send = useGameStore(s => s.sendS11)
  const read = useGameStore(s => s.readSliceMessages)
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-S11-'))
  const s = save.e01!
  const chat = save.messages.filter(message => message.id === 'R01.tip' || message.sender === 'maya' && message.channel !== 'messages' || message.id.startsWith('player.P-S11-'))
  const options = !s.s11Primary ? primaryReplies : ['P-S11-A', 'P-S11-B'].includes(s.s11Primary) && !s.s11Followup ? followupReplies : []
  const scroller = useRef<HTMLDivElement>(null)
  const nearBottom = useRef(true)
  const previousCount = useRef(chat.length)
  const [newCount, setNewCount] = useState(0)
  useEffect(() => { if (nearBottom.current) read() }, [read, chat.length])
  useLayoutEffect(() => {
    const element = scroller.current
    if (!element) return
    const added = Math.max(0, chat.length - previousCount.current)
    if (nearBottom.current) { element.scrollTop = element.scrollHeight; setNewCount(0) }
    else if (added) setNewCount(count => count + added)
    previousCount.current = chat.length
  }, [chat.length])
  const jump = () => { const el = scroller.current; if (!el) return; el.scrollTop = el.scrollHeight; nearBottom.current = true; setNewCount(0); read() }
  return <>
    <header className="slice-thread-heading slice-native-header"><button className="native-back-button" onClick={back} aria-label="Back to home"><ChevronLeft size={27}/></button><CharacterAvatar character="maya" fallback="M" className="contact-avatar"/><div><strong>Maya Chen</strong><small>Bulletin · MP-DM-07</small></div><LockKeyhole size={16} className="channel-lock" aria-label="Private return-token channel"/></header>
    <div className="chat-area slice-chat-area"><div className="chat-scroll" ref={scroller} onScroll={event => { const el = event.currentTarget; nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 96; if (nearBottom.current) { setNewCount(0); read() } }}>
      <div className="fixture-disclaimer">Bulletin return-token inbox · Your profile name, phone number, private Board and files are not shared.</div>
      {chat.map(message => <div className={`bubble-row ${message.sender === 'player' ? 'player' : 'fixture'} group-start`} key={message.id}>{message.sender !== 'player' && <CharacterAvatar character="maya" fallback="M" className="bubble-avatar"/>}<div className={`bubble ${message.sender === 'player' ? 'player' : 'fixture'}`}><p>{message.text}</p><small>{new Date(message.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })}{message.sender === 'player' ? ` · ${message.delivery}` : ''}</small></div></div>)}
      {pending && <div className="typing" role="status" aria-label="Maya is typing"><CharacterAvatar character="maya" fallback="M" className="bubble-avatar"/><span className="typing-dots"><i/><i/><i/></span><span className="sr-only">Maya is typing</span></div>}
    </div>{newCount > 0 && <button className="new-messages" onClick={jump}>{newCount} new messages <ArrowDown size={15}/></button>}</div>
    <div className="composer slice-composer">{options.length && !pending ? <><p className="section-caption">OPTIONAL REPLY · SELECT THEN SEND</p><div className="choices">{options.map(option => <button key={option.id} className={s.draftChoice === option.id ? 'choice selected' : 'choice'} aria-pressed={s.draftChoice === option.id} onClick={() => draft(option.id)}>{option.text}</button>)}</div><button className="send-button" disabled={!s.draftChoice} onClick={() => { if (s.draftChoice) send(s.draftChoice) }}><Send size={17}/> Send</button></> : <div className="composer-wait"><LockKeyhole size={15}/>{pending ? 'Maya is replying…' : 'You can continue without sending another message.'}</div>}</div>
  </>
}

export function BulletinSlice({ back }: { back: () => void }) {
  const save = useGameStore(s => s.save)
  const { beginEpisodeSlice, nextSliceScene, openBrief, inspectPreview, compare, recheckComparison, hint, saveLead, setTip, sendTip, openSliceInbox, answerEditor, continuePublicWithoutTip } = useGameStore()
  const [answer, setAnswer] = useState('')
  const [lead, setLead] = useState('')
  const [editorAnswer, setEditorAnswer] = useState('')
  const [sourceDetail, setSourceDetail] = useState(false)
  const s = save.e01
  const scene = s?.sceneId
  const replyArrived = save.deliveredEvents.includes('EV-E01-S11-MAYA-REPLY')
  const bulletinReferral = save.messages.find(message => message.id === 'ARC-E01-MAYA-REFERRAL' && message.channel === 'bulletin')

  return <section className={`utility-screen slice-screen bulletin-screen ${scene === 'E01-S11' ? 'bulletin-chat' : ''}`}>{scene !== 'E01-S11' && <BulletinHeader back={back} scene={scene}/>}
    {bulletinReferral && scene && Number(scene.slice(-2)) >= 12 && <details className="utility-card" onToggle={event => { if (event.currentTarget.open) useGameStore.getState().readSliceMessages() }}><summary>Maya's case-contact referral · Bulletin return inbox</summary><p>{bulletinReferral.text}</p></details>}
    {!s ? <div className="utility-content"><p className="section-caption">PUBLIC CASE BRIEF</p><article className="utility-card"><h2>Daniel Mercer is missing</h2><p>Daniel was last confirmed in contact on 4 October. Read the public brief and compare its older record preview with the current civic copy.</p></article><StoryButton onClick={beginEpisodeSlice}>Open case brief</StoryButton></div>
    : scene === 'E01-S11' ? <><SliceChat back={back}/><div className="slice-footer"><StoryButton onClick={nextSliceScene} disabled={save.pendingEvents.some(event => event.id.startsWith('EV-E01-S11-'))}>Check public editor listing</StoryButton></div></>
    : <div className="utility-content slice-content" key={scene}>
      <p className="section-caption bulletin-case-line"><span>THE MISSING ENTRY</span><span>CASE MP-DM-07</span></p>
      {scene === 'E01-S02' && <><BriefCover/><StoryButton onClick={nextSliceScene}>Read public brief</StoryButton></>}
      {scene === 'E01-S03' && <><FullBrief expanded={s.briefRead}/>{!s.briefRead && <StoryButton onClick={openBrief}>Read full brief</StoryButton>}<StoryButton onClick={nextSliceScene}>Older preview</StoryButton></>}
      {scene === 'E01-S04' && <><SourceCard title="Older Bus 4 preview" source="E001 · Memory Project crop · original audit not held here" text={previewText}/><p className="utility-note">The top and bottom of the page are outside the crop. A crop cannot show whether the complete source was later corrected or how it was certified.</p><button className="choice" onClick={inspectPreview}>{s.previewInspected ? 'June row pinned as preview observation' : 'Pin June row as an observation'}</button><StoryButton disabled={!s.previewInspected} onClick={nextSliceScene}>View current copy</StoryButton></>}
      {scene === 'E01-S05' && <><SourceCard title="North Quay evacuation · Bus 4 · Current copy · v2" source="E002 · Greyhaven civic portal · public redacted view" text={currentText}/><button className="choice" aria-expanded={sourceDetail} onClick={() => setSourceDetail(!sourceDetail)}>Source details</button>{sourceDetail && <p className="utility-note">Publisher: Greyhaven civic portal. View: public redacted. Captured for your case notes on 8 October. Publication time is not the 2019 event time.</p>}<StoryButton onClick={nextSliceScene}>Compare copies</StoryButton></>}
      {scene === 'E01-S06' && <><h2>One line apart</h2><p>Compare the same record, not two similar headlines.</p><RecordComparison/><h3>Which field can you actually see change?</h3><div className="choices">{comparisonAnswers.map(item => <button className="choice" key={item.id} onClick={() => { setAnswer(item.id); compare(item.id) }}>{item.text}</button>)}</div>{answer && <p role="status" className="slice-feedback">{comparisonAnswers.find(item => item.id === answer)?.feedback}</p>}{s.attempts > 0 && <p className="utility-note">Attempts: {s.attempts}. Mistakes do not lock the comparison.</p>}<button className="choice" onClick={hint}>Hint {Math.min(s.hintCount + 1, 3)}</button>{s.hintCount > 0 && <p className="utility-note">{comparisonHints[s.hintCount - 1]}</p>}</>}
      {scene === 'E01-S07' && <><article className="utility-card"><h2>A sentence you can defend</h2><p>Observed: the older preview shows June Ellis. The current public copy leaves Escort blank.</p><p>Not yet established: which complete version was certified, why it changed, or who changed it.</p></article><h3>How would you describe this to another person?</h3><div className="choices">{leadChoices.map(item => <button key={item.id} className={lead === item.id ? 'choice selected' : 'choice'} onClick={() => setLead(item.id)} aria-pressed={lead === item.id}>{item.text}</button>)}</div><StoryButton disabled={!lead} onClick={() => saveLead(lead)}>Save lead to private Board</StoryButton><button className="choice" onClick={recheckComparison}>Recheck comparison</button><p className="utility-note">Source: E001 preview + E002 public view · Proof level: LEAD. This does not send a tip.</p></>}
      {scene === 'E01-S08' && <><h2>The shape of a tip</h2><p>Tips go to the editor of this case brief. You can hear back without sharing a real name or phone number.</p><p>What will Maya see? Your selected text, the public record links, and either a return token or a handle you choose. No device contacts or location.</p><div className="choices"><button className={s.tipMode === 'anonymous' ? 'choice selected' : 'choice'} onClick={() => setTip('anonymous', '')}>Use an anonymous return token.</button><button className={s.tipMode === 'handle' ? 'choice selected' : 'choice'} onClick={() => setTip('handle', s.handle)}>Use a handle.</button></div>{s.tipMode === 'anonymous' && <p className="utility-note">Your reply will appear in this Bulletin inbox. Save the token on this device.</p>}{s.tipMode === 'handle' && <><label htmlFor="tip-handle">Case handle</label><input id="tip-handle" className="slice-input" maxLength={20} value={s.handle} onChange={event => setTip('handle', event.target.value)}/><p className="utility-note">Use 2–20 letters, numbers or spaces. This does not open Messages.</p></>}<article className="utility-card"><h2>Draft</h2><p>{tipText}</p></article><StoryButton disabled={!s.tipMode || (s.tipMode === 'handle' && !/^[a-z\d ]{2,20}$/i.test(s.handle.trim()))} onClick={nextSliceScene}>Review recipient and privacy</StoryButton><button className="choice" onClick={continuePublicWithoutTip}>Keep researching without sending a tip</button><p className="utility-note">You can return to a public-observation tip later. Nothing is sent or preselected.</p></>}
      {scene === 'E01-S09' && <><h2>Before you send</h2><article className="utility-card"><p>To: Maya Chen · Greyhaven Memory Project case brief inbox.</p><p>Reply route: {s.tipMode === 'anonymous' ? 'anonymous Bulletin return token' : `Bulletin handle ${s.handle.trim()} only`}.</p><p>Included: your text and two public links. Not included: the cropped image, your contacts, your location or your legal name.</p><p>{tipText}</p></article><StoryButton onClick={sendTip}>Send tip</StoryButton><button className="choice" onClick={nextSliceScene}>Back to draft · Nothing sent</button><button className="choice" onClick={continuePublicWithoutTip}>Keep researching without sending a tip</button></>}
      {scene === 'E01-S10' && <><h2>Tip receipt · R01</h2><article className="utility-card"><p>Recipient: case brief inbox / Maya Chen. Delivered: 8 Oct, after your Send. Scope: observation and two public links.</p><p>{s.tipMode === 'anonymous' ? 'Reply token: stored on this device. The editor cannot see a name from this token.' : `Reply handle: ${s.handle.trim()}. No Messages connection exists.`}</p><p>A delivered tip is not verified evidence. You can keep comparing sources while you wait.</p></article><StoryButton disabled={!replyArrived} onClick={openSliceInbox}>{replyArrived ? 'Open reply inbox' : 'No reply yet · public records remain available'}</StoryButton></>}
      {scene === 'E01-S12' && <><h2>A name is not a channel</h2><article className="utility-card"><small>MEMORY PROJECT · PUBLIC EDITOR LISTING</small><p>Maya Chen · Daniel Mercer case brief editor · Bulletin return inbox case code MP-DM-07.</p><p>The listing confirms who manages this case inbox. It does not certify an attached document.</p></article><h3>Which two details should match?</h3><div className="choices">{editorAnswers.map(item => <button key={item.id} className="choice" onClick={() => { setEditorAnswer(item.id); answerEditor(item.id) }}>{item.text}</button>)}</div>{editorAnswer && <p role="status" className="slice-feedback">{editorAnswers.find(item => item.id === editorAnswer)?.feedback}</p>}{s.editorChecked && <article className="utility-card"><h2>Channel checked</h2><p>The code and return route match the public listing. This confirms the editor channel, not Maya’s crop or the complete 2019 file.</p><p>Your lead and tip receipt are saved. The source question remains open.</p></article>}<EditorContinuation/></>}
      {scene === 'E01-S13' && <ExactRowScene/>}
      {scene === 'E01-S14' && <ShareRowScene/>}
      {scene === 'E01-S15' && <EditorNoteScene/>}
      {scene === 'E01-S16' && <PermissionOfferScene/>}
      {scene === 'E01-S17' && <PermissionSheetScene/>}
      {scene === 'E01-S18' && <SourceStatusScene/>}
      {scene === 'E01-S19' && <PreviewDateScene/>}
      {scene === 'E01-S20' && <RevisionNoticeScene/>}
      {scene === 'E01-S21' && <TimelineScene/>}
      {scene === 'E01-S22' && <CorrectionTheoryScene/>}
      {scene === 'E01-S23' && <PublicSearchScene/>}
      {scene === 'E01-S24' && <DanielNoteScene/>}
      {scene === 'E01-S25' && <MayaCheckinScene/>}
      {scene === 'E01-S26' && <FramingScene/>}
      {scene === 'E01-S27' && <GcroRequestScene/>}
      {scene === 'E01-S28' && <GcroReleaseScene/>}
      {scene === 'E01-S29' && <CorroborationScene/>}
      {scene === 'E01-S30' && <RoleCliffhangerScene/>}
    </div>}
  </section>
}
