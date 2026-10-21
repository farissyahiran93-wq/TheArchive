import { useState } from 'react'

export function RecoveredThumbnail({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState('')
  return failed === src ? <span className="mirror-thumbnail-error">Preview unavailable</span> : <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(src)}/>
}
