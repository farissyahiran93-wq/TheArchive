/** Supplied fictional visual props. Artwork availability is not source authentication.
 * The original collage is exported separately: its 2021/death/identity claims conflict with canon.
 * This compatible six-PNG set contains no early June Ellis reveal.
 */
export const galleryMedia = [
  {"id": "gallery-image-1", "recordId": "MIR-GALLERY-1", "title": "Shelf photo", "src": "/media/gallery/01-shelf-photo.png", "thumbnail": "/media/gallery/01-shelf-photo-thumb.webp", "width": 1425, "height": 1230, "caption": "Document shelf; framing is incomplete."},
  {"id": "gallery-image-2", "recordId": "MIR-GALLERY-2", "title": "Message crop", "src": "/media/gallery/02-message-crop.png", "thumbnail": "/media/gallery/02-message-crop-thumb.webp", "width": 1080, "height": 1420, "caption": "Compare the originals. Sender and date are outside this fragment."},
  {"id": "gallery-image-3", "recordId": "MIR-GALLERY-3", "title": "Index crop 01", "src": "/media/gallery/03-index-crop-1.png", "thumbnail": "/media/gallery/03-index-crop-1-thumb.webp", "width": 1120, "height": 1450, "caption": "Fourteen numbered markers; the source header is unavailable."},
  {"id": "gallery-image-4", "recordId": "MIR-GALLERY-3", "title": "Index crop 02", "src": "/media/gallery/04-index-crop-2.png", "thumbnail": "/media/gallery/04-index-crop-2-thumb.webp", "width": 1120, "height": 1450, "caption": "Partial 22:30 label. Its source and calendar date are unavailable."},
  {"id": "gallery-image-5", "recordId": "MIR-GALLERY-4", "title": "Notice-board photo", "src": "/media/gallery/05-notice-board-photo.png", "thumbnail": "/media/gallery/05-notice-board-photo-thumb.webp", "width": 1425, "height": 1178, "caption": "North Quay notice board; the archive copy is incomplete."},
  {"id": "gallery-image-6", "recordId": "MIR-GALLERY-4", "title": "Map screenshot", "src": "/media/gallery/06-map-screenshot.png", "thumbnail": "/media/gallery/06-map-screenshot-thumb.webp", "width": 1080, "height": 1550, "caption": "Offline North Quay saved place; no verified travel history."},
] as const
export const galleryMediaForRecord = (recordId: string) => galleryMedia.filter(media => media.recordId === recordId)
