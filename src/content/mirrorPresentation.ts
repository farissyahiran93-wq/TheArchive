import type { MirrorArea } from './opening'

/** Display labels only. Catalog IDs, authored bodies and inspection keys stay stable. */
export const mirrorAppNames: Record<MirrorArea, string> = {
  messages: 'Messages', mail: 'Mail', gallery: 'Photos', calls: 'Phone',
  notes: 'Notes', files: 'Files', browser: 'Browser', contacts: 'Contacts',
  protected: 'Protected', maps: 'Maps', index: 'Archive Index',
}

export function mirrorDisplayStamp(stamp: string) {
  return stamp.split(/\s*\/\s*/).filter(part => !/RECOVERED|UNVERIFIED|READ.?ONLY|VERIFY|PARTIAL|INCOMPLETE|INTEGRITY|SAVED CONTACT|HISTORY ENTRY|BOOKMARK|LOCKED|REDACTED/i.test(part)).join(' · ')
}
