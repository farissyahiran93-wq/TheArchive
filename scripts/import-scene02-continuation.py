"""Import the owner's exact continuation; no authored dialogue is generated."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text(encoding='utf-8')

def turns(text):
    result = []
    for line in text.splitlines():
        line = line.strip()
        match = re.fullmatch(r'\[(SOPHIE|MAYA|LUCAS|PLAYER)\] (.*)', line)
        if match:
            result.append(match[1][0] + ' ' + match[2])
            continue
        pause = re.fullmatch(r'\[PAUSE: ([\d.]+)s\]', line)
        if pause:
            result.append('W ' + pause[1])
            continue
        system = re.fullmatch(r'\[SYSTEM\] (.*)', line)
        if system:
            text = system[1]
            if 'deleted a message' in text:
                result.append('D maya')
            elif 'left the group' in text:
                result.append('X lucas')
            elif ' is offline' in text:
                result.append('O ' + text.split()[0].lower())
            elif ' is typing' in text:
                result.append('T ' + text.split()[0].lower())
    return '\n'.join(result)

def effects(text):
    match = re.search(r'\[EFFECT: (.*?)\]', text)
    if not match:
        return None
    result = {}
    actor = None
    for entry in match[1].split(', '):
        value = re.fullmatch(r'(?:(Sophie|Maya|Lucas) )?(Trust|Affinity|Suspicion) ([+-]\d+)', entry)
        if not value:
            raise ValueError(entry)
        actor = value[1].lower() if value[1] else actor
        result.setdefault(actor, {})[value[2].lower()] = int(value[3])
    return result

intro = source.split('### CHOICE 08 — BRANCH D (MISSING)', 1)[1]
missing08, intro = intro.split('### CHOICE 08 — CONVERGENCE', 1)
intro = intro.split('### PLAYER CHOICE 09', 1)[0]
choices = []
for number in range(9, 14):
    label = f'{number:02}'
    section = source.split(f'### PLAYER CHOICE {label}', 1)[1]
    section = section.split(f'### PLAYER CHOICE {number+1:02}', 1)[0] if number < 13 else section.split('# IMPLEMENT THE TRANSITION', 1)[0]
    body, after = section.split(f'### CHOICE {label} — CONVERGENCE', 1)
    options = re.findall(r'\*\*(★ )?([A-E])\.\*\* "(.*?)"', body)
    branches = []
    for premium, option, text in options:
        reaction = re.split(rf'^### RESPONSE {option}(?:[^\n]*)\n', body, flags=re.M)[1]
        reaction = re.split(r'^### RESPONSE ', reaction, maxsplit=1, flags=re.M)[0]
        script = turns(reaction).split('\n')
        if not script or script[0] != 'P ' + text:
            raise ValueError(f'Player response differs for {label}{option}')
        branch = {'text': text, 'script': '\n'.join(script[1:])}
        if premium:
            branch['premium'] = True
        delta = effects(reaction)
        if delta:
            branch['effects'] = delta
        branches.append(branch)
    script = turns(after)
    if number == 13:
        # The final authored two-second silence is included in the 5.5-second handoff.
        assert script.endswith('\nW 2')
        script = script[:-4]
    choices.append({'id': label, 'branches': branches, 'after': script})

result = {'missing08D': turns(missing08).removeprefix('P Maybe you should discuss this without me.\n'), 'before09': turns(intro), 'choices': choices}
assert [len(choice['branches']) for choice in choices] == [5, 4, 5, 5, 4]
target = Path('src/content/scene02ContinuationScript.ts')
target.write_text('// Exact owner-supplied continuation, imported by scripts/import-scene02-continuation.py.\nexport const scene02Continuation = ' + json.dumps(result, ensure_ascii=False, indent=2) + ' as const\n', encoding='utf-8')
print(f'Imported {len(choices)} choices / {sum(len(choice["branches"]) for choice in choices)} branches.')
