"""Import the owner-authored life fragments; October dates align to the fixed 8 Oct canon."""
import json
import re
import sys
from pathlib import Path

s = Path(sys.argv[1]).read_text(encoding='utf-8-sig')
records = []
def part(start, end): return s.split(start,1)[1].split(end,1)[0]
def add(id, app, title, date='', body='', **extra):
    records.append(dict(id=id, app=app, title=title, date=date, body=body, **extra))
def date(day):
    from datetime import date, timedelta
    return str(date(2026,10,day)-timedelta(days=14))

labels = ['Maya ❤️','Lucas','Soph','Eli','Nora Vance','Unknown Contact']
days = [15,14,13,12,12,15]
for i in range(1,7):
    b = part(f'THREAD M{i} /', f'THREAD M{i+1} /' if i<6 else '5. NOTES')
    chat = [dict(sender={'maya':'maya','lucas':'lucas','soph':'sophie','eli':'eli','nora':'nora','daniel':'daniel'}[actor.lower()], text=text) for actor,text in re.findall(r'^(Maya|Lucas|Soph|Eli|Nora|Daniel): (.+)$',b,re.M)]
    add(f'LIFE-M{i}', 'Messages', labels[i-1], date(days[i-1]), '' if i<6 else 'This item is not present in the mirrored snapshot.', chat=chat, stamp=['18:17','21:09','12:48','10:06','16:28','22:14'][i-1], unavailable=i==6)

for i in range(1,8):
    b = part(f'N{i} / ', f'N{i+1} /' if i<7 else '6. CALENDAR')
    title = re.match(r"'(.+?)'",b)[1]
    if i==7:
        body = part('UNLOCKED NOTE BODY:\n', '\nThis is a meaningful').strip().strip("'")
    else:
        body = b.split('\n',1)[1].split('\n\n',1)[0]
        body = re.split(r'\n(?:This is suspicion|No references)',body)[0]
    add(f'LIFE-N{i}', 'Notes', title, '2026-09-16' if i==6 else date({1:15,2:11,3:10,4:9,5:14,7:15}[i]), body, locked=i==7, **({'observation':'OBS_DANIEL_PRIVATE_NOTE_UNLOCKED'} if i==7 else {}))

for i in range(1,9):
    b = part(f'CAL{i} / ', f'CAL{i+1} /' if i<8 else '7. VOICE')
    title = re.search(r" / '(.+)'",b.split('\n')[0])[1]
    desc = re.search(r'^Description: (.+)$',b,re.M)[1]
    tail = b.split('\n')[0].split("' / ")
    place = tail[1] if len(tail)>1 else ''
    add(f'LIFE-CAL{i}','Calendar',title,'2026-09-18' if i==1 else date({2:10,3:11,4:13,5:14,6:15,7:16,8:20}[i]),desc, stamp=['All day','18:30','13:00','17:30','20:00','19:30','16:00','12:30'][i-1], place=place, **({'observation': 'OBS_MAYA_BIRTHDAY_READ'} if i==1 else {'observation':'OBS_NORA_APPOINTMENT_READ'} if i==7 else {}))

for i in range(1,6):
    b=part(f'V{i} / ', f'V{i+1} /' if i<5 else 'Avoid exaggerated')
    title=re.match(r"'(.+?)'",b)[1]
    transcript=re.search(r"^Daniel[^:]*: '(.+)'",b,re.M)[1]
    if i==3: transcript+=' [small laugh]'
    add(f'LIFE-V{i}','Voice',title,date({1:10,2:9,3:11,4:14,5:15}[i]),transcript, duration=[13,19,12,17,20][i-1], **({'observation':'OBS_VOICE_UNSENT_READ'} if i==5 else {}))

for i,day,title in re.findall(r"^B([1-7]) / (\d+) Oct, [\d:]+ / '(.+)'",s,re.M):
    add('LIFE-B'+i,'Browser',title,date(int(day)),'No page cached for this search.', **({'related':'LIFE-ARTICLE'} if i in ['4','5'] else {}))
article=part('Article body:\n','\nFooter:').strip().strip("'")
add('LIFE-ARTICLE','Browser',"When Public Records Get Updated, What's Left Behind?",date(10),article, byline='Nora Vance · The City Ledger · Local Affairs', deck='A routine local filing dispute has revived a simple question: how can readers tell which version they are looking at?', observation='OBS_NORA_ARTICLE_READ')

for i in range(1,7):
    b=part(f'P{i} / ',f'P{i+1} /' if i<6 else 'All locations are')
    title=re.match(r"'(.+?)'",b)[1]
    note=re.search(r'Note: (.+?)(?: /|\n)',b)[1]
    add(f'LIFE-P{i}','Maps',title,body=note, category='Search history' if i>4 else 'Saved' if i in [1,4] else 'Recent', **({'observation':'OBS_RIDGEWAY_SEARCH_VIEWED'} if i==5 else {}))

for i in range(1,7):
    b=part(f'PH{i} / ',f'PH{i+1} /' if i<6 else 'A separate')
    title=re.match(r"'(.+?)'",b)[1]
    descriptions=['A couple at a restaurant.','Mug, notebook and pastries.','A table prepared for lunch.','Wet pavement and streetlights.','Preview unavailable.','Ordinary desk clutter.']
    add(f'LIFE-PH{i}','Photos',title,'' if i==5 else date({1:10,2:13,3:11,4:8,6:14}[i]),descriptions[i-1], unavailable=i==5)

for i in range(1,5):
    b=part(f'E{i} / ',f'E{i+1} /' if i<4 else '12. CALLS')
    title=re.match(r"'(.+?)'",b)[1]
    if i==4:
        body=part('Body (use exact gameplay-critical lines):\n','\nOn fully opening').strip().strip("'")
    else:
        body=re.search(r"^Body: '(.+)'",b,re.M)[1]
    if i==2: body='Reservation for two. Thursday, 1 October, 7:30 PM. The Corner Table.'
    if i==3: body+='\n\nAttachment: Unavailable in mirrored snapshot.'
    add(f'LIFE-E{i}','Mail',title,date({1:10,2:15,3:14,4:16}[i]),body, byline=['orders@fictional-shop.invalid','bookings@corner-table.invalid','internal@offline.invalid','System'][i-1], subject=['Order confirmation','Your table is reserved','Document review','Storage synchronization incomplete'][i-1], **({'observation':'OBS_STORAGE_NOTICE_READ'} if i==4 else {}))

for i,(day,title,stamp,body) in enumerate([(14,'Lucas','18:23','Outgoing · 01:24'),(13,'Soph','13:10','Missed incoming'),(12,'Nora Vance','16:19','Outgoing · 00:48'),(11,'Mum','10:02','Incoming · 02:11'),(10,'Maya ❤️','19:01','Outgoing · 00:29')],1):
    add(f'LIFE-CALL{i}','Calls',title,date(day),body,stamp=stamp)
for i,(title,body) in enumerate([('Daniel Mercer','Device owner'),('Maya ❤️','Maya Chen\nFiancée\nBirthday: 18 September\nFavourite'),('Lucas Grey','Friend'),('Soph','Sophie Mercer\nSister'),('Eli Ward','Axiom Recovery · Colleague'),('Nora Vance','The City Ledger · Reporter'),('Mum','Family'),('Unknown Contact','Missing data')],1):
    add(f'LIFE-CONTACT{i}','Contacts',title,body=body, **({'observation':'OBS_MAYA_BIRTHDAY_READ'} if i==2 else {}))
for i,(title,body) in enumerate([('Dinner_Reservation.pdf','Reservation for two · Thursday, 1 October · 19:30\nThe Corner Table.\nCached summary only.'),('Shopping_List.txt','Eggs\nCoffee\nPasta\nDish soap\nSomething sweet for Maya'),('Meeting_Notes.txt',"Need to review the older material later. Don't rely on memory alone."),('Unresolved Attachment','Unavailable in mirrored snapshot.')],1):
    add(f'LIFE-F{i}','Files',title,body=body)

out='''// Owner-authored Life in Fragments v1.0. October entries shifted back 14 days.
export const mirrorStoryPresent = '2026-10-08'
export const mayaBirthday = { day: 18, month: 9 } as const
export const mirrorApps = ['Messages','Mail','Photos','Notes','Maps','Browser','Calls','Contacts','Files','Calendar','Voice','Deleted'] as const
export type LifeApp = typeof mirrorApps[number]
export type LifeRecord = { id: string; app: LifeApp; title: string; date: string; body: string; chat?: { sender: string; text: string }[]; stamp?: string; unavailable?: boolean; locked?: boolean; observation?: string; place?: string; category?: string; duration?: number; related?: string; byline?: string; deck?: string; subject?: string }
const authoredLifeRecords: LifeRecord[] = '''+json.dumps(records,ensure_ascii=False,indent=2)+'''
const birthdayISO = `2026-${String(mayaBirthday.month).padStart(2,'0')}-${String(mayaBirthday.day).padStart(2,'0')}`
const birthdayLabel = new Date(birthdayISO+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',timeZone:'UTC'})
export const lifeRecords: LifeRecord[] = authoredLifeRecords.map(record => record.id === 'LIFE-CAL1' ? {...record,date:birthdayISO} : record.id === 'LIFE-CONTACT2' ? {...record,body:record.body.replace(/Birthday: [^\\n]+/,`Birthday: ${birthdayLabel}`)} : record)
'''
Path('src/content/danielLife.ts').write_text(out,encoding='utf-8')
print(json.dumps({app:len([r for r in records if r['app']==app]) for app in sorted(set(r['app'] for r in records))}))
