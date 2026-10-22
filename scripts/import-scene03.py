"""Import the supplied Scene 03 screenplay without adding or paraphrasing dialogue."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text(encoding='utf-8')
script = source.split('# 4. FULL CONVERSATION SCRIPT', 1)[1].split('# 5. SCENE COMPLETION STATE', 1)[0]

def turns(text):
    result = []
    for line in text.splitlines():
        line = line.strip()
        spoken = re.fullmatch(r'\[(SOPHIE|PLAYER)\] (.*)', line)
        if spoken:
            result.append({'speaker': spoken[1].lower(), 'text': spoken[2]})
            continue
        pause = re.fullmatch(r'\[(PAUSE|TYPING): ([\d.]+)s\]', line)
        if pause:
            result.append({'speaker': 'wait', 'duration': round(float(pause[2]) * 1000), 'typing': pause[1] == 'TYPING'})
        elif line == '[SYSTEM] Sophie is typing...':
            result.append({'speaker': 'wait', 'duration': 1500, 'typing': True})
        elif line == '[SYSTEM] Sophie stopped typing.':
            result.append({'speaker': 'wait', 'duration': 0, 'typing': False})
    return result

opening = turns(script.split('### CHOICE 01', 1)[0])
# Scene 02 already owns the 5.5-second notification and persisted "Hey." event.
first = next(i for i, turn in enumerate(opening) if turn.get('text') == 'Hey.')
opening = opening[first + 1:]
choices = []
for number in range(1, 20):
    label = f'{number:02}'
    section = script.split(f'### CHOICE {label}', 1)[1]
    if number < 19:
        section = section.split(f'### CHOICE {number+1:02}', 1)[0]
    body, after = section.split('[CONVERGE]', 1)
    options_text = body.split('#### RESPONSE', 1)[0]
    options = re.findall(r'^(★ )?([A-E])\. "(.*)"$', options_text, flags=re.M)
    assert len(options) in (4, 5), label
    branches = []
    for premium, option, text in options:
        reaction = re.split(rf'^#### RESPONSE {option}[^\n]*\n', body, flags=re.M)[1]
        reaction = re.split(r'^#### RESPONSE ', reaction, maxsplit=1, flags=re.M)[0]
        lines = turns(reaction)
        assert lines[0] == {'speaker': 'player', 'text': text}, f'{label}{option}'
        branch = {'id': option.lower(), 'text': text, 'turns': lines[1:]}
        if premium:
            branch['premiumChoice'] = True
        effect = re.search(r'\[EFFECT: Sophie (.*?)\]', reaction)
        if effect:
            branch['effects'] = {key.lower(): int(value) for key, value in re.findall(r'(Trust|Affinity|Suspicion|Romance) ([+-]\d+)', effect[1])}
            assert 'romance' not in branch['effects']
        branches.append(branch)
    choices.append({'id': label, 'choices': branches, 'after': turns(after)})

result = {'opening': opening, 'choices': choices}
Path('src/content/scene03Script.ts').write_text('// Exact owner screenplay imported by scripts/import-scene03.py.\nexport const scene03Script = ' + json.dumps(result, ensure_ascii=False, indent=2) + ' as const\n', encoding='utf-8')
print(f'Imported 19 choices / {sum(len(beat["choices"]) for beat in choices)} branches.')
print('Premium points:', ', '.join(beat['id'] for beat in choices if any(choice.get('premiumChoice') for choice in beat['choices'])))
