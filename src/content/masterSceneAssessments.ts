export type StatementAssessment = {
  id: string
  title: string
  outcome: 'corroborated' | 'unverified'
  finding: string
}

export const contactAssessments = [
  { id: 'star-visible', title: 'The starred entry', outcome: 'corroborated', finding: 'The masked entry in this copy shows the same starred number Sophie described. That corroborates her reading of this copy only.' },
  { id: 'copy-provenance', title: 'Where this copy came from', outcome: 'unverified', finding: 'Sophie says she found this copy in the shared family folder. The copy does not establish who exported or edited it.' },
  { id: 'remark-unreadable', title: 'What the remark means', outcome: 'unverified', finding: 'The Remarks field is damaged. Neither the copy nor Sophie’s account can establish its complete wording, meaning or author.' },
] as const satisfies readonly StatementAssessment[]

export const captureAssessments = [
  { id: 'crop-wording', title: 'What Daniel’s message says', outcome: 'corroborated', finding: 'The crop shows Daniel referring to Lucas checking in and to “another copy”. This corroborates Maya’s description of the excerpt, not the events it describes.' },
  { id: 'crop-original', title: 'Maya’s source and the original thread', outcome: 'unverified', finding: 'Maya says this is a crop of her own chat. Missing context, date and time zone prevent independent verification of the original thread.' },
  { id: 'crop-export', title: 'Whether the phrase identifies the contact export', outcome: 'unverified', finding: 'The crop mentions “another copy” without naming it. The separate contact export gives no basis to identify it as that copy.' },
  { id: 'crop-lucas', title: 'What Lucas can corroborate directly', outcome: 'unverified', finding: 'Lucas’s available private account does not establish this check-in or identify a copy. His privacy boundary is not a contradiction.' },
] as const satisfies readonly StatementAssessment[]

export const cardAssessments = [
  { id: 'card-capture', title: 'Compare with the cropped check-in', outcome: 'unverified', finding: 'GH-DSC-03-A is legible in the reference-card photo and can be searched publicly. The earlier crop does not name this reference or identify what “another copy” meant.' },
  { id: 'card-export', title: 'Compare with the starred contact export', outcome: 'unverified', finding: 'GH-DSC-03-A is a usable public inventory search term. The starred entry and this photographed reference are separate sources with no established link.' },
] as const satisfies readonly StatementAssessment[]

export const assessmentLabel = (outcome: StatementAssessment['outcome']) => outcome === 'corroborated' ? 'Corroborated within the available copy' : 'Unverified'
