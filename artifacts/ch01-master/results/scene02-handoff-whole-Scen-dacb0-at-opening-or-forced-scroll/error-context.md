# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll
- Location: tests\e2e\scene02-handoff.spec.ts:33:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Local time 09:01 PM" [ref=e5]: 9:01 PM
  - region "FIND DANIEL group conversation" [ref=e22]:
    - generic [ref=e23]:
      - button "Back to inbox" [ref=e24] [cursor=pointer]
      - generic [ref=e27]: FD
      - generic [ref=e28]:
        - strong [ref=e29]: FIND DANIEL
        - generic "Group participants" [ref=e30]: 3 members · You, Sophie, Maya
      - button "View FIND DANIEL group info" [ref=e31] [cursor=pointer]
    - generic [ref=e32]:
      - generic [ref=e33]: Thursday, October 22 · 08:00 PM
      - generic [ref=e34]: You joined FIND DANIEL.
      - generic [ref=e36]:
        - strong [ref=e37]: Sophie
        - generic [ref=e38]: Hey, everyone.
      - generic [ref=e39]: Before anyone says anything...
      - generic [ref=e42]:
        - generic "Sophie online" [ref=e45]
        - generic [ref=e46]: I added someone.
      - generic [ref=e51]:
        - strong [ref=e52]: Maya
        - generic [ref=e53]: You added someone?
      - generic [ref=e54]:
        - generic "Sophie online" [ref=e57]
        - generic [ref=e58]:
          - strong [ref=e59]: Sophie
          - generic [ref=e60]: Yes.
      - generic [ref=e62]:
        - strong [ref=e63]: Maya
        - generic [ref=e64]: Sophie.
      - generic [ref=e65]: We literally talked about this.
      - generic [ref=e70]:
        - generic "Sophie online" [ref=e73]
        - generic [ref=e74]:
          - strong [ref=e75]: Sophie
          - generic [ref=e76]: I know.
      - generic [ref=e78]:
        - strong [ref=e79]: Lucas
        - generic [ref=e80]: Who?
      - generic [ref=e81]: Who did you add?
      - generic [ref=e86]:
        - generic "Sophie online" [ref=e89]
        - generic [ref=e90]:
          - strong [ref=e91]: Sophie
          - generic [ref=e92]: The number I told you about.
      - generic [ref=e94]:
        - strong [ref=e95]: Maya
        - generic [ref=e96]: Wait.
      - generic [ref=e97]: You actually contacted it?
      - generic [ref=e102]:
        - generic "Sophie online" [ref=e105]
        - generic [ref=e106]:
          - strong [ref=e107]: Sophie
          - generic [ref=e108]: Yeah.
      - generic [ref=e112]:
        - strong [ref=e113]: Lucas
        - generic [ref=e114]: You've got to be kidding me.
      - generic [ref=e115]:
        - generic "Sophie online" [ref=e118]
        - generic [ref=e119]:
          - strong [ref=e120]: Sophie
          - generic [ref=e121]: Lucas, please.
      - generic [ref=e123]:
        - strong [ref=e124]: Lucas
        - generic [ref=e125]: Please what?
      - generic [ref=e126]: We don't even know who this is.
      - generic [ref=e134]:
        - strong [ref=e135]: Maya
        - generic [ref=e136]: Can we just calm down for a second?
      - generic [ref=e140]:
        - strong [ref=e141]: Lucas
        - generic [ref=e142]: I'm calm.
      - generic [ref=e146]:
        - strong [ref=e147]: Maya
        - generic [ref=e148]: You're really not.
      - generic [ref=e150]:
        - strong [ref=e151]: Lucas
        - generic [ref=e152]: Fine.
      - generic [ref=e153]: Then maybe our new guest would like to explain why they're here.
      - generic [ref=e158]: Hi. I'm just as confused as you are.
      - generic [ref=e162]:
        - strong [ref=e163]: Lucas
        - generic [ref=e164]: Great.
      - generic [ref=e165]: That makes two of us.
      - generic [ref=e173]:
        - strong [ref=e174]: Maya
        - generic [ref=e175]: At least they're being honest.
      - generic [ref=e179]:
        - strong [ref=e180]: Lucas
        - generic [ref=e181]: Or they know how to sound honest.
      - generic [ref=e182]:
        - generic "Sophie online" [ref=e185]
        - generic [ref=e186]:
          - strong [ref=e187]: Sophie
          - generic [ref=e188]: Lucas.
      - generic [ref=e190]:
        - strong [ref=e191]: Lucas
        - generic [ref=e192]: What?
      - generic [ref=e193]: I'm allowed to have questions.
      - generic [ref=e196]: Alright.
      - generic [ref=e199]: Let's start with something simple.
      - generic [ref=e202]: Do you know Daniel?
      - generic [ref=e207]: No. I've never met him.
      - generic [ref=e213]:
        - strong [ref=e214]: Lucas
        - generic [ref=e215]: Then why was your number saved?
      - generic [ref=e216]: That's what I'd like to know.
      - generic [ref=e222]:
        - strong [ref=e223]: Maya
        - generic [ref=e224]: Fair enough.
      - generic [ref=e225]:
        - generic "Sophie online" [ref=e228]
        - generic [ref=e229]:
          - strong [ref=e230]: Sophie
          - generic [ref=e231]: See? That's why I added them.
      - generic [ref=e233]:
        - strong [ref=e234]: Lucas
        - generic [ref=e235]: That doesn't answer anything.
      - generic [ref=e236]: So let me get this straight.
      - generic [ref=e239]: Daniel had your number.
      - generic [ref=e242]: You don't know Daniel.
      - generic [ref=e245]: And you have absolutely no idea why he saved it.
      - generic [ref=e250]:
        - generic "Sophie online" [ref=e253]
        - generic [ref=e254]:
          - strong [ref=e255]: Sophie
          - generic [ref=e256]: That's what we're trying to figure out.
      - generic [ref=e260]:
        - strong [ref=e261]: Lucas
        - generic [ref=e262]: Doesn't that seem a little convenient to anyone else?
      - generic [ref=e266]:
        - strong [ref=e267]: Maya
        - generic [ref=e268]: Convenient for who?
      - generic [ref=e270]:
        - strong [ref=e271]: Lucas
        - generic [ref=e272]: I don't know, Maya.
      - generic [ref=e273]: That's the problem.
      - generic [ref=e278]:
        - generic "Sophie online" [ref=e281]
        - generic [ref=e282]:
          - strong [ref=e283]: Sophie
          - generic [ref=e284]: Maybe he saved the wrong number.
      - generic [ref=e288]:
        - strong [ref=e289]: Maya
        - generic [ref=e290]: Possible.
      - generic [ref=e292]:
        - strong [ref=e293]: Lucas
        - generic [ref=e294]: Sure.
      - generic [ref=e295]: And maybe this is all one big misunderstanding.
      - generic [ref=e303]:
        - strong [ref=e304]: Maya
        - generic [ref=e305]: It could be.
      - generic [ref=e309]:
        - strong [ref=e310]: Lucas
        - generic [ref=e311]: You don't actually believe that.
      - generic [ref=e315]:
        - strong [ref=e316]: Maya
        - generic [ref=e317]: I believe we don't have enough information.
      - generic [ref=e319]:
        - strong [ref=e320]: Lucas
        - generic [ref=e321]: Fine.
      - generic [ref=e322]: Let's ask something else.
      - generic [ref=e327]:
        - generic "Sophie online" [ref=e330]
        - generic [ref=e331]:
          - strong [ref=e332]: Sophie
          - generic [ref=e333]: Lucas, don't start.
      - generic [ref=e335]:
        - strong [ref=e336]: Lucas
        - generic [ref=e337]: It's a question, Sophie.
      - generic [ref=e338]: Where were you three nights ago?
      - generic [ref=e346]:
        - strong [ref=e347]: Maya
        - generic [ref=e348]: Oh, come on.
      - generic [ref=e349]:
        - generic "Sophie online" [ref=e352]
        - generic [ref=e353]:
          - strong [ref=e354]: Sophie
          - generic [ref=e355]: Lucas!
      - generic [ref=e357]:
        - strong [ref=e358]: Lucas
        - generic [ref=e359]: What?
      - generic [ref=e360]: We don't know anything about this person.
      - generic [ref=e368]:
        - strong [ref=e369]: Maya
        - generic [ref=e370]: And you think asking for an alibi is going to help?
      - generic [ref=e374]:
        - strong [ref=e375]: Lucas
        - generic [ref=e376]: It might.
      - generic [ref=e377]: That's none of your business.
      - generic [ref=e381]:
        - strong [ref=e382]: Lucas
        - generic [ref=e383]: See?
      - generic [ref=e384]: Already being difficult.
      - generic [ref=e392]:
        - strong [ref=e393]: Maya
        - generic [ref=e394]: No, they're setting a boundary.
      - generic [ref=e395]:
        - generic "Sophie online" [ref=e398]
        - generic [ref=e399]:
          - strong [ref=e400]: Sophie
          - generic [ref=e401]: I wouldn't answer that either.
      - generic [ref=e405]:
        - strong [ref=e406]: Lucas
        - generic [ref=e407]: Of course you wouldn't.
      - generic [ref=e409]:
        - strong [ref=e410]: Maya
        - generic [ref=e411]: Okay.
      - generic [ref=e412]: Enough with the questions about where people were.
      - generic [ref=e415]: We barely know who's on the other side of the screen.
      - generic [ref=e423]:
        - strong [ref=e424]: Lucas
        - generic [ref=e425]: Exactly my point.
      - generic [ref=e429]:
        - strong [ref=e430]: Maya
        - generic [ref=e431]: No. Your point was to accuse them before we know anything.
      - generic [ref=e435]:
        - strong [ref=e436]: Lucas
        - generic [ref=e437]: I'm trying to be careful.
      - generic [ref=e439]:
        - strong [ref=e440]: Maya
        - generic [ref=e441]: Then be careful.
      - generic [ref=e442]: Not cruel.
      - generic [ref=e447]:
        - generic "Sophie online" [ref=e450]
        - generic [ref=e451]:
          - strong [ref=e452]: Sophie
          - generic [ref=e453]: Can I explain why I thought adding them was a good idea?
      - generic [ref=e457]:
        - strong [ref=e458]: Lucas
        - generic [ref=e459]: You could try.
      - generic [ref=e463]:
        - strong [ref=e464]: Maya
        - generic [ref=e465]: Go ahead, Soph.
      - generic [ref=e467]:
        - strong [ref=e468]: Sophie
        - generic [ref=e469]: There was a contact list.
      - generic [ref=e470]: Daniel's.
      - generic [ref=e473]:
        - generic "Sophie online" [ref=e476]
        - generic [ref=e477]: I already told you about it.
      - generic [ref=e482]:
        - strong [ref=e483]: Maya
        - generic [ref=e484]: Right.
      - generic [ref=e485]:
        - generic "Sophie online" [ref=e488]
        - generic [ref=e489]:
          - strong [ref=e490]: Sophie
          - generic [ref=e491]: And the number didn't have a name.
      - generic [ref=e495]:
        - strong [ref=e496]: Lucas
        - generic [ref=e497]: We know.
      - generic [ref=e499]:
        - strong [ref=e500]: Sophie
        - generic [ref=e501]: I'm getting there.
      - generic [ref=e502]: There was something beside it.
      - generic [ref=e505]:
        - generic "Sophie online" [ref=e508]
        - generic [ref=e509]: Some kind of note.
      - generic [ref=e514]:
        - strong [ref=e515]: Maya
        - generic [ref=e516]: You said you couldn't read it.
      - generic [ref=e518]:
        - strong [ref=e519]: Sophie
        - generic [ref=e520]: I couldn't.
      - generic [ref=e521]:
        - generic "Sophie online" [ref=e524]
        - generic [ref=e525]: Not properly.
      - generic [ref=e528]:
        - strong [ref=e529]: Lucas
        - generic [ref=e530]: So we have a number and a note you can't read.
      - generic [ref=e531]: Fantastic.
      - generic [ref=e536]:
        - generic "Sophie online" [ref=e539]
        - generic [ref=e540]:
          - strong [ref=e541]: Sophie
          - generic [ref=e542]: Could you not?
      - generic [ref=e546]:
        - strong [ref=e547]: Maya
        - generic [ref=e548]: Did you find anything new in the note?
      - generic [ref=e549]:
        - generic "Sophie online" [ref=e552]
        - generic [ref=e553]:
          - strong [ref=e554]: Sophie
          - generic [ref=e555]: No.
      - generic [ref=e559]:
        - strong [ref=e560]: Maya
        - generic [ref=e561]: Then why bring it up?
      - generic [ref=e562]:
        - generic "Sophie online" [ref=e565]
        - generic [ref=e566]:
          - strong [ref=e567]: Sophie
          - generic [ref=e568]: Because Daniel didn't usually keep numbers like that.
      - generic [ref=e570]:
        - strong [ref=e571]: Lucas
        - generic [ref=e572]: ...
      - generic [ref=e573]: What do you mean?
      - generic [ref=e579]:
        - strong [ref=e580]: Sophie
        - generic [ref=e581]: Just that.
      - generic [ref=e582]:
        - generic "Sophie online" [ref=e585]
        - generic [ref=e586]: It stood out.
      - generic [ref=e589]:
        - strong [ref=e590]: Maya
        - generic [ref=e591]: You've been going through a lot of his things.
      - generic [ref=e592]: Maybe you're seeing patterns that aren't there.
      - generic [ref=e598]:
        - strong [ref=e599]: Sophie
        - generic [ref=e600]: Maybe.
      - generic [ref=e601]:
        - generic "Sophie online" [ref=e604]
        - generic [ref=e605]: But what if I'm not?
      - generic [ref=e607]: Can I see the note?
      - generic [ref=e611]:
        - strong [ref=e612]: Sophie
        - generic [ref=e613]: I don't have a clear copy.
      - generic [ref=e614]:
        - generic "Sophie online" [ref=e617]
        - generic [ref=e618]: And I don't want to send you something I haven't checked.
      - generic [ref=e623]:
        - strong [ref=e624]: Lucas
        - generic [ref=e625]: For once, I agree with Sophie.
      - generic [ref=e629]:
        - strong [ref=e630]: Maya
        - generic [ref=e631]: Could you at least keep the original?
      - generic [ref=e632]:
        - generic "Sophie online" [ref=e635]
        - generic [ref=e636]:
          - strong [ref=e637]: Sophie
          - generic [ref=e638]: Of course.
      - generic [ref=e642]:
        - strong [ref=e643]: Maya
        - generic [ref=e644]: Sophie, can you check something for me?
      - generic [ref=e645]:
        - generic "Sophie online" [ref=e648]
        - generic [ref=e649]:
          - strong [ref=e650]: Sophie
          - generic [ref=e651]: Yeah?
      - generic [ref=e655]:
        - strong [ref=e656]: Maya
        - generic [ref=e657]: Was the note already damaged when you found it?
      - generic [ref=e658]:
        - generic "Sophie online" [ref=e661]
        - generic [ref=e662]:
          - strong [ref=e663]: Sophie
          - generic [ref=e664]: I think so.
      - generic [ref=e668]:
        - strong [ref=e669]: Maya
        - generic [ref=e670]: You think?
      - generic [ref=e671]:
        - generic "Sophie online" [ref=e674]
        - generic [ref=e675]:
          - strong [ref=e676]: Sophie
          - generic [ref=e677]: I'm pretty sure.
      - generic [ref=e681]:
        - strong [ref=e682]: Lucas
        - generic [ref=e683]: Pretty sure isn't exactly reassuring.
      - generic [ref=e684]:
        - generic "Sophie online" [ref=e687]
        - generic [ref=e688]:
          - strong [ref=e689]: Sophie
          - generic [ref=e690]: Lucas, I am trying.
      - generic [ref=e692]:
        - strong [ref=e693]: Lucas
        - generic [ref=e694]: I know.
      - generic [ref=e695]: But we can't keep building theories around things nobody's verified.
      - generic [ref=e703]:
        - strong [ref=e704]: Maya
        - generic [ref=e705]: For once, that part is fair.
      - generic [ref=e707]:
        - strong [ref=e708]: Sophie
        - generic [ref=e709]: Okay.
      - generic [ref=e710]:
        - generic "Sophie online" [ref=e713]
        - generic [ref=e714]: I'll look at it again.
      - generic [ref=e719]:
        - strong [ref=e720]: Maya
        - generic [ref=e721]: Can we talk about something else for a second?
      - generic [ref=e725]:
        - strong [ref=e726]: Lucas
        - generic [ref=e727]: Like what?
      - generic [ref=e731]:
        - strong [ref=e732]: Maya
        - generic [ref=e733]: Whether anyone's actually eaten today.
      - generic [ref=e734]:
        - generic "Sophie online" [ref=e737]
        - generic [ref=e738]:
          - strong [ref=e739]: Sophie
          - generic [ref=e740]: Maya...
      - generic [ref=e742]:
        - strong [ref=e743]: Maya
        - generic [ref=e744]: I'm serious.
      - generic [ref=e745]: You were still awake when I went to bed.
      - generic [ref=e750]:
        - generic "Sophie online" [ref=e753]
        - generic [ref=e754]:
          - strong [ref=e755]: Sophie
          - generic [ref=e756]: I slept.
      - generic [ref=e760]:
        - strong [ref=e761]: Maya
        - generic [ref=e762]: For how long?
      - generic [ref=e763]:
        - generic "Sophie online" [ref=e766]
        - generic [ref=e767]:
          - strong [ref=e768]: Sophie
          - generic [ref=e769]: Enough.
      - generic [ref=e773]:
        - strong [ref=e774]: Maya
        - generic [ref=e775]: That's not a number.
      - generic [ref=e776]:
        - generic "Sophie online" [ref=e779]
        - generic [ref=e780]:
          - strong [ref=e781]: Sophie
          - generic [ref=e782]: You're starting to sound like my mother.
      - generic [ref=e786]:
        - strong [ref=e787]: Maya
        - generic [ref=e788]: Someone has to.
      - generic [ref=e792]:
        - strong [ref=e793]: Lucas
        - generic [ref=e794]: I ate.
      - generic [ref=e798]:
        - strong [ref=e799]: Maya
        - generic [ref=e800]: Congratulations, Lucas.
      - generic [ref=e804]:
        - strong [ref=e805]: Lucas
        - generic [ref=e806]: You asked.
      - generic [ref=e810]:
        - strong [ref=e811]: Maya
        - generic [ref=e812]: I did.
      - generic [ref=e813]:
        - generic "Sophie online" [ref=e816]
        - generic [ref=e817]:
          - strong [ref=e818]: Sophie
          - generic [ref=e819]: 😂
      - generic [ref=e821]:
        - strong [ref=e822]: Maya
        - generic [ref=e823]: There. See?
      - generic [ref=e824]: She still remembers how to laugh.
      - generic [ref=e829]:
        - generic "Sophie online" [ref=e832]
        - generic [ref=e833]:
          - strong [ref=e834]: Sophie
          - generic [ref=e835]: Barely.
      - generic [ref=e839]:
        - strong [ref=e840]: Lucas
        - generic [ref=e841]: It isn't funny.
      - generic [ref=e845]:
        - strong [ref=e846]: Maya
        - generic [ref=e847]: Nobody said the situation was funny.
      - generic [ref=e851]:
        - strong [ref=e852]: Lucas
        - generic [ref=e853]: Then can we stay focused?
      - generic [ref=e857]:
        - strong [ref=e858]: Maya
        - generic [ref=e859]: We can be worried and still act like human beings.
      - generic [ref=e860]: Maya has a point. You all sound exhausted.
      - generic [ref=e866]:
        - strong [ref=e867]: Maya
        - generic [ref=e868]: Thank you.
      - generic [ref=e869]:
        - generic "Sophie online" [ref=e872]
        - generic [ref=e873]:
          - strong [ref=e874]: Sophie
          - generic [ref=e875]: I probably am.
      - generic [ref=e879]:
        - strong [ref=e880]: Lucas
        - generic [ref=e881]: I'm fine.
      - generic [ref=e885]:
        - strong [ref=e886]: Maya
        - generic [ref=e887]: That's exactly what an exhausted person would say.
      - generic [ref=e889]:
        - strong [ref=e890]: Sophie
        - generic [ref=e891]: Okay.
      - generic [ref=e892]:
        - generic "Sophie online" [ref=e895]
        - generic [ref=e896]: I'm getting some water.
      - generic [ref=e901]:
        - strong [ref=e902]: Maya
        - generic [ref=e903]: Finally.
      - generic [ref=e905]:
        - strong [ref=e906]: Sophie
        - generic [ref=e907]: Don't celebrate yet.
      - generic [ref=e908]:
        - generic "Sophie online" [ref=e911]
        - generic [ref=e912]: I'll be back in like two minutes.
      - generic [ref=e917]:
        - strong [ref=e918]: Maya
        - generic [ref=e919]: Progress is progress.
      - generic [ref=e920]: Sophie is offline.
      - generic [ref=e924]:
        - strong [ref=e925]: Lucas
        - generic [ref=e926]: Maya.
      - generic [ref=e930]:
        - strong [ref=e931]: Maya
        - generic [ref=e932]: What?
      - generic [ref=e936]:
        - strong [ref=e937]: Lucas
        - generic [ref=e938]: You're being awfully relaxed about this.
      - generic [ref=e942]:
        - strong [ref=e943]: Maya
        - generic [ref=e944]: About what?
      - generic [ref=e948]:
        - strong [ref=e949]: Lucas
        - generic [ref=e950]: This person.
      - generic [ref=e954]:
        - strong [ref=e955]: Maya
        - generic [ref=e956]: I'm not relaxed.
      - generic [ref=e960]:
        - strong [ref=e961]: Lucas
        - generic [ref=e962]: You're joking with them.
      - generic [ref=e966]:
        - strong [ref=e967]: Maya
        - generic [ref=e968]: That doesn't mean I trust them.
      - generic [ref=e970]:
        - strong [ref=e971]: Lucas
        - generic [ref=e972]: Good.
      - generic [ref=e973]: Because I don't.
      - generic [ref=e981]:
        - strong [ref=e982]: Maya
        - generic [ref=e983]: You made that pretty clear.
      - generic [ref=e987]:
        - strong [ref=e988]: Lucas
        - generic [ref=e989]: I don't understand why Sophie is doing this.
      - generic [ref=e993]:
        - strong [ref=e994]: Maya
        - generic [ref=e995]: She's scared.
      - generic [ref=e999]:
        - strong [ref=e1000]: Lucas
        - generic [ref=e1001]: We're all scared.
      - generic [ref=e1005]:
        - strong [ref=e1006]: Maya
        - generic [ref=e1007]: I know.
      - generic [ref=e1011]:
        - strong [ref=e1012]: Lucas
        - generic [ref=e1013]: And that doesn't mean we invite strangers into everything.
      - generic [ref=e1017]:
        - strong [ref=e1018]: Maya
        - generic [ref=e1019]: You're still here, by the way.
      - generic [ref=e1023]:
        - strong [ref=e1024]: Lucas
        - generic [ref=e1025]: What?
      - generic [ref=e1027]:
        - strong [ref=e1028]: Maya
        - generic [ref=e1029]: The person you're talking about.
      - generic [ref=e1030]: They're still in the group.
      - generic [ref=e1038]:
        - strong [ref=e1039]: Lucas
        - generic [ref=e1040]: I know.
      - generic [ref=e1044]:
        - strong [ref=e1045]: Maya
        - generic [ref=e1046]: Then maybe stop talking about them like they aren't.
      - generic [ref=e1047]: I can read everything you're saying, you know.
      - generic [ref=e1053]:
        - strong [ref=e1054]: Maya
        - generic [ref=e1055]: Exactly.
      - generic [ref=e1059]:
        - strong [ref=e1060]: Lucas
        - generic [ref=e1061]: I wasn't trying to hide it.
      - generic [ref=e1062]: Clearly.
      - generic [ref=e1066]:
        - strong [ref=e1067]: Maya
        - generic [ref=e1068]: Lucas, just stop digging.
      - generic [ref=e1069]: Listen.
      - generic [ref=e1072]: I'm not going to pretend this isn't strange.
      - generic [ref=e1075]: I don't know you.
      - generic [ref=e1078]: And I don't know what your number means.
      - generic [ref=e1081]: But I also don't think it's fair to assume the worst just because we don't have an answer.
      - generic [ref=e1089]:
        - strong [ref=e1090]: Lucas
        - generic [ref=e1091]: That goes both ways.
      - generic [ref=e1095]:
        - strong [ref=e1096]: Maya
        - generic [ref=e1097]: It does.
      - generic [ref=e1099]:
        - strong [ref=e1100]: Lucas
        - generic [ref=e1101]: Fine.
      - generic [ref=e1102]: Then answer one thing.
      - generic [ref=e1105]: Why are you still here?
      - generic [ref=e1110]: Because Sophie asked me to stay.
      - generic [ref=e1114]:
        - strong [ref=e1115]: Maya
        - generic [ref=e1116]: Okay.
      - generic [ref=e1117]: That's a fair answer.
      - generic [ref=e1125]:
        - strong [ref=e1126]: Lucas
        - generic [ref=e1127]: You're going to need a better reason eventually.
      - generic [ref=e1131]:
        - strong [ref=e1132]: Maya
        - generic [ref=e1133]: They don't owe us a lifelong commitment, Lucas.
      - generic [ref=e1134]: Sophie is online.
      - generic [ref=e1136]:
        - strong [ref=e1137]: Sophie
        - generic [ref=e1138]: Okay, I'm back.
      - generic [ref=e1139]:
        - generic "Sophie online" [ref=e1142]
        - generic [ref=e1143]: What did I miss?
      - generic [ref=e1148]:
        - strong [ref=e1149]: Maya
        - generic [ref=e1150]: Nothing.
      - generic [ref=e1154]:
        - strong [ref=e1155]: Lucas
        - generic [ref=e1156]: Plenty.
      - generic [ref=e1158]:
        - strong [ref=e1159]: Sophie
        - generic [ref=e1160]: ...
      - generic [ref=e1161]: Oh no.
      - generic [ref=e1164]:
        - generic "Sophie online" [ref=e1167]
        - generic [ref=e1168]: Please tell me you didn't start another argument.
      - generic [ref=e1173]:
        - strong [ref=e1174]: Maya
        - generic [ref=e1175]: We were having a conversation.
      - generic [ref=e1179]:
        - strong [ref=e1180]: Lucas
        - generic [ref=e1181]: A very educational one.
      - generic [ref=e1182]:
        - generic "Sophie online" [ref=e1185]
        - generic [ref=e1186]:
          - strong [ref=e1187]: Sophie
          - generic [ref=e1188]: Lucas.
      - generic [ref=e1192]:
        - strong [ref=e1193]: Lucas
        - generic [ref=e1194]: Sophie.
      - generic [ref=e1198]:
        - strong [ref=e1199]: Maya
        - generic [ref=e1200]: Children.
      - generic [ref=e1202]:
        - strong [ref=e1203]: Sophie
        - generic [ref=e1204]: 🙄
      - generic [ref=e1205]:
        - generic "Sophie online" [ref=e1208]
        - generic [ref=e1209]: Look, I know adding someone without asking wasn't ideal.
      - generic [ref=e1214]:
        - strong [ref=e1215]: Lucas
        - generic [ref=e1216]: It wasn't ideal?
      - generic [ref=e1218]:
        - strong [ref=e1219]: Sophie
        - generic [ref=e1220]: Fine.
      - generic [ref=e1221]: It was a bad call.
      - generic [ref=e1224]:
        - generic "Sophie online" [ref=e1227]
        - generic [ref=e1228]: Is that what you want me to say?
      - generic [ref=e1233]:
        - strong [ref=e1234]: Lucas
        - generic [ref=e1235]: I want you to understand why it was a bad call.
      - generic [ref=e1236]:
        - generic "Sophie online" [ref=e1239]
        - generic [ref=e1240]:
          - strong [ref=e1241]: Sophie
          - generic [ref=e1242]: I understand.
      - generic [ref=e1246]:
        - strong [ref=e1247]: Lucas
        - generic [ref=e1248]: Then why did you do it?
      - generic [ref=e1250]:
        - strong [ref=e1251]: Sophie
        - generic [ref=e1252]: Because I'm tired of sitting here doing nothing!
      - generic [ref=e1253]: Sorry.
      - generic [ref=e1256]:
        - generic "Sophie online" [ref=e1259]
        - generic [ref=e1260]: I didn't mean to snap.
      - generic [ref=e1265]:
        - strong [ref=e1266]: Maya
        - generic [ref=e1267]: It's okay.
      - generic [ref=e1271]:
        - strong [ref=e1272]: Lucas
        - generic [ref=e1273]: No, it's not.
      - generic [ref=e1277]:
        - strong [ref=e1278]: Maya
        - generic [ref=e1279]: Lucas...
      - generic [ref=e1281]:
        - strong [ref=e1282]: Lucas
        - generic [ref=e1283]: We're making decisions because we're scared.
      - generic [ref=e1284]: And we don't even know what we're risking.
      - generic [ref=e1290]:
        - strong [ref=e1291]: Sophie
        - generic [ref=e1292]: I know!
      - generic [ref=e1293]:
        - generic "Sophie online" [ref=e1296]
        - generic [ref=e1297]: Do you think I don't think about that?
      - generic [ref=e1302]:
        - strong [ref=e1303]: Lucas
        - generic [ref=e1304]: Then start acting like it.
      - generic [ref=e1305]: I can leave if that's what everyone wants.
      - generic [ref=e1309]:
        - strong [ref=e1310]: Sophie
        - generic [ref=e1311]: No.
      - generic [ref=e1312]:
        - generic "Sophie online" [ref=e1315]
        - generic [ref=e1316]: That's not what I want.
      - generic [ref=e1321]:
        - strong [ref=e1322]: Maya
        - generic [ref=e1323]: And we haven't asked you to leave.
      - generic [ref=e1327]:
        - strong [ref=e1328]: Lucas
        - generic [ref=e1329]: I might.
      - generic [ref=e1333]:
        - strong [ref=e1334]: Maya
        - generic [ref=e1335]: Lucas.
      - generic [ref=e1337]:
        - strong [ref=e1338]: Sophie
        - generic [ref=e1339]: Fine.
      - generic [ref=e1340]:
        - generic "Sophie online" [ref=e1343]
        - generic [ref=e1344]: What do you want me to do?
      - generic [ref=e1349]:
        - strong [ref=e1350]: Lucas
        - generic [ref=e1351]: I want us to stop sharing things until we know who we're sharing them with.
      - generic [ref=e1355]:
        - strong [ref=e1356]: Maya
        - generic [ref=e1357]: That seems reasonable.
      - generic [ref=e1359]:
        - strong [ref=e1360]: Sophie
        - generic [ref=e1361]: So what?
      - generic [ref=e1362]:
        - generic "Sophie online" [ref=e1365]
        - generic [ref=e1366]: We just ignore the number?
      - generic [ref=e1369]:
        - strong [ref=e1370]: Lucas
        - generic [ref=e1371]: No.
      - generic [ref=e1372]: We verify it.
      - generic [ref=e1377]:
        - generic "Sophie online" [ref=e1380]
        - generic [ref=e1381]:
          - strong [ref=e1382]: Sophie
          - generic [ref=e1383]: How?
      - generic [ref=e1387]:
        - strong [ref=e1388]: Lucas
        - generic [ref=e1389]: I don't know yet.
      - generic [ref=e1390]:
        - generic "Sophie online" [ref=e1393]
        - generic [ref=e1394]:
          - strong [ref=e1395]: Sophie
          - generic [ref=e1396]: Exactly.
      - generic [ref=e1400]:
        - strong [ref=e1401]: Lucas
        - generic [ref=e1402]: Not knowing how to do something doesn't mean we should do the first thing that comes to mind.
      - generic [ref=e1403]:
        - generic "Sophie online" [ref=e1406]
        - generic [ref=e1407]:
          - strong [ref=e1408]: Sophie
          - generic [ref=e1409]: And waiting doesn't guarantee we'll learn anything!
      - generic [ref=e1413]:
        - strong [ref=e1414]: Maya
        - generic [ref=e1415]: Can both of you stop for a second?
      - generic [ref=e1416]:
        - generic "Sophie online" [ref=e1419]
        - generic [ref=e1420]:
          - strong [ref=e1421]: Sophie
          - generic [ref=e1422]: Sorry.
      - generic [ref=e1426]:
        - strong [ref=e1427]: Lucas
        - generic [ref=e1428]: I'm listening.
      - generic [ref=e1430]:
        - strong [ref=e1431]: Maya
        - generic [ref=e1432]: Nobody here knows what happened to Daniel.
      - generic [ref=e1433]: We keep going in circles.
      - generic [ref=e1436]: We don't even agree about what happened that night.
      - generic [ref=e1441]:
        - generic "Sophie online" [ref=e1444]
        - generic [ref=e1445]:
          - strong [ref=e1446]: Sophie
          - generic [ref=e1447]: Maya.
      - generic [ref=e1451]:
        - strong [ref=e1452]: Maya
        - generic [ref=e1453]: What?
      - generic [ref=e1454]:
        - generic "Sophie online" [ref=e1457]
        - generic [ref=e1458]:
          - strong [ref=e1459]: Sophie
          - generic [ref=e1460]: Don't.
      - generic [ref=e1464]:
        - strong [ref=e1465]: Lucas
        - generic [ref=e1466]: She's right.
      - generic [ref=e1470]:
        - strong [ref=e1471]: Maya
        - generic [ref=e1472]: ...
      - generic [ref=e1474]:
        - strong [ref=e1475]: Lucas
        - generic [ref=e1476]: We keep acting like we have all these answers.
      - generic [ref=e1477]: But we don't.
      - generic [ref=e1482]:
        - generic "Sophie online" [ref=e1485]
        - generic [ref=e1486]:
          - strong [ref=e1487]: Sophie
          - generic [ref=e1488]: Can we please not do this right now?
      - generic [ref=e1490]:
        - strong [ref=e1491]: Maya
        - generic [ref=e1492]: I'm not trying to start anything.
      - generic [ref=e1493]: I'm just saying we need to stop mixing up what we know and what we think we know.
      - generic [ref=e1501]:
        - strong [ref=e1502]: Lucas
        - generic [ref=e1503]: Exactly.
      - generic [ref=e1505]:
        - strong [ref=e1506]: Sophie
        - generic [ref=e1507]: Okay.
      - generic [ref=e1508]: You're right.
      - generic [ref=e1511]:
        - generic "Sophie online" [ref=e1514]
        - generic [ref=e1515]: Both of you.
      - generic [ref=e1517]: What happened that night?
      - generic [ref=e1523]:
        - strong [ref=e1524]: Maya
        - generic [ref=e1525]: That's what we're trying to establish.
      - generic [ref=e1529]:
        - strong [ref=e1530]: Lucas
        - generic [ref=e1531]: Which is why we shouldn't be discussing it with someone we just met.
      - generic [ref=e1533]:
        - strong [ref=e1534]: Sophie
        - generic [ref=e1535]: Lucas has a point.
      - generic [ref=e1536]: Sorry.
      - generic [ref=e1539]:
        - generic "Sophie online" [ref=e1542]
        - generic [ref=e1543]: I know that's frustrating.
      - generic [ref=e1545]: Maya deleted a message.
      - generic [ref=e1546]:
        - generic "Sophie online" [ref=e1549]
        - generic [ref=e1550]:
          - strong [ref=e1551]: Sophie
          - generic [ref=e1552]: Maya?
      - generic [ref=e1554]:
        - strong [ref=e1555]: Maya
        - generic [ref=e1556]: Sorry.
      - generic [ref=e1557]: Wrong chat.
      - generic [ref=e1565]:
        - strong [ref=e1566]: Lucas
        - generic [ref=e1567]: What did you delete?
      - generic [ref=e1571]:
        - strong [ref=e1572]: Maya
        - generic [ref=e1573]: A message meant for someone else.
      - generic [ref=e1577]:
        - strong [ref=e1578]: Lucas
        - generic [ref=e1579]: About what?
      - generic [ref=e1583]:
        - strong [ref=e1584]: Maya
        - generic [ref=e1585]: Something unrelated.
      - generic [ref=e1589]:
        - strong [ref=e1590]: Lucas
        - generic [ref=e1591]: Right.
      - generic [ref=e1595]:
        - strong [ref=e1596]: Maya
        - generic [ref=e1597]: Lucas.
      - generic [ref=e1601]:
        - strong [ref=e1602]: Lucas
        - generic [ref=e1603]: What?
      - generic [ref=e1607]:
        - strong [ref=e1608]: Maya
        - generic [ref=e1609]: Please don't make something out of nothing.
      - generic [ref=e1613]:
        - strong [ref=e1614]: Lucas
        - generic [ref=e1615]: You know what bothers me the most?
      - generic [ref=e1616]:
        - generic "Sophie online" [ref=e1619]
        - generic [ref=e1620]:
          - strong [ref=e1621]: Sophie
          - generic [ref=e1622]: What?
      - generic [ref=e1624]:
        - strong [ref=e1625]: Lucas
        - generic [ref=e1626]: We keep saying we trust each other.
      - generic [ref=e1627]: But the moment something goes wrong, suddenly everyone has something they don't want to explain.
      - generic [ref=e1635]:
        - strong [ref=e1636]: Maya
        - generic [ref=e1637]: That's not fair.
      - generic [ref=e1641]:
        - strong [ref=e1642]: Lucas
        - generic [ref=e1643]: Isn't it?
      - generic [ref=e1644]:
        - generic "Sophie online" [ref=e1647]
        - generic [ref=e1648]:
          - strong [ref=e1649]: Sophie
          - generic [ref=e1650]: What are you trying to say?
      - generic [ref=e1654]:
        - strong [ref=e1655]: Lucas
        - generic [ref=e1656]: I'm saying maybe we should stop pretending everything's fine.
      - generic [ref=e1660]:
        - strong [ref=e1661]: Maya
        - generic [ref=e1662]: Nobody's pretending everything's fine.
      - generic [ref=e1666]:
        - strong [ref=e1667]: Lucas
        - generic [ref=e1668]: Then why does it feel like I'm the only one asking the obvious questions?
      - generic [ref=e1669]:
        - generic "Sophie online" [ref=e1672]
        - generic [ref=e1673]:
          - strong [ref=e1674]: Sophie
          - generic [ref=e1675]: You're not.
      - generic [ref=e1679]:
        - strong [ref=e1680]: Lucas
        - generic [ref=e1681]: Really?
      - generic [ref=e1682]:
        - generic "Sophie online" [ref=e1685]
        - generic [ref=e1686]:
          - strong [ref=e1687]: Sophie
          - generic [ref=e1688]: Really.
      - generic [ref=e1690]:
        - strong [ref=e1691]: Lucas
        - generic [ref=e1692]: Then answer this.
      - generic [ref=e1693]: Why does Daniel have a stranger's number saved without a name?
      - generic [ref=e1698]:
        - generic "Sophie online" [ref=e1701]
        - generic [ref=e1702]:
          - strong [ref=e1703]: Sophie
          - generic [ref=e1704]: I don't know.
      - generic [ref=e1708]:
        - strong [ref=e1709]: Lucas
        - generic [ref=e1710]: Why was there a note attached?
      - generic [ref=e1711]:
        - generic "Sophie online" [ref=e1714]
        - generic [ref=e1715]:
          - strong [ref=e1716]: Sophie
          - generic [ref=e1717]: I don't know!
      - generic [ref=e1721]:
        - strong [ref=e1722]: Lucas
        - generic [ref=e1723]: Why has nobody heard from him?
      - generic [ref=e1724]:
        - generic "Sophie online" [ref=e1727]
        - generic [ref=e1728]:
          - strong [ref=e1729]: Sophie
          - generic [ref=e1730]: LUCAS!
      - generic [ref=e1732]:
        - strong [ref=e1733]: Maya
        - generic [ref=e1734]: Stop.
      - generic [ref=e1735]: Both of you.
      - generic [ref=e1740]: None of you has enough information to answer those questions.
      - generic [ref=e1746]:
        - strong [ref=e1747]: Maya
        - generic [ref=e1748]: Exactly.
      - generic [ref=e1752]:
        - strong [ref=e1753]: Lucas
        - generic [ref=e1754]: Then maybe we shouldn't be acting like we do.
      - generic [ref=e1755]:
        - generic "Sophie online" [ref=e1758]
        - generic [ref=e1759]:
          - strong [ref=e1760]: Sophie
          - generic [ref=e1761]: I'm not!
      - generic [ref=e1765]:
        - strong [ref=e1766]: Lucas
        - generic [ref=e1767]: Then stop making decisions for everyone.
      - generic [ref=e1769]:
        - strong [ref=e1770]: Sophie
        - generic [ref=e1771]: Fine.
      - generic [ref=e1772]: Maybe adding someone was a mistake.
      - generic [ref=e1775]:
        - generic "Sophie online" [ref=e1778]
        - generic [ref=e1779]: But I still think ignoring the number would've been worse.
      - generic [ref=e1784]:
        - strong [ref=e1785]: Lucas
        - generic [ref=e1786]: That's your opinion.
      - generic [ref=e1788]:
        - strong [ref=e1789]: Sophie
        - generic [ref=e1790]: Yes.
      - generic [ref=e1791]:
        - generic "Sophie online" [ref=e1794]
        - generic [ref=e1795]: It is.
      - generic [ref=e1800]:
        - strong [ref=e1801]: Maya
        - generic [ref=e1802]: Nobody has to decide everything tonight.
      - generic [ref=e1804]:
        - strong [ref=e1805]: Lucas
        - generic [ref=e1806]: No.
      - generic [ref=e1807]: But we do have to decide what we're willing to risk.
      - generic [ref=e1812]:
        - generic "Sophie online" [ref=e1815]
        - generic [ref=e1816]:
          - strong [ref=e1817]: Sophie
          - generic [ref=e1818]: What does that mean?
      - generic [ref=e1822]:
        - strong [ref=e1823]: Lucas
        - generic [ref=e1824]: It means I'm not comfortable with this anymore.
      - generic [ref=e1828]:
        - strong [ref=e1829]: Maya
        - generic [ref=e1830]: With what?
      - generic [ref=e1834]:
        - strong [ref=e1835]: Lucas
        - generic [ref=e1836]: With how we're handling everything.
      - generic [ref=e1837]:
        - generic "Sophie online" [ref=e1840]
        - generic [ref=e1841]:
          - strong [ref=e1842]: Sophie
          - generic [ref=e1843]: Lucas...
      - generic [ref=e1845]:
        - strong [ref=e1846]: Lucas
        - generic [ref=e1847]: No, Sophie.
      - generic [ref=e1848]: I've been trying to say this for days.
      - generic [ref=e1851]: Every time I question something, you act like I'm making things harder.
      - generic [ref=e1856]:
        - generic "Sophie online" [ref=e1859]
        - generic [ref=e1860]:
          - strong [ref=e1861]: Sophie
          - generic [ref=e1862]: Because sometimes you are!
      - generic [ref=e1866]:
        - strong [ref=e1867]: Lucas
        - generic [ref=e1868]: ...
      - generic [ref=e1872]:
        - strong [ref=e1873]: Maya
        - generic [ref=e1874]: Sophie.
      - generic [ref=e1876]:
        - strong [ref=e1877]: Sophie
        - generic [ref=e1878]: I'm sorry.
      - generic [ref=e1879]:
        - generic "Sophie online" [ref=e1882]
        - generic [ref=e1883]: I didn't mean—
      - generic [ref=e1886]:
        - strong [ref=e1887]: Lucas
        - generic [ref=e1888]: No.
      - generic [ref=e1889]: You did.
      - generic [ref=e1894]:
        - generic "Sophie online" [ref=e1897]
        - generic [ref=e1898]:
          - strong [ref=e1899]: Sophie
          - generic [ref=e1900]: Lucas, please.
      - generic [ref=e1904]:
        - strong [ref=e1905]: Lucas
        - generic [ref=e1906]: I'm not doing this.
      - generic [ref=e1910]:
        - strong [ref=e1911]: Maya
        - generic [ref=e1912]: Don't be dramatic.
      - generic [ref=e1914]:
        - strong [ref=e1915]: Lucas
        - generic [ref=e1916]: I'm not being dramatic.
      - generic [ref=e1917]: I'm stepping away before I say something I regret.
      - generic [ref=e1922]:
        - generic "Sophie online" [ref=e1925]
        - generic [ref=e1926]:
          - strong [ref=e1927]: Sophie
          - generic [ref=e1928]: We're all upset.
      - generic [ref=e1932]:
        - strong [ref=e1933]: Lucas
        - generic [ref=e1934]: That's not the point.
      - generic [ref=e1935]:
        - generic "Sophie online" [ref=e1938]
        - generic [ref=e1939]:
          - strong [ref=e1940]: Sophie
          - generic [ref=e1941]: Then what is?
      - generic [ref=e1943]:
        - strong [ref=e1944]: Lucas
        - generic [ref=e1945]: The point is that none of us knows who we're supposed to trust right now.
      - generic [ref=e1946]: And apparently I'm the only one willing to admit it.
      - generic [ref=e1951]: You don't have to trust me.
      - generic [ref=e1955]:
        - strong [ref=e1956]: Lucas
        - generic [ref=e1957]: Good.
      - generic [ref=e1958]: Because I don't.
      - generic [ref=e1966]:
        - strong [ref=e1967]: Maya
        - generic [ref=e1968]: Nobody's asking you to.
      - generic [ref=e1970]:
        - strong [ref=e1971]: Lucas
        - generic [ref=e1972]: Then we're clear.
      - generic [ref=e1973]: Sophie.
      - generic [ref=e1978]:
        - generic "Sophie online" [ref=e1981]
        - generic [ref=e1982]:
          - strong [ref=e1983]: Sophie
          - generic [ref=e1984]: Yeah?
      - generic [ref=e1988]:
        - strong [ref=e1989]: Lucas
        - generic [ref=e1990]: Please be careful.
      - generic [ref=e1991]:
        - generic "Sophie online" [ref=e1994]
        - generic [ref=e1995]:
          - strong [ref=e1996]: Sophie
          - generic [ref=e1997]: I am being careful.
      - generic [ref=e1999]:
        - strong [ref=e2000]: Lucas
        - generic [ref=e2001]: I know you think you are.
      - generic [ref=e2002]: That's what worries me.
      - generic [ref=e2007]: Lucas left the group.
      - generic [ref=e2008]:
        - generic "Sophie online" [ref=e2011]
        - generic [ref=e2012]:
          - strong [ref=e2013]: Sophie
          - generic [ref=e2014]: Lucas, seriously?
      - generic [ref=e2018]:
        - strong [ref=e2019]: Maya
        - generic [ref=e2020]: He's gone, Soph.
      - generic [ref=e2021]:
        - generic "Sophie online" [ref=e2024]
        - generic [ref=e2025]:
          - strong [ref=e2026]: Sophie
          - generic [ref=e2027]: I can see that.
      - generic [ref=e2031]:
        - strong [ref=e2032]: Maya
        - generic [ref=e2033]: You should've told us before adding someone.
      - generic [ref=e2034]:
        - generic "Sophie online" [ref=e2037]
        - generic [ref=e2038]:
          - strong [ref=e2039]: Sophie
          - generic [ref=e2040]: Would you have said yes?
      - generic [ref=e2044]:
        - strong [ref=e2045]: Maya
        - generic [ref=e2046]: That's not the point.
      - generic [ref=e2047]: Maya deleted a message.
      - generic [ref=e2048]:
        - generic "Sophie online" [ref=e2051]
        - generic [ref=e2052]:
          - strong [ref=e2053]: Sophie
          - generic [ref=e2054]: Can we not do this here?
      - generic [ref=e2056]:
        - strong [ref=e2057]: Maya
        - generic [ref=e2058]: Fine.
      - generic [ref=e2059]: But we need to talk about this.
      - generic [ref=e2064]:
        - generic "Sophie online" [ref=e2067]
        - generic [ref=e2068]:
          - strong [ref=e2069]: Sophie
          - generic [ref=e2070]: I know.
      - generic [ref=e2074]:
        - strong [ref=e2075]: Maya
        - generic [ref=e2076]: Later, then.
      - generic [ref=e2077]: Maya is offline.
      - generic [ref=e2079]:
        - strong [ref=e2080]: Sophie
        - generic [ref=e2081]: ...
      - generic [ref=e2082]: Well.
      - generic [ref=e2085]:
        - generic "Sophie online" [ref=e2088]
        - generic [ref=e2089]: That went brilliantly.
      - generic [ref=e2091]: I didn't mean to cause trouble.
      - generic [ref=e2095]:
        - strong [ref=e2096]: Sophie
        - generic [ref=e2097]: I know.
      - generic [ref=e2098]: You didn't.
      - generic [ref=e2101]: This started long before you joined.
      - generic [ref=e2104]: I'm sorry you had to see it.
      - generic [ref=e2107]: Listen.
      - generic [ref=e2110]: I think I owe you an explanation.
      - generic [ref=e2113]: But I'd rather not have this conversation in front of everyone.
      - generic [ref=e2116]:
        - generic "Sophie online" [ref=e2119]
        - generic [ref=e2120]: Can we talk privately?
      - generic [ref=e2122]: Sure.
      - generic [ref=e2126]:
        - strong [ref=e2127]: Sophie
        - generic [ref=e2128]: Thank you.
      - generic [ref=e2129]: I'll message you.
      - generic [ref=e2132]: I'll send you a message.
      - generic [ref=e2135]: And...
      - generic [ref=e2138]:
        - generic "Sophie online" [ref=e2141]
        - generic [ref=e2142]: I'm sorry about all of this.
      - generic [ref=e2144]: Sophie is offline.
    - button "6 new · Jump to latest" [ref=e2145] [cursor=pointer]
  - complementary "Incoming notification":
    - generic [ref=e2146]:
      - button "Open notification from Sophie" [ref=e2147] [cursor=pointer]:
        - generic [ref=e2149]:
          - generic [ref=e2150]:
            - text: MESSAGES
            - time [ref=e2151]: now
          - strong [ref=e2152]: Sophie
          - generic [ref=e2153]: Hey.
          - generic [ref=e2154]: Tap to open conversation
      - button "Dismiss notification" [ref=e2155] [cursor=pointer]
  - navigation "Phone navigation" [ref=e2159]:
    - button "Go home" [ref=e2160] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { scene01Script } from '../../src/content/scene01Script'
  3   | import { sceneAt, seedScene } from './scene01-helper'
  4   | import type { GameSave } from '../../src/game/types'
  5   | 
  6   | async function stored(page: Page): Promise<GameSave> {
  7   |   return page.evaluate(async () => {
  8   |     const journal = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  9   |     if (journal) return JSON.parse(journal).save
  10  |     const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
  11  |     const value = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
  12  |     db.close(); return value
  13  |   })
  14  | }
  15  | async function openGroup(page: Page) {
  16  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  17  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  18  | }
  19  | async function reply(page: Page, text: string | RegExp, advance = true) {
  20  |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  21  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  22  |   if (advance) await page.clock.runFor(180_000)
  23  | }
  24  | async function reachPending(page: Page) {
  25  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  26  |   for (let i = 0; i < 120; i++) {
  27  |     if (await group.getAttribute('data-group-complete') === 'true') return
  28  |     await page.clock.runFor(500)
  29  |   }
  30  |   throw new Error('Final group messages did not complete')
  31  | }
  32  | 
  33  | test('whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll', async ({ page }) => {
  34  |   test.setTimeout(180_000)
  35  |   await page.clock.install({ time: new Date('2026-10-22T12:00:00Z') })
  36  |   await page.goto('/')
  37  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  38  |   await page.clock.runFor(20_000)
  39  |   await page.getByRole('button', { name: 'Open unknown message', exact: true }).click()
  40  |   await page.clock.runFor(120_000)
  41  |   for (const beat of scene01Script.choices) {
  42  |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `OPEN-S01-C${beat.id}`)
  43  |     const before = await page.locator('.opening-bubble.player').count()
  44  |     await page.locator('.scene01-options .opening-choice').first().click()
  45  |     if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
  46  |     await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  47  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  48  |     await page.clock.runFor(60_000)
  49  |   }
  50  |   await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  51  |   await page.clock.runFor(180_000)
  52  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  53  |   for (let number = 1; number <= 12; number++) {
  54  |     await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
  55  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  56  |     await page.locator('.scene01-options .opening-choice').first().click()
  57  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  58  |     await page.clock.runFor(180_000)
  59  |     // Embedded player lines are still individually selected and sent.
  60  |     while (await page.locator('.scene01-options .opening-choice').count() === 1) {
  61  |       const before = await group.locator('.opening-bubble.player').count()
  62  |       await page.clock.runFor(1000)
  63  |       await expect(group.locator('.opening-bubble.player')).toHaveCount(before)
  64  |       await page.locator('.scene01-options .opening-choice').first().click()
  65  |       await page.getByRole('button', { name: 'Send', exact: true }).click()
  66  |       await page.clock.runFor(180_000)
  67  |     }
  68  |   }
  69  |   await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  70  |   await expect(page.getByLabel('Group participants')).toContainText('3 members')
  71  |   await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  72  |   await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  73  |   await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(2)
  74  |   await expect(group.getByText('Can we talk privately?', { exact: true })).toBeVisible()
  75  |   await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  76  |   await reply(page, 'Sure.', false)
  77  |   await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  78  |   await reachPending(page)
  79  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  80  |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  81  |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  82  |   expect(remaining).toBeGreaterThan(4500)
  83  |   expect(remaining).toBeLessThanOrEqual(5500)
  84  |   await page.clock.runFor(remaining - 1)
> 85  |   expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
      |                                                                                                               ^ Error: expect(received).toBe(expected) // Object.is equality
  86  |   await page.clock.runFor(1)
  87  |   const banner = page.getByLabel('Incoming notification', { exact: true })
  88  |   await expect(banner).toContainText('Sophie')
  89  |   await expect(banner).toContainText('Hey.')
  90  |   await expect(banner).toContainText('Tap to open conversation')
  91  |   await expect(group).toBeVisible()
  92  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  93  |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  94  |   await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  95  |   await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  96  |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  97  |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  98  |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  99  |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  100 | })
  101 | 
  102 | test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  103 |   await seedScene(page, sceneAt('G13'))
  104 |   // Assertions/reload must not consume the deadline under parallel browser load.
  105 |   await page.clock.pauseAt(await page.evaluate(() => Date.now()))
  106 |   await openGroup(page)
  107 |   await reply(page, 'Sure.', false)
  108 |   await reachPending(page)
  109 |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  110 |   await page.clock.runFor(1000)
  111 |   await page.reload()
  112 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  113 |   await openGroup(page)
  114 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  115 |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  116 |   await page.clock.runFor(remaining - 1)
  117 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  118 |   await page.clock.runFor(1)
  119 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  120 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  121 |   await page.reload()
  122 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  123 |   await page.clock.runFor(20_000)
  124 |   expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  125 |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  126 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  127 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  128 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  129 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  130 | })
  131 | 
  132 | test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  133 |   const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  134 |   const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  135 |   scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  136 |   scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  137 |   scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  138 |   save.deliveredEvents = save.deliveredEvents.filter(keep)
  139 |   const beforeRelationships = save.relationships
  140 |   await seedScene(page, save)
  141 |   await openGroup(page)
  142 |   await page.clock.runFor(180_000)
  143 |   await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  144 |   await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  145 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  146 |   expect((await stored(page)).relationships).toEqual(beforeRelationships)
  147 | })
  148 | 
  149 | test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  150 |   await seedScene(page, sceneAt('G11'))
  151 |   await openGroup(page)
  152 |   await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  153 |   await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
  154 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
  155 |   await reply(page, "You haven't exactly ruled it out.")
  156 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  157 |   await expect(page.getByRole('button', { name: "I didn't mean to cause trouble.", exact: true })).toBeVisible()
  158 |   await reply(page, /You don't have to fix everything tonight, Sophie/)
  159 |   await expect(page.getByRole('button', { name: "You're trying to help someone you care about.", exact: true })).toBeVisible()
  160 |   await reply(page, "You're trying to help someone you care about.")
  161 |   await expect(page.getByRole('button', { name: 'Sure.', exact: true })).toBeVisible()
  162 |   expect((await stored(page)).prologue!.scene01!.groupComplete).not.toBe(true)
  163 | })
  164 | 
```