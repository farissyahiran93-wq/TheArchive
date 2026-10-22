import { lifeRecords, mayaBirthday, mirrorApps, type LifeApp, type LifeRecord } from '../content/danielLife'
import type { GameSave } from './types'

export interface LifeLocation { app: LifeApp | 'home'; item?: string; query?: string; month?: string; day?: string; mode?: 'month' | 'week' | 'day' }
export interface LifeState {
  version: 1
  location: LifeLocation
  trail: LifeLocation[]
  forward: LifeLocation[]
  scroll: Record<string, number>
  unlocked: string[]
  attempts: number
  observations: string[]
  transcripts?: string[]
  apps?: Partial<Record<LifeApp,LifeLocation>>
}
export type LifeAction = { type: 'life-navigate'; location: LifeLocation; replace?: boolean }
  | { type: 'life-back' | 'life-forward' }
  | { type: 'life-scroll'; key: string; value: number }
  | { type: 'life-unlock'; answer: string }
  | { type: 'life-inspect' | 'life-transcript'; id: string }

export const defaultLife = (): LifeState => ({ version: 1, location: { app: 'home', month: '2026-10' }, trail: [], forward: [], scroll: {}, unlocked: [], attempts: 0, observations: [] })
export const lifeKey = (l: LifeLocation) => `${l.app}/${l.item ?? ''}/${l.query ?? ''}/${l.month ?? ''}/${l.day ?? ''}/${l.mode ?? ''}`
export const canReadLife = (s: GameSave, item: LifeRecord) => !item.locked || !!s.chapter2Access?.details?.unlocked.includes(item.id)
export const visibleLifeRecords = (s: GameSave, app: LifeApp, query = '') => lifeRecords.filter(i => i.app === app && `${i.title} ${canReadLife(s,i) ? i.body : ''} ${i.locked ? '' : i.chat?.map(m=>m.text).join(' ') ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()))
const update = (s: GameSave, details: LifeState): GameSave => ({ ...s, chapter2Access: { ...s.chapter2Access!, details } })
export function ensureLife(s: GameSave): GameSave { return !s.chapter2Access || s.chapter2Access.details ? s : update(s,defaultLife()) }

export function inspectLife(s: GameSave, id: string, transcript = false): GameSave {
  const c = s.chapter2Access
  const item = lifeRecords.find(i=>i.id===id)
  if (!c?.mirrorOpened || !item || !canReadLife(s,item)) return s
  const base = ensureLife(s), details = base.chapter2Access!.details!
  const observation = item.app === 'Voice' && !transcript ? undefined : item.observation
  const freshView = !c.viewed.includes(id)
  const freshObservation = observation && !details.observations.includes(observation)
  const freshTranscript = transcript && item.app === 'Voice' && !details.transcripts?.includes(id)
  if (!freshView && !freshObservation && !freshTranscript) return s
  const eventId = observation && freshObservation ? observation : `C2-LIFE-READ-${id}`
  return { ...base,
    chapter2Access: { ...base.chapter2Access!, viewed: freshView ? [...c.viewed,id] : c.viewed, details: { ...details, ...(freshTranscript ? {transcripts:[...(details.transcripts??[]),id]} : {}), observations: freshObservation ? [...details.observations,observation] : details.observations }, receipts: [...c.receipts, { eventId, recipient: 'player', source: 'mirror-fragment' }] },
    deliveredEvents: [...new Set([...base.deliveredEvents,eventId])],
    knowledge: freshObservation ? { ...base.knowledge, player: [...new Set([...base.knowledge.player,observation])] } : base.knowledge,
  }
}

export function reduceLife(s: GameSave, a: LifeAction): GameSave {
  if (!s.chapter2Access?.mirrorOpened) return s
  const base = ensureLife(s), d = base.chapter2Access!.details!
  if (a.type === 'life-navigate') {
    const loc = a.location
    if (!(loc.app === 'home' || mirrorApps.includes(loc.app)) || loc.item && !lifeRecords.some(i=>i.id===loc.item && i.app===loc.app)) return s
    if (lifeKey(loc) === lifeKey(d.location)) return s
    const apps = d.location.app === 'home' ? d.apps : {...d.apps,[d.location.app]:{...d.location,item:undefined}}
    const next = update(base,{ ...d, location: loc, apps, trail: a.replace ? d.trail : [...d.trail,d.location].slice(-50), forward: [] })
    return loc.item ? inspectLife(next,loc.item) : next
  }
  if (a.type === 'life-back') {
    const prior = d.trail.at(-1)
    if (!prior) return d.location.app === 'home' ? s : update(base,{ ...d, location:{app:'home'}, forward:[d.location] })
    return update(base,{ ...d, location:prior, trail:d.trail.slice(0,-1), forward:[...d.forward,d.location] })
  }
  if (a.type === 'life-forward') {
    const next = d.forward.at(-1)
    return next ? update(base,{ ...d, location:next, trail:[...d.trail,d.location], forward:d.forward.slice(0,-1) }) : s
  }
  if (a.type === 'life-scroll') {
    if (!Number.isFinite(a.value) || a.value < 0 || d.scroll[a.key] === a.value || a.key.length>300) return s
    return update(base,{ ...d, scroll:{...d.scroll,[a.key]:a.value} })
  }
  if (a.type === 'life-unlock') {
    if (d.location.item !== 'LIFE-N7' || d.unlocked.includes('LIFE-N7') || !/^\d{4}$/.test(a.answer)) return s
    const answer = `${String(mayaBirthday.day).padStart(2,'0')}${String(mayaBirthday.month).padStart(2,'0')}`
    return a.answer === answer ? inspectLife(update(base,{ ...d, unlocked:[...d.unlocked,'LIFE-N7'] }),'LIFE-N7') : update(base,{ ...d, attempts:d.attempts+1 })
  }
  if (a.type === 'life-inspect' || a.type === 'life-transcript') return inspectLife(base,a.id,a.type==='life-transcript')
  return s
}

export function validateLife(value: unknown): void {
  if (value === undefined) return
  const record = (v: unknown): v is Record<string,unknown> => !!v && typeof v==='object' && !Array.isArray(v)
  const loc = (v: unknown) => record(v) && (v.app==='home'||mirrorApps.includes(v.app as LifeApp)) && (v.item===undefined || lifeRecords.some(i=>i.id===v.item&&i.app===v.app)) && (v.query===undefined||typeof v.query==='string') && (v.month===undefined||typeof v.month==='string'&&/^2026-(?:09|10)$/.test(v.month)) && (v.day===undefined||typeof v.day==='string'&&/^2026-(?:09|10)-\d{2}$/.test(v.day)) && (v.mode===undefined||['month','week','day'].includes(String(v.mode)))
  if (record(value) && value.transcripts !== undefined && (!Array.isArray(value.transcripts) || value.transcripts.some(id=>!lifeRecords.some(i=>i.id===id&&i.app==='Voice')))) throw new Error('Invalid mirror transcript receipt')
  if (record(value) && value.apps !== undefined && (!record(value.apps) || Object.entries(value.apps).some(([app,state])=>!mirrorApps.includes(app as LifeApp)||!loc(state)))) throw new Error('Invalid mirror app navigation state')
  if (!record(value)||value.version!==1||!loc(value.location)||!Array.isArray(value.trail)||!value.trail.every(loc)||!Array.isArray(value.forward)||!value.forward.every(loc)||!record(value.scroll)||Object.values(value.scroll).some(n=>typeof n!=='number'||!Number.isFinite(n)||n<0)||!Array.isArray(value.unlocked)||value.unlocked.some(i=>i!=='LIFE-N7')||!Number.isSafeInteger(value.attempts)||Number(value.attempts)<0||!Array.isArray(value.observations)||value.observations.some(o=>typeof o!=='string'||!['OBS_RECOVERY_STARTED',...lifeRecords.map(i=>i.observation)].includes(o))) throw new Error('Invalid Daniel mirror detail state')
}
