import master from '../../docs/narrative/phase-02/assets/GCRO-EXP-20261008-041.txt?raw'

// This authored fictional prop is delivered only after the simulated GCRO review event.
// The digest was computed from the exact 2,012 UTF-8 master bytes. It is not an
// assertion that any real-world office issued a record.
export const gcroMaster = master
export const gcroIssueDigest = '887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de'
export const gcroIssueBytes = 2012

export async function checkGcroBytes(bytes: Uint8Array, expectedDigest: string, expectedLength: number): Promise<boolean> {
  if (bytes.byteLength !== expectedLength || !globalThis.crypto?.subtle) return false
  const digest = await crypto.subtle.digest('SHA-256', Uint8Array.from(bytes))
  const actual = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2,'0')).join('')
  return actual === expectedDigest
}

export function gcroPages(payload: string = gcroMaster): string[] {
  return payload.split(/(?=PAGE [1-4] OF 4\n)/).filter(Boolean)
}
