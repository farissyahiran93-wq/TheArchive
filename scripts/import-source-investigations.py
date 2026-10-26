"""Compile the two pinned manuscripts for the existing final-route story runner."""
import json,re,hashlib
from pathlib import Path
clean=lambda t:' '.join(t.split()).strip("'")
allnodes={};configs={}
for scene,count in [(7,15),(8,16)]:
 raw=Path(f'docs/sources/scene{scene:02}-final/FULL_SCRIPT.txt').read_bytes();s=raw.decode('utf-8-sig')
 headings=list(re.finditer(rf'^S{scene:02}-C(\d{{2}}) — ([^\n]+)',s,re.M));assert len(headings)==count
 regions={int(h[1]):s[h.end():headings[j+1].start() if j+1<len(headings) else len(s)] for j,h in enumerate(headings)}
 nodes={};choices={};entrances={}
 def add(n):nodes[n['id']]=n;return n['id']
 def turns(t):
  result=[];lines=t.splitlines()
  for j,line in enumerate(lines):
   m=re.match(r'^\s*(SOPHIE|MAYA|NORA|INTAKE DESK)(?: \(professional inbox\))?: (.*)',line)
   if not m:continue
   text=m[2];k=j+1
   while k<len(lines) and lines[k].strip() and not re.match(r'^\s*(?:SOPHIE|MAYA|NORA|INTAKE|Player|Relationship|Effects|Knowledge|Nora knowledge|SET |RECEIPT|\[|[ABC]\. |IF |ELSE|No |On |S0|Skipping|Every )',lines[k]):
    text+=' '+lines[k].strip();k+=1
   result.append((m[1].lower(),clean(text)))
  return result
 def chain(lines,prefix,target,group=False):
  for i,(actor,text) in reversed(list(enumerate(lines))):
   ident=f'OPEN-S{scene:02}-{prefix}-{i+1}'
   target=add(dict(id=ident,kind='npc',sender=actor if actor in ['sophie','maya'] else 'sophie',text=text,channel='group' if group else 'sophie',next=target,heardFacts=[ident+':reported']))
   target=add(dict(id=ident+'-WAIT',kind='wait',duration=2000 if scene==7 and prefix=='SOPHIE-OPEN' and i==3 else 1200,typing=True,actor=actor if actor in ['sophie','maya'] else 'sophie',next=target))
  return target
 threads=['professional','sophie','group'] if scene==7 else ['civic','professional','sophie','group']
 for t in threads:add(dict(id=f'OPEN-S{scene:02}-{t}-END',kind='event',event='source-thread-end'))
 chat={9:'professional',10:'sophie',11:'sophie',12:'group'} if scene==7 else {9:'civic',12:'professional',13:'sophie',14:'sophie',15:'group'}
 for i,r in regions.items():
  matches=list(re.finditer(r"^\s*([ABC])\.\s+(?:Player(?: \[[^\]]+\])?:\s*)?'([\s\S]*?)'[ \t]*(?=\n|$)",r,re.M))
  if scene==7 and i==11:
   a=re.search(r"Player: '([\s\S]*?)'\s*\n",r);matches=[a]+matches
  assert len(matches)==3,(scene,i,len(matches))
  opts=[]
  for j,m in enumerate(matches):
   letter='ABC'[j];text=clean(m[1] if scene==7 and i==11 and j==0 else m[2]);b=r[m.end():matches[j+1].start() if j<2 else len(r)]
   b=re.split(r'\n\[(?:END|BEAT|Only after|CONVER|PRIVATE|After)',b,flags=re.I)[0]
   feedback=re.search(r"SYSTEM: '([\s\S]*?)'\s*(?=\[|\n|$)",b)
   opt=dict(id=letter.lower(),text=text,feedback=clean(feedback[1]) if feedback else '')
   if i in chat:
    thread=chat[i];end=f'OPEN-S{scene:02}-{thread}-END';target=f'OPEN-S{scene:02}-C{i+1:02}' if (scene,i) in [(7,10),(8,13)] else end
    common=[]
    if (scene,i)==(7,9):common=turns(s.split('[END OF OPTIONAL EXCHANGE]',1)[1].split('[status unavailable',1)[0])
    if (scene,i)==(7,10):common=turns(r.split('[BEAT ONLY AFTER A REAL C10 SEND]',1)[1])
    if (scene,i)==(7,11):common=[('sophie',"I'm going to put my phone down for a bit."),('sophie','Thanks for asking first.'),('sophie','Talk later.')]
    if (scene,i)==(8,9):common=[('intake desk','Take care.')]
    if (scene,i)==(8,12):common=turns(r.split('[END] ',1)[1].split('No automatic promises',1)[0])
    if (scene,i)==(8,13):common=turns(r.split('[Only after C13 real Send]',1)[1])
    if (scene,i)==(8,14):common=[('sophie',"I'm going to clean up the kitchen."),('sophie','Thank you for not turning every message into a case update.'),('sophie','Goodnight.')]
    if common:target=chain(common,f'AFTER-{i:02}',target)
    lines=turns(b)
    if scene==7 and i==11 and j==0:
     yes,no=b.split('ELSE (C10-B/C sent, no permission):',1)
     alt=re.search(r"Player: '([\s\S]*?)'\s*\n",no)
     alternative=dict(text=clean(alt[1]),next=chain(turns(no),'C11-A-NO-CONSENT',target))
     lines=turns(yes)
     alternative['next']=add(dict(id='OPEN-S07-C11-A-NO-EFFECT',kind='event',event='effects',effects={'sophie':{'trust':1}},next=alternative['next']))
     opt['withoutConsent']=alternative
    if thread=='group':
     groups7={0:[('sophie','Okay. So we still need the real source.'),('maya',"A reference isn't a record. At least we know what to look for next.")],1:[('sophie',"Yeah. I don't want us accusing people either."),('maya','Agreed. We should keep credit and site changes separate.')],2:[('sophie','Okay. Thanks.'),('maya',"That's a better question to ask.")]}
     groups8={0:[('maya',"That's a useful distinction. We need the original before we can compare anything."),('sophie','Okay.')],1:[('maya',"Agreed. A file name isn't its provenance."),('sophie','Thanks for keeping it clear.')],2:[('maya','Makes sense. An actual series ID would tell us more than another guess.'),('sophie','Okay. Thank you.')]}
     lines=(groups7 if scene==7 else groups8)[j]
    target=chain(lines,('GROUP-' if thread=='group' else '')+f'C{i:02}-{letter}',target,thread=='group')
    effect={k.lower():int(v) for k,v in re.findall(r'(Trust|Affinity|Suspicion) \+(\d+)',b.split('ELSE (',1)[0])}
    if effect and thread=='sophie':target=add(dict(id=f'OPEN-S{scene:02}-C{i:02}-{letter}-EFFECT',kind='event',event='effects',effects={'sophie':effect},next=target))
    opt.update(next=target)
   opts.append(opt)
  ident=f'S{scene:02}-C{i:02}';choices[ident]=dict(heading=headings[i-1][2].strip(),mode=chat.get(i,'form' if i==8 else 'local'),options=opts)
  if i in chat:add(dict(id='OPEN-'+ident,kind='choice',number=ident,channel='group' if chat[i]=='group' else 'sophie',choices=[{k:v for k,v in o.items() if k!='feedback'} for o in opts]))
 if scene==7:
  opening=s.split('[PLAYER MANUALLY OPENS INBOX;',1)[1].split('[BRANCH BY PRECISE',1)[0]
  common=s.split('[CONVERGED — applies only to delivered openable reply]',1)[1].split('Every line above',1)[0]
  for j,l in enumerate('ABC'):
   b=s.split(f'IF C08-{l} actually SENT:',1)[1].split('IF C08-',1)[0].split('[CONVERGED',1)[0]
   entrances['professional_'+l.lower()]=chain(turns(opening)+turns(b)+turns(common),'PRO-REPLY-'+l,'OPEN-S07-C09')
  opening=s.split('[PLAYER MANUALLY OPENS CHAT]',1)[1].split('S07-C10',1)[0]
  entrances['sophie']=chain(turns(opening),'SOPHIE-OPEN','OPEN-S07-C10');entrances['group']='OPEN-S07-C12'
  bodies=re.findall(r'===== EXACT NEW PAGE COPY =====\s*([\s\S]*?)\s*===== END PAGE COPY =====',s)
  card=s.split('===== CARD COPY =====',1)[1].split('===== END CARD =====',1)[0]
  pages={key:dict(paragraphs=[clean(p) for p in body.split('\n\n') if p.strip()],route=route) for key,route,body in zip(['profile','note','catalogue','reference'],['browser://greyhaven-bulletin/about/reporters/nora-vance','browser://greyhaven-bulletin/notes/gb-article-001','browser://greyhaven/public-records/catalogue/help','GB-REF-017'],bodies+[card])}
 else:
  opening=s.split('[PLAYER MANUALLY OPENS CIVIC ROLE INBOX]',1)[1].split('IF ACTUALLY DELIVERED',1)[0]
  common=s.split('[CONVERGENCE — only when openable reply delivered]',1)[1].split('Knowledge attribution:',1)[0]
  for l in 'ABC':
   b=s.split(f'IF ACTUALLY DELIVERED C08-{l}:',1)[1].split('IF ACTUALLY DELIVERED',1)[0].split('[CONVERGENCE',1)[0]
   entrances['civic_'+l.lower()]=chain(turns(opening)+turns(b)+turns(common),'CIVIC-REPLY-'+l,'OPEN-S08-C09')
  opening=s.split('[PLAYER manually opens existing professional inbox]',1)[1].split('S08-C12',1)[0]
  entrances['professional']=chain(turns(opening),'PRO-OPEN','OPEN-S08-C12')
  opening=s.split('[PLAYER manually opens SOPHIE thread]',1)[1].split('S08-C13',1)[0]
  entrances['sophie']=chain(turns(opening),'SOPHIE-OPEN','OPEN-S08-C13');entrances['group']='OPEN-S08-C15'
  bodies=re.findall(r'=========== EXACT IN-WORLD PAGE COPY ===========\s*([\s\S]*?)\s*=========== END PAGE COPY ===========',s)
  pages={key:dict(paragraphs=[clean(p) for p in body.split('\n\n') if p.strip()],route=route) for key,route,body in zip(['directory','index','guide'],['browser://greyhaven/civic-records/service-directory','browser://greyhaven/civic-records/index/search-help','browser://greyhaven/civic-records/guidance/former-offices'],bodies)}
 for node in nodes.values():
  for target in [node.get('next')]+[o['next'] for o in node.get('choices',[])]:assert not target or target in nodes,(node,target)
 allnodes.update(nodes);configs[scene]=dict(choices=choices,pages=pages,entrances=entrances,sourceSha256=hashlib.sha256(raw).hexdigest())
 print(scene,len(nodes),'nodes;',count,'choices /',count*3,'alternatives')
out="// Generated from the pinned Scene 07 and 08 manuscripts.\nimport type { Scene01Node } from './scene01'\nimport { scene09Nodes, scene09Investigation } from './scene09Final'\nimport { scene10Nodes, scene10Investigation } from './scene10Final'\n"
out+='const sourceInvestigationBaseNodes: Record<string,Scene01Node> = '+json.dumps(allnodes,ensure_ascii=False,indent=2)+'\n'
out+='const sourceInvestigationBase = '+json.dumps(configs,ensure_ascii=False,indent=2)+' as const\n'
out+='export const sourceInvestigationNodes: Record<string,Scene01Node> = {...sourceInvestigationBaseNodes,...scene09Nodes,...scene10Nodes}\nexport const sourceInvestigations = {...sourceInvestigationBase,9:scene09Investigation,10:scene10Investigation} as const\n'
Path('src/content/sourceInvestigations.ts').write_text(out,encoding='utf-8')
