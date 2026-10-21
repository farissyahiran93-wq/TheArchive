import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { galleryMedia } from '../content/galleryMedia'
import { characterArtwork, artworkForCharacter } from '../content/characters'
import { mirrorEntry } from '../content/mirror'

const manifest = JSON.parse(readFileSync('artifacts/phase05/asset-manifest.json', 'utf8')) as { gallery: { source_sha256: string }[] }
describe('Phase 05 asset integrity and identity boundaries', () => {
  it('ships all six original compatible PNGs unchanged, with derived thumbnails', () => {
    expect(galleryMedia).toHaveLength(6)
    galleryMedia.forEach((media, index) => {
      const bytes = readFileSync(`public${media.src}`)
      expect(bytes.toString('ascii', 1, 4)).toBe('PNG')
      expect(bytes.readUInt32BE(16)).toBe(media.width)
      expect(bytes.readUInt32BE(20)).toBe(media.height)
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(manifest.gallery[index].source_sha256)
      expect(readFileSync(`public${media.thumbnail}`).length).toBeGreaterThan(100)
    })
  })
  it('keeps both index images and both quay images behind their existing independent locks', () => {
    expect(galleryMedia.map(media => mirrorEntry(media.recordId)?.lockId)).toEqual([undefined, undefined, 'album-index', 'album-index', 'album-quay', 'album-quay'])
    expect(galleryMedia.map(media => media.caption).join(' ')).not.toMatch(/June Ellis|2021|student dies/i)
  })
  it('has portraits for six existing IDs and keeps unknown, blocked and new names anonymous', () => {
    expect(Object.keys(characterArtwork)).toHaveLength(6)
    Object.entries(characterArtwork).forEach(([id, art]) => {
      expect(artworkForCharacter(id)).toEqual(art)
      expect(artworkForCharacter(art.name)).toEqual(art)
      expect(readFileSync(`public${art.avatar}`).length).toBeGreaterThan(100)
      expect(readFileSync(`public${art.portrait}`).length).toBeGreaterThan(100)
    })
    for (const name of ['Unknown number','Blocked caller','Library desk','June Ellis','Vivian Hale','Maya Chens']) expect(artworkForCharacter(name)).toBeUndefined()
  })
})
