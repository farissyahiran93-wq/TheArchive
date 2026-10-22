// Owner-authored MIRROR/02 fragments; inspection never authenticates them.
export const accessMirrorItems = [
  { id: 'maya', app: 'Messages', title: 'Maya', body: "MAYA: I wasn't asking you to explain everything.\nMAYA: I was asking if you're okay.\nDANIEL: I know.\nDANIEL: I can't do this properly over messages.\n\nEarlier messages unavailable.", note: 'The exchange is tense, but the missing context matters.' },
  { id: 'sophie', app: 'Messages', title: 'Sophie', body: "SOPHIE: Did you ever find the picture?\nDANIEL: Not yet. I haven't forgotten.\n\nAttachment reference found. Media file unavailable in this snapshot.", note: 'A personal conversation, not necessarily an investigation lead.' },
  { id: 'lucas', app: 'Messages', title: 'Lucas', body: "LUCAS: You coming or not?\nDANIEL: Can't tonight. Sorry.\nLUCAS: Another time, then.\n\nSequence integrity: PARTIAL.", note: 'Not every abrupt exchange is suspicious.' },
  { id: 'draft', app: 'Mail', title: 'Unsent draft', body: 'To: [not specified]\nSubject: [empty]\n\nI should call instead.\n\nDraft timestamp unavailable.' },
  { id: 'mail', app: 'Mail', title: 'Personal / no subject', body: 'Content not present in this mirror.' },
  { id: 'errands', app: 'Notes', title: 'Errands', body: 'batteries\ncoffee\nreturn the spare key\n\nLast edited: date unavailable.' },
  { id: 'index', app: 'Notes', title: 'Check the index', body: "Compare originals against the export list.\nDon't assume the file order is the event order.\n\nModification history missing.", note: "The note resembles Daniel's concern about changed records, but this copy cannot authenticate it." },
  { id: '0418', app: 'Media', title: 'IMG_0418', body: 'Media reference exists. Original not recovered.' },
  { id: '0419', app: 'Media', title: 'IMG_0419', body: 'Ordinary indoor photo · metadata incomplete.\nImage pixels are not supplied in this dataset.' },
  { id: 'attachment', app: 'Media', title: 'ATTACHMENT_REF_04', body: 'Media reference exists. Original not recovered.' },
] as const
