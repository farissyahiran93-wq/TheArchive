"""Compile the pinned Scene 06 manuscript into the existing typed dialogue graph."""
import re,json
from pathlib import Path
s=Path('docs/sources/scene06-final/FULL_SCRIPT.txt').read_text(encoding='utf-8-sig')
clean=lambda t:' '.join(t.split())
regions={}
for i in range(1,15):
 start=s.index(f'S06-C{i:02} —')
 end=s.find('\n==========================================================================',start)
 nextchoice=s.find(f'S06-C{i+1:02} —',start+15)
 if nextchoice!=-1:end=min(end,nextchoice)
 regions[i]=s[start:end]
nodes={}; local={}; manifest=[]
def add(n):nodes[n['id']]=n;return n['id']
def turns(t):
 lines=t.splitlines()
 # Wrapped NPC speech uses exactly two-space indentation or unindented text, unlike author directions.
 result=[]
 for j,line in enumerate(lines):
  m=re.match(r'^ *(SOPHIE|MAYA|DESK)(?: if active)?: (.*)',line)
  if not m:continue
  text=m[2];k=j+1
  while k<len(lines) and lines[k].strip() and not re.match(r'^\s*(?:SOPHIE|MAYA|DESK|Player|Relationship|STATUS|NO |\[|[ABC]\. |Recipient|No |The |EVIDENCE|Save |Do not|If |S06-|s06\.)',lines[k]):
   # continuation is prose belonging to this speech, not a direction
   text+=' '+lines[k].strip();k+=1
  result.append((m[1].lower(),text))
 return result
def chain(lines,prefix,target,group=False):
 for i,(actor,text) in reversed(list(enumerate(lines))):
  ident=f'OPEN-S06-{prefix}-{i+1}'
  target=add(dict(id=ident,kind='npc',sender=actor if actor!='desk' else 'sophie',text=text,channel='group' if group else 'sophie',next=target,heardFacts=[ident+':reported']))
  target=add(dict(id=ident+'-WAIT',kind='wait',duration=1200,typing=True,actor=actor if actor!='desk' else 'sophie',next=target))
 return target
for t in ['desk','sophie','maya','group']:add(dict(id=f'OPEN-S06-{t}-END',kind='event',event='s06-thread-end'))
for i in range(1,15):
 region=regions[i]; matches=list(re.finditer(r'^([ABC])\. (?:Player(?: \[Send\])?: )?“([\s\S]*?)”',region,re.M));opts=[]
 for j,m in enumerate(matches):
  branch=region[m.end():matches[j+1].start() if j+1<len(matches) else len(region)]
  branch=branch.split('[CONVERGED')[0].split('[END]')[0].split('[WHEN CLASSIFIED]')[0]
  if i==12:branch=branch.split("MAYA: I've got to head out.",1)[0]
  feedback=re.search(r'SYSTEM: “([\s\S]*?)”',branch)
  opt=dict(id=m[1].lower(),text=clean(m[2]),feedback=clean(feedback[1]) if feedback else '')
  if i in [5,8,9,10,11,12,13]:
   thread='desk' if i==5 else 'sophie' if i<11 else 'maya' if i<13 else 'group'
   target=f'OPEN-S06-C{i+1:02}' if i in [8,9,11] else f'OPEN-S06-{thread}-END'
   common=''
   if i in [8,9,11]:common=region.split('[CONVERGED',1)[1].split(f'S06-C{i+1:02}',1)[0] if '[CONVERGED' in region else ''
   if i==10:common=region.split('[END]',1)[1].split('NOTE:',1)[0]
   if i==12:common="MAYA: I've got to head out. Message me here if you find a proper source."
   if common:target=chain(turns(common),f'AFTER-{i:02}',target)
   effect={k.lower():int(v) for k,v in re.findall(r'(Trust|Affinity|Suspicion) \+(\d+)',branch)}
   target=chain(turns(branch),f'C{i:02}-{m[1]}',target,i==13)
   if effect:target=add(dict(id=f'OPEN-S06-C{i:02}-{m[1]}-EFFECT',kind='event',event='effects',effects={thread:effect},next=target))
   opt=dict(id=opt['id'],text=opt['text'],next=target)
  opts.append(opt)
 assert len(opts)==3,(i,opts)
 if i in [5,8,9,10,11,12,13]:add(dict(id=f'OPEN-S06-C{i:02}',kind='choice',number=f'D{i:02}',channel='group' if i==13 else 'sophie',choices=opts))
 else:local[f'S06-C{i:02}']=opts
 manifest.append(dict(id=f'S06-C{i:02}',branches=3,channel='local' if i not in [5,6,8,9,10,11,12,13] else 'form' if i==6 else 'group' if i==13 else 'desk' if i==5 else 'sophie' if i<11 else 'maya'))
# The single conditional reply line is selected from the exact prior receipt option.
opening=s.split('[PLAYER MANUALLY OPENS FICTIONAL DESK INBOX]',1)[1].split('[ONE LINE',1)[0]
common=s.split('[CONVERGED DESK REPLY]',1)[1].split('EVIDENCE STATUS:',1)[0]
desk={}
conditional={'a':'You asked whether the article body changed after publication.','b':'You asked what the “Updated: Yesterday” label refers to.','c':'You asked whether readers can inspect a correction note or version history for this article.'}
for letter,line in conditional.items():desk[letter]=chain(turns(opening)+[('desk',line)]+turns(common),'DESK-'+letter,'OPEN-S06-C05')
sophie=s.split('[PLAYER TAPS] CHECK ON SOPHIE, then manually opens her chat',1)[1].split('S06-C08',1)[0]
maya=s.split('[OPTIONAL MAYA OPENING — IF CONTACT PERMITTED]',1)[1].split('S06-C11',1)[0]
entrances=dict(sophie=chain(turns(sophie),'SOPHIE-OPEN','OPEN-S06-C08'),maya=chain(turns(maya),'MAYA-OPEN','OPEN-S06-C11'),group='OPEN-S06-C13',**{'desk_'+k:v for k,v in desk.items()})
pages={}
for ident,title,marker,stop in [('GB-CORR-REGISTER-001','PUBLIC CORRECTIONS REGISTER','[EXACT FULL PUBLIC PAGE]','[UI ACTIONS]'),('GB-CORR-SCOPE-001','CORRECTIONS, NOTES AND PAGE UPDATES','[EXACT FULL PUBLIC PAGE]','[UI] READ AND ACKNOWLEDGE')]:
 pos=s.index('SOURCE ID: '+ident);body=s[pos:].split(marker,1)[1].split(stop,1)[0].strip()
 pages[ident]=dict(title=title,paragraphs=[clean(p).replace('Footer:', '').replace('“','').replace('”','').strip() for p in body.split('\n\n') if p.strip() and p.strip()!='Footer:'])
out="// Generated from the pinned Scene 06 screenplay.\nimport type { Scene01Node } from './scene01'\n"
for name,val in [('scene06Identity',dict(id='chapter_01_scene_06_corrections_desk',planningId='ch01_sc06_the_missing_line')),('scene06Nodes',nodes),('scene06Local',local),('scene06Entrances',entrances),('scene06Pages',pages),('scene06Manifest',manifest)]:out+=f'export const {name}'+(': Record<string, Scene01Node>' if name=='scene06Nodes' else '')+' = '+json.dumps(val,ensure_ascii=False,indent=2)+('' if name=='scene06Nodes' else ' as const')+'\n'
for n in nodes.values():
 for target in [n.get('next'),n.get('otherwise')]+[o['next'] for o in n.get('choices',[])]:assert not target or target in nodes,(n,target)
Path('src/content/scene06Final.ts').write_text(out,encoding='utf-8')
print(len(nodes),'nodes; 14 choices / 42 variants')

