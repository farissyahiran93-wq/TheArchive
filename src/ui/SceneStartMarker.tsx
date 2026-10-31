import type { SceneChatLine } from './sceneMarkers'
import './scene-markers.css'

export function SceneStartMarker({ line, markers, label }: { line: SceneChatLine; markers: ReadonlyMap<string, string>; label?: string }) {
  const sceneId = markers.get(line.id)
  if (!sceneId) return null
  return <small className="new-message-marker" data-scene-id={sceneId} data-message-id={line.id}>NEW MESSAGE · {label ?? line.sender[0].toUpperCase() + line.sender.slice(1)}</small>
}
