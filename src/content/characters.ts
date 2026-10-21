/** Supplied character identity art, never a recovered photograph or proof of identity. */
export const characterArtwork = {
  daniel: { name: 'Daniel Mercer', avatar: '/media/portraits/daniel-avatar.webp', portrait: '/media/portraits/daniel.webp' },
  sophie: { name: 'Sophie Mercer', avatar: '/media/portraits/sophie-avatar.webp', portrait: '/media/portraits/sophie.webp' },
  maya: { name: 'Maya Chen', avatar: '/media/portraits/maya-avatar.webp', portrait: '/media/portraits/maya.webp' },
  lucas: { name: 'Lucas Grey', avatar: '/media/portraits/lucas-avatar.webp', portrait: '/media/portraits/lucas.webp' },
  eli: { name: 'Eli Ward', avatar: '/media/portraits/eli-avatar.webp', portrait: '/media/portraits/eli.webp' },
  nora: { name: 'Nora Vance', avatar: '/media/portraits/nora-avatar.webp', portrait: '/media/portraits/nora.webp' },
} as const
export function artworkForCharacter(value: string) {
  return Object.entries(characterArtwork).find(([id, art]) => value === id || value === art.name || value.startsWith(art.name + ' '))?.[1]
}
