import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, Layers2, MapPin, Minus, Plus, Scan, Search, TrainFront, X } from 'lucide-react'
import { episodeCasePins, mapPins } from '../content/phone'
import { useGameStore } from '../game/store'

const categories = { square: 'Public space', library: 'Library', station: 'Transit', 'north-quay': 'Case sources', gcro: 'Case sources', 'memory-project': 'Case sources' } as const
const placeIcons = { square: MapPin, library: BookOpen, station: TrainFront, 'north-quay': MapPin, gcro: BookOpen, 'memory-project': MapPin }
type PlaceId = keyof typeof categories
const streets = [
  'M-100 290 L1100 130', 'M-100 440 L1100 280', 'M-100 590 L1100 430',
  'M-100 1040 L1100 760', 'M-100 1190 L1100 910',
  'M135 -100 L230 580', 'M345 -100 L435 550', 'M555 -100 L640 510', 'M765 -100 L845 480',
  'M180 875 L230 1200', 'M405 805 L465 1200', 'M660 730 L730 1200', 'M870 680 L945 1200',
]
const buildings = Array.from({ length: 9 }, (_, row) => Array.from({ length: 9 }, (_, col) => {
  const x = col * 127 - 40, y = row * 145 - 30
  return { x, y, width: 58 + ((col + row) % 3) * 13, height: 55 + ((col * 3 + row) % 3) * 15 }
})).flat()

function CityMap() {
  return <g className="city-cartography" aria-hidden="true">
    <defs>
      <pattern id="map-buildings" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 18 L18 0" stroke="currentColor" strokeWidth=".5" opacity=".1"/></pattern>
      <clipPath id="map-land"><path d="M-100 -100H1200V490C870 490 690 610 460 660S110 735-100 790Z M-100 890C120 845 330 840 500 785S950 600 1200 610V1300H-100Z"/></clipPath>
    </defs>
    <rect x="-500" y="-500" width="2000" height="2200" className="map-land-base"/>
    <g clipPath="url(#map-land)">
      <g className="map-blocks">{buildings.map((b, i) => <rect key={i} {...b} rx="7" transform={`rotate(-8 ${b.x} ${b.y})`}/>)}</g>
      <path className="map-park" d="M40 50L290 15 320 190 90 220Z M700 870L920 810 960 1050 760 1100Z"/>
      <path className="map-park-path" d="M90 190Q140 70 270 55 M740 920Q880 880 900 1020"/>
      <g className="map-street-edge">{streets.map((d, i) => <path key={i} d={d}/>)}</g>
      <g className="map-streets">{streets.map((d, i) => <path key={i} d={d}/>)}</g>
      <path className="map-local-street" d="M-20 355L970 220 M-20 505L970 370 M95 -20L170 540 M460 -20L540 530 M670 0L735 480 M-10 970L1100 720 M310 850L360 1200"/>
      <path className="map-square-land" d="M485 445L610 427 624 558 500 575Z"/>
      <path className="map-square-walk" d="M485 445L624 558M610 427L500 575"/>
      <g className="map-trees">{[[140,90],[185,80],[240,85],[155,140],[210,140],[100,160],[785,915],[835,890],[880,930],[810,980],[860,1020]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="15"/>)}</g>
    </g>
    <path className="map-river-edge" d="M-100 790C110 735 230 715 460 660S870 490 1200 490L1200 610C950 600 680 730 500 785S120 845-100 890Z"/>
    <path className="map-river" d="M-100 805C110 750 230 730 465 675S870 505 1200 505L1200 595C950 585 675 715 495 770S120 830-100 875Z"/>
    <path className="map-river-line" d="M-100 840Q200 780 480 725T1200 550"/>
    <path className="map-bridge-edge" d="M220 590L270 890 M780 440L835 730"/>
    <path className="map-bridges" d="M220 590L270 890 M780 440L835 730"/>
    <path className="map-bridge-line" d="M220 590L270 890 M780 440L835 730"/>
    <g className="map-district-labels"><text x="170" y="285">OLD QUARTER</text><text x="690" y="400">NORTH BANK</text></g>
    <text className="map-canal-label" x="405" y="737" transform="rotate(-13 405 737)">C A N A L</text>
    <g className="map-building-landmarks"><rect x="272" y="320" width="65" height="52" rx="5"/><rect x="735" y="226" width="76" height="46" rx="5"/></g>
  </g>
}

export function MapsApp({ back }: { back: () => void }) {
  const scene = useGameStore(state => state.save.e01?.sceneId)
  const caseMap = !!scene && Number(scene.slice(-2)) >= 23
  const pins = caseMap ? episodeCasePins : mapPins
  const [active, setActive] = useState<PlaceId>(caseMap ? 'north-quay' : 'square')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All places')
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState({ x: 510, y: 535 })
  const [size, setSize] = useState({ width: 390, height: 480 })
  const viewport = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; center: typeof center } | null>(null)
  const pin = pins.find(item => item.id === active) ?? pins[0]
  const SelectedIcon = placeIcons[active]
  const visible = pins.filter(item => (filter === 'All places' || categories[item.id as PlaceId] === filter) && `${item.name} ${item.note} ${categories[item.id as PlaceId]}`.toLowerCase().includes(query.trim().toLowerCase()))
  const width = 1000 / zoom, height = width * size.height / size.width
  const left = center.x - width / 2, top = center.y - height / 2

  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const choose = (id: PlaceId) => {
    const place = pins.find(item => item.id === id)!
    setActive(id); setQuery(''); setExpanded(false)
    setCenter({ x: place.x * 10, y: place.y * 11 + 60 })
  }
  const overview = () => { setCenter({ x: 510, y: 535 }); setZoom(1); setFilter('All places'); setQuery('') }
  const startPan = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest('button')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, center }
  }
  const movePan = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    setCenter({ x: Math.max(-100, Math.min(1100, drag.current.center.x - (event.clientX - drag.current.x) * width / size.width)), y: Math.max(0, Math.min(1100, drag.current.center.y - (event.clientY - drag.current.y) * height / size.height)) })
  }

  return <section className="maps-screen" aria-label="Maps">
    <div className="maps-explore">
      <div className="city-map-viewport" ref={viewport} role="region" aria-label="Illustrated map of Greyhaven. Drag to pan, or use arrow keys." tabIndex={0} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onKeyDown={event => {
        const directions: Record<string, [number, number]> = { ArrowLeft: [-70,0], ArrowRight: [70,0], ArrowUp: [0,-70], ArrowDown: [0,70] }
        if (directions[event.key]) { event.preventDefault(); const [x,y] = directions[event.key]; setCenter(c => ({ x: Math.max(-100,Math.min(1100,c.x+x/zoom)), y: Math.max(0,Math.min(1100,c.y+y/zoom)) })) }
      }}>
        <svg className="city-map-art" viewBox={`${left} ${top} ${width} ${height}`}><CityMap/></svg>
        {visible.map(item => {
          const id = item.id as PlaceId, Icon = placeIcons[id]
          return <button key={id} className={`city-place-pin pin-${id} ${active === id ? 'is-selected' : ''}`} style={{ left: `${(item.x * 10 - left) / width * 100}%`, top: `${(item.y * 11 - top) / height * 100}%` }} onClick={() => choose(id)} aria-label={`Show ${item.name}`} aria-pressed={active === id}><span><Icon size={19}/></span><strong>{item.name}</strong></button>
        })}
      </div>
      <header className="maps-top-panel">
        <div className="maps-heading"><button className="icon-button bare" aria-label="Back to home" onClick={back}><ArrowLeft size={22}/></button><div><h1>Maps</h1><span>Explore Greyhaven</span></div><span className="map-offline"><i/>Local map</span></div>
        <label className="maps-search"><Search size={18}/><input aria-label="Search map places" placeholder="Search places" value={query} onChange={event => setQuery(event.target.value)}/>{query && <button onClick={() => setQuery('')} aria-label="Clear map search"><X size={16}/></button>}</label>
        <div className="map-categories" aria-label="Place categories">{(caseMap ? ['All places','Case sources'] : ['All places','Library','Transit']).map(label => <button key={label} aria-pressed={filter === label} className={filter === label ? 'selected' : ''} onClick={() => { setFilter(label); setExpanded(true) }}>{label === 'Library' ? <BookOpen size={13}/> : label === 'Transit' ? <TrainFront size={13}/> : <Layers2 size={13}/>} {label}</button>)}</div>
        {query && <div className="map-search-results" aria-label="Map search results">{visible.length ? visible.map(item => <button key={item.id} onClick={() => choose(item.id as PlaceId)}><MapPin size={17}/><span><strong>{item.name}</strong><small>{item.note}</small></span><ChevronRight size={17}/></button>) : <p>{caseMap ? 'No named public case place found.' : 'No places found. Try library, station or square.'}</p>}</div>}
      </header>
      <div className="map-tools"><span className="map-compass" aria-label="North is up"><b>N</b><i/></span><div><button aria-label="Zoom in" disabled={zoom >= 2.4} onClick={() => setZoom(z => Math.min(2.4, Math.round((z + .35)*100)/100))}><Plus size={20}/></button><button aria-label="Zoom out" disabled={zoom <= .7} onClick={() => setZoom(z => Math.max(.7, Math.round((z - .35)*100)/100))}><Minus size={20}/></button></div><button aria-label="Show all places" onClick={overview}><Scan size={19}/></button></div>
      <span className="map-attribution">GREYHAVEN · ILLUSTRATED CITY MAP</span>
    </div>
    <section className={`map-place-sheet ${expanded ? 'expanded' : ''}`} aria-label="Place details">
      <button className="map-sheet-toggle" aria-label={expanded ? 'Collapse place list' : 'Browse public places'} aria-expanded={expanded} onClick={() => setExpanded(value => !value)}><span/></button>
      <div className="map-place-summary"><span className={`place-symbol pin-${active}`}><SelectedIcon size={23}/></span><div aria-live="polite"><small>{categories[active]}</small><h2>{pin.name}</h2><p>{pin.note}</p></div><button aria-label={expanded ? 'Hide public places' : 'Show public places'} onClick={() => setExpanded(value => !value)}><ChevronDown size={20} className={expanded ? 'rotated' : ''}/></button></div>
      <div className="map-place-meta"><span><MapPin size={12}/> Public places</span><span>{caseMap ? 'No route or person location' : 'No live location'}</span></div>
      {expanded && <div className="map-place-list">{visible.length ? visible.map(item => <button key={item.id} onClick={() => choose(item.id as PlaceId)}><span><strong>{item.name}</strong><small>{item.note}</small></span><ChevronRight size={18}/></button>) : <p>No places match this search.</p>}</div>}
    </section>
  </section>
}
