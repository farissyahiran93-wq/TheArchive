import type { Scene01Node } from './scene01'
import { versionHistoryDialogue } from './versionHistoryConversationData'

export type NaturalSource = 'article'|'index'|'policy'
export const naturalNodes: Record<string,Scene01Node> = {}
const add=(node:Scene01Node)=>{naturalNodes[node.id]=node;return node.id}
function lines(prefix:string,texts:readonly string[],next:string,attachment?:'index'|'archive-package'|'register'|'inquiry') {
  for(let i=texts.length-1;i>=0;i--)next=add({id:`${prefix}-${i+1}`,kind:'npc',sender:'unknown',channel:'unknown',text:texts[i],next,...(attachment&&i===texts.length-1?{attachment}:{})})
  return next
}
function choice(id:string,texts:readonly string[],responses:readonly (readonly string[])[],next:string,number?:string) {
  return add({id,kind:'choice',channel:'unknown',number,choices:texts.map((text,i)=>({id:'abc'[i],text,next:lines(`${id}-REPLY-${'abc'[i]}`,responses[i],next)}))})
}
export const naturalSourceKeys={article:versionHistoryDialogue[1].id,index:versionHistoryDialogue[2].id,policy:versionHistoryDialogue[3].id} as const
export const naturalSourceEvents={article:'NAT-SOURCE-UPDATE-SAVED',index:'NAT-SOURCE-INDEX-VIEWED',policy:'NAT-SOURCE-POLICY-READ'} as const
export const naturalDeskInstruction='OPEN-VH-NAT-REGISTER-INSTRUCTION-4'
export const naturalDeskAck='OPEN-VH-NAT-REGISTER-ACK'
export const naturalInquiryOffer='OPEN-VH-NAT-INQUIRY-OFFER-3'
export const naturalInquiryChoice='OPEN-VH-NAT-INQUIRY-CHOICE'
export const naturalSummaryChoice='OPEN-VH-NAT-REGISTER-SUMMARY'
export const naturalInquiryQuestions=[
  'Could you confirm whether an earlier copy of the Daniel Mercer article is available?',
  'Is an article-specific change record available for the Daniel Mercer article?',
  'Where should a request for the article’s earlier versions or change records be directed?',
] as const

const finish=add({id:'OPEN-VH-NAT-END',kind:'event',event:'natural-end'})
const inquiry=choice(naturalInquiryChoice,["I'll send a specific question through the public desk.","I'd rather not contact the publisher yet.","I'll save the question as a draft for now."],[["Keep it about the record. Don't make an accusation."],["Then leave it open. Nothing has been sent."],["A draft stays on your phone. It isn't a delivered request."]],finish)
export const naturalInquiryEntrance=lines('OPEN-VH-NAT-INQUIRY-OFFER',["If you want to take it further, the Bulletin has a public corrections inbox.","You can ask whether an earlier copy or article-specific change record is available.","But I can't promise they'll answer. And a reply wouldn't be an authenticated log."],inquiry,'inquiry')
const deskDone=add({id:'OPEN-VH-NAT-DESK-COMPLETE',kind:'event',event:'natural-desk-complete',next:naturalInquiryEntrance})
const summaryTail=lines('OPEN-VH-NAT-REGISTER-KEEP',["Keep the finding. We still don't have an authenticated earlier copy."],deskDone)
const summary=choice(naturalSummaryChoice,["There's no formal correction notice listed for that article.","Nothing is listed, but that doesn't prove the article stayed the same.","I saved the finding. It doesn't tell us who edited the page."],[["Right. The public listing is limited."],["Exactly. No notice isn't a verified version history."],["And the byline doesn't identify the page editor either."]],summaryTail)
const summaryQuestion=lines('OPEN-VH-NAT-REGISTER-QUESTION',['What did the register say?'],summary)
const registerWait=add({id:'OPEN-VH-NAT-REGISTER-WAIT',kind:'gate',action:'natural-register',next:summaryQuestion})
const acknowledge=choice(naturalDeskAck,["I'll check the public register.","And if there's no correction listed?","I'll record what it says, without jumping to conclusions."],[["Tell me what the listing actually shows."],["Then you can say no formal notice is listed. Nothing more."],["That's all I'm asking."]],registerWait)
export const naturalRegisterEntrance=lines('OPEN-VH-NAT-REGISTER-INSTRUCTION',["One more thing before we leave this.","An update label isn't the same as a formal public correction notice.","I want you to check whether the Bulletin lists one for this article.","Open the public Corrections Register. Don't mistake the absence of a notice for proof that nothing changed."],acknowledge,'register')

const assessed=add({id:'OPEN-VH-NAT-ASSESSED',kind:'event',event:'natural-assessment'})
const assessment=choice('OPEN-VH-NAT-C07',[
  'The references match, but a wording change remains unverified.',
  "We still can't determine whether the article wording changed.",
  'Keep the public article separate from the unverified index.',
],[["That's a conclusion you can defend."],["We can't determine that from these records."],["They should stay separate until their sources are verified."]],assessed,versionHistoryDialogue[6].id)
const assessmentQuestion=lines('OPEN-VH-NAT-ASSESSMENT',['One last thing. What can you say without guessing?'],assessment)
const strategy=choice('OPEN-VH-NAT-C06',["I'd ask the publisher whether a previous copy or change record exists.","I'd look for an independently dated copy before contacting anyone.","I'd keep the result private until there's something we can verify."],[["Ask for a record. Not an explanation you can't check."],["If you find one, you'll still need to establish where and when it was captured."],["That's a reasonable boundary. The open question won't disappear."]],assessmentQuestion,versionHistoryDialogue[5].id)
const strategyQuestion=lines('OPEN-VH-NAT-STRATEGY',['So where would you go from here?'],strategy)
const synthesisTail=lines('OPEN-VH-NAT-SYNTHESIS-TAIL',["You don't know who edited the page.","And neither do I."],strategyQuestion)
const comparison=choice('OPEN-VH-NAT-C05',["The reference matches, but a text revision is still unverified.","I suspect there's more to the update, but I can't prove what changed.","We have an update label, a reference, and a policy. Not a before-and-after copy."],[["That's supported by what we have."],["You can keep the question open. Just don't turn suspicion into a finding."],["That's the separation I needed you to see."]],synthesisTail,versionHistoryDialogue[4].id)
export const naturalSynthesis=lines('OPEN-VH-NAT-SYNTHESIS',['Put them together for a moment.','The public page, the recovered reference, and the policy.',"If someone asked you whether the article was rewritten, what could you defend?"],comparison)
const route=add({id:'OPEN-VH-NAT-SOURCE-ROUTE',kind:'gate',action:'natural-source',next:naturalSynthesis})
export const naturalSources={} as Record<NaturalSource,{prompt:string;wait:string;question:string;choice:string}>
const sourceContent={
  article:{number:2,prompt:['The Bulletin page has an update label.',"Read what the label actually says. Not what it makes you suspect.",'Save that observation to TRACE. We can compare it with what you found.'],question:'What does the update label establish?',options:["It says the page was updated. It doesn't say what changed.","It could be a correction, but there's no detail proving that.","There's an update marker. I still can't tell whether the article's wording changed."],replies:[["That's the limit of what the page tells us."],["Right. A possibility isn't a record."],["And without an earlier copy, you can't compare the text."]],tail:['Keep that observation separate from the index. Two different sources.']},
  index:{number:3,prompt:['Now look at what TRACE actually recovered.'],question:'Does it contain a second version of the article?',options:['No. Only the reference and a matching public article ID.',"The source and capture time can't be verified. Why trust it?","It's a pointer. It doesn't contain the original body."],replies:[["Then the match is real within what the two records display. Not proof of a revision."],["You shouldn't trust its origin. I can't authenticate it either."],["Exactly. A pointer isn't the document."]],tail:[]},
  policy:{number:4,prompt:["That still leaves the publisher's own explanation.",'The Bulletin has a page about how it labels updates.',"See if it answers the question we're actually asking."],question:'What did their policy tell you?',options:['It explains how updates are labelled in general.',"It doesn't give us a change log for Daniel's article.",'It explains the process, but not what happened on this page.'],replies:[['Right. A general explanation. Not a record of this change.'],["That's the missing piece."],["Which is why the label still leaves us with a question."]],tail:[]},
} as const
for(const source of ['article','index','policy'] as const){
  const g=sourceContent[source],prefix=`OPEN-VH-NAT-${source.toUpperCase()}`
  const tail=lines(prefix+'-TAIL',g.tail,route)
  const c=choice(`OPEN-VH-NAT-C0${g.number}`,g.options,g.replies,tail,naturalSourceKeys[source])
  const q=lines(prefix+'-QUESTION',[g.question],c)
  const wait=add({id:prefix+'-WAIT',kind:'gate',action:'natural-source',next:q})
  naturalSources[source]={prompt:lines(prefix+'-PROMPT',g.prompt,wait),wait,question:q,choice:c}
}
const opening=choice('OPEN-VH-NAT-C01',["It matches the article ID. That's about all I can confirm.","Why does your index have no original article text?","I found a reference, not an earlier version."],[["Then we're looking at the same limit."],["I don't know. The copy I received was already incomplete."],["Exactly. And that distinction matters."]],route,versionHistoryDialogue[0].id)
export const naturalUnknownEntrance=lines('OPEN-VH-NAT-OPEN',['Did the reference tell you what happened to the article?'],opening)

const originEnd=add({id:'OPEN-ORIGIN-NAT-END',kind:'event',event:'archive-thread-end'})
const pkg=add({id:'OPEN-ORIGIN-NAT-PACKAGE',kind:'npc',sender:'unknown',channel:'unknown',text:'TRACE · Restricted access package',attachment:'archive-package',next:originEnd})
const originChoice=choice('OPEN-ORIGIN-NAT-CHOICE',["I'll check the reference.","You keep saying it's a reference. What's missing from it?","I'll inspect it, but I won't treat it as proof yet."],[["Start with what it contains."],["Enough that I want you to look. Not enough for me to claim more."],["Good. Don't take my word for it."]],pkg)
export const naturalOriginEntrance=lines('OPEN-ORIGIN-NAT-INTRO',["You've seen the Greyhaven Bulletin article.","Then there's something else you can check.",'I added a recovered reference to TRACE.','ARC-IDX-GB-041.',"It points to the same public article. That doesn't make it an earlier copy.",'Open it. Tell me what the record actually holds.'],originChoice,'index')

/** Scene 4 keeps its existing pre-link beats, IDs and response continuations. */
export const naturalSophieOverrides:Record<string,Scene01Node>={
  'OPEN-S04-FINAL-OPENING-4':{id:'OPEN-S04-FINAL-OPENING-4',kind:'npc',channel:'sophie',sender:'sophie',text:'I found the article I mentioned.',next:'OPEN-S04-FINAL-OPENING-5'},
  'OPEN-S04-FINAL-OPENING-5':{id:'OPEN-S04-FINAL-OPENING-5',kind:'npc',channel:'sophie',sender:'sophie',text:"It's from Greyhaven Bulletin.",next:'OPEN-S04-FINAL-OPENING-6'},
  'OPEN-S04-FINAL-ARTICLE-RETURN-1':{id:'OPEN-S04-FINAL-ARTICLE-RETURN-1',kind:'npc',channel:'sophie',sender:'sophie',text:'Did you manage to open it?',next:'OPEN-S04-C03'},
}
