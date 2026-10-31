// Resolve the previously shipped placeholder path in already-delivered saves.
export const chatPhotoSource = (src: string) => src === '/sophie-sticky-note.jpg' ? '/sophie-sticky-note.png' : src
