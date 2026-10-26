# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll
- Location: tests\e2e\scene02-handoff.spec.ts:33:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 4500
Received:   4335
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Local time 09:04 PM" [ref=e5]: 9:04 PM
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
        - generic [ref=e38]: Okay.
      - generic [ref=e39]: Hi, everyone.
      - generic [ref=e42]: Before anyone gets annoyed with me—
      - generic [ref=e50]:
        - strong [ref=e51]: Maya
        - generic [ref=e52]: That's an interesting way to start a message.
      - generic [ref=e56]:
        - strong [ref=e57]: Sophie
        - generic [ref=e58]: Maya.
      - generic [ref=e62]:
        - strong [ref=e63]: Maya
        - generic [ref=e64]: What did you do?
      - generic [ref=e68]:
        - strong [ref=e69]: Sophie
        - generic [ref=e70]: I invited someone.
      - generic [ref=e74]:
        - strong [ref=e75]: Lucas
        - generic [ref=e76]: Who?
      - generic [ref=e80]:
        - strong [ref=e81]: Sophie
        - generic [ref=e82]: The number I told you about.
      - generic [ref=e86]:
        - strong [ref=e87]: Lucas
        - generic [ref=e88]: The number from the export?
      - generic [ref=e92]:
        - strong [ref=e93]: Sophie
        - generic [ref=e94]: Yes.
      - generic [ref=e98]:
        - strong [ref=e99]: Lucas
        - generic [ref=e100]: You contacted it.
      - generic [ref=e104]:
        - strong [ref=e105]: Sophie
        - generic [ref=e106]: I did.
      - generic [ref=e110]:
        - strong [ref=e111]: Lucas
        - generic [ref=e112]: And invited whoever answered into this chat.
      - generic [ref=e116]:
        - strong [ref=e117]: Sophie
        - generic [ref=e118]: Yes, Lucas.
      - generic [ref=e120]:
        - strong [ref=e121]: Maya
        - generic [ref=e122]: Soph.
      - generic [ref=e123]: We agreed we'd talk before adding anyone else.
      - generic [ref=e129]:
        - strong [ref=e130]: Sophie
        - generic [ref=e131]: I know.
      - generic [ref=e132]: I was going to tell you.
      - generic [ref=e140]:
        - strong [ref=e141]: Lucas
        - generic [ref=e142]: When? After we'd given them the whole family history?
      - generic [ref=e146]:
        - strong [ref=e147]: Maya
        - generic [ref=e148]: Lucas.
      - generic [ref=e152]:
        - strong [ref=e153]: Lucas
        - generic [ref=e154]: It's a genuine question.
      - generic [ref=e156]:
        - strong [ref=e157]: Maya
        - generic [ref=e158]: And we can ask it without making someone who just joined regret owning a phone.
      - generic [ref=e159]: Hi, by the way.
      - generic [ref=e162]: I'm Maya.
      - generic [ref=e165]: Sorry about this.
      - generic [ref=e171]:
        - strong [ref=e172]: Lucas
        - generic [ref=e173]: I'm Lucas.
      - generic [ref=e174]: And I'd quite like to know why you're here.
      - generic [ref=e179]: Sophie invited me. I don't really know what else to tell you.
      - generic [ref=e183]:
        - strong [ref=e184]: Lucas
        - generic [ref=e185]: Fair enough.
      - generic [ref=e186]: Doesn't make it a good idea.
      - generic [ref=e194]:
        - strong [ref=e195]: Sophie
        - generic [ref=e196]: I didn't say it was a good idea. I said I wanted to try.
      - generic [ref=e200]:
        - strong [ref=e201]: Maya
        - generic [ref=e202]: They're answering what you asked, Lucas.
      - generic [ref=e204]:
        - strong [ref=e205]: Lucas
        - generic [ref=e206]: Alright.
      - generic [ref=e207]: Simple question.
      - generic [ref=e210]: Do you know Daniel Mercer?
      - generic [ref=e215]: No. I've never met him.
      - generic [ref=e221]:
        - strong [ref=e222]: Lucas
        - generic [ref=e223]: Then why would your number be in his contacts?
      - generic [ref=e224]: I was hoping one of you could tell me.
      - generic [ref=e230]:
        - strong [ref=e231]: Maya
        - generic [ref=e232]: We can't. That's why we're asking.
      - generic [ref=e234]:
        - strong [ref=e235]: Lucas
        - generic [ref=e236]: Here's what bothers me.
      - generic [ref=e237]: There's a phone number in a file.
      - generic [ref=e240]: No name.
      - generic [ref=e243]: Someone marked it with a star.
      - generic [ref=e246]: And now the person using that number is sitting in our private group.
      - generic [ref=e254]:
        - strong [ref=e255]: Maya
        - generic [ref=e256]: You're assuming the file is exactly what it claims to be.
      - generic [ref=e260]:
        - strong [ref=e261]: Lucas
        - generic [ref=e262]: I'm asking whether anyone checked.
      - generic [ref=e266]:
        - strong [ref=e267]: Sophie
        - generic [ref=e268]: I looked through it.
      - generic [ref=e272]:
        - strong [ref=e273]: Maya
        - generic [ref=e274]: That's not quite the same thing.
      - generic [ref=e276]:
        - strong [ref=e277]: Sophie
        - generic [ref=e278]: I know.
      - generic [ref=e279]: I thought speaking to the person might clear it up.
      - generic [ref=e287]:
        - strong [ref=e288]: Lucas
        - generic [ref=e289]: Did it?
      - generic [ref=e291]:
        - strong [ref=e292]: Sophie
        - generic [ref=e293]: No.
      - generic [ref=e294]: But at least now we know someone actually uses the number.
      - generic [ref=e302]:
        - strong [ref=e303]: Lucas
        - generic [ref=e304]: That isn't what we were trying to establish.
      - generic [ref=e308]:
        - strong [ref=e309]: Maya
        - generic [ref=e310]: Lucas, tell me what you want without turning it into an interrogation.
      - generic [ref=e312]:
        - strong [ref=e313]: Lucas
        - generic [ref=e314]: Fine.
      - generic [ref=e315]: I want to know we're not making another mistake.
      - generic [ref=e318]: Have you ever spoken to Daniel? Even online?
      - generic [ref=e323]: Not that I remember.
      - generic [ref=e327]:
        - strong [ref=e328]: Lucas
        - generic [ref=e329]: Alright.
      - generic [ref=e330]: Then I can't connect you to him.
      - generic [ref=e336]:
        - strong [ref=e337]: Maya
        - generic [ref=e338]: Neither can we.
      - generic [ref=e339]: Sophie, can I ask you to check something?
      - generic [ref=e347]:
        - strong [ref=e348]: Sophie
        - generic [ref=e349]: Yeah.
      - generic [ref=e353]:
        - strong [ref=e354]: Maya
        - generic [ref=e355]: Does the export say when that number was saved?
      - generic [ref=e359]:
        - strong [ref=e360]: Sophie
        - generic [ref=e361]: No.
      - generic [ref=e365]:
        - strong [ref=e366]: Maya
        - generic [ref=e367]: Or who starred it?
      - generic [ref=e371]:
        - strong [ref=e372]: Sophie
        - generic [ref=e373]: No.
      - generic [ref=e377]:
        - strong [ref=e378]: Maya
        - generic [ref=e379]: Is there any indication the star was added by Daniel, rather than copied from somewhere else?
      - generic [ref=e383]:
        - strong [ref=e384]: Sophie
        - generic [ref=e385]: Not in the version I have.
      - generic [ref=e389]:
        - strong [ref=e390]: Lucas
        - generic [ref=e391]: That's what I was trying to say.
      - generic [ref=e393]:
        - strong [ref=e394]: Sophie
        - generic [ref=e395]: I know, Lucas.
      - generic [ref=e396]: I've heard you.
      - generic [ref=e404]:
        - strong [ref=e405]: Lucas
        - generic [ref=e406]: Then why do I feel like nobody is listening?
      - generic [ref=e410]:
        - strong [ref=e411]: Maya
        - generic [ref=e412]: Because you're not the only one who's frightened.
      - generic [ref=e414]:
        - strong [ref=e415]: Sophie
        - generic [ref=e416]: The star made me stop scrolling.
      - generic [ref=e417]: That's all.
      - generic [ref=e420]: I saw a number I didn't recognise and hoped it meant something.
      - generic [ref=e423]: Maybe I just wanted it to.
      - generic [ref=e428]: It might have been an accident.
      - generic [ref=e432]:
        - strong [ref=e433]: Sophie
        - generic [ref=e434]: I know.
      - generic [ref=e435]: That would be a really ordinary answer.
      - generic [ref=e438]: I'd like an ordinary answer, actually.
      - generic [ref=e444]:
        - strong [ref=e445]: Maya
        - generic [ref=e446]: So here's where we are.
      - generic [ref=e447]: We have a number in an export.
      - generic [ref=e450]: We haven't verified where the star came from.
      - generic [ref=e453]: And its owner doesn't recognise Daniel.
      - generic [ref=e461]:
        - strong [ref=e462]: Lucas
        - generic [ref=e463]: Right.
      - generic [ref=e467]:
        - strong [ref=e468]: Maya
        - generic [ref=e469]: That leaves us with a question, not a suspect.
      - generic [ref=e473]:
        - strong [ref=e474]: Sophie
        - generic [ref=e475]: Could we maybe stop talking about me like I'm not here, too?
      - generic [ref=e479]:
        - strong [ref=e480]: Maya
        - generic [ref=e481]: Sorry, Soph.
      - generic [ref=e483]:
        - strong [ref=e484]: Sophie
        - generic [ref=e485]: I know I handled it badly.
      - generic [ref=e486]: I'm just tired.
      - generic [ref=e494]:
        - strong [ref=e495]: Maya
        - generic [ref=e496]: Have you eaten?
      - generic [ref=e500]:
        - strong [ref=e501]: Sophie
        - generic [ref=e502]: Oh, don't start.
      - generic [ref=e506]:
        - strong [ref=e507]: Maya
        - generic [ref=e508]: That's a no.
      - generic [ref=e512]:
        - strong [ref=e513]: Sophie
        - generic [ref=e514]: I had toast.
      - generic [ref=e518]:
        - strong [ref=e519]: Maya
        - generic [ref=e520]: When?
      - generic [ref=e524]:
        - strong [ref=e525]: Sophie
        - generic [ref=e526]: Why does that matter?
      - generic [ref=e530]:
        - strong [ref=e531]: Maya
        - generic [ref=e532]: Because yesterday you called a coffee a meal.
      - generic [ref=e536]:
        - strong [ref=e537]: Sophie
        - generic [ref=e538]: Coffee has calories.
      - generic [ref=e542]:
        - strong [ref=e543]: Lucas
        - generic [ref=e544]: This is the one argument Maya is going to win.
      - generic [ref=e548]:
        - strong [ref=e549]: Maya
        - generic [ref=e550]: Saving that message for posterity.
      - generic [ref=e554]:
        - strong [ref=e555]: Sophie
        - generic [ref=e556]: I hate both of you.
      - generic [ref=e560]:
        - strong [ref=e561]: Maya
        - generic [ref=e562]: Love you too.
      - generic [ref=e563]: Maya has a point. You should eat something.
      - generic [ref=e567]:
        - strong [ref=e568]: Sophie
        - generic [ref=e569]: Fantastic.
      - generic [ref=e570]: I've known you for approximately ten minutes and you're on her side already.
      - generic [ref=e578]:
        - strong [ref=e579]: Maya
        - generic [ref=e580]: Excellent judgement.
      - generic [ref=e582]:
        - strong [ref=e583]: Sophie
        - generic [ref=e584]: Fine.
      - generic [ref=e585]: Water. Food. Five minutes.
      - generic [ref=e593]:
        - strong [ref=e594]: Maya
        - generic [ref=e595]: Take ten.
      - generic [ref=e599]:
        - strong [ref=e600]: Sophie
        - generic [ref=e601]: Don't push your luck.
      - generic [ref=e602]: Sophie is offline.
      - generic [ref=e606]:
        - strong [ref=e607]: Lucas
        - generic [ref=e608]: Maya.
      - generic [ref=e612]:
        - strong [ref=e613]: Maya
        - generic [ref=e614]: Mm?
      - generic [ref=e618]:
        - strong [ref=e619]: Lucas
        - generic [ref=e620]: You're taking this very calmly.
      - generic [ref=e624]:
        - strong [ref=e625]: Maya
        - generic [ref=e626]: I'm not calm.
      - generic [ref=e630]:
        - strong [ref=e631]: Lucas
        - generic [ref=e632]: You're making jokes with someone we don't know.
      - generic [ref=e634]:
        - strong [ref=e635]: Maya
        - generic [ref=e636]: I also made a joke with a delivery driver this morning.
      - generic [ref=e637]: It didn't make him my best friend.
      - generic [ref=e645]:
        - strong [ref=e646]: Lucas
        - generic [ref=e647]: That's not the same thing.
      - generic [ref=e649]:
        - strong [ref=e650]: Maya
        - generic [ref=e651]: No. It isn't.
      - generic [ref=e652]: But being polite isn't permission to share everything with someone.
      - generic [ref=e660]:
        - strong [ref=e661]: Lucas
        - generic [ref=e662]: Good.
      - generic [ref=e666]:
        - strong [ref=e667]: Maya
        - generic [ref=e668]: The person you're discussing is still here, you know.
      - generic [ref=e672]:
        - strong [ref=e673]: Lucas
        - generic [ref=e674]: I know.
      - generic [ref=e678]:
        - strong [ref=e679]: Maya
        - generic [ref=e680]: Then perhaps stop talking about them like furniture.
      - generic [ref=e681]: I can read all of this, just so you know.
      - generic [ref=e687]:
        - strong [ref=e688]: Maya
        - generic [ref=e689]: I tried to tell him.
      - generic [ref=e693]:
        - strong [ref=e694]: Lucas
        - generic [ref=e695]: I wasn't hiding anything.
      - generic [ref=e696]: Clearly.
      - generic [ref=e700]:
        - strong [ref=e701]: Maya
        - generic [ref=e702]: Please don't encourage him.
      - generic [ref=e703]: Lucas, I know you're trying to protect this group.
      - generic [ref=e711]:
        - strong [ref=e712]: Lucas
        - generic [ref=e713]: Somebody has to.
      - generic [ref=e717]:
        - strong [ref=e718]: Maya
        - generic [ref=e719]: We all are.
      - generic [ref=e723]:
        - strong [ref=e724]: Lucas
        - generic [ref=e725]: Then why am I the only one saying this is dangerous?
      - generic [ref=e729]:
        - strong [ref=e730]: Maya
        - generic [ref=e731]: Because you're the only one saying it like everyone's already guilty.
      - generic [ref=e735]:
        - strong [ref=e736]: Lucas
        - generic [ref=e737]: I didn't say that.
      - generic [ref=e741]:
        - strong [ref=e742]: Maya
        - generic [ref=e743]: I know you didn't use those words.
      - generic [ref=e747]:
        - strong [ref=e748]: Lucas
        - generic [ref=e749]: What exactly do you want from me?
      - generic [ref=e753]:
        - strong [ref=e754]: Maya
        - generic [ref=e755]: For you to ask a question, accept an answer, and think about it before asking the same question louder.
      - generic [ref=e757]:
        - strong [ref=e758]: Lucas
        - generic [ref=e759]: Fine.
      - generic [ref=e760]: One more question.
      - generic [ref=e763]: And I'm asking you, not Sophie.
      - generic [ref=e766]: Why did you stay?
      - generic [ref=e771]: Sophie asked me to.
      - generic [ref=e775]:
        - strong [ref=e776]: Lucas
        - generic [ref=e777]: That I understand.
      - generic [ref=e778]: Doesn't explain what you want out of this.
      - generic [ref=e786]:
        - strong [ref=e787]: Maya
        - generic [ref=e788]: They don't need a five-year plan for accepting an invitation.
      - generic [ref=e789]: Sophie is online.
      - generic [ref=e791]:
        - strong [ref=e792]: Sophie
        - generic [ref=e793]: I'm back.
      - generic [ref=e794]: With actual food, before anyone asks.
      - generic [ref=e802]:
        - strong [ref=e803]: Maya
        - generic [ref=e804]: Photo or it didn't happen.
      - generic [ref=e808]:
        - strong [ref=e809]: Sophie
        - generic [ref=e810]: I'm not sending you a picture of bread.
      - generic [ref=e814]:
        - strong [ref=e815]: Lucas
        - generic [ref=e816]: We can verify the bread later.
      - generic [ref=e818]:
        - strong [ref=e819]: Sophie
        - generic [ref=e820]: 😂
      - generic [ref=e821]: Wait.
      - generic [ref=e824]: Why are you being funny?
      - generic [ref=e832]:
        - strong [ref=e833]: Lucas
        - generic [ref=e834]: I have a personality outside this conversation.
      - generic [ref=e836]:
        - strong [ref=e837]: Maya
        - generic [ref=e838]: Allegedly.
      - generic [ref=e839]: Soph, we still need to talk about what happened.
      - generic [ref=e847]:
        - strong [ref=e848]: Sophie
        - generic [ref=e849]: I know.
      - generic [ref=e853]:
        - strong [ref=e854]: Maya
        - generic [ref=e855]: You invited someone without asking the rest of us.
      - generic [ref=e859]:
        - strong [ref=e860]: Sophie
        - generic [ref=e861]: I know that too.
      - generic [ref=e865]:
        - strong [ref=e866]: Lucas
        - generic [ref=e867]: Then promise you won't do it again.
      - generic [ref=e871]:
        - strong [ref=e872]: Sophie
        - generic [ref=e873]: I can't promise I'll never make another bad decision.
      - generic [ref=e877]:
        - strong [ref=e878]: Lucas
        - generic [ref=e879]: That's not what I'm asking.
      - generic [ref=e883]:
        - strong [ref=e884]: Sophie
        - generic [ref=e885]: It sounds like it.
      - generic [ref=e887]:
        - strong [ref=e888]: Maya
        - generic [ref=e889]: It can be simpler than that.
      - generic [ref=e890]: No more sharing private things without agreement. Not until we know what we're sharing.
      - generic [ref=e898]:
        - strong [ref=e899]: Sophie
        - generic [ref=e900]: Okay.
      - generic [ref=e904]:
        - strong [ref=e905]: Lucas
        - generic [ref=e906]: Okay?
      - generic [ref=e908]:
        - strong [ref=e909]: Sophie
        - generic [ref=e910]: Yes. Okay.
      - generic [ref=e911]: Is there a form I should sign?
      - generic [ref=e919]:
        - strong [ref=e920]: Maya
        - generic [ref=e921]: Sophie.
      - generic [ref=e923]:
        - strong [ref=e924]: Sophie
        - generic [ref=e925]: Sorry.
      - generic [ref=e926]: I'm trying.
      - generic [ref=e931]: I can leave if it makes the conversation easier.
      - generic [ref=e937]:
        - strong [ref=e938]: Sophie
        - generic [ref=e939]: I don't want you to leave because we can't agree on something.
      - generic [ref=e943]:
        - strong [ref=e944]: Maya
        - generic [ref=e945]: You can decide that yourself. Not under pressure.
      - generic [ref=e949]:
        - strong [ref=e950]: Lucas
        - generic [ref=e951]: I wouldn't stop you.
      - generic [ref=e953]:
        - strong [ref=e954]: Maya
        - generic [ref=e955]: I think that's enough about the invitation.
      - generic [ref=e956]: Could we agree to stop treating possibilities like facts, too?
      - generic [ref=e964]:
        - strong [ref=e965]: Lucas
        - generic [ref=e966]: Such as?
      - generic [ref=e970]:
        - strong [ref=e971]: Maya
        - generic [ref=e972]: The timeline.
      - generic [ref=e976]:
        - strong [ref=e977]: Sophie
        - generic [ref=e978]: Maya.
      - generic [ref=e980]:
        - strong [ref=e981]: Maya
        - generic [ref=e982]: I'm not going into it here.
      - generic [ref=e983]: I just don't want a repeat of yesterday.
      - generic [ref=e991]:
        - strong [ref=e992]: Lucas
        - generic [ref=e993]: Yesterday happened because somebody said they'd seen Daniel later than anyone else.
      - generic [ref=e997]:
        - strong [ref=e998]: Sophie
        - generic [ref=e999]: We said we'd check that properly.
      - generic [ref=e1001]:
        - strong [ref=e1002]: Maya
        - generic [ref=e1003]: Exactly.
      - generic [ref=e1004]: Someone remembers a time. Someone else remembers a message.
      - generic [ref=e1007]: Nobody has confirmed how they fit together.
      - generic [ref=e1015]:
        - strong [ref=e1016]: Lucas
        - generic [ref=e1017]: And yet people keep talking like we have a final answer.
      - generic [ref=e1021]:
        - strong [ref=e1022]: Sophie
        - generic [ref=e1023]: No one here thinks we do.
      - generic [ref=e1027]:
        - strong [ref=e1028]: Lucas
        - generic [ref=e1029]: I'm not convinced.
      - generic [ref=e1031]:
        - strong [ref=e1032]: Maya
        - generic [ref=e1033]: Lucas.
      - generic [ref=e1034]: The last thing any of us needs is to turn fear into certainty.
      - generic [ref=e1039]: What happened that night?
      - generic [ref=e1045]:
        - strong [ref=e1046]: Lucas
        - generic [ref=e1047]: That's exactly the sort of detail I'm not ready to share here.
      - generic [ref=e1049]:
        - strong [ref=e1050]: Maya
        - generic [ref=e1051]: And that's okay.
      - generic [ref=e1052]: What we can say is that the timeline isn't settled.
      - generic [ref=e1057]: Maya deleted a message.
      - generic [ref=e1061]:
        - strong [ref=e1062]: Sophie
        - generic [ref=e1063]: Maya?
      - generic [ref=e1065]:
        - strong [ref=e1066]: Maya
        - generic [ref=e1067]: Sorry.
      - generic [ref=e1068]: I was typing about the last time I spoke to Daniel.
      - generic [ref=e1071]: Then I read it back and realised half of it was me guessing what he meant.
      - generic [ref=e1079]:
        - strong [ref=e1080]: Sophie
        - generic [ref=e1081]: Oh.
      - generic [ref=e1085]:
        - strong [ref=e1086]: Maya
        - generic [ref=e1087]: I don't want to turn that into evidence just because I'm upset.
      - generic [ref=e1091]:
        - strong [ref=e1092]: Lucas
        - generic [ref=e1093]: You could've just said that without deleting it.
      - generic [ref=e1097]:
        - strong [ref=e1098]: Maya
        - generic [ref=e1099]: I just said it.
      - generic [ref=e1103]:
        - strong [ref=e1104]: Lucas
        - generic [ref=e1105]: After we all saw that you'd deleted something.
      - generic [ref=e1109]:
        - strong [ref=e1110]: Maya
        - generic [ref=e1111]: Lucas.
      - generic [ref=e1115]:
        - strong [ref=e1116]: Lucas
        - generic [ref=e1117]: What?
      - generic [ref=e1121]:
        - strong [ref=e1122]: Maya
        - generic [ref=e1123]: Not every deleted message is a conspiracy.
      - generic [ref=e1127]:
        - strong [ref=e1128]: Sophie
        - generic [ref=e1129]: Can we call it a night?
      - generic [ref=e1133]:
        - strong [ref=e1134]: Lucas
        - generic [ref=e1135]: We said that yesterday.
      - generic [ref=e1139]:
        - strong [ref=e1140]: Sophie
        - generic [ref=e1141]: I know.
      - generic [ref=e1145]:
        - strong [ref=e1146]: Lucas
        - generic [ref=e1147]: And the day before.
      - generic [ref=e1151]:
        - strong [ref=e1152]: Maya
        - generic [ref=e1153]: We don't have to solve anything in this chat tonight.
      - generic [ref=e1157]:
        - strong [ref=e1158]: Lucas
        - generic [ref=e1159]: That's easy to say when nobody will admit we're running out of things to try.
      - generic [ref=e1163]:
        - strong [ref=e1164]: Sophie
        - generic [ref=e1165]: I haven't stopped trying.
      - generic [ref=e1167]:
        - strong [ref=e1168]: Lucas
        - generic [ref=e1169]: I know you haven't.
      - generic [ref=e1170]: I just don't think all of this is helping.
      - generic [ref=e1178]:
        - strong [ref=e1179]: Sophie
        - generic [ref=e1180]: Then what would help?
      - generic [ref=e1184]:
        - strong [ref=e1185]: Lucas
        - generic [ref=e1186]: Not inviting people we can't identify into private conversations, for a start.
      - generic [ref=e1190]:
        - strong [ref=e1191]: Sophie
        - generic [ref=e1192]: They're still here, Lucas.
      - generic [ref=e1196]:
        - strong [ref=e1197]: Lucas
        - generic [ref=e1198]: Yes, I can see that.
      - generic [ref=e1200]:
        - strong [ref=e1201]: Sophie
        - generic [ref=e1202]: Then stop talking as if they aren't.
      - generic [ref=e1203]: I thought one more person might make something clearer.
      - generic [ref=e1206]: Instead I've made everyone angrier.
      - generic [ref=e1211]: I don't think arguing is helping anyone.
      - generic [ref=e1217]:
        - strong [ref=e1218]: Maya
        - generic [ref=e1219]: You're right.
      - generic [ref=e1223]:
        - strong [ref=e1224]: Sophie
        - generic [ref=e1225]: I know.
      - generic [ref=e1227]:
        - strong [ref=e1228]: Lucas
        - generic [ref=e1229]: I know too.
      - generic [ref=e1230]: Do you know what the worst part is?
      - generic [ref=e1233]: I keep opening this chat and expecting him to have written something.
      - generic [ref=e1241]:
        - strong [ref=e1242]: Sophie
        - generic [ref=e1243]: Me too.
      - generic [ref=e1245]:
        - strong [ref=e1246]: Lucas
        - generic [ref=e1247]: I know.
      - generic [ref=e1248]: And I can't stand it.
      - generic [ref=e1256]:
        - strong [ref=e1257]: Maya
        - generic [ref=e1258]: Lucas...
      - generic [ref=e1260]:
        - strong [ref=e1261]: Lucas
        - generic [ref=e1262]: There are conversations I should've had with him.
      - generic [ref=e1263]: Stuff I thought there'd be time for.
      - generic [ref=e1266]: I keep thinking if I knew where to start looking, we could actually do something.
      - generic [ref=e1269]: Instead we're fighting about a star beside a number.
      - generic [ref=e1277]:
        - strong [ref=e1278]: Sophie
        - generic [ref=e1279]: We don't know if it's meaningless.
      - generic [ref=e1281]:
        - strong [ref=e1282]: Lucas
        - generic [ref=e1283]: I know.
      - generic [ref=e1284]: That's what makes it worse.
      - generic [ref=e1292]:
        - strong [ref=e1293]: Maya
        - generic [ref=e1294]: Nobody here knows what to do yet.
      - generic [ref=e1298]:
        - strong [ref=e1299]: Lucas
        - generic [ref=e1300]: That's the first thing that's sounded true all evening.
      - generic [ref=e1304]:
        - strong [ref=e1305]: Sophie
        - generic [ref=e1306]: Lucas, that's not fair.
      - generic [ref=e1308]:
        - strong [ref=e1309]: Lucas
        - generic [ref=e1310]: Probably not.
      - generic [ref=e1311]: I'm not being very fair tonight.
      - generic [ref=e1314]: I need to put my phone away.
      - generic [ref=e1322]:
        - strong [ref=e1323]: Maya
        - generic [ref=e1324]: Do that, then.
      - generic [ref=e1328]:
        - strong [ref=e1329]: Lucas
        - generic [ref=e1330]: I'm serious.
      - generic [ref=e1332]:
        - strong [ref=e1333]: Maya
        - generic [ref=e1334]: So am I.
      - generic [ref=e1335]: Take a break. We can talk tomorrow.
      - generic [ref=e1343]:
        - strong [ref=e1344]: Lucas
        - generic [ref=e1345]: Not if we're going to keep doing this.
      - generic [ref=e1349]:
        - strong [ref=e1350]: Sophie
        - generic [ref=e1351]: Doing what?
      - generic [ref=e1355]:
        - strong [ref=e1356]: Lucas
        - generic [ref=e1357]: Guessing who to trust and calling it progress.
      - generic [ref=e1358]: You don't have to trust me.
      - generic [ref=e1362]:
        - strong [ref=e1363]: Lucas
        - generic [ref=e1364]: I don't.
      - generic [ref=e1365]: Not yet.
      - generic [ref=e1368]: It's nothing personal.
      - generic [ref=e1371]: Sophie.
      - generic [ref=e1379]:
        - strong [ref=e1380]: Sophie
        - generic [ref=e1381]: Yeah?
      - generic [ref=e1385]:
        - strong [ref=e1386]: Lucas
        - generic [ref=e1387]: Please be careful.
      - generic [ref=e1391]:
        - strong [ref=e1392]: Sophie
        - generic [ref=e1393]: I am trying to be.
      - generic [ref=e1395]:
        - strong [ref=e1396]: Lucas
        - generic [ref=e1397]: I know.
      - generic [ref=e1398]: I just don't want you hurt because we were desperate for an answer.
      - generic [ref=e1406]:
        - strong [ref=e1407]: Sophie
        - generic [ref=e1408]: I don't want that either.
      - generic [ref=e1412]:
        - strong [ref=e1413]: Maya
        - generic [ref=e1414]: Lucas, are you leaving the chat or just going offline?
      - generic [ref=e1416]:
        - strong [ref=e1417]: Lucas
        - generic [ref=e1418]: I don't know.
      - generic [ref=e1419]: I need some space from this group.
      - generic [ref=e1425]:
        - strong [ref=e1426]: Sophie
        - generic [ref=e1427]: Okay.
      - generic [ref=e1428]: Just don't shut us out completely.
      - generic [ref=e1434]:
        - strong [ref=e1435]: Lucas
        - generic [ref=e1436]: I'm not shutting you out.
      - generic [ref=e1437]: I'm trying not to say something that makes it harder to come back.
      - generic [ref=e1442]: Lucas left the group.
      - generic [ref=e1444]:
        - strong [ref=e1445]: Sophie
        - generic [ref=e1446]: ...
      - generic [ref=e1447]: He actually left.
      - generic [ref=e1455]:
        - strong [ref=e1456]: Maya
        - generic [ref=e1457]: He'll be alright.
      - generic [ref=e1461]:
        - strong [ref=e1462]: Sophie
        - generic [ref=e1463]: You don't know that.
      - generic [ref=e1465]:
        - strong [ref=e1466]: Maya
        - generic [ref=e1467]: No.
      - generic [ref=e1468]: I don't.
      - generic [ref=e1471]: I just know he cares about Daniel.
      - generic [ref=e1479]:
        - strong [ref=e1480]: Sophie
        - generic [ref=e1481]: I know.
      - generic [ref=e1485]:
        - strong [ref=e1486]: Maya
        - generic [ref=e1487]: Sophie, we should talk separately.
      - generic [ref=e1491]:
        - strong [ref=e1492]: Sophie
        - generic [ref=e1493]: Can it wait?
      - generic [ref=e1495]:
        - strong [ref=e1496]: Maya
        - generic [ref=e1497]: Yeah.
      - generic [ref=e1498]: It can wait.
      - generic [ref=e1506]:
        - strong [ref=e1507]: Sophie
        - generic [ref=e1508]: Thank you.
      - generic [ref=e1512]:
        - strong [ref=e1513]: Maya
        - generic [ref=e1514]: Please get some sleep.
      - generic [ref=e1518]:
        - strong [ref=e1519]: Sophie
        - generic [ref=e1520]: You too.
      - generic [ref=e1521]: Maya is offline.
      - generic [ref=e1523]:
        - strong [ref=e1524]: Sophie
        - generic [ref=e1525]: Well.
      - generic [ref=e1526]: That went beautifully.
      - generic [ref=e1529]: I think I deserve some kind of award for making things worse.
      - generic [ref=e1534]: I didn't mean to cause trouble.
      - generic [ref=e1538]:
        - strong [ref=e1539]: Sophie
        - generic [ref=e1540]: You didn't.
      - generic [ref=e1541]: This didn't start when you arrived.
      - generic [ref=e1544]: You just got the front-row seat.
      - generic [ref=e1547]: I should explain something to you.
      - generic [ref=e1550]: Not the whole story.
      - generic [ref=e1553]: I don't think I even know the whole story.
      - generic [ref=e1556]: But enough so you understand why I wrote to you.
      - generic [ref=e1559]: Could we talk somewhere else?
      - generic [ref=e1562]: Just you and me.
      - generic [ref=e1565]: I don't want to start another argument in here.
      - generic [ref=e1570]: Sure. Message me.
      - generic [ref=e1574]:
        - strong [ref=e1575]: Sophie
        - generic [ref=e1576]: Okay.
      - generic [ref=e1577]: Thanks.
      - generic [ref=e1580]: And, um...
      - generic [ref=e1583]: Thanks for staying as long as you did.
      - generic [ref=e1586]: I know this wasn't what you signed up for.
      - generic [ref=e1591]: Sophie is offline.
    - button "6 new · Jump to latest" [ref=e1592] [cursor=pointer]
  - complementary "Incoming notification":
    - generic [ref=e1593]:
      - button "Open notification from FIND DANIEL" [ref=e1594] [cursor=pointer]:
        - generic [ref=e1596]:
          - generic [ref=e1597]:
            - text: MESSAGES
            - time [ref=e1598]: now
          - strong [ref=e1599]: FIND DANIEL
          - generic [ref=e1600]: "Sophie: I know this wasn't what you signed up for."
      - button "Dismiss notification" [ref=e1601] [cursor=pointer]
  - navigation "Phone navigation" [ref=e1605]:
    - button "Go home" [ref=e1606] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { actIFinalManifest } from '../../src/content/actIFinal'
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
  41  |   for (const entry of actIFinalManifest.filter(m=>m.id.startsWith('OPEN-S01-'))) {
  42  |     const beat={id:entry.id.slice(-2)}
  43  |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', entry.id)
  44  |     const before = await page.locator('.opening-bubble.player').count()
  45  |     await page.locator('.scene01-options .opening-choice').first().click()
  46  |     if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
  47  |     await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  48  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  49  |     await page.clock.runFor(60_000)
  50  |   }
  51  |   await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  52  |   await page.getByRole('button', { name: 'Open FIND DANIEL →', exact: true }).click()
  53  |   await page.clock.runFor(180_000)
  54  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  55  |   for (let number = 1; number <= 12; number++) {
  56  |     await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
  57  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  58  |     await page.locator('.scene01-options .opening-choice').first().click()
  59  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  60  |     await page.clock.runFor(180_000)
  61  |     // Embedded player lines are still individually selected and sent.
  62  |     while (await page.locator('.scene01-options .opening-choice').count() === 1) {
  63  |       const before = await group.locator('.opening-bubble.player').count()
  64  |       await page.clock.runFor(1000)
  65  |       await expect(group.locator('.opening-bubble.player')).toHaveCount(before)
  66  |       await page.locator('.scene01-options .opening-choice').first().click()
  67  |       await page.getByRole('button', { name: 'Send', exact: true }).click()
  68  |       await page.clock.runFor(180_000)
  69  |     }
  70  |     if(number===9){await page.getByRole('button',{name:'LATER',exact:true}).click();await page.clock.runFor(180_000)}
  71  |   }
  72  |   await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  73  |   await expect(page.getByLabel('Group participants')).toContainText('3 members')
  74  |   await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  75  |   await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  76  |   await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(1)
  77  |   await expect(group.getByText('Could we talk somewhere else?', { exact: true })).toBeVisible()
  78  |   await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  79  |   await reply(page, 'Sure. Message me.', false)
  80  |   await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  81  |   await reachPending(page)
  82  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  83  |   await page.clock.pauseAt(await page.evaluate(() => Date.now()+250))
  84  |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  85  |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
> 86  |   expect(remaining).toBeGreaterThan(4500)
      |                     ^ Error: expect(received).toBeGreaterThan(expected)
  87  |   expect(remaining).toBeLessThanOrEqual(5500)
  88  |   await page.clock.runFor(remaining - 1)
  89  |   expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
  90  |   await page.clock.runFor(1)
  91  |   const banner = page.getByLabel('Incoming notification', { exact: true })
  92  |   await expect(banner).toContainText('Sophie')
  93  |   await expect(banner).toContainText('Hey.')
  94  |   await expect(banner).toContainText('Tap to open conversation')
  95  |   await expect(group).toBeVisible()
  96  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  97  |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  98  |   await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  99  |   await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  100 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  101 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\. You got a minute\?$/ })).toHaveCount(1)
  102 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  103 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  104 | })
  105 | 
  106 | test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  107 |   await seedScene(page, sceneAt('G13'))
  108 |   // Assertions/reload must not consume the deadline under parallel browser load.
  109 |   await page.clock.pauseAt(await page.evaluate(() => Date.now()+250))
  110 |   await openGroup(page)
  111 |   await reply(page, 'Sure.', false)
  112 |   await reachPending(page)
  113 |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  114 |   await page.clock.runFor(1000)
  115 |   await page.reload()
  116 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  117 |   await openGroup(page)
  118 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  119 |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  120 |   await page.clock.runFor(remaining - 1)
  121 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  122 |   await page.clock.runFor(1)
  123 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  124 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  125 |   await page.reload()
  126 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  127 |   await page.clock.runFor(20_000)
  128 |   expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  129 |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  130 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  131 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  132 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  133 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  134 | })
  135 | 
  136 | test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  137 |   const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  138 |   const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  139 |   scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  140 |   scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  141 |   scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  142 |   save.deliveredEvents = save.deliveredEvents.filter(keep)
  143 |   const beforeRelationships = save.relationships
  144 |   await seedScene(page, save)
  145 |   await openGroup(page)
  146 |   await page.clock.runFor(180_000)
  147 |   await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  148 |   await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  149 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  150 |   expect((await stored(page)).relationships).toEqual(beforeRelationships)
  151 | })
  152 | 
  153 | test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  154 |   await seedScene(page, sceneAt('G11'))
  155 |   await openGroup(page)
  156 |   await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  157 |   await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
  158 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
  159 |   await reply(page, "You haven't exactly ruled it out.")
  160 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  161 |   await expect(page.getByRole('button', { name: "I didn't mean to cause trouble.", exact: true })).toBeVisible()
  162 |   await reply(page, /You don't have to fix everything tonight, Sophie/)
  163 |   await expect(page.getByRole('button', { name: "You're trying to help someone you care about.", exact: true })).toBeVisible()
  164 |   await reply(page, "You're trying to help someone you care about.")
  165 |   await expect(page.getByRole('button', { name: 'Sure.', exact: true })).toBeVisible()
  166 |   expect((await stored(page)).prologue!.scene01!.groupComplete).not.toBe(true)
  167 | })
  168 | 
```