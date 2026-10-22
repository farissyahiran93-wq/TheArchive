import { playtestEnabled } from '../game/playtest'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Camera, ChevronLeft, ChevronRight, ContactRound, FileText, Globe, Home, LockKeyhole, Mail, MapPin, MessageCircle, Mic, NotebookPen, Phone, Search, Trash2, X, ZoomIn, ZoomOut, type LucideIcon } from 'lucide-react'
import { lifeRecords, mirrorApps, type LifeApp, type LifeRecord } from '../content/danielLife'
import { accessMirrorItems } from '../content/chapter2AccessMirror'
import { canReadLife, defaultLife, lifeKey, visibleLifeRecords, type LifeLocation } from '../game/danielLife'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import './daniel-life.css'

const initial = defaultLife()
const icons: Record<LifeApp, LucideIcon> = { Messages:MessageCircle,Mail,Photos:Camera,Notes:NotebookPen,Maps:MapPin,Browser:Globe,Calls:Phone,Contacts:ContactRound,Files:FileText,Calendar:CalendarDays,Voice:Mic,Deleted:Trash2 }
const displayDate = (value: string) => value ? new Date(value+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}) : 'Date unavailable'
const timeLeft = (due: number, now: number) => {const secs=Math.max(0,Math.ceil((due-now)/1000));return `${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`}

function PhotoPlaceholder({ item }: { item: LifeRecord }) {
  return <div className="life-photo-placeholder" role="img" aria-label={`${item.title}: ${item.body} Image preview not included.`}><Camera size={48} strokeWidth={1}/><span>{item.title}</span><small>{item.unavailable ? 'PREVIEW UNAVAILABLE' : 'Image preview not included'}</small></div>
}

export function DanielLifePhone({ onExit }: { onExit: () => void }) {
  const save = useGameStore(s=>s.save)
  const act = useGameStore(s=>s.accessAction)
  const c = save.chapter2Access!
  const d = c.details ?? initial
  const loc = d.location
  const key = lifeKey(loc)
  const item = lifeRecords.find(i=>i.id===loc.item)
  const scroller = useRef<HTMLDivElement>(null)
  const lastScroll = useRef<{key:string;value:number}|undefined>(undefined)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [code,setCode] = useState('')
  const [lockError,setLockError] = useState('')
  const [photo,setPhoto] = useState<LifeRecord>()
  const [zoom,setZoom] = useState(1)
  const [confirmRecovery,setConfirmRecovery] = useState(false)
  const [recoveryDetails,setRecoveryDetails] = useState(false)
  const [legacy,setLegacy] = useState('')
  const [now,setNow] = useState(Date.now)
  const navigate = (location:LifeLocation,replace=false) => {setCode('');setLockError('');setLegacy('');act({type:'life-navigate',location,replace})}
  const back = () => {if(photo){setPhoto(undefined);return}if(legacy){setLegacy('');return}if(loc.app==='home')onExit();else act({type:'life-back'})}
  useEffect(()=>{
    const listener=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();if(photo)setPhoto(undefined);else if(loc.app==='home')onExit();else act({type:'life-back'})}}
    window.addEventListener('keydown',listener,true)
    return()=>window.removeEventListener('keydown',listener,true)
  },[act,loc.app,onExit,photo])
  useEffect(()=>{
    if(!c.recovery || c.recovery.readyAt!==undefined)return
    const timer=window.setInterval(()=>setNow(Date.now()),1000)
    return()=>window.clearInterval(timer)
  },[c.recovery])
  useLayoutEffect(()=>{if(scroller.current)scroller.current.scrollTop=d.scroll[key]??0},[key,d.scroll])
  useEffect(()=>()=>{if(scrollTimer.current)clearTimeout(scrollTimer.current);const old=lastScroll.current;if(old)act({type:'life-scroll',...old})},[act,key])
  const open=(r:LifeRecord)=>navigate({...loc,item:r.id})
  const rows = loc.app==='home' ? [] : visibleLifeRecords(save,loc.app,loc.query).sort((a,b)=>`${b.date} ${b.stamp??''}`.localeCompare(`${a.date} ${a.stamp??''}`))
  const oldApp = loc.app==='Photos' ? 'Media' : loc.app
  const old = accessMirrorItems.filter(i=>i.app===oldApp)
  const recovery = c.recovery
  const ready = recovery?.readyAt!==undefined
  const storageRead = d.observations.includes('OBS_STORAGE_NOTICE_READ') || !!recovery
  const oldItem = accessMirrorItems.find(i=>i.id===legacy)
  const listRow=(r:LifeRecord)=><button key={r.id} className="life-row" onClick={()=>open(r)}><span><strong>{r.title}{r.locked && !canReadLife(save,r) && <LockKeyhole size={15} aria-label="Locked"/>}</strong><small>{r.app==='Messages' ? r.unavailable ? 'Attachment unavailable' : r.chat?.at(-1)?.text : r.subject??r.category??(r.date&&displayDate(r.date))}</small></span><ChevronRight size={17}/></button>

  function calendar() {
    const month=loc.month??'2026-10', day=loc.day??`${month}-01`, mode=loc.mode??'month'
    const [year,m]=month.split('-').map(Number)
    const first=new Date(Date.UTC(year,m-1,1)), count=new Date(Date.UTC(year,m,0)).getUTCDate()
    const events=lifeRecords.filter(i=>i.app==='Calendar')
    const selected=new Date(day+'T12:00:00Z')
    const weekStart=new Date(selected);weekStart.setUTCDate(selected.getUTCDate()-((selected.getUTCDay()+6)%7))
    const weekEnd=new Date(weekStart);weekEnd.setUTCDate(weekStart.getUTCDate()+7)
    const visible=events.filter(e=>mode==='month' ? e.date.startsWith(month) : mode==='day' ? e.date===day : new Date(e.date+'T12:00:00Z')>=weekStart&&new Date(e.date+'T12:00:00Z')<weekEnd)
    return <><div className="life-month-controls"><button aria-label="Previous month" disabled={month==='2026-09'} onClick={()=>navigate({...loc,month:'2026-09',day:'2026-09-01'},true)}><ChevronLeft/></button><h2>{first.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})}</h2><button aria-label="Next month" disabled={month==='2026-10'} onClick={()=>navigate({...loc,month:'2026-10',day:'2026-10-01'},true)}><ChevronRight/></button></div><div className="life-tabs">{(['month','week','day'] as const).map(v=><button key={v} aria-pressed={mode===v} onClick={()=>navigate({...loc,mode:v},true)}>{v[0].toUpperCase()+v.slice(1)}</button>)}</div><div className="life-calendar">{['M','T','W','T','F','S','S'].map((v,i)=><span key={'w'+i}>{v}</span>)}{Array.from({length:(first.getUTCDay()+6)%7},(_,i)=><span key={'e'+i}/>)}{Array.from({length:count},(_,i)=>{const value=`${month}-${String(i+1).padStart(2,'0')}`;const has=events.some(e=>e.date===value);return <button key={value} aria-label={`${displayDate(value)}${has?', has events':''}`} aria-pressed={day===value} onClick={()=>navigate({...loc,day:value,mode:'day'},true)}>{i+1}{has&&<i/>}</button>})}</div><p className="life-muted">Scheduled entries in a historical snapshot. Attendance is unverified.</p>{visible.map(listRow)}{!visible.length&&<p>No events on this date.</p>}</>
  }

  function deleted() {
    return <><h2>Recently Deleted</h2><p>Daniel Mercer · Mirrored device</p><div className="life-deleted-counts"><strong>3 Messages</strong><strong>2 Photos</strong><strong>1 File</strong></div><p>6 deleted items have recoverable metadata. Their contents are currently unavailable.</p>{!storageRead ? <p role="status">Recovery metadata not loaded. See synchronization notice in Mail.</p> : !recovery ? <><h3>Content reconstruction</h3><p>Estimated processing time: 25 minutes</p>{playtestEnabled&&<p className="life-muted">Test preview: recovery opens immediately.</p>}<button className="opening-primary" onClick={()=>setConfirmRecovery(true)}>START RECOVERY</button><button className="opening-choice" onClick={()=>setRecoveryDetails(v=>!v)}>INSPECT RECOVERY DETAILS</button><button className="opening-choice" onClick={()=>navigate({app:'home'})}>NOT NOW</button></> : ready ? <><strong role="status">RECOVERY READY</strong><p>Reconstructed metadata · Source integrity unverified</p>{['Message 1','Message 2','Message 3','Photo 1','Photo 2','File 1'].map(title=><details className="life-recovered" key={title}><summary>{title}</summary><p>{playtestEnabled ? 'Content awaiting canonical recovery dataset.' : 'Item cannot be displayed in this snapshot.'}</p></details>)}</> : <><strong>RECOVERY SESSION INITIALIZED</strong><p>6 ITEMS QUEUED · BACKGROUND PROCESS ENABLED</p><div className="access-progress" role="timer" aria-label="Recovery time remaining">{timeLeft(recovery.dueAt,Math.max(now,recovery.startedAt))}</div><p>You may continue using your device while recovery is in progress.</p>{playtestEnabled&&<button className="opening-choice" onClick={()=>act({type:'open-recovery-test'})}>Open recovery now · test</button>}</>}{recoveryDetails&&<p>Metadata exists, but the contents were not included in the latest mirror. Reconstruction changes only this local mirror and cannot guarantee what will be legible.</p>}</>
  }

  function detail(r:LifeRecord) {
    if(r.locked&&!canReadLife(save,r))return <div className="life-lock"><LockKeyhole size={34}/><h2>{r.title}</h2><p>Four numbers. The day I promised I'd never forget. DDMM.</p><input aria-label="Note passcode" type="password" inputMode="numeric" maxLength={4} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))}/><div className="life-keypad">{'1234567890'.split('').map(n=><button key={n} onClick={()=>setCode(value=>(value+n).slice(0,4))}>{n}</button>)}<button onClick={()=>setCode(v=>v.slice(0,-1))}>Delete</button><button onClick={back}>Cancel</button></div><button className="opening-primary" disabled={code.length!==4} onClick={()=>{act({type:'life-unlock',answer:code});setCode('');setLockError('Code not recognized. Try again.')}}>Enter</button>{lockError&&<p role="status">{lockError}</p>}{d.attempts>=3&&<p>Look at the dates Daniel chose to keep.</p>}</div>
    return <article className="life-detail"><h2>{r.title}</h2><small className="life-muted">{displayDate(r.date)}{r.stamp?` · ${r.stamp}`:''}</small>{r.app==='Messages' ? <><p className="life-muted">Recovered conversation · read only</p>{r.chat?.map((line,i)=><div key={i} className={`life-chat-line ${line.sender==='daniel'?'daniel':''}`}>{line.sender!=='daniel'&&<CharacterAvatar character={line.sender} fallback={line.sender[0].toUpperCase()} className="message-avatar"/>}<p>{line.text}</p></div>)}{r.unavailable&&<p>{r.body}</p>}<p className="life-muted">Conversation snapshot ends.</p></> : r.app==='Voice' ? <><p>{r.duration} seconds · Historical recording</p><button className="opening-choice" disabled aria-label="Audio recording unavailable">Audio unavailable</button><button className="opening-choice" onClick={()=>act({type:'life-transcript',id:r.id})}>Transcript</button>{d.transcripts?.includes(r.id)&&<p className="life-record">{r.body}</p>}</> : r.app==='Photos' ? <><button className="life-photo-open" aria-label={`View ${r.title} full screen`} onClick={()=>{setPhoto(r);setZoom(1)}}><PhotoPlaceholder item={r}/></button><p>{r.body}</p><p className="life-muted">Metadata incomplete. No location history available.</p></> : <>{r.byline&&<p className="life-muted">{r.byline}</p>}{r.subject&&<h3>{r.subject}</h3>}{r.deck&&<p>{r.deck}</p>}{r.place&&<p>{r.place}</p>}<p className="life-record">{r.body}</p>{r.app==='Calendar'&&<p className="life-muted">{r.id==='LIFE-CAL7'?'Tentative. Confirmation and attendance unavailable.':'Scheduled in snapshot. Attendance unverified.'}</p>}{r.related&&<button className="opening-choice" onClick={()=>open(lifeRecords.find(i=>i.id===r.related)!)}>Open cached article</button>}{r.app==='Maps'&&<><p className="life-muted">Searches and saved places do not establish travel.</p><button disabled className="opening-choice">Route not available in mirrored snapshot</button></>}{(r.app==='Contacts'||r.app==='Calls')&&<button disabled className="opening-choice" aria-label="Calling is unavailable in read-only mirror">Calling unavailable · read only</button>}{r.app==='Mail'&&<div className="life-tabs"><button disabled>Reply</button><button disabled>Forward</button></div>}</>}</article>
  }

  return <section className="life-phone" aria-label="Daniel Mercer's mirrored phone"><header className="life-outer-header"><button onClick={onExit} aria-label="Back to The Archive"><ArrowLeft size={17}/>The Archive</button><small>MIRRORED DATA · READ ONLY</small></header><div className="life-status" aria-label="Static snapshot clock">9:41<span>Offline snapshot</span></div><header className="life-app-header">{loc.app!=='home'&&<button className="life-icon-button" aria-label="Back in mirror" onClick={back}><ChevronLeft/></button>}<div><strong>{loc.app==='home'?'Daniel Mercer':loc.app}</strong><small>{loc.app==='home'?'Last synchronized snapshot · Timestamp unresolved':'Historical snapshot · Read only'}</small></div>{loc.app==='Browser'&&<button className="life-icon-button" aria-label="Forward in cached browser" disabled={!d.forward.length} onClick={()=>act({type:'life-forward'})}><ArrowRight size={18}/></button>}</header><div className="life-scroll" ref={scroller} onScroll={e=>{lastScroll.current={key,value:e.currentTarget.scrollTop};if(scrollTimer.current)clearTimeout(scrollTimer.current);scrollTimer.current=setTimeout(()=>{if(lastScroll.current)act({type:'life-scroll',...lastScroll.current})},180)}}>
      {loc.app==='home' ? <><p className="life-home-caption">Daniel's phone · Dataset MIRROR/02<br/>Device not connected</p><div className="life-app-grid">{mirrorApps.map((app,i)=>{const Icon=icons[app];return <button key={app} aria-label={`Open mirrored ${app}`} onClick={()=>navigate(d.apps?.[app]??{app,month:'2026-10'})}><span style={{background:['#638d88','#6d95ae','#ac847d','#b79e64'][i%4]}}><Icon size={27}/>{app==='Messages'&&!c.viewed.some(id=>id.startsWith('LIFE-M'))&&<i/>}</span><strong>{app}</strong>{app==='Deleted'&&recovery&&<small>{ready?'Ready':timeLeft(recovery.dueAt,Math.max(now,recovery.startedAt))}</small>}</button>})}</div><p className="life-muted">Recovered entries may be incomplete, reordered or outdated.</p></> : oldItem ? <article className="life-detail"><small>Earlier fragment · unverified</small><h2>{oldItem.title}</h2><p className="life-record">{oldItem.body}</p></article> : item ? detail(item) : loc.app==='Deleted' ? deleted() : loc.app==='Calendar' ? calendar() : <><label className="life-search"><Search size={16}/><input aria-label={`Search mirrored ${loc.app}`} placeholder={loc.app==='Browser'?'Search offline history':'Search'} value={loc.query??''} onChange={e=>navigate({...loc,query:e.target.value},true)}/></label>{loc.app==='Notes'&&<p className="life-muted">On Daniel's Phone</p>}{loc.app==='Maps'&&<div className="life-map" aria-label="Fictional offline map schematic"><svg viewBox="0 0 300 160" aria-hidden="true"><path d="M0 30H300M0 120H300M70 0V160M210 0V160M0 160L300 0"/></svg>{lifeRecords.filter(i=>i.app==='Maps'&&i.category!=='Search history').map((r,i)=><button key={r.id} aria-label={`Map pin ${r.title}`} style={{left:`${[15,63,30,75][i]}%`,top:`${[16,25,65,68][i]}%`}} onClick={()=>open(r)}><MapPin size={22}/></button>)}</div>}{rows.map(listRow)}{!rows.length&&<p>No mirrored result.</p>}{!!old.length&&<details className="life-legacy"><summary>Earlier snapshot fragments</summary>{old.map(r=><button className="life-row" key={r.id} onClick={()=>{act({type:'inspect',id:r.id});setLegacy(r.id)}}>{r.title}<ChevronRight size={16}/></button>)}</details>}</>}
    </div><button className="life-home-control" aria-label="Mirror home" onClick={()=>navigate({app:'home',month:loc.month??'2026-10'})}><Home size={17}/><span/></button>
    {confirmRecovery&&<div className="access-modal" role="dialog" aria-modal="true" aria-label="Recover recently deleted confirmation"><div><h2>RECOVER RECENTLY DELETED?</h2><p>6 items have recoverable metadata. Recovery quality is unknown.</p><p>{playtestEnabled?'Test preview opens immediately.':'Estimated time: 25 minutes. The process continues while you use other apps.'}</p><button className="opening-primary" onClick={()=>{act({type:'start-recovery'});setNow(Date.now());setConfirmRecovery(false)}}>{playtestEnabled?'START — OPEN NOW':'START — 25:00'}</button><button className="opening-choice" onClick={()=>setConfirmRecovery(false)}>NOT NOW</button></div></div>}
    {photo&&<div className="life-photo-viewer" role="dialog" aria-modal="true" aria-label={`${photo.title} full screen`}><button className="life-icon-button" aria-label="Close photo" onClick={()=>setPhoto(undefined)}><X/></button><div className="life-photo-pan"><div style={{transform:`scale(${zoom})`}}><PhotoPlaceholder item={photo}/></div></div><div className="life-photo-tools"><button aria-label="Zoom out" disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.5))}><ZoomOut/></button><span>{Math.round(zoom*100)}%</span><button aria-label="Zoom in" disabled={zoom>=3} onClick={()=>setZoom(z=>Math.min(3,z+.5))}><ZoomIn/></button></div></div>}
  </section>
}
