/** Ordinary NPC-shared snapshots; they are not recovered phone evidence. */
export const storyPhotos={
 sophieBiscuits:{id:'TA-S03-PHOTO-BISCUITS',src:'/media/chat/sophie-biscuits.png',alt:'Two packets of biscuits beside a mug in a kitchen',caption:'These are the biscuits I was talking about. He always bought the same ones.'},
 mayaMugs:{id:'TA-S08-PHOTO-MUGS',src:'/media/chat/maya-mugs.png',alt:'Two mugs on a table by a rainy window',caption:'I took this at home. I still catch myself making tea for two.'},
 sophieFamily:{id:'TA-S01-FAMILY-PHOTO',src:'/media/chat/sophie-birthday-owner.png',alt:'Birthday photograph with Sophie and her brother Daniel',caption:"This is a birthday photo with Daniel and me. Maybe seeing his face will jog your memory. It's okay if it doesn't."},
 lucasFriends:{id:'TA-S08-LUCAS-PHOTO',src:'/media/chat/lucas-cafe-owner.png',alt:'Lucas and Daniel together in a casual photograph',caption:"That's Daniel and me. It's an old photo; I can't place the exact date. Please keep it between us."},
} as const
export const familyPhotoReplies={
 choices:["I'm sorry, Sophie. I don't recognise him.","Is Daniel on the left? He doesn't look familiar to me.","I don't know him, but I can see this photo means a lot to you."],
 replies:["Thank you for checking. I didn't want you to feel pressured to remember.","Yes, that's Daniel. Thank you for looking, even if it doesn't help.","It does. He's my brother. I'm grateful you took a moment to look."]
} as const
