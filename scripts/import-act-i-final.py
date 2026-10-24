"""Compile the owner's final manuscripts to typed dialogue nodes (never parse prose at runtime).

Standalone FINAL 02/03 supersede the combined manuscript for those scenes.
Re-run from the repository root. Sources are pinned verbatim under docs/sources/act-i-final.
"""
import json
import re
from pathlib import Path

ROOT = Path('docs/sources/act-i-final')
combined = (ROOT / 'ACT_I_FULL_REWRITE.txt').read_text(encoding='utf-8-sig')
s1 = combined.split('# SCENE 01 — A MESSAGE FROM SOPHIE', 1)[1].split('## SCENE 01 RECEIPTS', 1)[0]
s2 = (ROOT / 'SCENE_02_FINAL.txt').read_text(encoding='utf-8-sig').split('## DELIVERY CONTRACT FOR CODEX', 1)[0]
s3 = (ROOT / 'SCENE_03_FINAL.txt').read_text(encoding='utf-8-sig').split('## ROUTE TO SCENE 04', 1)[0]
nodes, metadata = {}, []

def add(node):
    assert node['id'] not in nodes, node['id']
    nodes[node['id']] = node
    return node['id']

def effect(text):
    result, actor = {}, 'sophie'
    for m in re.finditer(r'(?:(Sophie|Maya|Lucas)\s+)?(trust|affinity|suspicion)\s*([+-]\d+)', text, re.I):
        actor = (m[1] or actor).lower()
        result.setdefault(actor, {})[m[2].lower()] = int(m[3])
    return result

def facts(text, scene, context):
    found = []
    mapping = {
        "He's my brother.": ['OPEN-S03-SOPHIE-DANIEL-SIBLINGS'],
        'My older brother.': ['OPEN-S03-SOPHIE-DANIEL-SIBLINGS','OPEN-S03-DANIEL-OLDER-BROTHER'],
        "Yes, we've reported it.": ['OPEN-S03-POLICE-REPORT-CLAIM'],
        'Yes. We reported it.': ['OPEN-S03-POLICE-REPORT-CLAIM'],
        "She's Daniel's fiancée.": ['OPEN-S03-MAYA-DANIEL-ENGAGED'],
        "Daniel's her fiancé.": ['OPEN-S03-MAYA-DANIEL-ENGAGED'],
        'She and Daniel are engaged.': ['OPEN-S03-MAYA-DANIEL-ENGAGED'],
        "She's my future sister-in-law, assuming life would stop being cruel for five minutes.": ['OPEN-S03-MAYA-DANIEL-ENGAGED'],
        "That's normal. She's his fiancée.": ['OPEN-S03-MAYA-DANIEL-ENGAGED'],
        'They were planning a wedding.': ['OPEN-S03-MAYA-WEDDING-PLANNED'],
        'They were supposed to get married.': ['OPEN-S03-MAYA-WEDDING-PLANNED'],
        'She had wedding ideas saved on her phone last week.': ['OPEN-S03-MAYA-WEDDING-PLANNED'],
        'He and Daniel have known each other since they were kids.': ['OPEN-S03-LUCAS-CHILDHOOD-FRIEND'],
        "She doesn't usually say much in the group.": ['OPEN-S03-ELI-SHE-HER'],
        'She works with Daniel at Axiom Recovery.': ['OPEN-S03-ELI-SHE-HER','OPEN-S03-ELI-DANIEL-COWORKERS','OPEN-S03-ELI-AXIOM-RECOVERY','OPEN-S03-DANIEL-AXIOM-RECOVERY'],
        'They work together.': ['OPEN-S03-ELI-DANIEL-COWORKERS'] if scene == 3 and context.startswith('C13-') else [],
        'Where Daniel works.': ['OPEN-S03-DANIEL-AXIOM-RECOVERY'] if scene == 3 and context.startswith('C14-') else [],
        'Just a star.': ['OPEN-CONTACT-STAR-REPORTED'],
        'One star.': ['OPEN-CONTACT-STAR-REPORTED'],
        'The file says it belongs to Daniel Mercer.': ['OPEN-S01-DANIEL-NAME','OPEN-S01-SOPHIE-CONTACT-LIST-CLAIM'],
        "The copy doesn't say who marked it, or when.": ['OPEN-CONTACT-AUTHOR-UNKNOWN'],
        "We don't know who added it.": ['OPEN-CONTACT-AUTHOR-UNKNOWN'],
        'Daniel stopped replying.': ['OPEN-S01-DANIEL-UNREACHABLE'],
        'What we can say is that the timeline isn\'t settled.': ['OPEN-S02-DISPUTED-TIMELINE'],
        'Nobody has confirmed how they fit together.': ['OPEN-S02-DISPUTED-TIMELINE'],
    }
    found.extend(mapping.get(text, []))
    return found

def turns(text, scene, context):
    result = []
    for raw in text.splitlines():
        line = re.sub(r'^\s*-\s*', '', raw.strip())
        spoken = re.fullmatch(r'\*\*(SOPHIE|MAYA|LUCAS|PLAYER(?: \([^)]*\))?|SYSTEM):\*\*\s*(.*)', line)
        if spoken:
            actor, body = spoken.groups()
            body = re.sub(r'\*([^*]+)\*', r'\1', body.strip())
            if actor == 'SYSTEM':
                if body.startswith('You joined'): continue  # runner owns membership event
                if body == 'Maya deleted a message.': result.append({'event':'deleted','actor':'maya'})
                elif body == 'Lucas left the group.': result.append({'event':'leave','actor':'lucas'})
                elif re.fullmatch(r'(Sophie|Maya) is (offline|online)\.', body):
                    result.append({'event':'presence','actor':body.split()[0].lower(),'online':'online' in body})
                else: raise ValueError('Uncompiled system line: '+body)
            elif actor.startswith('PLAYER'): result.append({'player': body})
            else: result.append({'npc':body,'sender':actor.lower()})
            continue
        if line.startswith('*[') and line.endswith(']*'):
            direction = line[2:-2]
            if direction.lower().startswith('effect:'):
                result.append({'event':'effects','effects':effect(direction)})
            elif any(x in direction.lower() for x in ['pause','typing','idle','silence']) or re.match(r'^\d',direction):
                times = list(re.finditer(r'(\d+(?:\.\d+)?)s\b',direction))
                actor = next((a for a in ['lucas','maya','sophie'] if a in direction.lower()),'sophie')
                if times:
                    for i,m in enumerate(times):
                        typing = i == 0 and 'typ' in direction[:m.start()].lower() and 'nobody types' not in direction.lower()
                        result.append({'wait':round(float(m[1])*1000),'typing':typing,'actor':actor})
                elif any(x in direction.lower() for x in ['short pause','small lull','short lull']):
                    result.append({'wait':1400,'typing':False,'actor':actor})
        elif '**PLAYER' in line or re.match(r'\*\*(SOPHIE|MAYA|LUCAS):',line):
            raise ValueError('Uncompiled dialogue: '+line)
    return result

def chain(items, scene, context, target):
    for i,item in reversed(list(enumerate(items,1))):
        node = {'id':f'OPEN-S{scene:02}-FINAL-{context}-{i}','next':target}
        if 'npc' in item:
            node.update(kind='npc',text=item['npc'],sender=item['sender'],channel='group' if scene==2 else 'sophie')
            node['heardFacts'] = facts(item['npc'],scene,context)
            if scene==1: node['introducesSophie'] = bool(re.search(r"I'm Sophie|My name's Sophie",item['npc']))
        elif 'player' in item:
            node.update(kind='choice',choices=[{'id':'continue','text':item['player'],'next':target}]); del node['next']
        elif 'wait' in item: node.update(kind='wait',duration=item['wait'],typing=item['typing'],actor=item['actor'])
        else: node.update(kind='event',**item)
        target = add(node)
    return target

def menu(scene,number,body,target):
    if scene==2:
        pattern=r'^\*\*([A-E]) — (★ )?PLAYER:\*\* (.*)$'
    else:
        pattern=r'^([A-E])\. (★ )?\*\*PLAYER:\*\* (.*)$'
    matches=list(re.finditer(pattern,body,re.M))
    assert len(matches) in (4,5),(scene,number,len(matches))
    options=[]
    for i,m in enumerate(matches):
        ident,premium,text=m.groups(); ident=ident.lower()
        branch=body[m.end():matches[i+1].start() if i+1<len(matches) else len(body)]
        end = 'OPEN-S01-FINAL-DECLINED' if scene==1 and number=='13' and ident=='d' else target
        opt={'id':ident,'text':text.strip(),'next':chain(turns(branch,scene,f'C{number}-{ident}'),scene,f'C{number}-{ident}',end)}
        if premium: opt['premiumChoice']=True
        if scene==1 and number=='08' and ident in ['a','d']: opt['discloseName']=True
        options.append(opt)
    ident=f'OPEN-S{scene:02}-C{number}'
    add({'id':ident,'kind':'choice','number':('G' if scene==2 else 'P' if scene==3 else '')+number,'choices':options})
    metadata.append({'id':ident,'branches':len(options),'premium':sum(bool(o.get('premiumChoice')) for o in options)})
    return ident

# Scene 01: deferred invitation resumes through a manual Continue before C14.
add({'id':'OPEN-S01-FINAL-INVITATION','kind':'event','event':'invitation'})
add({'id':'OPEN-S01-FINAL-DECLINED','kind':'event','event':'declined'})
headers=list(re.finditer(r'^### CHOICE OPEN-S01-C(\d{2})[^\n]*\n',s1,re.M))
assert len(headers)==14
for i,h in reversed(list(enumerate(headers))):
    number=h[1]; region=s1[h.end():headers[i+1].start() if i+1<len(headers) else len(s1)]
    if number=='13': region=region.split('### S01-DEFERRED-RESUME')[0]
    before,sep,after=region.partition('**CONVERGE**')
    first=re.search(r'^A\. ',before,re.M)
    prelude=turns(before[:first.start()],1,'BEFORE-'+number) if first else []
    target='OPEN-S01-FINAL-INVITATION' if number=='14' else f'OPEN-S01-C{int(number)+1:02}'
    if number=='13': target='OPEN-S01-FINAL-BEFORE-14'
    tail=chain(turns(after,1,'AFTER-'+number),1,'AFTER-'+number,target)
    menu(1,number,before[first.start():],tail)
    if prelude:
        actual=chain(prelude,1,'BEFORE-'+number,f'OPEN-S01-C{number}')
        add({'id':f'OPEN-S01-FINAL-BEFORE-{number}','kind':'event','event':'route','next':actual})
deferred=s1.split('### S01-DEFERRED-RESUME',1)[1].split('### CHOICE OPEN-S01-C14',1)[0]
add({'id':'OPEN-S01-FINAL-DEFERRED-CONTINUE','kind':'gate','action':'deferred','next':'OPEN-S01-FINAL-BEFORE-14'})
deferredStart=chain(turns(deferred,1,'DEFERRED'),1,'DEFERRED','OPEN-S01-FINAL-DEFERRED-CONTINUE')
firstTurns=turns(s1.split('## OPENING',1)[1].split('### CHOICE',1)[0],1,'OPENING')
# The onboarding timer owns the first incoming notification. Don't deliver a wait as a message.
while firstTurns and 'npc' not in firstTurns[0]: firstTurns.pop(0)
opening1=chain(firstTurns,1,'OPENING','OPEN-S01-C01')

# Scene 02: all 13 full branches, then the independent private request at the safe C09 boundary.
add({'id':'OPEN-S02-FINAL-COMPLETE','kind':'event','event':'group-complete'})
add({'id':'OPEN-S03-FIRST-MESSAGE','kind':'npc','channel':'sophie','sender':'sophie','text':'Hey. You got a minute?','next':'OPEN-S03-FINAL-AWAIT-OPEN'})
add({'id':'OPEN-S03-FINAL-AWAIT-OPEN','kind':'event','event':'private-ready'})
returnText=s2.split('## RETURN —',1)[1].split('### CHOICE 10',1)[0]
returnStart=chain(turns(returnText,2,'RETURN'),2,'RETURN','OPEN-S02-C10')
add({'id':'OPEN-S02-RETURN','kind':'event','event':'route','next':returnStart})
add({'id':'OPEN-S02-UNKNOWN-01','kind':'gate','action':'sender-request','next':'OPEN-S02-RETURN'})
add({'id':'OPEN-S02-FINAL-SENDER-ARRIVAL','kind':'event','event':'sender-arrival','next':'OPEN-S02-UNKNOWN-01'})
headers=list(re.finditer(r'^### CHOICE (\d{2})[^\n]*\n',s2,re.M))
assert len(headers)==13
for i,h in reversed(list(enumerate(headers))):
    number=h[1]; region=s2[h.end():headers[i+1].start() if i+1<len(headers) else len(s2)]
    if number=='09': region=region.split('### PRIVATE INTERACTION',1)[0]
    before,sep,after=re.split(r'\*\*CONVERGE(?: — OUTSIDE INTERRUPTION)?\*\*',region,maxsplit=1)[0],None,None
    parts=re.split(r'\*\*CONVERGE(?: — OUTSIDE INTERRUPTION)?\*\*',region,maxsplit=1); assert len(parts)==2
    before,after=parts
    target='OPEN-S02-FINAL-COMPLETE' if number=='13' else 'OPEN-S02-FINAL-SENDER-ARRIVAL' if number=='09' else f'OPEN-S02-C{int(number)+1:02}'
    menu(2,number,before,chain(turns(after,2,'AFTER-'+number),2,'AFTER-'+number,target))
opening2=chain(turns(s2.split('## OPENING',1)[1].split('### CHOICE 01',1)[0],2,'OPENING'),2,'OPENING','OPEN-S02-C01')

# Scene 03's opt-in disclosure is a graph of explicit player actions and scoped conditional menus.
add({'id':'OPEN-S03-FINAL-COMPLETE','kind':'event','event':'private-complete'})
mainline=s3.split('## MAINLINE RESUMES',1)[1].split('### CHOICE OPEN-S03-C16',1)[0]
mainlineStart=chain(turns(mainline,3,'MAINLINE'),3,'MAINLINE','OPEN-S03-C16')
interlude=s3.split('## OPTIONAL INTERLUDE',1)[1].split('## MAINLINE RESUMES',1)[0]
disclosureEnd=interlude.split('**SOPHIE:** Thanks for telling me.',1)[1]
disclosureEnd='**SOPHIE:** Thanks for telling me.'+disclosureEnd
end=chain(turns(disclosureEnd,3,'DISCLOSURE-END'),3,'DISCLOSURE-END',mainlineStart)
response=interlude.split('**PLAYER — secondary tap choice `OPEN-S03-SENDER-RESPONSE`:**',1)[1].split('**SOPHIE:** Thanks for telling me.',1)[0]
options=[]
matches=list(re.finditer(r'^(\d)\. \*\*PLAYER:\*\* (.*)$',response,re.M))
for i,m in enumerate(matches):
    text=m[2].split(' *[')[0]; branch=response[m.end():matches[i+1].start() if i+1<len(matches) else len(response)]
    opt={'id':m[1],'text':text,'next':chain(turns(branch,3,'RESPONSE-'+m[1]),3,'RESPONSE-'+m[1],end)}
    if m[1]=='2': opt['requires']='sender-replied'
    if m[1]=='3': opt['requires']='sender-not-replied'
    options.append(opt)
add({'id':'OPEN-S03-SENDER-RESPONSE','kind':'choice','choices':options})
timing=interlude.split('**PLAYER — secondary tap choice `OPEN-S03-SENDER-TIMING`:**',1)[1].split('**PLAYER — secondary tap choice `OPEN-S03-SENDER-RESPONSE`:**',1)[0]
timingOptions=list(re.finditer(r'^(\d)\. \*\*PLAYER:\*\* (.*)$',timing,re.M))
tail=chain(turns(timing[timingOptions[-1].end():],3,'TIMING-AFTER'),3,'TIMING-AFTER','OPEN-S03-SENDER-RESPONSE')
add({'id':'OPEN-S03-SENDER-TIMING','kind':'choice','choices':[{'id':m[1],'text':m[2],'next':tail} for m in timingOptions]})
quoted,react=interlude.split('**DISCLOSURE CONVERGE**',1)
react=react.split('**PLAYER — secondary tap choice',1)[0]
tail=chain(turns(react,3,'DISCLOSURE-AFTER'),3,'DISCLOSURE-AFTER','OPEN-S03-SENDER-TIMING')
matches=list(re.finditer(r'^([A-C])\. \*\*PLAYER:\*\* (.*)$',quoted,re.M))
add({'id':'OPEN-S03-SENDER-DISCLOSURE','kind':'choice','choices':[{'id':m[1].lower(),'text':m[2],'next':chain(turns(quoted[m.end():matches[i+1].start() if i+1<len(matches) else len(quoted)],3,'DISCLOSURE-'+m[1]),3,'DISCLOSURE-'+m[1],tail)} for i,m in enumerate(matches)]})
add({'id':'OPEN-S03-FINAL-DISCLOSURE-OFFER','kind':'gate','action':'disclosure','next':'OPEN-S03-SENDER-DISCLOSURE','skip':mainlineStart})
offer=add({'id':'OPEN-S03-FINAL-DISCLOSURE-CHECK','kind':'condition','test':'sender-seen','next':'OPEN-S03-FINAL-DISCLOSURE-OFFER','otherwise':mainlineStart})
personal=add({'id':'OPEN-S03-FINAL-PERSONAL','kind':'npc','channel':'sophie','sender':'sophie','text':"I'm glad you stayed, [PLAYER_NAME].",'next':offer})
personalCheck=add({'id':'OPEN-S03-FINAL-PERSONAL-CHECK','kind':'condition','test':'name-disclosed','next':personal,'otherwise':offer})
headers=list(re.finditer(r'^### CHOICE OPEN-S03-C(\d{2})[^\n]*\n',s3,re.M))
assert len(headers)==19
for i,h in reversed(list(enumerate(headers))):
    number=h[1]; region=s3[h.end():headers[i+1].start() if i+1<len(headers) else len(s3)]
    if number=='15': region=region.split('## OPTIONAL INTERLUDE',1)[0]
    before,after=region.split('**CONVERGE**',1)
    target='OPEN-S03-FINAL-COMPLETE' if number=='19' else personalCheck if number=='15' else f'OPEN-S03-C{int(number)+1:02}'
    menu(3,number,before,chain(turns(after,3,'AFTER-'+number),3,'AFTER-'+number,target))
opening3=chain(turns(s3.split('## OPENING',1)[1].split('### CHOICE OPEN-S03-C01',1)[0],3,'OPENING'),3,'OPENING','OPEN-S03-C01')

# No silent dangling branch or imported author directive is allowed into the executable graph.
for node in nodes.values():
    for target in [node.get('next'),node.get('otherwise'),node.get('skip')]+[c['next'] for c in node.get('choices',[])]:
        assert target is None or target in nodes,(node['id'],target)
    assert 'text' not in node or not node['text'].startswith('*['),node
assert len(metadata)==46
output='// Generated by scripts/import-act-i-final.py from pinned owner manuscripts.\nimport type { Scene01Node } from \'./scene01\'\n'
output+='export const actIFinalNodes: Record<string, Scene01Node> = '+json.dumps(nodes,ensure_ascii=False,indent=2)+'\n'
output+='export const actIFinalEntrances = '+json.dumps({'scene01':opening1,'scene02':opening2,'scene03':opening3,'deferred':deferredStart},ensure_ascii=False,indent=2)+' as const\n'
output+='export const actIFinalManifest = '+json.dumps(sorted(metadata,key=lambda x:x['id']),indent=2)+' as const\n'
warning=re.search(r'\*\*NOTIFICATION · UNKNOWN NUMBER:\*\* (.*)',s2)[1]
output+='export const actIFinalSenderRequest = '+json.dumps({'id':'CH1-SENDER-FIRST','text':warning},ensure_ascii=False)+' as const\n'
if __name__ == '__main__': Path('src/content/actIFinal.ts').write_text(output,encoding='utf-8')
print(f'Compiled {len(nodes)} nodes / 46 main menus / '+str(sum(m['branches'] for m in metadata))+' branches.')
for scene in [1,2,3]:
    subset=[m for m in metadata if m['id'].startswith(f'OPEN-S{scene:02}')]
    print(f'Scene {scene}: {len(subset)} choices, {sum(m["premium"] for m in subset)} premium branches')
