"""Deterministically compile only the pinned Transfer Register manuscript."""
import re,json,hashlib
from pathlib import Path
raw=Path('docs/sources/scene09-final/FULL_SCRIPT.txt').read_bytes();s=raw.decode('utf-8-sig')
clean=lambda t:' '.join(t.split()).strip("'")
heads=list(re.finditer(r'^S09-C(\d{2}) — ([^\n]+)',s,re.M));assert len(heads)==18
regions={int(h[1]):s[h.end():heads[j+1].start() if j+1<len(heads) else s.index('On actual local C18 commitment ONLY:',h.end())] for j,h in enumerate(heads)}
nodes={};choices={};entrances={}
def add(n):nodes[n['id']]=n;return n['id']
def turns(t):
 result=[];lines=t.splitlines()
 for j,line in enumerate(lines):
  m=re.match(r'^\s*(SOPHIE|MAYA|NORA|DESK): (.*)',line)
  if not m:continue
  text=m[2];k=j+1
  while k<len(lines) and lines[k].strip() and not re.match(r'^\s*(?:SOPHIE|MAYA|NORA|DESK|Player|EFFECT|Effect|Only |This |No |If |IF |\[|[ABC]\. |S09-|Group |Neither |On )',lines[k]):text+=' '+lines[k].strip();k+=1
  result.append((m[1].lower(),clean(text)))
 return result
def chain(lines,prefix,target,group=False):
 for j,(actor,text) in reversed(list(enumerate(lines))):
  ident=f'OPEN-S09-{prefix}-{j+1}'
  target=add(dict(id=ident,kind='npc',sender=actor if actor in ['sophie','maya'] else 'sophie',text=text,channel='group' if group else 'sophie',next=target,heardFacts=[ident+':reported']))
  target=add(dict(id=ident+'-WAIT',kind='wait',duration=1200,typing=True,actor=actor if actor in ['sophie','maya'] else 'sophie',next=target))
 return target
for t in ['civic','professional','sophie','group']:add(dict(id=f'OPEN-S09-{t}-END',kind='event',event='source-thread-end'))
chat={12:'civic',13:'professional',14:'sophie',15:'sophie',16:'group'}
for i,r in regions.items():
 matches=list(re.finditer(r"^\s*([ABC])\.\s+(?:Player(?: draft)?:\s*)?'([\s\S]*?)'[ \t]*(?=\n|$)",r,re.M));assert len(matches)==3,(i,len(matches))
 opts=[]
 for j,m in enumerate(matches):
  b=r[m.end():matches[j+1].start() if j<2 else len(r)];feedback=re.search(r"SYSTEM: '([\s\S]*?)'\s*(?=\[|\n|$)",b)
  o=dict(id=m[1].lower(),text=clean(m[2]),feedback=clean(feedback[1]) if feedback else '')
  if i in chat:
   t=chat[i];target='OPEN-S09-C15' if i==14 else f'OPEN-S09-{t}-END'
   common={12:[('desk','Take care.')],13:[('nora','I have to get back to a deadline. Take care.')],14:[('sophie','Anyway, how are you doing?'),('sophie',"You don't have to give me the investigation version.")],15:[('sophie',"I'm going to put that list back in its drawer."),('sophie','Goodnight.')]}.get(i,[])
   if i==12:b=b.split('DESK: Take care.',1)[0]
   if i==13:b=b.split('NORA: I have to get back',1)[0]
   if i==14:b=b.split('[If real C14 Send',1)[0]
   if i==15:b=b.split("SOPHIE: I'm going to put",1)[0]
   if common:target=chain(common,f'AFTER-{i:02}',target)
   lines=turns(b)
   if i==15 and j==0:lines=[('sophie','Okay. Thanks for saying the uncertain bit too.'),('sophie',"I'd rather just know how you're doing.")]
   if i==16:
    lines=[
     [('maya',"That's the distinction we needed."),('maya','A series entry helps us ask better questions, not name a culprit.'),('sophie','Okay. Thanks for being careful.')],
     [('maya',"Agreed. A shared category isn't a verified file."),('sophie','Understood.')],
     [('maya','Good plan. Let the source set the pace.'),('sophie','Thanks.')]
    ][j]
   target=chain(lines,('GROUP-' if i==16 else '')+f'C{i:02}-{m[1]}',target,i==16)
   effects={k.lower():int(v) for k,v in re.findall(r'(Trust|Affinity|Suspicion) \+(\d+)',b)} if t=='sophie' and not(i==15 and j==0) else {}
   if effects:target=add(dict(id=f'OPEN-S09-C{i:02}-{m[1]}-EFFECT',kind='event',event='effects',effects={'sophie':effects},next=target))
   o['next']=target
  opts.append(o)
 ident=f'S09-C{i:02}';choices[ident]=dict(heading=heads[i-1][2].strip(),mode=chat.get(i,'form' if i==11 else 'local'),options=opts)
 if i in chat:add(dict(id='OPEN-'+ident,kind='choice',number=ident,channel='group' if i==16 else 'sophie',choices=[{k:v for k,v in o.items() if k!='feedback'} for o in opts]))
opening=s.split('[PLAYER MANUALLY OPENS RECORDS CENTRE INBOX]',1)[1].split('IF actual C11-',1)[0]
common=s.split("DESK: I know it can sound",1)[1].split('Player knows this reported',1)[0]
common='DESK: I know it can sound'+common
for l in 'ABC':
 branch=s.split(f'IF actual C11-{l} delivered:',1)[1].split('IF actual C11-',1)[0].split('DESK: I know it can sound',1)[0]
 entrances['civic_'+l.lower()]=chain(turns(opening)+turns(branch)+turns(common),'SERIES-REPLY-'+l,'OPEN-S09-C12')
opening=s.split('NORA: Hello again.',1)[1].split('S09-C13',1)[0]
entrances['professional']=chain(turns('NORA: Hello again.'+opening),'PRO-OPEN','OPEN-S09-C13')
opening=s.split('[PLAYER manually opens existing private Sophie chat]',1)[1].split('S09-C14',1)[0]
entrances['sophie']=chain(turns(opening),'SOPHIE-OPEN','OPEN-S09-C14');entrances['group']='OPEN-S09-C16'
bodies=re.findall(r'==================== EXACT IN-WORLD PAGE COPY ====================\s*([\s\S]*?)\s*==================== END EXACT PAGE COPY ====================',s);assert len(bodies)==2
pages={key:dict(route=route,paragraphs=[clean(p) for p in body.split('\n\n') if p.strip()]) for key,route,body in zip(['register','finding-aid'],['browser://greyhaven/civic-records/transfers/public-register','browser://greyhaven/civic-records/transfers/GH-TR-2022-063/finding-aid'],bodies)}
for node in nodes.values():
 for target in [node.get('next')]+[o['next'] for o in node.get('choices',[])]:assert not target or target in nodes,(node,target)
sources={
 'GH-TRANSFER-REGISTER-001':dict(kind='CIVIC_PUBLIC_TRANSFER_LISTING',scope='series-only',route=pages['register']['route']),
 'GH-TRANSFER-FINDING-AID-001':dict(kind='CIVIC_PUBLIC_INVENTORY_SUMMARY',scope='collection-summary',route=pages['finding-aid']['route']),
 'GH-TR-2022-063':dict(kind='PUBLIC_LISTED_SERIES_TRANSFER',series='GH-PN-GEN-2017-2021',inventory='GH-INV-2022-063',formerCustodian='Civic Secretariat',receivingCustodian='Greyhaven Records Centre',coverage='2017–2021',transferYear=2022,specificNoticeIdentified=False),
 'GH-PN-GEN-2017-2021':dict(kind='PUBLIC_RECORD_SERIES',itemMatch=False),
 'GH-INV-2022-063':dict(kind='PUBLIC_SERIES_SUMMARY',originalAttached=False)
}
config=dict(authoringId='chapter_01_scene_09_the_transfer_register',planningId='ch01_sc09_unknown_source',sources=sources,choices=choices,pages=pages,entrances=entrances,sourceSha256=hashlib.sha256(raw).hexdigest())
out="// Generated solely from the pinned Scene 09 manuscript.\nimport type { Scene01Node } from './scene01'\n"
out+='export const scene09Nodes: Record<string,Scene01Node> = '+json.dumps(nodes,ensure_ascii=False,indent=2)+'\n'
out+='export const scene09Investigation = '+json.dumps(config,ensure_ascii=False,indent=2)+' as const\n'
Path('src/content/scene09Final.ts').write_text(out,encoding='utf8')
print(len(nodes),'nodes; 18 choices / 54 alternatives')
