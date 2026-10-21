import { apps, type AppId } from '../content/phone'
import { Settings } from 'lucide-react'

const petals = ['#ffb724', '#ff743e', '#f34e68', '#cf62b0', '#7587d8', '#58b7dc', '#6acb91', '#c1d959']

/** Original vector icons for the fictional phone; no platform image assets. */
export function AppIcon({ id, badge = 0, date = new Date(2026, 9, 8) }: { id: AppId; badge?: number; date?: Date }) {
  const Icon = id === 'settings' ? Settings : apps.find(app => app.id === id)!.icon
  return <span className={`app-icon native-icon icon-${id}`} aria-hidden="true">
    {id === 'photos' ? <svg viewBox="0 0 64 64" className="photos-flower">{petals.map((color, index) => <ellipse key={color} cx="32" cy="20" rx="9" ry="15" fill={color} fillOpacity=".84" transform={`rotate(${index * 45} 32 32)`}/>)}<circle cx="32" cy="32" r="5" fill="#fff" fillOpacity=".55"/></svg>
    : id === 'calendar' ? <span className="calendar-icon"><span>{date.toLocaleDateString('en', { weekday: 'short' }).toUpperCase()}</span><strong>{date.getDate()}</strong></span>
    : id === 'notes' ? <span className="notes-icon"><i/><i/><i/></span>
    : id === 'files' ? <svg viewBox="0 0 64 64"><path d="M10 18a5 5 0 0 1 5-5h13l6 7h15a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5z" fill="#1689ed"/><path d="M10 27a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4v20a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5z" fill="#42b7ff"/></svg>
    : id === 'maps' ? <svg viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="#e7ecd9"/><path d="M0 15h24v23H0zM37 40h27v24H37z" fill="#98d6a1"/><path d="m-5 55 73-34" stroke="#fff" strokeWidth="12"/><path d="m-5 55 73-34" stroke="#f5c96b" strokeWidth="5"/><path d="M32-2v68" stroke="#fff" strokeWidth="14"/><path d="M32-2v68" stroke="#79c4f4" strokeWidth="8"/><circle cx="31" cy="35" r="14" fill="#fff"/><circle cx="31" cy="35" r="11" fill="#1689ed"/><path d="m31 27 6 16-6-4-6 4z" fill="#fff"/></svg>
    : id === 'search' ? <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#fff" fillOpacity=".97"/><circle cx="32" cy="32" r="20" fill="#3daaf2"/>{Array.from({ length: 12 }, (_, i) => <path key={i} d="M32 14v3" stroke="#fff" strokeWidth="1.5" transform={`rotate(${i * 30} 32 32)`}/>)}<path d="m41 20-6 15-15 9 9-15z" fill="#fff"/><path d="m41 20-6 15-6-6z" fill="#f4564a"/></svg>
    : id === 'contacts' ? <svg viewBox="0 0 64 64"><rect x="11" y="9" width="40" height="47" rx="5" fill="#e7ddcc"/><path d="M48 13h6v9h-6z" fill="#63a9ce"/><path d="M48 25h6v9h-6z" fill="#e3a172"/><path d="M48 37h6v9h-6z" fill="#80ae95"/><circle cx="30" cy="26" r="8" fill="#8d8172"/><path d="M17 46c0-9 5-12 13-12s13 3 13 12" fill="#8d8172"/></svg>
    : id === 'bulletin' ? <span className="bulletin-icon"><b>G</b><i/><i/></span>
    : <Icon size={id === 'settings' ? 42 : 35} strokeWidth={id === 'settings' ? 2.2 : 1.6} className="native-icon-glyph"/>}
    {badge > 0 && <b className="badge">{badge}</b>}
  </span>
}
