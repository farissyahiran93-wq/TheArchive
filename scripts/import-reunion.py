"""Extract supplied reunion dialogue and canonical Eli/Lucas interception.
Director-authored completions and source guards live separately in chapter2Reunion.ts.
"""
import json,re,sys
from pathlib import Path
group=Path(sys.argv[1]).read_text(encoding='utf-8-sig')
spy=Path(sys.argv[2]).read_text(encoding='utf-8-sig')
def between(start,end):return group.split(start,1)[1].split(end,1)[0]
def lines(block):
    out=[]
    for actor,text in re.findall(r'^(Maya|Eli|Lucas|Sophie|Player): (.+)$',block,re.M):
        text=text.replace('Daniel contacted [PLAYER_NAME].','Daniel had your number.').replace('Daniel has been missing for three days.',"Daniel's been out of touch for about three days.")
        text=text.replace('What about the note Daniel left?',"What about Daniel wanting an earlier version?").replace('The one about not trusting the newest copy?',"He said he didn't want to rely on the newest copy.")
        out.append(dict(actor=actor.lower(),text=text))
    return out
blocks={
 'opening':lines(between('SCENE 08A — THE GROUP IS NOT WHOLE','Player Choice G01')),
 'afterG01':lines(between('Maya: All right.','Player Choice G02')),
 'afterG02':lines(between("Lucas's account",'Player Choice G03')),
 'afterG03':lines(between("Eli's account",'Player Choice G04')),
 'afterG04':lines(between('SCENE 08E — THE INDEX PROBLEM','Player Choice G05')),
 'afterG05':lines(between('Maya remembers something','Player Choice G06')),
 'afterG06':lines(between('A name without an answer','Pada masa ini, recovery')),
 'beforeG07':lines(between('SCENE 08G — THE FIRST REAL PLAN','Player Choice G07')),
 'afterG07':lines(between('The group makes a commitment','Player Choice G08')),
 'closing':lines(between('Group closing — natural, not dramatic','END OF GROUP DISCUSSION.')),
}
# Reinsert the dropped prefix from the explicit boundary.
blocks['afterG01'].insert(0,dict(actor='maya',text='All right.'))
# Membership events are explicit nodes, not made-up private invitation transcripts.
opening=blocks['opening'];cut=next(i for i,line in enumerate(opening) if line['actor']=='lucas')
blocks['opening']=opening[:cut]+[dict(actor='system',text='MEMBERS_RETURN')]+opening[cut:]
choices={}
for n in ['01','02','03','05','06','07','08']:
    b=group.split('Player Choice G'+n,1)[1].split('Player:',1)[0]
    choices['G'+n]=[line.strip() for line in b.splitlines()[1:] if line.strip()][:3]
entries=[]
b=spy.split('PART B —',1)[1].split('PART C —',1)[0]
matches=list(re.finditer(r'^(LUCAS|ELI): "(.+)"',b,re.M))
for i,m in enumerate(matches):
    gap,typing,cancel=2000,0,0
    if i:
        pacing=b[matches[i-1].end():m.start()]
        p=re.search(r'pause ([\d.]+)s',pacing);t=re.search(r'typing (?:appears )?([\d.]+)s',pacing)
        gap=int(float(p[1])*1000) if p else 1500
        typing=int(float(t[1])*1000) if t else 0
        if 'disappears' in pacing:cancel=2000
    entries.append(dict(actor=m[1].lower(),text=m[2],gap=gap,typing=typing,cancel=cancel))
Path('src/content/reunionSource.ts').write_text('// Imported owner screenplay; authored source claims remain unverified.\nexport const reunionSource = '+json.dumps(blocks,ensure_ascii=False,indent=2)+' as const\nexport const reunionChoiceText = '+json.dumps(choices,ensure_ascii=False,indent=2)+' as const\nexport const eliLucasInterception = '+json.dumps(entries,ensure_ascii=False,indent=2)+' as const\n',encoding='utf-8')
print(f'{sum(map(len,blocks.values()))} group lines, {len(entries)} intercepted lines')
