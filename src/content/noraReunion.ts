import { reunionG01,reunionNodes,type StoryNode } from './chapter2Reunion'
/** Owner's revised invitation. The existing eight discussion decisions follow this opening. */
const lines:[string,string][]=[
 ['maya','I think we need to get everyone on the same page.'],
 ['maya','Not another argument. Just what we actually know.'],
 ['members',''],
 ['lucas',"I'm here."],
 ['lucas',"That's not a promise I won't argue, though."],
 ['eli',"I'm around."],
 ['eli',"If we're comparing anything technical, send the exact wording. Not screenshots of screenshots."],
 ['sophie','I can stay for a bit.'],
 ['sophie',"I'd rather we talk together than keep guessing separately."],
 ['wait','2000'],
 ['maya',"Before we start, there's something I should mention."],
 ['lucas','That sounds ominous.'],
 ['maya',"It's not."],
 ['maya','I spoke to Nora earlier.'],
 ['maya',"I asked if she'd be willing to join us."],
 ['sophie','Nora Vance?'],
 ['maya','Yeah.'],
 ['maya',"I think we could use someone who isn't caught in the middle of all this."],
 ['lucas','You make us sound like a disaster.'],
 ['eli','I mean...'],
 ['lucas',"Don't."],
 ['maya',"She's not here to take sides."],
 ['maya','She agreed to help us sort through what we actually know.'],
 ['sophie',"I think that's a good idea."],
 ['lucas','Fine by me.'],
 ['join',''],
 ['wait','3000'],
 ['nora','Hi, everyone.'],
 ['nora',"Maya explained a little about what's been going on."],
 ['nora',"I know this isn't an easy conversation to have."],
 ['lucas',"That's one way of putting it."],
 ['nora',"I'm not here to tell anyone what to think."],
 ['nora',"And I don't have answers about what happened to Daniel."],
 ['nora',"But I can help keep the things we know separate from the things we're assuming."],
 ['eli','Honestly, we could use that.'],
 ['sophie','Thanks for joining, Nora.'],
 ['nora','Of course.'],
 ['nora','And please, if I get something wrong, correct me.'],
 ['lucas',"Careful. That's an invitation around here."],
 ['nora',"I'll take my chances."],
 ['wait','2000'],
 ['maya','Okay.'],
 ['maya',"Everyone's here."],
 ['maya','Can we start?'],
]
export const noraInvitationLines=lines
export const noraInviteReceiptId='C2-STORY-group-N08_014'
let next=reunionG01
for(let i=lines.length-1;i>=0;i--){const [actor,text]=lines[i],id=`N08_${String(i).padStart(3,'0')}`
 const node:StoryNode=actor==='wait'?{kind:'wait',duration:Number(text),next}:actor==='members'?{kind:'event',event:'members',next}:actor==='join'?{kind:'event',event:'nora-join',next}:{kind:'npc',actor:actor as 'maya'|'eli'|'lucas'|'sophie'|'nora',text,next}
 reunionNodes[id]=node;next=id
}
export const revisedReunionOpening=next
