/** Display catalog only. Tool IDs never replace existing evidence or save IDs. */
export const traceTools = [
  { id: 'evidence-vault', label: 'Evidence Vault', description: 'Inspect available references and retain sources with their limitations.' },
  { id: 'file-recovery', label: 'File Recovery', description: 'Review the recovery job in the phone mirror.' },
  { id: 'metadata-scanner', label: 'Metadata Scanner', description: 'Additional metadata tools are unavailable.' },
  { id: 'connection-map', label: 'Connection Map', description: 'Additional connection tools are unavailable.' },
  { id: 'timeline-reconstruction', label: 'Timeline Reconstruction', description: 'Additional timeline tools are unavailable.' },
  { id: 'audio-analyzer', label: 'Audio Analyzer', description: 'Audio analysis is unavailable.' },
  { id: 'image-inspector', label: 'Image Inspector', description: 'Additional image analysis is unavailable.' },
  { id: 'record-comparison', label: 'Record Comparison', description: 'Compare inspected references. Original text and verified changes may be unavailable.' },
] as const

export type TraceToolId = typeof traceTools[number]['id']
