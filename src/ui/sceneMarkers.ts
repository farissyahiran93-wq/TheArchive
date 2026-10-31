import { chatSceneId } from '../content/chatScenes'

export type SceneChatLine = { id: string; sender: string; sceneId?: string }

/** A read-only projection of delivered history. No persisted marker flags,
 * read receipts or UI lifecycle effects can move or duplicate a marker. */
export function sceneStartMarkers(lines: readonly SceneChatLine[]): ReadonlyMap<string, string> {
  const seen = new Set<string>()
  const markers = new Map<string, string>()
  for (const line of lines) {
    if (line.sender === 'player' || line.sender === 'system') continue
    const sceneId = line.sceneId ?? chatSceneId(line.id)
    if (!sceneId || seen.has(sceneId)) continue
    seen.add(sceneId)
    markers.set(line.id, sceneId)
  }
  return markers
}
