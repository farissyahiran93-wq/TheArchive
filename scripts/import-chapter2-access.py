"""Import the owner-supplied access arc without rewriting its dialogue."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text(encoding='utf-8-sig')
nodes = {}

def between(start, end):
    return source.split(start, 1)[1].split(end, 1)[0]

def lines(block):
    return re.findall(r'^\s*UNKNOWN: (.+)$', block, re.M)

def chain(key, texts, next_id):
    if not texts:
        return next_id
    for i, text in enumerate(texts):
        nodes[f'{key}-{i}'] = dict(kind='npc', text=text, next=f'{key}-{i+1}' if i+1 < len(texts) else next_id)
    return f'{key}-0'

def options(key):
    return [(m[0], m[1]) for m in re.findall(r'^  ('+key+r'_[ABC]): (.+)$', source, re.M)]

def choice(key, opts):
    nodes[key] = dict(kind='choice', options=opts)

def follow(key, block, next_id):
    header, rest = block.split('PLAYER CHOICE ', 1)
    question = rest.split('\n', 1)[0].strip()
    opts = re.findall(r'^  ([ABC]): (.+)$', rest, re.M)
    branches = re.split(r'^  \(([ABC])\) PLAYER: .+$', rest, flags=re.M)
    out = []
    for i in range(1, len(branches), 2):
        letter, body = branches[i:i+2]
        text = dict(opts)[letter]
        out.append(dict(id=question+'_'+letter, text=text, next=chain(question+'_'+letter, lines(body), next_id)))
    choice(question, out)
    return chain(key, lines(header), question)

order = ['U01','U02','U03','U04','U05','U06','U06B']
for index, key in enumerate(order):
    next_id = order[index+1] if index+1 < len(order) else 'PACKAGE'
    marker = f'[REJOIN {key} — common]'
    if key == 'U06':
        common = between('[REJOIN U06]\n\nUNKNOWN: There\'s', 'PLAYER CHOICE U06B')
        common = "UNKNOWN: There's" + common
    else:
        end = 'PLAYER CHOICE '+next_id if next_id != 'PACKAGE' else '[SCENE TRANSITION]'
        common = between(marker, end)
    common_id = chain(key+'-COMMON', lines(common), next_id)
    opts = []
    for option_id, text in options(key):
        match = re.search(r'^\[BRANCH '+option_id+r'(?:[^\]]*)\]\n(.*?)^\[REJOIN '+key+r'\]', source, re.M | re.S)
        block = match[1]
        if option_id == 'U04_C':
            prefix = lines(block.split('[IF player')[0])
            yes = lines(between('[IF player has discovered Shared Reference 7-14 in Chapter 1]', '[ELSE:'))
            no = lines(block.split('[ELSE: player did not acquire that reference]')[1])
            # The final line belongs to both routes, not just ELSE.
            nodes['U04-REFERENCE'] = dict(kind='reference', yes=chain('U04-YES', yes+[no[-1]], common_id), no=chain('U04-NO', no, common_id))
            target = chain(option_id, prefix, 'U04-REFERENCE')
        elif 'PLAYER CHOICE ' in block:
            target = follow(option_id, block, common_id)
        else:
            target = chain(option_id, lines(block), common_id)
        opts.append(dict(id=option_id, text=text, next=target))
    choice(key, opts)

# The package is an interface decision. It never implicitly installs or sends.
nodes['PACKAGE'] = dict(kind='package')
for option_id, text in options('U07Q'):
    block = between('['+option_id+']', '\n\n')
    chain(option_id, lines(block), 'PACKAGE')
chain('DECLINE', lines(between('[BRANCH U07_B — REJECT]', '[UI] Status:')), 'DECLINED')
nodes['DECLINED'] = dict(kind='declined')
chain('ACCEPT', ['You don\'t sound convinced.'], 'U07_ACK')
ackblock = between('PLAYER CHOICE U07_ACK', '[UI] ACCESS PACKAGE RECEIVED')
opts = []
for letter, text in re.findall(r'^  ([ABC]): (.+)$', ackblock, re.M):
    body = ackblock.split('('+letter+') PLAYER:', 1)[1].split('\n  (', 1)[0]
    opts.append(dict(id='U07_ACK_'+letter, text=text, next=chain('U07_ACK_'+letter, lines(body), 'U08-INTRO-0')))
choice('U07_ACK', opts)
chain('U08-INTRO', lines(between('[UI] Package shows', 'PLAYER CHOICE U08 —')), 'U08')
common = chain('U08-COMMON', lines(between('[REJOIN U08 — common]', '[UI] UNKNOWN — offline.')), 'OFFLINE')
opts = []
for option_id, text in options('U08'):
    block = re.search(r'^\[BRANCH '+option_id+r'\]\n(.*?)^\[REJOIN U08\]', source, re.M | re.S)[1]
    target = follow(option_id, block, common) if 'PLAYER CHOICE ' in block else chain(option_id, lines(block), common)
    opts.append(dict(id=option_id, text=text, next=target))
choice('U08', opts)
nodes['OFFLINE'] = dict(kind='offline')

group = between('[UI] Same existing group thread (do not create duplicate). History preserved.', '[SCENE END — HOLD]')
ready = [dict(sender=m[0].lower(), text=m[1]) for m in re.findall(r'^(MAYA|LUCAS|ELI|SOPHIE|NORA): (.+)$', group, re.M)]
package_questions = dict(options('U07Q'))
player_lines = dict(
    reject=re.search(r'^PLAYER: (No\. I.m not opening an unverified package\.)$', source, re.M)[1],
    accept=re.search(r'^PLAYER: (Fine\. I.ll open it\.)$', source, re.M)[1],
    R_A=re.search(r'^  R_A: (.+)$', source, re.M)[1],
    R_B=re.search(r'^  R_B: (.+)$', source, re.M)[1],
)
target = Path('src/content/chapter2Access.ts')
target.write_text('''// Imported from the owner\'s Access Arc v1.0. Claims remain unverified.
export type AccessOption = { id: string; text: string; next: string }
export type AccessNode = { kind: 'npc'; text: string; next: string } | { kind: 'choice'; options: AccessOption[] } | { kind: 'reference'; yes: string; no: string } | { kind: 'package' | 'declined' | 'offline' }
export const accessNodes: Record<string, AccessNode> = '''+json.dumps(nodes, ensure_ascii=False, indent=2)+'''
export const accessGroupLines = '''+json.dumps(ready, ensure_ascii=False, indent=2)+''' as const
'''+ '\nexport const accessPackageQuestions: Record<string, string> = '+json.dumps(package_questions, ensure_ascii=False, indent=2)+'\nexport const accessPlayerLines = '+json.dumps(player_lines, ensure_ascii=False, indent=2)+' as const\n', encoding='utf-8')
print(f'Imported {len(nodes)} nodes and {len(ready)} group lines')
