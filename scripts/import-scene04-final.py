"""Compile full Scene 04 with explicit Browser/Archive gates; never load manuscript prose at runtime."""
import importlib.util
import json
import re
from pathlib import Path
spec=importlib.util.spec_from_file_location('act_import',Path(__file__).with_name('import-act-i-final.py'))
compiler=importlib.util.module_from_spec(spec);spec.loader.exec_module(compiler)
compiler.nodes.clear();compiler.metadata.clear()
add=compiler.add
source=Path('docs/sources/scene04-final/FULL_SCRIPT.md').read_text(encoding='utf-8-sig')
story=source.split('# 1 — EVENT ENTRY',1)[1].split('# 9 — SCENE END CARD',1)[0]

def sequence(text,prefix,target,group=False):
    # Archive feedback is a local UI result, never a character message or an outgoing player line.
    transformed=re.sub(r'^\s*-?\s*\*\*ARCHIVE SYSTEM:\*\* (.*)$',lambda m:'**SOPHIE:** ARCHIVE_FEEDBACK:'+m[1],text,flags=re.M)
    transformed=transformed.replace('**SOPHIE:** About not treating guesses like answers.','**SOPHIE:** About how hard it is to know what to believe.')
    items=compiler.turns(transformed,4,prefix)
    result=compiler.chain(items,4,prefix,target)
    for node in compiler.nodes.values():
        if not node['id'].startswith('OPEN-S04-FINAL-'+prefix+'-'):continue
        if group and node.get('kind')=='npc':node['channel']='group'
        if node.get('kind')=='choice':node['channel']='group' if group else 'sophie'
        if node.get('kind')=='npc' and node.get('text','').startswith('ARCHIVE_FEEDBACK:'):
            text=node['text'].split(':',1)[1]
            for key in ['channel','sender','text','heardFacts']:node.pop(key,None)
            node.update(kind='event',event='s04-feedback',text=text)
    return result

headers=list(re.finditer(r'^### CHOICE `OPEN-S04-C(\d{2})`[^\n]*\n',story,re.M));assert len(headers)==16
regions={h[1]:story[h.end():headers[i+1].start() if i+1<len(headers) else len(story)] for i,h in enumerate(headers)}
add({'id':'OPEN-S04-COMPLETE','kind':'event','event':'s04-complete'})
add({'id':'OPEN-S04-ARTICLE-GATE','kind':'gate','action':'s04-article','next':'OPEN-S04-AFTER-ARTICLE'})
add({'id':'OPEN-S04-GROUP-OFFER','kind':'gate','action':'s04-group','next':'OPEN-S04-AFTER-GROUP'})
add({'id':'OPEN-S04-GROUP-END','kind':'gate','action':'s04-return-sophie','next':'OPEN-S04-AFTER-GROUP'})
add({'id':'OPEN-S04-ARCHIVE-GATE','kind':'gate','action':'s04-archive','next':'OPEN-S04-C10'})
add({'id':'OPEN-S04-INDEX-ACK','kind':'gate','action':'s04-index-ack','next':'OPEN-S04-C11'})
add({'id':'OPEN-S04-RETURN-DEVICE','kind':'gate','action':'s04-device','next':'OPEN-S04-FOLLOWUP'})
add({'id':'OPEN-S04-FOLLOWUP-WAIT','kind':'gate','action':'s04-followup','next':'OPEN-S04-FOLLOWUP'})
afterArticle=story.split('# 3 — SOPHIE:',1)[1].split('### CHOICE `OPEN-S04-C03`',1)[0]
add({'id':'OPEN-S04-AFTER-ARTICLE','kind':'event','event':'route','next':sequence(afterArticle,'ARTICLE-RETURN','OPEN-S04-C03')})
groupOpening=story.split('**IF PLAYER OPENS FIND DANIEL:**',1)[1].split('### CHOICE `OPEN-S04-C07`',1)[0]
# Notification and first group bubble are the same persisted event.
groupOpening=groupOpening.replace('**MAYA:** Can we please stop sharing the article in other chats for a while?','',1)
groupStart=sequence(groupOpening,'GROUP-OPENING','OPEN-S04-C07',True)
groupReturn=story.split('# 5 — BACK TO SOPHIE:',1)[1].split('### CHOICE `OPEN-S04-C08`',1)[0]
conditional=re.findall(r'\*\*SOPHIE \(if player (?:opened group|did not open group)\):\*\* (.*)',groupReturn)
assert len(conditional)==2
common=re.sub(r'^\*\*SOPHIE \(if player .*?\):\*\*.*$','',groupReturn,flags=re.M)
commonStart=sequence(common,'GROUP-RETURN','OPEN-S04-C08')
opened=sequence('**SOPHIE:** '+conditional[0],'GROUP-READ',commonStart)
skipped=sequence('**SOPHIE:** '+conditional[1],'GROUP-SKIPPED',commonStart)
add({'id':'OPEN-S04-AFTER-GROUP','kind':'condition','test':'s04-group-opened','next':opened,'otherwise':skipped})
followup=story.split('# 8 — HUMAN FOLLOW-UP:',1)[1].split('### CHOICE `OPEN-S04-C12`',1)[0]
add({'id':'OPEN-S04-FOLLOWUP','kind':'event','event':'route','next':sequence(followup,'FOLLOWUP','OPEN-S04-C12')})

for number,region in reversed(list(regions.items())):
    marker='**GROUP CONVERGE**' if number=='07' else '**CONVERGE**'
    before,after=region.split(marker,1)
    target=f'OPEN-S04-C{int(number)+1:02}' if number!='16' else 'OPEN-S04-COMPLETE'
    if number=='02':
        after=after.split('**ATTACHMENT CARD',1)[0];target='OPEN-S04-ARTICLE-GATE'
    elif number=='06':
        after=after.split('# 4 — GROUP INTERRUPT',1)[0]
        target=add({'id':'OPEN-S04-GROUP-NOTICE','kind':'event','event':'s04-group-notice','next':'OPEN-S04-GROUP-OFFER'})
    elif number=='07':
        after=after.split('**IF PLAYER READS GROUP LATER:**',1)[0];target='OPEN-S04-GROUP-END'
    elif number=='09':
        after=after.split('# 6 — OPTIONAL',1)[0]
        target=add({'id':'OPEN-S04-INDEX-AVAILABLE','kind':'event','event':'s04-index-available','next':'OPEN-S04-ARCHIVE-GATE'})
    elif number=='10':
        after='';target='OPEN-S04-INDEX-ACK'
    elif number=='11':
        after='';target='OPEN-S04-RETURN-DEVICE'
    tail=sequence(after,'AFTER-'+number,target,number=='07')
    matches=list(re.finditer(r'^\*\*([A-E])(?: (★))? — (PLAYER|SELECT):\*\* (.*)$',before,re.M))
    assert len(matches) in [4,5],(number,len(matches))
    options=[]
    for i,m in enumerate(matches):
        ident,premium,kind,text=m.groups();ident=ident.lower()
        branch=before[m.end():matches[i+1].start() if i+1<len(matches) else len(before)]
        # Some effect notes also carry state directions; preserve only authored numeric effects.
        branch=re.sub(r'^\s*-?\s*\*\[(?:Effect once:|Set .*?Effect )(.*?)\]\*',lambda m:'*[Effect: '+m[1]+']*',branch,flags=re.M)
        next=sequence(branch,'C'+number+'-'+ident,tail,number=='07')
        if number=='13' and ident in ['a','b','e']:
            # Knowledge receipt is committed by sendScene01Choice at the actual line, not this menu.
            pass
        option={'id':ident,'text':text,'next':next}
        if premium:option['premiumChoice']=True
        options.append(option)
    node={'id':'OPEN-S04-C'+number,'kind':'choice','number':'A'+number,'choices':options,'channel':'archive' if number in ['10','11'] else 'group' if number=='07' else 'sophie'}
    if number in ['10','11']:node['uiChoice']=True
    add(node)
    compiler.metadata.append({'id':node['id'],'branches':len(options),'premium':sum(bool(o.get('premiumChoice')) for o in options)})
opening=sequence(story.split('### CHOICE `OPEN-S04-C01`',1)[0],'OPENING','OPEN-S04-C01')
paragraphs=re.findall(r'> \*\*PARA P0\d\*\*\s*\n> (.*)',source)
assert len(paragraphs)==6
article={'id':'GB-ARTICLE-001','title':'Questions Remain After Greyhaven Data Specialist Stops Responding','subtitle':'Concern grows among those close to Daniel Mercer as basic details remain unclear.','byline':'Nora Vance','publisher':'Greyhaven Bulletin','published':'7 October 2026','updated':'Yesterday','route':'browser://greyhaven-bulletin/article/gb-daniel-mercer-001','paragraphs':paragraphs}
for n in compiler.nodes.values():
    for target in [n.get('next'),n.get('otherwise')]+[o['next'] for o in n.get('choices',[])]:assert target is None or target in compiler.nodes,(n['id'],target)
output="// Generated from the owner's complete Scene 04; never parse Markdown during play.\nimport type { Scene01Node } from './scene01'\n"
output+='export const scene04Nodes: Record<string, Scene01Node> = '+json.dumps(compiler.nodes,ensure_ascii=False,indent=2)+'\n'
output+='export const scene04Entrances = '+json.dumps({'opening':opening,'group':groupStart},indent=2)+' as const\n'
output+='export const scene04Article = '+json.dumps(article,ensure_ascii=False,indent=2)+' as const\n'
output+='export const scene04Manifest = '+json.dumps(sorted(compiler.metadata,key=lambda m:m['id']),indent=2)+' as const\n'
notices={
 'group':{'id':'scene04_group_article_boundary','text':re.search(r'\*\*NOTIFICATION — FIND DANIEL · MAYA:\*\* (.*)',source)[1]},
 'sender':{'id':'scene04_sender_version_hint','text':re.search(r'\*\*NOTIFICATION — UNKNOWN NUMBER:\*\* (.*)',source)[1]},
 'archive':{'id':'scene04_archive_index_available','text':re.search(r'\*\*DEVICE NOTIFICATION — THE ARCHIVE:\*\* (.*)',source)[1]},
 'lead':{'actor':'sophie','text':re.search(r'\*\*NOTIFICATION — SOPHIE:\*\* (.*)',source)[1]},
 'followup':{'actor':'sophie','text':re.findall(r'\*\*NOTIFICATION — SOPHIE:\*\* (.*)',source)[1]},
}
output+='export const scene04Notices = '+json.dumps(notices,ensure_ascii=False,indent=2)+' as const\n'
index={'id':'ARC-IDX-GB-041','fields':[['TYPE','SNAPSHOT INDEX'],['SOURCE','UNKNOWN'],['CAPTURE TIME','NOT ESTABLISHED'],['AUTHOR','NOT ESTABLISHED'],['VERIFIED ORIGINAL','NO'],['CONTENT PREVIEW','UNAVAILABLE IN THIS INDEX VIEW']],'limitations':'A saved reference may point to an earlier or different version. This record alone cannot establish sequence, authenticity, or who created it.'}
output+='export const scene04Index = '+json.dumps(index,ensure_ascii=False,indent=2)+' as const\n'
Path('src/content/scene04Final.ts').write_text(output,encoding='utf-8')
print(f'Scene 04: {len(compiler.nodes)} nodes, 16 menus, {sum(m["branches"] for m in compiler.metadata)} branches, {sum(m["premium"] for m in compiler.metadata)} premium options, six article paragraphs.')
