import { Archive, Bell, BookOpenText, CalendarDays, Camera, ContactRound, FileText, Mail, MapPinned, MessageCircle, Network, NotebookPen, Phone, Search, Settings2 } from 'lucide-react'

export const apps = [
  { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'peach' },
  { id: 'calls', label: 'Calls', icon: Phone, color: 'blue' },
  { id: 'contacts', label: 'Contacts', icon: ContactRound, color: 'sand' },
  { id: 'bulletin', label: 'Bulletin', icon: BookOpenText, color: 'green' },
  { id: 'photos', label: 'Photos', icon: Camera, color: 'violet' },
  { id: 'files', label: 'Files', icon: FileText, color: 'blue' },
  { id: 'search', label: 'Search', icon: Search, color: 'sand' },
  { id: 'maps', label: 'Maps', icon: MapPinned, color: 'green' },
  { id: 'archive', label: 'The Archive', icon: Archive, color: 'peach' },
  { id: 'board', label: 'Case Board', icon: Network, color: 'green' },
  { id: 'alerts', label: 'Alerts', icon: Bell, color: 'violet' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, color: 'sand' },
  { id: 'notes', label: 'Notes', icon: NotebookPen, color: 'sand' },
  { id: 'mail', label: 'Mail', icon: Mail, color: 'blue' },
  { id: 'settings', label: 'Settings', icon: Settings2, color: 'blue' },
] as const

export type AppId = typeof apps[number]['id']

export const searchResults = [
  { id: 'notice', title: 'Greyhaven public notices', source: 'Greyhaven Bulletin', excerpt: 'City notices and service updates from the municipal archive.', tags: 'public city bulletin' },
  { id: 'route', title: 'Civic transit route guide', source: 'Greyhaven Transit', excerpt: 'A fictional guide to local routes and stops.', tags: 'transit route bus map' },
  { id: 'library', title: 'Library local history desk', source: 'Greyhaven Library', excerpt: 'Finding aids for local newspaper and document collections.', tags: 'history records archive library' },
]

export const mapPins = [
  { id: 'square', name: 'Civic Square', note: 'Public meeting point', x: 55, y: 48 },
  { id: 'library', name: 'Greyhaven Library', note: 'Local history collection', x: 30, y: 31 },
  { id: 'station', name: 'North Station', note: 'Transit interchange', x: 77, y: 23 },
]

export const episodeCasePins = [
  { id: 'north-quay', name: 'North Quay', note: 'Area named on the 2019 record; no historical Bus 4 trace', x: 55, y: 48 },
  { id: 'gcro', name: 'Civic Records Office', note: 'Public request desk for independent archived versions', x: 30, y: 31 },
  { id: 'memory-project', name: 'Memory Project', note: 'Publisher of the Daniel Mercer Bulletin brief', x: 77, y: 23 },
]
