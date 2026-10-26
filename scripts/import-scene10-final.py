"""Compile the pinned Inventory Sheet; never alter earlier manuscript graphs."""
import re,json,hashlib
from pathlib import Path
raw=Path('docs/sources/scene10-final/FULL_SCRIPT.txt').read_bytes();s=raw.decode('utf-8-sig')
clean=lambda t:' '.join(t.split())
heads=list(re.finditer(r'^S10-C(\d{2}) — ([^\n]+)',s,re.M));assert len(heads)==20
regions={int(h[1]):s[h.end():heads[j+1].start() if j+1<len(heads) else s.index('On the actual C20 commitment only',h.end())] for j,h in enumerate(heads)}
nodes={};choices={};entrances={}
def add(n):nodes[n['id']]=n;return n['id']
def turns(t):
 lines=t.splitlines();result=[]
 for j,line in enumerate(lines):
  m=re.match(r'^\s*(SOPHIE|MAYA|NORA|DESK): (.*)',line)
  if not m:continue
  text=m[2];k=j+1
  while k<len(lines) and lines[k].strip() and not re.match(r'^\s*(?:SOPHIE|MAYA|NORA|DESK|Player|EFFECT|Effect|IF |Only |This |DIRECTOR|No |Never |\[|[ABC]\. |S10-|Group |One |On )',lines[k]):text+=' '+lines[k].strip();k+=1
  result.append((m[1].lower(),clean(text)))
 return result
def chain(lines,prefix,target,group=False):
 for j,(actor,text) in reversed(list(enumerate(lines))):
  ident=f'OPEN-S10-{prefix}-{j+1}'
  target=add(dict(id=ident,kind='npc',sender=actor if actor in ['sophie','maya'] else 'sophie',text=text,channel='group' if group else 'sophie',next=target,heardFacts=[ident+':reported']))
  target=add(dict(id=ident+'-WAIT',kind='wait',duration=1200,typing=True,actor=actor if actor in ['sophie','maya'] else 'sophie',next=target))
 return target
for t in ['civic','professional','sophie','group']:add(dict(id=f'OPEN-S10-{t}-END',kind='event',event='source-thread-end'))
chat={13:'civic',14:'professional',15:'sophie',16:'sophie',17:'group',18:'group'}
for i,r in regions.items():
 matches=list(re.finditer(r'^\s*([ABC])\.\s+(?:Player(?: draft)?:\s*)?“([\s\S]*?)”',r,re.M));assert len(matches)==3,(i,len(matches))
 opts=[]
 for j,m in enumerate(matches):
  b=r[m.end():matches[j+1].start() if j<2 else len(r)];feedback=re.search(r'SYSTEM: “([\s\S]*?)”',b)
  o=dict(id=m[1].lower(),text=clean(m[2]),feedback=clean(feedback[1]) if feedback else '')
  if i in chat:
   t=chat[i];target='OPEN-S10-C16' if i==15 else 'OPEN-S10-C18' if i==17 else f'OPEN-S10-{t}-END'
   common={14:[('nora',"I've got to go back to work."),('nora',"Please don't say a file vanished just because the public version doesn't show it.")],15:[('sophie',"Anyway... how's your evening?"),('sophie',"And don't feel like you have to give me a progress report.")],16:[('sophie',"Okay. I'm going to make some tea."),('sophie','Goodnight.')],17:[('maya','Can we agree to call anything from that index a lead until an individual item can be identified?'),('sophie',"I'd really like that.")]}.get(i,[])
   if i==14:b=b.split("NORA: I've got to go",1)[0]
   if i==15:b=b.split('[Only after actual C15 Send',1)[0]
   if i==16:b=b.split("SOPHIE: Okay. I'm going",1)[0]
   if i==17:b=b.split('[If C17 was actually Sent',1)[0]
   if common:target=chain(common,f'GROUP-AFTER-{i:02}' if i==17 else f'AFTER-{i:02}',target,i==17)
   lines=turns(b)
   if i==16 and j==0:lines=[('sophie',"Okay. I'm glad you said what you don't know."),('sophie','I think I can deal with uncertainty better than false certainty.')]
   if i==17:lines=[ [('maya',"That's a useful difference."),('maya',"It's a direction for a search, not a found document."),('sophie','Thanks for keeping it that clear.')], [('maya',"Right. Please don't circulate the box number without the limitation beside it."),('sophie','Understood.')], [('maya','Thank you. A guess travels fast.'),('sophie','Yeah. I appreciate that.')] ][j]
   if i==18:lines=[ [('maya',"Good. That's how I'll describe it too."),('sophie','Thanks.')], [('maya','Yes. Keep the request narrow and public.'),('sophie','That sounds safer.')], [('maya','Fair enough.'),('sophie','Appreciate it.')] ][j]
   target=chain(lines,('GROUP-' if t=='group' else '')+f'C{i:02}-{m[1]}',target,t=='group')
   effects={k.lower():int(v) for k,v in re.findall(r'(Trust|Affinity|Suspicion) \+(\d+)',b)} if t=='sophie' and not(i==16 and j==0) else {}
   if effects:target=add(dict(id=f'OPEN-S10-C{i:02}-{m[1]}-EFFECT',kind='event',event='effects',effects={'sophie':effects},next=target))
   o['next']=target
  opts.append(o)
 ident=f'S10-C{i:02}';choices[ident]=dict(heading=heads[i-1][2].strip(),mode=chat.get(i,'form' if i==12 else 'local'),options=opts)
 if i in chat:add(dict(id='OPEN-'+ident,kind='choice',number=ident,channel='group' if chat[i]=='group' else 'sophie',choices=[{k:v for k,v in o.items() if k!='feedback'} for o in opts]))
opening=s.split('DESK: Hello. Public Catalogue Enquiries here.',1)[1].split('IF ACTUALLY SENT',1)[0]
opening='DESK: Hello. Public Catalogue Enquiries here.'+opening
common=s.split('DESK: Sorry this is a narrow answer.',1)[1].split('DIRECTOR:',1)[0];common='DESK: Sorry this is a narrow answer.'+common
for l in 'ABC':
 b=s.split(f'IF ACTUALLY SENT S10-C12-{l}:',1)[1].split('IF ACTUALLY SENT',1)[0].split('DESK: Sorry this',1)[0]
 entrances['civic_'+l.lower()]=chain(turns(opening)+turns(b)+turns(common),'CATALOGUE-REPLY-'+l,'OPEN-S10-C13')
opening=s.split('[PLAYER OPENS EXISTING PUBLIC PROFESSIONAL RETURN CHANNEL]',1)[1].split('S10-C14',1)[0];entrances['professional']=chain(turns(opening),'PRO-OPEN','OPEN-S10-C14')
opening=s.split('[PLAYER TAPS CHECK ON SOPHIE / OPENS EXISTING PRIVATE CHAT]',1)[1].split('S10-C15',1)[0];entrances['sophie']=chain(turns(opening),'SOPHIE-OPEN','OPEN-S10-C15');entrances['group']='OPEN-S10-C17'
body=s.split('===================== EXACT IN-WORLD PUBLIC PAGE =====================',1)[1].split('====================== END EXACT PUBLIC PAGE ========================',1)[0]
access=s.split('GREYHAVEN RECORDS CENTRE — CATALOGUE ACCESS NOTE',1)[1].split('This card is a NEW',1)[0];access=access.split('“',1)[1].split('”',1)[0]
pages={'box-index':dict(route='browser://greyhaven/civic-records/catalogue/GH-INV-2022-063/box-index',paragraphs=[clean(p) for p in body.split('\n\n') if p.strip()]),'access':dict(route='GH-CATALOGUE-ACCESS-NOTE-001',paragraphs=['GREYHAVEN RECORDS CENTRE — CATALOGUE ACCESS NOTE',clean(access)])}
queries=re.findall(r'^ - ([^\n]+?) => “([\s\S]*?)”',s,re.M);assert len(queries)==6
for n in nodes.values():
 for target in [n.get('next')]+[o['next'] for o in n.get('choices',[])]:assert not target or target in nodes,(n,target)
config=dict(authoringId='chapter_01_scene_10_the_inventory_sheet',planningId='ch01_sc10_a_life_in_fragments',sourceSha256=hashlib.sha256(raw).hexdigest(),choices=choices,entrances=entrances,pages=pages,queries=[dict(term=t,result=clean(v)) for t,v in queries],sources={'GH-BOX-INDEX-EXTRACT-001':dict(printedId='GH-INV-2022-063-EX1',kind='CIVIC_PUBLIC_PARTIAL_BOX_INDEX',boxes=[f'GH-PN-BOX-0{i}' for i in range(1,5)],descriptorReference='GH-DSC-03-A',descriptorTextIncluded=False),'GH-CATALOGUE-ACCESS-NOTE-001':dict(kind='CIVIC_GENERAL_ACCESS_GUIDANCE',caseReply=False)})
out="// Generated from the pinned Scene 10 manuscript only.\nimport type { Scene01Node } from './scene01'\n"
out+='export const scene10Nodes: Record<string,Scene01Node> = '+json.dumps(nodes,ensure_ascii=False,indent=2)+'\nexport const scene10Investigation = '+json.dumps(config,ensure_ascii=False,indent=2)+' as const\n'
Path('src/content/scene10Final.ts').write_text(out,encoding='utf8');print(len(nodes),'nodes; 20 sets / 60 authored alternatives')
