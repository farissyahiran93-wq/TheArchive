import { reunionChoiceText, reunionSource } from './reunionSource'
export type StoryActor = 'maya'|'lucas'|'sophie'|'eli'|'unknown'|'player'|'system'
export type StoryThread = 'group'|'unknown'|'maya'|'eli'|'sophie'
export type Guard = 'note'|'image'|'clues'|'full'|'recovery-ready'
export type StoryLine = {actor:StoryActor;text:string;facts?:string[]}
export type StoryOption = {id:string;text:string;next:string;guard?:Guard;disclosure?:'full'|'clues'|'none';facts?:string[];support?:'sophie'|'lucas'|'group'}
export type StoryNode = {kind:'npc';actor:StoryActor;text:string;next:string}|{kind:'choice';options:StoryOption[]}|{kind:'if';guard:Guard;yes:string;no:string}|{kind:'event';event:'members'|'group-done'|'followup-done'|'spy-offer'|'spy-post-done'|'reflection-done';next?:string}
export const reunionNodes:Record<string,StoryNode>={}
const say=(actor:StoryActor,...text:string[]):StoryLine[]=>text.map(text=>({actor,text}))
const player=(text:string,facts?:string[]):StoryLine=>({actor:'player',text,facts})
function seq(key:string,lines:readonly StoryLine[],next:string){
  for(let i=lines.length-1;i>=0;i--){const line=lines[i],id=`${key}-${String(i).padStart(3,'0')}`;reunionNodes[id]=line.actor==='system'?{kind:'event',event:'members',next}:{kind:'npc',actor:line.actor,text:line.text,next};if(line.actor==='player')reunionNodes[id]={kind:'choice',options:[{id:'send',text:line.text,next,facts:line.facts}]};next=id}
  return next
}
function choice(key:string,opts:StoryOption[]){reunionNodes[key]={kind:'choice',options:opts};return key}
function guard(key:string,g:Guard,yes:string,no:string){reunionNodes[key]={kind:'if',guard:g,yes,no};return key}
function ordinary(key:keyof typeof reunionChoiceText,reactions:StoryLine[][],next:string,support?:StoryOption['support']){
  return choice(key,reunionChoiceText[key].map((text,i)=>({id:['a','b','c'][i],text,next:seq(`${key}-${i}`,reactions[i],next),...(i===0&&support?{support}:{})})))
}
reunionNodes['GROUP-DONE']={kind:'event',event:'group-done'}
const closing=seq('CLOSING',reunionSource.closing,'GROUP-DONE')
const g08=ordinary('G08',[
  [...say('eli','Perfect.'),...say('lucas',"That's probably the most sensible thing we've agreed on all day.")],
  [...say('maya',"I'd like that."),...say('eli',"Trust and checking a source can exist in the same conversation."),...say('lucas',"Let's try both.")],
  [...say('lucas',"People don't remember everything at once."),...say('maya',"Then we give each other room to come back and correct things."),...say('sophie',"Without making it another fight. Please.")],
],closing)
const commitment=seq('COMMITMENT',reunionSource.afterG07,g08)
const g07=ordinary('G07',[
  [...say('eli','Good.',"Send me anything you can verify and I'll help interpret the technical details."),...say('lucas',"I'll try to find that older copy.")],
  [...say('sophie',"He kept things in places that made sense only to him."),...say('maya',"Bring us the questions too. It doesn't have to be an answer."),...say('eli',"And keep the context with it.")],
  [...say('maya',"That would help."),...say('lucas',"Someone should stop us asking the same question four different ways."),...say('eli',"Three. Your questions are usually just louder.")],
],commitment)
const plan=seq('PLAN',reunionSource.beforeG07,g07)
const quietRecovery=seq('RECOVERY-PRIVATE',[
 ...say('eli',"If we find any deleted files or older backups, we should preserve them before doing anything else."),...say('lucas','Agreed.'),...say('maya','So we need to find the earlier version first.'),...say('sophie',"And figure out where Daniel would've kept it."),
],plan)
const recoveryAfter=seq('RECOVERY-AFTER',[
 ...say('sophie','So we might get something back?'),player("Maybe. It isn't guaranteed."),...say('maya','Then please tell us when you know what it contains.'),...say('eli',"And keep the original reconstruction metadata. Don't just share screenshots without the context."),
],plan)
const recoveryRunning=seq('RECOVERY-RUNNING',[player("I started a reconstruction process."),...say('lucas','How long?'),player('It started with a twenty-five-minute estimate.')],recoveryAfter)
const recoveryReady=seq('RECOVERY-READY',[player("The reconstruction returned metadata, but the contents still aren't readable.")],recoveryAfter)
const recoveryFull=seq('RECOVERY-FULL',[player('There are deleted items in the mirrored phone data.',['C2-DISCLOSED-RECOVERY']),...say('eli','Recoverable?')],guard('RECOVERY-STATUS','recovery-ready',recoveryReady,recoveryRunning))
const unfinished=seq('UNFINISHED',reunionSource.afterG06,guard('RECOVERY-SHARING','full',recoveryFull,quietRecovery))
const g06=ordinary('G06',[
 [...say('maya',"I don't know.",'A message, maybe. Or an email.'),...say('eli',"That's worth checking if we find a reliable source.")],
 [...say('eli','That fits the questions he asked me. It does not tell us what he actually managed to keep.'),...say('maya',"Then we look for what he saved, before we decide why.")],
 [...say('lucas',"He spoke to people we haven't spoken to."),...say('sophie',"That doesn't mean any of them hurt him."),...say('maya',"No. It means we still have questions.")],
],unfinished)
const memory=seq('MEMORY',reunionSource.afterG05,g06)
const g05=ordinary('G05',[
 [...say('eli','Exactly.','If we can establish what changed, we can ask better questions.'),...say('lucas','I can try to locate the older copy.')],
 [...say('maya',"I want to know that too."),...say('eli',"Let's keep his intention separate from what the records can establish."),...say('lucas',"I'll still need that older copy.")],
 [...say('eli',"Permissions would matter. We don't have that history yet."),...say('lucas',"Having access isn't the same as using it."),...say('maya',"Then we don't turn an access list into a suspect list.")],
],memory)
const index=seq('INDEX',reunionSource.afterG04,g05)
const image=seq('DISCLOSE-IMAGE',[
 player('A screenshot has an unavailable preview. The filename is IMG_0714.',['C2-DISCLOSED-IMG0714']),...say('lucas','Could just be a filename.'),...say('eli',"Exactly. A filename doesn't tell us what the image contained."),...say('maya','So we have a possible lead. Nothing confirmed.'),
],index)
const note=seq('DISCLOSE-NOTE',[
 player('Daniel had a note about checking the index history. He also wanted to ask Eli about message timestamps.',['C2-DISCLOSED-INDEX-NOTE','C2-DISCLOSED-TIMESTAMP-NOTE']),...say('eli','He did ask me.'),...say('maya','Where did you find the note?'),player('In some recovered phone data. I cannot authenticate when it was written.',['C2-DISCLOSED-RECOVERED-FRAGMENT']),...say('lucas',"Then we shouldn't assume both entries were written at the same time."),...say('eli','Which makes them worth checking.'),
],guard('CLUE-IMAGE','image',image,index))
const clueDetail=guard('CLUE-NOTE','note',note,guard('CLUE-IMAGE-ONLY','image',image,index))
const clues=seq('DISCLOSE-CLUES-REACTION',say('maya','Okay. What did you find?'),clueDetail)
const full=seq('DISCLOSE-FULL',[
 ...say('maya',"Daniel's messages? Our messages?"),...say('eli',"A mirror can be partial. Do you know where it came from?"),player("The source isn't authenticated. It's an incomplete recovered dataset, not a connection to his phone.",['C2-DISCLOSED-MIRROR-UNVERIFIED']),...say('lucas',"Then don't let the interface make it look more certain than it is."),...say('sophie',"I'd like to know if there's anything from him. But... please be careful with the personal stuff."),...say('maya',"Yes. Helping us doesn't mean you have to hand over his whole private life."),
],index)
const withheld=seq('DISCLOSE-NOTHING',[
 ...say('maya',"Okay. Tell us when there's something you're comfortable standing behind."),...say('lucas',"That rule applies to all of us."),...say('eli',"We can work with what we actually have."),
],index)
const g04=choice('G04',[
 {id:'a',text:"I have access to a partial mirror of Daniel's phone through The Archive.",next:full,disclosure:'full',facts:['C2-DISCLOSED-PHONE-MIRROR']},
 {id:'b',text:'I found a few things that might be relevant.',next:clues,guard:'clues',disclosure:'clues'},
 {id:'c',text:"I don't have anything I'm ready to share yet.",next:withheld,disclosure:'none'},
])
const eliAccount=seq('ELI-ACCOUNT',reunionSource.afterG03,g04)
const g03=ordinary('G03',[
 [...say('lucas','Thank you.'),...say('maya',"No one's accusing you."),...say('lucas',"I know. I'm just tired of feeling like I have to defend myself.")],
 [...say('lucas',"Not a reference I could repeat with confidence."),...say('eli',"If you find it in the conversation, send the exact wording."),...say('lucas',"I will.")],
 [...say('lucas',"Because I didn't think an argument was a lead. And because I wasn't proud of it."),...say('maya',"Thank you for saying it now."),...say('sophie',"We're all remembering things late.")],
],eliAccount,'lucas')
const lucasAccount=seq('LUCAS-ACCOUNT',reunionSource.afterG02,g03)
const g02=ordinary('G02',[
 [...say('sophie','I hope so.'),...say('maya','He did, Soph.','Trust me.')],
 [...say('sophie',"I keep trying to make it into something else."),...say('eli',"You don't have to find a clue in every memory."),...say('sophie',"Thanks.")],
 [...say('sophie',"Nothing I could point to. I don't want to invent a warning just because I know what happened after."),...say('maya',"You don't have to. What you remember is enough for now.")],
],lucasAccount,'sophie')
const timeline=seq('TIMELINE',reunionSource.afterG01,g02)
export const reunionG01=ordinary('G01',[
 [...say('maya','Good.','I really want us to make some progress today.'),...say('lucas','Same here.')],
 [...say('maya',"No need to apologize. We're here now."),...say('lucas',"The roll call was getting ambitious."),...say('eli',"You counted to four, Lucas.")],
 [...say('maya',"Nothing I want to turn into an answer before we've talked."),...say('sophie',"Let's just hear each other out."),...say('lucas',"I'm trying. Apparently that's the assignment.")],
],timeline)
export const reunionOpening=seq('REJOIN',reunionSource.opening,reunionG01)

reunionNodes['FOLLOWUP-DONE']={kind:'event',event:'followup-done'}
export const followupEntry:Record<'maya'|'eli'|'sophie',string>={
 maya:seq('MAYA-FOLLOWUP',say('maya','Hey.','I know we talked about the phone earlier.',"There's something I wanted to ask without everyone watching.",'Do you have a minute?'),choice('MAYA-F1',[
  {id:'a',text:'Of course. What did you want to ask?',next:seq('MAYA-F1-A',say('maya',"If you come across our old conversations... don't just look for the argument.","We were happy too. I don't want that disappearing behind all this."),'FOLLOWUP-DONE')},
  {id:'b',text:"I can listen, but I can't promise the copy has what you're looking for.",next:seq('MAYA-F1-B',say('maya',"I know. I'm not asking you to manufacture a good memory.","Just give the ordinary ones a little room too."),'FOLLOWUP-DONE')},
  {id:'c',text:"I'd rather not discuss your private messages without thinking it through.",next:seq('MAYA-F1-C',say('maya',"Fair. It's strange knowing somebody else could open them.","Thank you for saying that instead of telling me what I wanted to hear."),'FOLLOWUP-DONE')},
 ])),
 eli:seq('ELI-FOLLOWUP',say('eli','Hey.','About what you mentioned in the group.',"Can I ask a favor?"),choice('ELI-F1',[
  {id:'a',text:'What favor?',next:seq('ELI-F1-A',say('eli',"If you send me a fragment, keep the wording exactly as you found it.","I can explain uncertainty. I can't work around missing context someone forgot to mention.","That sounded friendlier in my head."),'FOLLOWUP-DONE')},
  {id:'b',text:"As long as it doesn't involve guessing what a filename means.",next:seq('ELI-F1-B',say('eli',"Then you're already making my job easier.","Keep the context with anything you send. And don't let anyone rush you into a conclusion."),'FOLLOWUP-DONE')},
  {id:'c',text:'I need a little time to look through what I already have.',next:seq('ELI-F1-C',say('eli',"Take it. I'm not setting you homework.","Lucas does that enough for everyone."),'FOLLOWUP-DONE')},
 ])),
 sophie:seq('SOPHIE-FOLLOWUP',say('sophie','Hey.','Thanks for earlier.','I know things got a little awkward in the group again.','Can I ask you something about Daniel?'),choice('SOPHIE-F1',[
  {id:'a',text:'Go ahead.',next:seq('SOPHIE-F1-A',say('sophie',"You didn't know him before all this. I keep wondering what kind of person we're making him sound like.","He wasn't only worried about records. He could be really annoying about coffee."),'FOLLOWUP-DONE')},
  {id:'b',text:"If you're worried about what you said, you don't need to apologize.",next:seq('SOPHIE-F1-B',say('sophie',"I was about to. You caught me.","I just want us to remember him as a person while we're looking."),'FOLLOWUP-DONE')},
  {id:'c',text:'Can we talk a little later?',next:seq('SOPHIE-F1-C',say('sophie',"Of course. Thanks for telling me.","I'll try to take that break everyone keeps talking about."),'FOLLOWUP-DONE')},
 ])),
}

const offerLast=seq('UNKNOWN-OFFER-LAST',say('unknown',"It's in Messages. Open it if you want."),'SPY-OFFER-DONE')
reunionNodes['SPY-OFFER-DONE']={kind:'event',event:'followup-done'}
reunionNodes['SPY-OFFER']={kind:'event',event:'spy-offer',next:offerLast}
const offer=seq('UNKNOWN-OFFER',say('unknown',"You won't be part of it. You can't send anything.","I'm not telling you what to think of them."),'SPY-OFFER')
const a2=choice('SPY-A2',[
 {id:'a',text:'Between who?',next:seq('SPY-A2-A',say('unknown','Eli and Lucas.'),offer)},
 {id:'b',text:"That's spying.",next:seq('SPY-A2-B',say('unknown','Yes. You can choose not to look.'),offer)},
 {id:'c',text:'You can do that?',next:seq('SPY-A2-C',say('unknown','For a little while.'),offer)},
])
const beforeOffer=seq('UNKNOWN-BEFORE',[
 ...say('unknown',"You've only seen how they talk when everyone's there.","It's different one-on-one."),player('What are you getting at?'),...say('unknown','I can open a private conversation for you. Briefly.'),
],a2)
export const spyUnknownEntry=seq('SPY-UNKNOWN-FIRST',say('unknown','That group chat got crowded fast.'),choice('SPY-A1',[
 {id:'a',text:"They don't seem to trust me.",next:seq('SPY-A1-A',say('unknown','They barely know you.'),beforeOffer)},
 {id:'b',text:"They all know each other. I don't.",next:seq('SPY-A1-B',say('unknown','Exactly.'),beforeOffer)},
 {id:'c',text:'What do you want?',next:seq('SPY-A1-C',say('unknown','To show you something.'),beforeOffer)},
]))
reunionNodes['SPY-POST-DONE']={kind:'event',event:'spy-post-done'}
const postEnd=seq('SPY-POST-END',say('unknown',"One private chat doesn't tell you everything either.","Just don't decide who someone is after one bad group conversation."),'SPY-POST-DONE')
const c2=choice('SPY-C2',[
 {id:'a',text:"So I'm supposed to trust them now?",next:seq('SPY-C2-A',say('unknown',"No. That's your call."),postEnd)},
 {id:'b',text:'Are you going to keep doing this?',next:seq('SPY-C2-B',say('unknown','Not often. And not on demand.'),postEnd)},
 {id:'c',text:'Do they know I saw that?',next:seq('SPY-C2-C',say('unknown','No.'),postEnd)},
])
const whyThem=seq('SPY-WHY-THEM',[player('Why those two?'),...say('unknown','You just met them in a group.','I thought you should hear them without the group.')],c2)
export const spyUnknownPost=seq('SPY-POST-FIRST',say('unknown','That was all I could leave open.'),choice('SPY-C1',[
 {id:'a',text:'You had no right to show me that.',next:seq('SPY-C1-A',say('unknown',"You're right."),whyThem)},
 {id:'b',text:'Lucas cares about Maya more than he lets on.',next:seq('SPY-C1-B',say('unknown','You noticed.'),whyThem)},
 {id:'c',text:'What else can you listen to?',next:seq('SPY-C1-C',say('unknown','Not nearly as much as you think.'),whyThem)},
]))
reunionNodes['REFLECTION-DONE']={kind:'event',event:'reflection-done'}
export const scene09Reflection=seq('S09-UNKNOWN',say('unknown','You have another part of the conversation now. Not all of it.'),choice('S09-R1',[
 {id:'a',text:"That could be caution. It doesn't prove they're hiding something.",next:seq('S09-R1-A',say('unknown',"It doesn't. Keep that distinction."),'REFLECTION-DONE')},
 {id:'b',text:'Why show me that without the message they were discussing?',next:seq('S09-R1-B',say('unknown',"I can't supply context I don't have. You should be asking that question."),'REFLECTION-DONE')},
 {id:'c',text:"I don't want to judge them from a conversation they never chose to share.",next:seq('S09-R1-C',say('unknown',"Then don't. You still decide what you do with what you read."),'REFLECTION-DONE')},
]))

// Director-authored Scene 09: no hidden evidence, culprit or definite reason for withholding.
export function mayaLucasInterception(full:boolean){
 return [
  ...say('lucas','I found the conversation I was thinking of.'),...say('maya','The older one?'),...say('lucas','An older chat. Not the copy.','I remembered part of it differently.'),...say('maya','Then check it before you post it.'),...say('lucas',"You want me to keep quiet?"),...say('maya',"I want you to know what you're saying before Sophie reads it."),...say('lucas',"She'll think I should have remembered sooner."),...say('maya',"I'm not sure that's her voice you're hearing."),...say('lucas','...','Maybe.'),...say('maya',"We're all doing that. Going back and finding something we wish we'd noticed."),
  ...(full ? [...say('lucas',"I still don't like somebody else reading Daniel's messages."),...say('maya',"Neither do I. I asked for help. I didn't ask for every private thing he ever said.")] : [...say('lucas',"I still don't know what their number means."),...say('maya',"Neither do I. That doesn't make them responsible for it.")]),
  ...say('lucas',"What if it looks like we're keeping something from them?"),...say('maya',"Are we?"),...say('lucas',"I'm trying not to turn half a sentence into another argument."),...say('maya','Then say that when you share it.','And keep the rest of the conversation with it.'),...say('lucas',"You make it sound easy."),...say('maya',"I have been staring at the same cup of tea for an hour. Nothing about today is easy."),...say('lucas','Make another one.','Please.'),...say('maya',"Check the wording. I'll make the tea."),...say('lucas',"I won't put it in the group yet."),...say('maya',"Send it when you can explain where it came from. Not when you're scared of what we'll think."),
 ].map((line,i)=>({...line,actor:line.actor as 'maya'|'lucas',gap:i?900+(i%4)*350:1800,typing:1200+(i%3)*450,cancel:0}))
}
