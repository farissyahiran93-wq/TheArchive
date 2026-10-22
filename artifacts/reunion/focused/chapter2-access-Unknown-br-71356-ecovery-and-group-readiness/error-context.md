# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-access.spec.ts >> Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness
- Location: tests\e2e\chapter2-access.spec.ts:58:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'I\'m here.', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'I\'m here.', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'I\'m here.', exact: true })

```

```yaml
- text: 8:58 PM
- region "FIND DANIEL conversation":
  - button "Back to inbox"
  - strong: FIND DANIEL
  - text: Maya, Eli, Lucas, Sophie You joined FIND DANIEL.
  - strong: Sophie
  - text: Hey, everyone.
  - strong: Sophie
  - text: Before anyone says anything...
  - strong: Sophie
  - text: I added someone.
  - strong: Maya
  - text: You added someone?
  - strong: Sophie
  - text: Yes.
  - strong: Maya
  - text: Sophie.
  - strong: Maya
  - text: We literally talked about this.
  - strong: Sophie
  - text: I know.
  - strong: Lucas
  - text: Who?
  - strong: Lucas
  - text: Who did you add?
  - strong: Sophie
  - text: The number I told you about.
  - strong: Maya
  - text: Wait.
  - strong: Maya
  - text: You actually contacted it?
  - strong: Sophie
  - text: Yeah.
  - strong: Lucas
  - text: You've got to be kidding me.
  - strong: Sophie
  - text: Lucas, please.
  - strong: Lucas
  - text: Please what?
  - strong: Lucas
  - text: We don't even know who this is.
  - strong: Maya
  - text: Can we just calm down for a second?
  - strong: Lucas
  - text: I'm calm.
  - strong: Maya
  - text: You're really not.
  - strong: Lucas
  - text: Fine.
  - strong: Lucas
  - text: Then maybe our new guest would like to explain why they're here. Hi. I'm just as confused as you are.
  - strong: Lucas
  - text: Great.
  - strong: Lucas
  - text: That makes two of us.
  - strong: Maya
  - text: At least they're being honest.
  - strong: Lucas
  - text: Or they know how to sound honest.
  - strong: Sophie
  - text: Lucas.
  - strong: Lucas
  - text: What?
  - strong: Lucas
  - text: I'm allowed to have questions.
  - strong: Lucas
  - text: Alright.
  - strong: Lucas
  - text: Let's start with something simple.
  - strong: Lucas
  - text: Do you know Daniel? No. I've never met him.
  - strong: Lucas
  - text: Then why was your number saved? That's what I'd like to know.
  - strong: Maya
  - text: Fair enough.
  - strong: Sophie
  - text: See? That's why I added them.
  - strong: Lucas
  - text: That doesn't answer anything.
  - strong: Lucas
  - text: So let me get this straight.
  - strong: Lucas
  - text: Daniel had your number.
  - strong: Lucas
  - text: You don't know Daniel.
  - strong: Lucas
  - text: And you have absolutely no idea why he saved it.
  - strong: Sophie
  - text: That's what we're trying to figure out.
  - strong: Lucas
  - text: Doesn't that seem a little convenient to anyone else?
  - strong: Maya
  - text: Convenient for who?
  - strong: Lucas
  - text: I don't know, Maya.
  - strong: Lucas
  - text: That's the problem.
  - strong: Sophie
  - text: Maybe he saved the wrong number.
  - strong: Maya
  - text: Possible.
  - strong: Lucas
  - text: Sure.
  - strong: Lucas
  - text: And maybe this is all one big misunderstanding.
  - strong: Maya
  - text: It could be.
  - strong: Lucas
  - text: You don't actually believe that.
  - strong: Maya
  - text: I believe we don't have enough information.
  - strong: Lucas
  - text: Fine.
  - strong: Lucas
  - text: Let's ask something else.
  - strong: Sophie
  - text: Lucas, don't start.
  - strong: Lucas
  - text: It's a question, Sophie.
  - strong: Lucas
  - text: Where were you three nights ago?
  - strong: Maya
  - text: Oh, come on.
  - strong: Sophie
  - text: Lucas!
  - strong: Lucas
  - text: What?
  - strong: Lucas
  - text: We don't know anything about this person.
  - strong: Maya
  - text: And you think asking for an alibi is going to help?
  - strong: Lucas
  - text: It might. That's none of your business.
  - strong: Lucas
  - text: See?
  - strong: Lucas
  - text: Already being difficult.
  - strong: Maya
  - text: No, they're setting a boundary.
  - strong: Sophie
  - text: I wouldn't answer that either.
  - strong: Lucas
  - text: Of course you wouldn't.
  - strong: Maya
  - text: Okay.
  - strong: Maya
  - text: Enough with the questions about where people were.
  - strong: Maya
  - text: We barely know who's on the other side of the screen.
  - strong: Lucas
  - text: Exactly my point.
  - strong: Maya
  - text: No. Your point was to accuse them before we know anything.
  - strong: Lucas
  - text: I'm trying to be careful.
  - strong: Maya
  - text: Then be careful.
  - strong: Maya
  - text: Not cruel.
  - strong: Sophie
  - text: Can I explain why I thought adding them was a good idea?
  - strong: Lucas
  - text: You could try.
  - strong: Maya
  - text: Go ahead, Soph.
  - strong: Sophie
  - text: There was a contact list.
  - strong: Sophie
  - text: Daniel's.
  - strong: Sophie
  - text: I already told you about it.
  - strong: Maya
  - text: Right.
  - strong: Sophie
  - text: And the number didn't have a name.
  - strong: Lucas
  - text: We know.
  - strong: Sophie
  - text: I'm getting there.
  - strong: Sophie
  - text: There was something beside it.
  - strong: Sophie
  - text: Some kind of note.
  - strong: Maya
  - text: You said you couldn't read it.
  - strong: Sophie
  - text: I couldn't.
  - strong: Sophie
  - text: Not properly.
  - strong: Lucas
  - text: So we have a number and a note you can't read.
  - strong: Lucas
  - text: Fantastic.
  - strong: Sophie
  - text: Could you not?
  - strong: Maya
  - text: Did you find anything new in the note?
  - strong: Sophie
  - text: No.
  - strong: Maya
  - text: Then why bring it up?
  - strong: Sophie
  - text: Because Daniel didn't usually keep numbers like that.
  - strong: Lucas
  - text: ...
  - strong: Lucas
  - text: What do you mean?
  - strong: Sophie
  - text: Just that.
  - strong: Sophie
  - text: It stood out.
  - strong: Maya
  - text: You've been going through a lot of his things.
  - strong: Maya
  - text: Maybe you're seeing patterns that aren't there.
  - strong: Sophie
  - text: Maybe.
  - strong: Sophie
  - text: But what if I'm not? Can I see the note?
  - strong: Sophie
  - text: I don't have a clear copy.
  - strong: Sophie
  - text: And I don't want to send you something I haven't checked.
  - strong: Lucas
  - text: For once, I agree with Sophie.
  - strong: Maya
  - text: Could you at least keep the original?
  - strong: Sophie
  - text: Of course.
  - strong: Maya
  - text: Sophie, can you check something for me?
  - strong: Sophie
  - text: Yeah?
  - strong: Maya
  - text: Was the note already damaged when you found it?
  - strong: Sophie
  - text: I think so.
  - strong: Maya
  - text: You think?
  - strong: Sophie
  - text: I'm pretty sure.
  - strong: Lucas
  - text: Pretty sure isn't exactly reassuring.
  - strong: Sophie
  - text: Lucas, I am trying.
  - strong: Lucas
  - text: I know.
  - strong: Lucas
  - text: But we can't keep building theories around things nobody's verified.
  - strong: Maya
  - text: For once, that part is fair.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: I'll look at it again.
  - strong: Maya
  - text: Can we talk about something else for a second?
  - strong: Lucas
  - text: Like what?
  - strong: Maya
  - text: Whether anyone's actually eaten today.
  - strong: Sophie
  - text: Maya...
  - strong: Maya
  - text: I'm serious.
  - strong: Maya
  - text: You were still awake when I went to bed.
  - strong: Sophie
  - text: I slept.
  - strong: Maya
  - text: For how long?
  - strong: Sophie
  - text: Enough.
  - strong: Maya
  - text: That's not a number.
  - strong: Sophie
  - text: You're starting to sound like my mother.
  - strong: Maya
  - text: Someone has to.
  - strong: Lucas
  - text: I ate.
  - strong: Maya
  - text: Congratulations, Lucas.
  - strong: Lucas
  - text: You asked.
  - strong: Maya
  - text: I did.
  - strong: Sophie
  - text: 😂
  - strong: Maya
  - text: There. See?
  - strong: Maya
  - text: She still remembers how to laugh.
  - strong: Sophie
  - text: Barely.
  - strong: Lucas
  - text: It isn't funny.
  - strong: Maya
  - text: Nobody said the situation was funny.
  - strong: Lucas
  - text: Then can we stay focused?
  - strong: Maya
  - text: We can be worried and still act like human beings. Maya has a point. You all sound exhausted.
  - strong: Maya
  - text: Thank you.
  - strong: Sophie
  - text: I probably am.
  - strong: Lucas
  - text: I'm fine.
  - strong: Maya
  - text: That's exactly what an exhausted person would say.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: I'm getting some water.
  - strong: Maya
  - text: Finally.
  - strong: Sophie
  - text: Don't celebrate yet.
  - strong: Sophie
  - text: I'll be back in like two minutes.
  - strong: Maya
  - text: Progress is progress. Sophie is offline.
  - strong: Lucas
  - text: Maya.
  - strong: Maya
  - text: What?
  - strong: Lucas
  - text: You're being awfully relaxed about this.
  - strong: Maya
  - text: About what?
  - strong: Lucas
  - text: This person.
  - strong: Maya
  - text: I'm not relaxed.
  - strong: Lucas
  - text: You're joking with them.
  - strong: Maya
  - text: That doesn't mean I trust them.
  - strong: Lucas
  - text: Good.
  - strong: Lucas
  - text: Because I don't.
  - strong: Maya
  - text: You made that pretty clear.
  - strong: Lucas
  - text: I don't understand why Sophie is doing this.
  - strong: Maya
  - text: She's scared.
  - strong: Lucas
  - text: We're all scared.
  - strong: Maya
  - text: I know.
  - strong: Lucas
  - text: And that doesn't mean we invite strangers into everything.
  - strong: Maya
  - text: You're still here, by the way.
  - strong: Lucas
  - text: What?
  - strong: Maya
  - text: The person you're talking about.
  - strong: Maya
  - text: They're still in the group.
  - strong: Lucas
  - text: I know.
  - strong: Maya
  - text: Then maybe stop talking about them like they aren't. I can read everything you're saying, you know.
  - strong: Maya
  - text: Exactly.
  - strong: Lucas
  - text: I wasn't trying to hide it. Clearly.
  - strong: Maya
  - text: Lucas, just stop digging.
  - strong: Maya
  - text: Listen.
  - strong: Maya
  - text: I'm not going to pretend this isn't strange.
  - strong: Maya
  - text: I don't know you.
  - strong: Maya
  - text: And I don't know what your number means.
  - strong: Maya
  - text: But I also don't think it's fair to assume the worst just because we don't have an answer.
  - strong: Lucas
  - text: That goes both ways.
  - strong: Maya
  - text: It does.
  - strong: Lucas
  - text: Fine.
  - strong: Lucas
  - text: Then answer one thing.
  - strong: Lucas
  - text: Why are you still here? Because Sophie asked me to stay.
  - strong: Maya
  - text: Okay.
  - strong: Maya
  - text: That's a fair answer.
  - strong: Lucas
  - text: You're going to need a better reason eventually.
  - strong: Maya
  - text: They don't owe us a lifelong commitment, Lucas. Sophie is online.
  - strong: Sophie
  - text: Okay, I'm back.
  - strong: Sophie
  - text: What did I miss?
  - strong: Maya
  - text: Nothing.
  - strong: Lucas
  - text: Plenty.
  - strong: Sophie
  - text: ...
  - strong: Sophie
  - text: Oh no.
  - strong: Sophie
  - text: Please tell me you didn't start another argument.
  - strong: Maya
  - text: We were having a conversation.
  - strong: Lucas
  - text: A very educational one.
  - strong: Sophie
  - text: Lucas.
  - strong: Lucas
  - text: Sophie.
  - strong: Maya
  - text: Children.
  - strong: Sophie
  - text: 🙄
  - strong: Sophie
  - text: Look, I know adding someone without asking wasn't ideal.
  - strong: Lucas
  - text: It wasn't ideal?
  - strong: Sophie
  - text: Fine.
  - strong: Sophie
  - text: It was a bad call.
  - strong: Sophie
  - text: Is that what you want me to say?
  - strong: Lucas
  - text: I want you to understand why it was a bad call.
  - strong: Sophie
  - text: I understand.
  - strong: Lucas
  - text: Then why did you do it?
  - strong: Sophie
  - text: Because I'm tired of sitting here doing nothing!
  - strong: Sophie
  - text: Sorry.
  - strong: Sophie
  - text: I didn't mean to snap.
  - strong: Maya
  - text: It's okay.
  - strong: Lucas
  - text: No, it's not.
  - strong: Maya
  - text: Lucas...
  - strong: Lucas
  - text: We're making decisions because we're scared.
  - strong: Lucas
  - text: And we don't even know what we're risking.
  - strong: Sophie
  - text: I know!
  - strong: Sophie
  - text: Do you think I don't think about that?
  - strong: Lucas
  - text: Then start acting like it. I can leave if that's what everyone wants.
  - strong: Sophie
  - text: No.
  - strong: Sophie
  - text: That's not what I want.
  - strong: Maya
  - text: And we haven't asked you to leave.
  - strong: Lucas
  - text: I might.
  - strong: Maya
  - text: Lucas.
  - strong: Sophie
  - text: Fine.
  - strong: Sophie
  - text: What do you want me to do?
  - strong: Lucas
  - text: I want us to stop sharing things until we know who we're sharing them with.
  - strong: Maya
  - text: That seems reasonable.
  - strong: Sophie
  - text: So what?
  - strong: Sophie
  - text: We just ignore the number?
  - strong: Lucas
  - text: No.
  - strong: Lucas
  - text: We verify it.
  - strong: Sophie
  - text: How?
  - strong: Lucas
  - text: I don't know yet.
  - strong: Sophie
  - text: Exactly.
  - strong: Lucas
  - text: Not knowing how to do something doesn't mean we should do the first thing that comes to mind.
  - strong: Sophie
  - text: And waiting doesn't guarantee we'll learn anything!
  - strong: Maya
  - text: Can both of you stop for a second?
  - strong: Sophie
  - text: Sorry.
  - strong: Lucas
  - text: I'm listening.
  - strong: Maya
  - text: Nobody here knows what happened to Daniel.
  - strong: Maya
  - text: We keep going in circles.
  - strong: Maya
  - text: We don't even agree about what happened that night.
  - strong: Sophie
  - text: Maya.
  - strong: Maya
  - text: What?
  - strong: Sophie
  - text: Don't.
  - strong: Lucas
  - text: She's right.
  - strong: Maya
  - text: ...
  - strong: Lucas
  - text: We keep acting like we have all these answers.
  - strong: Lucas
  - text: But we don't.
  - strong: Sophie
  - text: Can we please not do this right now?
  - strong: Maya
  - text: I'm not trying to start anything.
  - strong: Maya
  - text: I'm just saying we need to stop mixing up what we know and what we think we know.
  - strong: Lucas
  - text: Exactly.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: You're right.
  - strong: Sophie
  - text: Both of you. What happened that night?
  - strong: Maya
  - text: That's what we're trying to establish.
  - strong: Lucas
  - text: Which is why we shouldn't be discussing it with someone we just met.
  - strong: Sophie
  - text: Lucas has a point.
  - strong: Sophie
  - text: Sorry.
  - strong: Sophie
  - text: I know that's frustrating. Maya deleted a message.
  - strong: Sophie
  - text: Maya?
  - strong: Maya
  - text: Sorry.
  - strong: Maya
  - text: Wrong chat.
  - strong: Lucas
  - text: What did you delete?
  - strong: Maya
  - text: A message meant for someone else.
  - strong: Lucas
  - text: About what?
  - strong: Maya
  - text: Something unrelated.
  - strong: Lucas
  - text: Right.
  - strong: Maya
  - text: Lucas.
  - strong: Lucas
  - text: What?
  - strong: Maya
  - text: Please don't make something out of nothing.
  - strong: Lucas
  - text: You know what bothers me the most?
  - strong: Sophie
  - text: What?
  - strong: Lucas
  - text: We keep saying we trust each other.
  - strong: Lucas
  - text: But the moment something goes wrong, suddenly everyone has something they don't want to explain.
  - strong: Maya
  - text: That's not fair.
  - strong: Lucas
  - text: Isn't it?
  - strong: Sophie
  - text: What are you trying to say?
  - strong: Lucas
  - text: I'm saying maybe we should stop pretending everything's fine.
  - strong: Maya
  - text: Nobody's pretending everything's fine.
  - strong: Lucas
  - text: Then why does it feel like I'm the only one asking the obvious questions?
  - strong: Sophie
  - text: You're not.
  - strong: Lucas
  - text: Really?
  - strong: Sophie
  - text: Really.
  - strong: Lucas
  - text: Then answer this.
  - strong: Lucas
  - text: Why does Daniel have a stranger's number saved without a name?
  - strong: Sophie
  - text: I don't know.
  - strong: Lucas
  - text: Why was there a note attached?
  - strong: Sophie
  - text: I don't know!
  - strong: Lucas
  - text: Why has nobody heard from him?
  - strong: Sophie
  - text: LUCAS!
  - strong: Maya
  - text: Stop.
  - strong: Maya
  - text: Both of you. None of you has enough information to answer those questions.
  - strong: Maya
  - text: Exactly.
  - strong: Lucas
  - text: Then maybe we shouldn't be acting like we do.
  - strong: Sophie
  - text: I'm not!
  - strong: Lucas
  - text: Then stop making decisions for everyone.
  - strong: Sophie
  - text: Fine.
  - strong: Sophie
  - text: Maybe adding someone was a mistake.
  - strong: Sophie
  - text: But I still think ignoring the number would've been worse.
  - strong: Lucas
  - text: That's your opinion.
  - strong: Sophie
  - text: Yes.
  - strong: Sophie
  - text: It is.
  - strong: Maya
  - text: Nobody has to decide everything tonight.
  - strong: Lucas
  - text: No.
  - strong: Lucas
  - text: But we do have to decide what we're willing to risk.
  - strong: Sophie
  - text: What does that mean?
  - strong: Lucas
  - text: It means I'm not comfortable with this anymore.
  - strong: Maya
  - text: With what?
  - strong: Lucas
  - text: With how we're handling everything.
  - strong: Sophie
  - text: Lucas...
  - strong: Lucas
  - text: No, Sophie.
  - strong: Lucas
  - text: I've been trying to say this for days.
  - strong: Lucas
  - text: Every time I question something, you act like I'm making things harder.
  - strong: Sophie
  - text: Because sometimes you are!
  - strong: Lucas
  - text: ...
  - strong: Maya
  - text: Sophie.
  - strong: Sophie
  - text: I'm sorry.
  - strong: Sophie
  - text: I didn't mean—
  - strong: Lucas
  - text: No.
  - strong: Lucas
  - text: You did.
  - strong: Sophie
  - text: Lucas, please.
  - strong: Lucas
  - text: I'm not doing this.
  - strong: Maya
  - text: Don't be dramatic.
  - strong: Lucas
  - text: I'm not being dramatic.
  - strong: Lucas
  - text: I'm stepping away before I say something I regret.
  - strong: Sophie
  - text: We're all upset.
  - strong: Lucas
  - text: That's not the point.
  - strong: Sophie
  - text: Then what is?
  - strong: Lucas
  - text: The point is that none of us knows who we're supposed to trust right now.
  - strong: Lucas
  - text: And apparently I'm the only one willing to admit it. You don't have to trust me.
  - strong: Lucas
  - text: Good.
  - strong: Lucas
  - text: Because I don't.
  - strong: Maya
  - text: Nobody's asking you to.
  - strong: Lucas
  - text: Then we're clear.
  - strong: Lucas
  - text: Sophie.
  - strong: Sophie
  - text: Yeah?
  - strong: Lucas
  - text: Please be careful.
  - strong: Sophie
  - text: I am being careful.
  - strong: Lucas
  - text: I know you think you are.
  - strong: Lucas
  - text: That's what worries me. Lucas left the group.
  - strong: Sophie
  - text: Lucas, seriously?
  - strong: Maya
  - text: He's gone, Soph.
  - strong: Sophie
  - text: I can see that.
  - strong: Maya
  - text: You should've told us before adding someone.
  - strong: Sophie
  - text: Would you have said yes?
  - strong: Maya
  - text: That's not the point. Maya deleted a message.
  - strong: Sophie
  - text: Can we not do this here?
  - strong: Maya
  - text: Fine.
  - strong: Maya
  - text: But we need to talk about this.
  - strong: Sophie
  - text: I know.
  - strong: Maya
  - text: Later, then. Maya is offline.
  - strong: Sophie
  - text: ...
  - strong: Sophie
  - text: Well.
  - strong: Sophie
  - text: That went brilliantly. I didn't mean to cause trouble.
  - strong: Sophie
  - text: I know.
  - strong: Sophie
  - text: You didn't.
  - strong: Sophie
  - text: This started long before you joined.
  - strong: Sophie
  - text: I'm sorry you had to see it.
  - strong: Sophie
  - text: Listen.
  - strong: Sophie
  - text: I think I owe you an explanation.
  - strong: Sophie
  - text: But I'd rather not have this conversation in front of everyone.
  - strong: Sophie
  - text: Can we talk privately? Sure.
  - strong: Sophie
  - text: Thank you.
  - strong: Sophie
  - text: I'll message you.
  - strong: Sophie
  - text: I'll send you a message.
  - strong: Sophie
  - text: And...
  - strong: Sophie
  - text: I'm sorry about all of this. Sophie is offline.
  - strong: Maya
  - text: Eli?
  - strong: Eli
  - text: Yeah?
  - strong: Maya
  - text: Are you busy?
  - strong: Eli
  - text: Depends what you're about to ask me to do.
  - strong: Maya
  - text: Very funny.
  - strong: Eli
  - text: I'm learning from Lucas. Terrible influence.
  - strong: Maya
  - text: Don't remind me.
  - strong: Maya
  - text: I want to get everyone back in here.
  - strong: Eli
  - text: Everyone everyone?
  - strong: Maya
  - text: Yes.
  - strong: Eli
  - text: Including Lucas?
  - strong: Maya
  - text: Unfortunately.
  - strong: Eli
  - text: 😂
  - strong: Maya
  - text: I'm serious.
  - strong: Eli
  - text: I know.
  - strong: Eli
  - text: Honestly, I think it's a good idea.
  - strong: Maya
  - text: He won't be happy.
  - strong: Eli
  - text: He's rarely happy.
  - strong: Maya
  - text: Eli.
  - strong: Eli
  - text: Okay, okay.
  - strong: Eli
  - text: Do it. I'll behave.
  - strong: Maya
  - text: You'd better. Maya added Lucas Grey.
  - strong: Lucas
  - text: Seriously?
  - strong: Lucas
  - text: I leave for five minutes and you drag me back?
  - strong: Eli
  - text: Five minutes?
  - strong: Eli
  - text: You have a very interesting relationship with time.
  - strong: Lucas
  - text: Missed you too.
  - strong: Maya
  - text: Lucas.
  - strong: Lucas
  - text: Maya.
  - strong: Maya
  - text: Can we not?
  - strong: Lucas
  - text: You invited me.
  - strong: Maya
  - text: Because we need to talk.
  - strong: Lucas
  - text: About Daniel?
  - strong: Maya
  - text: Yes.
  - strong: Lucas
  - text: Then I'm listening.
  - strong: Sophie
  - text: Hi.
  - strong: Sophie
  - text: Before anyone says anything, I know.
  - strong: Lucas
  - text: Know what?
  - strong: Sophie
  - text: That things got out of hand.
  - strong: Lucas
  - text: That's one way of putting it.
  - strong: Sophie
  - text: Lucas, I'm trying.
  - strong: Lucas
  - text: Yeah.
  - strong: Lucas
  - text: Sorry.
  - strong: Sophie
  - text: It's okay.
  - strong: Maya
  - text: I don't want us pretending the argument never happened.
  - strong: Maya
  - text: But I also don't want it to be the reason we stop looking for Daniel.
  - strong: Eli
  - text: Agreed.
  - strong: Lucas
  - text: Same.
  - strong: Sophie
  - text: Me too.
  - strong: Maya
  - text: Good.
  - strong: Maya
  - text: Then let's try this again.
  - strong: Maya
  - text: Is everyone around?
  - strong: Maya
  - text: I think we need to talk.
  - strong: Lucas
  - text: I'm here.
  - strong: Eli
  - text: Give me a second.
  - strong: Sophie
  - text: Here.
  - strong: Lucas
  - text: That's four.
  - strong: Eli
  - text: I'm back.
  - strong: Lucas
  - text: Great. All accounted for except our mystery guest.
  - strong: Sophie
  - text: Lucas, please don't start.
  - strong: Lucas
  - text: I haven't started anything.
  - strong: Maya
  - text: Can we just have one normal conversation?
  - strong: Lucas
  - text: Define normal.
  - strong: Maya
  - text: One where you don't argue with everyone.
  - strong: Lucas
  - text: Setting the bar pretty high.
  - strong: Eli
  - text: He's got a point. That's practically impossible for him.
  - strong: Lucas
  - text: Wow. Betrayal from my own side.
  - strong: Sophie
  - text: 😂
  - strong: Maya
  - text: Okay, that's enough.
  - strong: Maya
  - text: Seriously.
  - strong: Maya
  - text: I want us to go through what we know and what we're still missing.
  - strong: Sophie
  - text: Did something happen?
  - strong: Maya
  - text: Not exactly.
  - strong: Maya
  - text: I was looking through Daniel's older messages again.
  - strong: Maya
  - text: And I realized how much we're trying to piece together from memory.
  - strong: Lucas
  - text: Yeah. I've been thinking about that too.
  - strong: Eli
  - text: Same.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: So where do we start?
  - strong: Maya
  - text: With everyone being here.
  - strong: Maya
  - text: Are you there?
  - strong: Maya
  - text: Are you still with us?
  - button "I'm here. Let's talk."
  - button "Sorry. I was checking something."
  - button "Did you find anything new?"
  - button "Send" [disabled]
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  20  |     if (s.chapter2Access?.node === 'PACKAGE') return s
  21  |     const option = accessChoices(s)[0]
  22  |     const now = sceneNow(s)+i*100000
  23  |     s = chapter2Access(chapter2Access(s, { type: 'draft', id: option.id }, now), { type: 'send', id: option.id }, now)
  24  |     for (let j = 0; j < 100 && s.chapter2Access?.queue; j++) s = chapter2Access(s, { type: 'tick' }, s.chapter2Access.queue.dueAt)
  25  |   }
  26  |   throw new Error('No package')
  27  | }
  28  | async function stored(page: Page): Promise<GameSave> {
  29  |   return page.evaluate(async () => {
  30  |     const pending = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  31  |     if (pending) return JSON.parse(pending).save
  32  |     const db = await new Promise<IDBDatabase>(resolve => { const r = indexedDB.open('the-archive-reboot',1); r.onsuccess = () => resolve(r.result) })
  33  |     const save = await new Promise<GameSave>(resolve => { const r = db.transaction('saves').objectStore('saves').get('primary'); r.onsuccess = () => resolve(r.result) })
  34  |     db.close(); return save
  35  |   })
  36  | }
  37  | async function openUnknown(page: Page) {
  38  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  39  |   await page.getByRole('button', { name: 'Open UNKNOWN conversation', exact: true }).click()
  40  | }
  41  | async function send(page: Page, text: string) {
  42  |   await page.getByRole('button', { name: text, exact: true }).click()
  43  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  44  |   await page.clock.runFor(90000)
  45  | }
  46  | 
  47  | for (const app of ['Home','Contacts','The Archive','Messages']) test(`Unknown arrives above ${app} after Sophie completes, without opening itself`, async ({ page }) => {
  48  |   await seedScene(page, completed())
  49  |   if (app !== 'Home') await page.getByRole('button', { name: `Open ${app}`, exact: true }).first().click()
  50  |   await page.clock.runFor(7100)
  51  |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText("You're looking in the wrong place.")
  52  |   await expect(page.getByRole('region', { name: 'UNKNOWN conversation', exact: true })).toHaveCount(0)
  53  |   const s = await stored(page)
  54  |   expect(s.chapter2Access?.messages).toHaveLength(1)
  55  |   expect(s.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodnight :)')
  56  | })
  57  | 
  58  | test('Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness', async ({ page }) => {
  59  |   test.setTimeout(180000)
  60  |   await page.setViewportSize({ width: 320, height: 720 })
  61  |   await seedScene(page, completed())
  62  |   await page.clock.runFor(7100)
  63  |   await openUnknown(page)
  64  |   const path = ['Who is this?', "That doesn't answer anything.", 'Then how do you know about him?', 'Have you been reading my messages?', 'Prove it.', 'What do you want in return?', 'That sounds like a serious invasion of privacy.', "How do I know you're not manipulating what I see?"]
  65  |   for (const text of path) await send(page, text)
  66  |   await expect(page.getByText('INCOMING ACCESS PACKAGE', { exact: true })).toBeVisible()
  67  |   await send(page, 'Ask one more question')
  68  |   await send(page, 'What exactly will change on my phone?')
  69  |   await expect(page.getByText("Messages gets a passive relay component. It won't have anything to display until a relay is available.", { exact: true })).toBeVisible()
  70  |   await send(page, 'REJECT — Decline the package')
  71  |   expect((await stored(page)).chapter2Access).toMatchObject({ packageStatus: 'declined', installAuthorized: false, mirrorUnlocked: false, spyInstalled: false })
  72  |   await expect(page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true })).toHaveCount(0)
  73  |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  74  |   await page.reload()
  75  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  76  |   await openUnknown(page)
  77  |   await page.getByRole('button', { name: 'Inspect package again', exact: true }).click()
  78  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  79  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  80  |   await page.getByRole('button', { name: 'CANCEL', exact: true }).click()
  81  |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  82  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  83  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  84  |   await page.getByRole('button', { name: 'INSTALL EXTENSION', exact: true }).click()
  85  |   await page.clock.runFor(90000)
  86  |   await send(page, "Don't mistake this for trust.")
  87  |   await send(page, 'Why should I trust any of this?')
  88  |   expect((await stored(page)).chapter2Access).toMatchObject({ installCompleted: true, unknownOffline: true, spyInstalled: true, relayAvailable: false })
  89  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  90  |   await page.getByRole('button', { name: 'Relay status: standby', exact: true }).click()
  91  |   await expect(page.getByRole('dialog', { name: 'SPY MODE', exact: true })).toContainText('Nothing is currently being intercepted.')
  92  |   await page.getByRole('button', { name: 'GOT IT', exact: true }).click()
  93  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  94  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  95  |   await page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true }).click()
  96  |   await expect(page.getByText('Device: NOT CONNECTED', { exact: false })).toBeVisible()
  97  |   await page.getByRole('button', { name: 'ENTER MIRROR', exact: true }).click()
  98  |   await page.getByRole('button', { name: 'Open mirrored Mail', exact: true }).click()
  99  |   await page.getByRole('button', { name: /Storage Notification/ }).click()
  100 |   await page.getByRole('button', { name: 'Mirror home', exact: true }).click()
  101 |   await page.getByRole('button', { name: 'Open mirrored Deleted', exact: true }).click()
  102 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  103 |   await page.getByRole('dialog', { name: 'Recover recently deleted confirmation', exact: true }).getByRole('button', { name: 'NOT NOW', exact: true }).click()
  104 |   expect((await stored(page)).chapter2Access?.recovery).toBeUndefined()
  105 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  106 |   await page.getByRole('button', { name: 'START — OPEN NOW', exact: true }).click()
  107 |   const recovery = (await stored(page)).chapter2Access!.recovery!
  108 |   expect(recovery.dueAt-recovery.startedAt).toBe(1500000)
  109 |   await page.clock.runFor(19000)
  110 |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText('FIND DANIEL')
  111 |   await expect(page.getByRole('heading', { name: 'Recently Deleted', exact: true })).toBeVisible()
  112 |   await page.clock.runFor(20000)
  113 |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  114 |   await page.reload()
  115 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  116 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  117 |   await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true })).toHaveCount(1)
  118 |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  119 |   await page.clock.runFor(180000)
> 120 |   await expect(page.getByRole('button',{name:"I'm here.",exact:true})).toBeVisible()
      |                                                                        ^ Error: expect(locator).toBeVisible() failed
  121 |   const final = await stored(page)
  122 |   expect(final.chapter2Access?.complete).toBe(false)
  123 |   expect(final.chapter2Access?.recovery).toEqual(recovery)
  124 |   expect(final.chapter2Access?.groupMessages.filter(m => m.sender === 'player')).toHaveLength(0)
  125 |   expect(final.deliveredEvents.filter(id => id === 'C2-INSTALL-BEGIN')).toHaveLength(1)
  126 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeDisabled()
  127 |   await page.screenshot({ path: test.info().outputPath('chapter2-ready-320.png') })
  128 | })
  129 | 
  130 | test('package questions are idempotent and an unsent response survives reload without sending', async ({ page }) => {
  131 |   const base = packageSave()
  132 |   await seedScene(page, base)
  133 |   await openUnknown(page)
  134 |   await send(page, 'Ask one more question')
  135 |   await send(page, 'Who made this package?')
  136 |   await send(page, 'Ask one more question')
  137 |   await expect(page.getByRole('button', { name: 'Who made this package?', exact: true })).toBeDisabled()
  138 |   await page.getByRole('button', { name: 'Back to package', exact: true }).click()
  139 |   await page.getByRole('button', { name: 'ACCEPT — Open access package', exact: true }).click()
  140 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  141 |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  142 |   await page.reload()
  143 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  144 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  145 |   await openUnknown(page)
  146 |   expect((await stored(page)).chapter2Access?.messages.filter(m => m.text === 'Who made this package?')).toHaveLength(1)
  147 | })
  148 | 
```