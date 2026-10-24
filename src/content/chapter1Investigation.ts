import { scene04Notices } from './scene04Final'
import { currentText, previewText, briefParagraphs } from './e01Slice'
import { mirrorRecords } from './opening'

export type SourceClass = 'public' | 'recovered' | 'retained-copy' | 'testimony' | 'observation'
export interface Chapter1Record {
  id: string; scene: number; title: string; body: string; source: string; kind: SourceClass;
  provenance: string; date: string; confidence: string; relatesTo?: readonly string[]
}
/** New structural preview sources have their own IDs; legacy E001/E002 remain unchanged. */
export const chapter1Records: readonly Chapter1Record[] = [
  { id:'CH1-PUBLIC', scene:4, title:'Daniel Mercer — public report', body:briefParagraphs[0]+'\n\nRelated material: North Quay evacuation / Bus 4. The linked public copy does not list an escort.\n\n'+currentText, source:'Greyhaven Bulletin · Nora Vance · bulletin.greyhaven.local/daniel-mercer', kind:'public', provenance:'Public report and linked public record extract. This does not establish why Daniel disappeared. Nora byline is the revised structural preview; legacy Maya editor copy is preserved separately.', date:'7 October 2026 (existing public chronology)', confidence:'Publication is not authentication of the linked historical file.' },
  { id:'CH1-FIRST', scene:4, title:'Recovered publication reference', body:'RELATED RECORD: GH-NQ-BUS4-2019-11-23\nAvailable layers: public linked extract / recovered earlier linked extract\nOriginal file: unavailable\nAcquisition route: unknown', source:'THE ARCHIVE · recovered reference', kind:'recovered', provenance:'Origin and acquisition unverified. This identifies available layers, not a live connection to Daniel’s phone.', date:'Unknown', confidence:'Unknown' },
  { id:'CH1-OLDER', scene:5, title:'Earlier recovered report layer', body:'Recovered earlier linked record extract:\n\n'+previewText, source:'Recovered report attachment layer · original holder unknown', kind:'recovered', provenance:'Earlier cropped extract, not an authenticated original article or complete historical file. The comparison concerns the report’s linked record section.', date:'Extract displays 23 November 2019; recovery date unknown', confidence:'Unknown', relatesTo:['CH1-PUBLIC'] },
  { id:'CH1-NORA-PAGE', scene:8, title:'Page retained by Nora', body:'Retained page description / text-only copy:\n\n'+previewText+'\n\nImage pixels and independent custody record unavailable.', source:'Nora Vance · retained linked-record page (provisional testimony)', kind:'retained-copy', provenance:'Nora describes keeping this copy. Original status NOT ESTABLISHED. Matching text is not independent authentication.', date:'Retention date unknown', confidence:'Unknown', relatesTo:['CH1-OLDER','CH1-PUBLIC'] },
  { id:'CH1-PROVENANCE', scene:9, title:'Source trace — incomplete', body:'COPY TYPE: RECOVERED\nSOURCE DEVICE: UNKNOWN\nACQUIRED BY: UNKNOWN\nTRANSFER HISTORY: UNAVAILABLE\nORIGINAL STATUS: NOT ESTABLISHED\nUnknown source fields do not identify the Unknown Sender.', source:'THE ARCHIVE · reconstruction metadata', kind:'recovered', provenance:'Missing fields remain unknown; no identity inference is supported.', date:'Unknown', confidence:'Unknown' },
  { id:'CH1-LIFE', scene:10, title:'To myself — recovered fragment', body:mirrorRecords.notes.find(r=>r.title==='To myself')!.body, source:'Existing recovered Notes fragment · incomplete snapshot', kind:'recovered', provenance:'Contextual reconstruction. Authorship and original device state unverified. Read only.', date:'Unavailable', confidence:'Unknown' },
  { id:'CH1-INDEX', scene:11, title:'Archive Index — integrity report', body:mirrorRecords.index[0].body, source:'Existing recovered integrity report', kind:'recovered', provenance:'Displayed counts can be compared. The recovery and original count cannot be independently authenticated here.', date:'Unavailable', confidence:'Unknown' },
  { id:'CH1-INDEX-NOTE', scene:11, title:'Index caution — ordinary recovered record', body:mirrorRecords.notes[0].body, source:'Existing unlocked recovered note', kind:'recovered', provenance:'Unverified recovered context. Reference 7–14 does not prove the same event as Bus 4.', date:'Last saved 22:30, date unavailable', confidence:'Unknown' },
  { id:'CH1-CLAIM', scene:15, title:'Post-verification statement — partial reconstruction', body:'One entry was removed after verification, not before.\n\nSIGNATURE: [DATA LOST]\nOriginal author: UNKNOWN\nReconstruction confidence: UNKNOWN', source:'Recovered statement · structural preview based on existing attributed recovery claim', kind:'recovered', provenance:'The sentence is a recovered claim, not proof. No approved signature pixels or numerical confidence were supplied. No replacement image is fabricated.', date:'Unknown', confidence:'Unknown', relatesTo:['CH1-INDEX'] },
  { id:'CH1-ROLE', scene:18, title:'Correction workflow — status trace', body:'CORRECTION ROLE: ACTIVE\nOPERATOR: UNVERIFIED\nLAST USE: UNKNOWN\nLive session: NOT ESTABLISHED\nRelationship to Daniel’s disappearance: NOT ESTABLISHED', source:'THE ARCHIVE · narrowly scoped reconstructed role-status trace', kind:'recovered', provenance:'Active role does not prove current use, operator identity or present-day alteration.', date:'Status date not independently established', confidence:'Unknown' },
]
export const chapter1Record = (id:string) => chapter1Records.find(r=>r.id===id)

/** Concise provisional bridge lines only. The first three screenplays are not replaced. */
export const chapter1Replies: Record<string,{actor:'nora'|'eli'|'maya'|'lucas'|'sophie'|'unknown';text:string}> = {
 'CH1-S04-LEAD':scene04Notices.lead,
 'CH1-S04-FOLLOWUP':scene04Notices.followup,
 'CH1-SENDER-FIRST':{actor:'unknown',text:"Be careful who you trust in that group."},
 'CH1-SENDER-SOPHIE':{actor:'sophie',text:"Thank you for telling me. I don't know who sent that."},
 'CH1-NORA-INTRO':{actor:'nora',text:"You've reached the Bulletin reporting inbox. I can discuss the public report. A recovered copy still needs a source."},
 'CH1-NORA-PAGE-REPLY':{actor:'nora',text:"I kept a copy of the linked page. I can describe what it shows, but I can't certify it as the original."},
 'CH1-ELI-INTRO':{actor:'sophie',text:"Eli works with Daniel. If you want to ask her a general recovery question, I can pass it on."},
 'CH1-ELI-WARNING':{actor:'eli',text:"A reconstruction can preserve a number and lose its context. Missing logs don't settle what happened. I can't verify a file I haven't seen."},
 'CH1-MAYA-CONTEXT':{actor:'maya',text:"Daniel and I were planning a life together. I don't want every difficult conversation we had turned into evidence against someone."},
 'CH1-LUCAS-CONTEXT':{actor:'lucas',text:"I've known Daniel for years. I still don't know what happened. I'm not ready to talk about everything, and this doesn't mean I'm rejoining the group."},
 'CH1-NORA-REQUEST':{actor:'nora',text:"I've recorded your request. The retained copy isn't a verified original; I don't have an authenticated earlier file to provide."},
 'CH1-MAYA-REQUEST':{actor:'maya',text:"I don't have a verified original to send you. Please keep that separate from what anyone thinks someone else might have."},
 'CH1-LUCAS-REQUEST':{actor:'lucas',text:"I can't provide an authenticated original. Don't treat that as proof of anything about me."},
}
export const chapter1Options: Record<string,readonly {id:string;text:string}[]> = {
 sender:[{id:'ignore',text:'Leave this unanswered.'},{id:'question',text:'Who is this?'},{id:'boundary',text:'Do not contact me again.'},{id:'cautious',text:'What are you warning me about?'}],
 disclose:[{id:'tell',text:'An unknown sender warned me to be careful who I trust in the group.'}],
 nora:[{id:'polite',text:'Could I ask about your public report on Daniel?'},{id:'skeptical',text:'How do you distinguish an archived copy from an original?'},{id:'careful',text:'I only want to discuss the public record for now.'},{id:'direct',text:'Is there an earlier copy of the linked page?'}],
 page:[{id:'ask',text:'Can I examine the page you kept?'}],
 eli:[{id:'ask',text:'Please pass on a general question about incomplete recovery.'},{id:'decline',text:'I would rather read a general technical explanation without sharing my files.'}],
 maya:[{id:'support',text:'You can tell me as much or as little as you want.'},{id:'careful',text:'I want to understand your perspective without making assumptions.'},{id:'direct',text:'Has anything about the public report troubled you?'},{id:'boundary',text:'We can keep personal details private.'}],
 lucas:[{id:'respect',text:'You do not have to explain everything to me.'},{id:'skeptical',text:'I still have questions, but I will not treat suspicion as proof.'},{id:'direct',text:'Would you be willing to share your perspective?'},{id:'boundary',text:'We can leave this here if you do not want to talk.'}],
}
