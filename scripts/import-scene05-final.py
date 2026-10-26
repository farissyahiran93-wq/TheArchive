"""Compile the supplied Scene 05 English screenplay; author directions never become bubbles."""
import json
import re
from pathlib import Path

source = Path('docs/sources/scene05-final/FULL_SCRIPT.txt').read_text(encoding='utf-8-sig')
nodes = {}
def add(n):
    nodes[n['id']] = n
    return n['id']
def chain(lines, prefix, target, group=False):
    for i, (actor, text) in reversed(list(enumerate(lines))):
        ident = f'OPEN-S05-{prefix}-{i+1}'
        if actor == 'player':
            target = add(dict(id=ident, kind='choice', channel='group' if group else 'sophie', choices=[dict(id='continue', text=text, next=target)]))
        else:
            message = add(dict(id=ident, kind='npc', sender=actor, text=text, channel='group' if group else 'sophie', next=target, heardFacts=[ident+':reported']))
            previous = target
            target = add(dict(id=ident+'-WAIT', kind='wait', duration=1400, typing=True, actor=actor, next=message))
            if group and actor == 'sophie':
                target = add(dict(id=ident+'-MEMBER', kind='condition', test='s05-sophie-member', next=target, otherwise=previous))
    return target
def turns(text):
    return [(m[1].lower(),m[2]) for m in re.finditer(r'^ *(SOPHIE|MAYA)(?: \(if (?:active member|present)\))?: (.+)$', text, re.M)]

for thread in ['SOPHIE','GROUP']:
    add(dict(id='OPEN-S05-'+thread+'-END',kind='event',event='s05-thread-end',actor='sophie' if thread=='SOPHIE' else 'maya'))
manifest=[]
for number in range(5,11):
    num=f'{number:02}'
    if number==8:
        options=[]
        for letter,text,response in re.findall(r'S05-C08-([ABC]) Player: "(.*?)" -> SOPHIE: (.*?)  \(Sophie goes offline\)',source):
            target=chain([('sophie',response)],'C08-'+letter,'OPEN-S05-SOPHIE-END')
            options.append(dict(id=letter.lower(),text=text,next=target))
    else:
        start=source.index('CHOICE S05-C'+num)
        end=source.find('CHOICE S05-C',start+10)
        if number==7:end=source.index('[END SOPHIE THREAD]',start)
        if number==9:end=source.index('[OPTIONAL FOLLOW-UP CHOICE',start)
        if number==10:end=source.index('This optional thread',start)
        region=source[start:end]
        matches=list(re.finditer(r'^([ABC])\. Player: "(.*?)"',region,re.M))
        options=[]
        for i,m in enumerate(matches):
            branch=region[m.end():matches[i+1].start() if i+1<len(matches) else len(region)]
            branch=branch.split('[CONVERGED]')[0].split('If SOPHIE is no longer')[0]
            nextid=f'OPEN-S05-C{number+1:02}' if number!=10 else 'OPEN-S05-GROUP-END'
            if number==5:
                common=source.split('[CONVERGED]',1)[1].split('CHOICE S05-C06',1)[0]
                nextid=chain(turns(common),'AFTER-05',nextid)
            if number==6:
                common=source.split('CHOICE S05-C06',1)[1].split('[CONVERGED]',1)[1].split('CHOICE S05-C07',1)[0]
                nextid=chain(turns(common),'AFTER-06',nextid)
            if number==7:
                common=source.split('[END SOPHIE THREAD]',1)[1].split('[OPTIONAL CLOSING',1)[0]
                nextid=chain(turns(common),'AFTER-07',nextid)
            effect={'05':{'a':{'trust':2},'b':{'affinity':2},'c':{'trust':1,'affinity':1}},'06':{'a':{'affinity':2},'b':{'trust':1},'c':{'affinity':2}},'07':{'a':{'trust':2},'b':{'trust':1},'c':{'affinity':1,'trust':1}},'09':{'a':{'trust':2},'b':{'trust':1},'c':{'suspicion':1}}}.get(num,{}).get(m[1].lower())
            if effect: nextid=add(dict(id=f'OPEN-S05-C{num}-{m[1]}-EFFECT',kind='event',event='effects',effects={'maya' if number==9 else 'sophie':effect},next=nextid))
            target=chain(turns(branch),f'C{num}-{m[1]}',nextid,number>=9)
            options.append(dict(id=m[1].lower(),text=m[2],next=target))
    assert len(options)==3,(num,options)
    add(dict(id='OPEN-S05-C'+num,kind='choice',number='V'+num,channel='group' if number>=9 else 'sophie',choices=options))
    manifest.append(dict(id='S05-C'+num,branches=3,channel='group' if number>=9 else 'sophie'))

# Nonessential bonus uses the existing premium composer + Send, then a second actual Send.
bonusEnd=chain([('sophie','It really does.')],'BONUS-END','OPEN-S05-AFTER-06-1-WAIT')
bonusEffect=add(dict(id='OPEN-S05-BONUS-EFFECT',kind='event',event='effects',effects={'sophie':{'affinity':1}},next=bonusEnd))
bonusReply=chain([('player','That sounds like him.')],'BONUS-REPLY',bonusEffect)
bonus=chain([('sophie','A takeaway slip from a place he swore he hated. I found it in a birthday card two years late.')],'BONUS',bonusReply)
add(dict(id='OPEN-S05-BONUS-OFFER',kind='gate',action='s05-bonus',next='OPEN-S05-AFTER-06-1-WAIT'))
add(dict(id='OPEN-S05-BONUS-CHOICE',kind='choice',channel='sophie',choices=[dict(id='bonus',text='What was the oddest receipt?',premiumChoice=True,next=bonus)]))
# Branch A's effect occurs before the optional offer; no repeat reward on return.
nodes['OPEN-S05-C06-A-EFFECT']['next']='OPEN-S05-BONUS-OFFER'
opening=source.split('[PLAYER MANUALLY OPENS SOPHIE]',1)[1].split('CHOICE S05-C05',1)[0]
entrance=chain(turns(opening),'SOPHIE-OPENING','OPEN-S05-C05')

local={}
for number in [1,2,3,4,11]:
    num=f'{number:02}'
    region=source.split('CHOICE S05-C'+num,1)[1]
    stop={1:'All paths converge',2:'Wrong answers',3:'All choices proceed',4:'[COMPOSER]',11:'Save one private conclusion'}[number]
    region=region.split(stop,1)[0]
    opts=[]
    matches=list(re.finditer(r'^([ABC])\. "([\s\S]*?)"',region,re.M))
    for i,m in enumerate(matches):
        response=region[m.end():matches[i+1].start() if i+1<len(matches) else len(region)]
        feedback=re.search(r'\[SYSTEM\] "([\s\S]*?)"',response)
        opts.append(dict(id=m[1].lower(),text=' '.join(m[2].split()),feedback=' '.join(feedback[1].split()) if feedback else ''))
    assert len(opts)==3,(num,opts)
    local['S05-C'+num]=opts
    manifest.append(dict(id='S05-C'+num,branches=3,channel='local' if number!=4 else 'form'))

policy=re.findall(r'^"(.*?)"',source.split('[PUBLIC WEB PAGE — EXACT IN-WORLD CONTENT]',1)[1].split('[UI] READ POLICY',1)[0],re.M|re.S)
policy=[ ' '.join(p.split()) for p in policy ]
checklist=[(m[1],' '.join(m[2].split())) for m in re.finditer(r'^\d\. "(.*?)"\s*"(.*?)"',source,re.M|re.S)]
assert len(policy)==3 and len(checklist)==4
out="// Generated from docs/sources/scene05-final/FULL_SCRIPT.txt.\nimport type { Scene01Node } from './scene01'\n"
for name,value in [('scene05Nodes',nodes),('scene05Entrances',dict(sophie=entrance,group='OPEN-S05-C09')),('scene05Local',local),('scene05Policy',policy),('scene05Checklist',checklist),('scene05Manifest',sorted(manifest,key=lambda x:x['id']))]:
    out+=f'export const {name}'+(': Record<string, Scene01Node>' if name=='scene05Nodes' else '')+' = '+json.dumps(value,ensure_ascii=False,indent=2)+('' if name=='scene05Nodes' else ' as const')+'\n'
for n in nodes.values():
    for target in [n.get('next'),n.get('otherwise')]+[o['next'] for o in n.get('choices',[])]: assert not target or target in nodes,(n['id'],target)
Path('src/content/scene05Final.ts').write_text(out,encoding='utf-8')
print(f'Scene 05: {len(nodes)} nodes, 11 main choices / 33 branches, optional premium exchange.')

