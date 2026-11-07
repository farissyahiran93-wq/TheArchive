# Chapter 1 Scene 5 — The Digital Archive

**Implemented screenplay.** Each player line is a separate choice requiring Send. The three options at each decision offer different tones and lead to the matching Unknown response. Dialogue and fragments are authored in `src/content/masterScene05.ts`.

Entry requires Scene 4's accepted and inspected encrypted archive. The player manually returns to Unknown. Unknown knows only what Sophie told him and what the player has actually sent.

**Unknown:** You have the archive now.

**Unknown:** It's still encrypted. Having the file doesn't make its contents readable.

## 01 — A way to inspect

**A:** “Do you have a way to examine it?”

**Unknown:** “A tool called TRACE. It can work on a copy of the container and show which fragments become readable.”

**B:** “What are you asking me to do next?”

**Unknown:** “Review a tool called TRACE. You can decide whether to use it after you see what it does.”

**C:** “I'm not installing something just because you say so.”

**Unknown:** “You shouldn't. I can offer the package details first. Installing it is your decision.”

## 02 — Who made it?

**A:** “Who developed TRACE?”

**Unknown:** “I worked on the viewer. That doesn't establish that every part of it is trustworthy.”

**B:** “Is this your software?”

**Unknown:** “I helped build the viewer. I'm withholding my name, so you have a reason to be cautious about that claim.”

**C:** “If you won't identify yourself, why should I trust your tool?”

**Unknown:** “You don't have to take my word for it. Review the package and its stated limits before deciding.”

## 03 — What TRACE can do

**A:** “What would it actually do with the archive?”

**Unknown:** “It checks the container's manifest and processes designated segments. It doesn't need to change the original file.”

**B:** “Why can't I just open the archive?”

**Unknown:** “The container is protected, and some segments need separate keys or source material. TRACE can present what is currently recoverable.”

**C:** “Can it unlock everything at once?”

**Unknown:** “No. It may expose a small part now. Missing content stays missing until there's a supported way to recover it.”

## 04 — Privacy

**A:** “What permissions does it need?”

**Unknown:** “Within this phone interface, it needs access to the archive you select and a place to save its local results. It doesn't need your contacts or location.”

**B:** “Can it read my personal messages?”

**Unknown:** “The offered tool is meant to work on the selected archive. You shouldn't grant access to your personal messages or accounts.”

**C:** “I don't want you watching what I do.”

**Unknown:** “I won't receive your private findings automatically. If you choose to tell me something, send only what you want me to hear.”

## 05 — Risk and original file

**A:** “Could installing it compromise my privacy?”

**Unknown:** “I can't prove it's completely safe just by saying it is. Review the stated capabilities and risks, and don't install it if you aren't comfortable.”

**B:** “Will it alter the original archive?”

**Unknown:** “It's designed to keep the accepted archive unchanged and work on a local copy. The package review should show that claim separately from verification.”

**C:** “What happens if the copy is damaged?”

**Unknown:** “TRACE should label damaged or missing segments. It can't honestly fill them in for you.”

## 06 — Authenticity

**A:** “How can I check whether the backup is genuine?”

**Unknown:** “Compare individual fragments with independent sources where you can. A readable file isn't proof that every statement inside it is true.”

**B:** “Can TRACE tell me whether the archive was altered?”

**Unknown:** “Not conclusively from this first pass. It can show available metadata and preserve what it reads; provenance needs more evidence.”

**C:** “You could have changed what you're sending me.”

**Unknown:** “That's possible from your point of view. Keep the source marked unverified, and don't treat my account as authentication.”

## 07 — The package

**A:** “Show me the package details.”

**Unknown:** “I'll offer them here. Inspection doesn't install anything.”

**B:** “I want to review the risks first.”

**Unknown:** “You can inspect the package and read the capabilities and risks before deciding.”

**C:** “I may decide not to use it.”

**Unknown:** “That's your choice. You can defer or decline and return to the offer later.”

## 08 — Before recovery

**A:** “If I install it, what should I look at first?”

**Unknown:** “Open TRACE yourself, select the archive, and start the first recovery only when you're ready.”

**B:** “Does installation start recovery automatically?”

**Unknown:** “No. Installation, opening the app, selecting the archive and starting recovery are separate actions.”

**C:** “I want to control each step.”

**Unknown:** “You should. TRACE won't read a record for you or send me your findings.”

The TRACE package offer appears for inspection after the selected reply and response.

## Package review and recovery

The player inspects the fictional package, reads its capabilities and risks, and explicitly installs or defers/declines. No actual external software is installed. Installation does not open TRACE or start recovery. The player manually opens TRACE, selects `DNL_PHONE_ARCHIVE.arc` and starts the first operation. Its manifest awards exactly 120 unique units out of 1,000: 12% cumulative phone recovery. Activity Logs remain unavailable.

The first operation exposes only these source-unverified fragments; unrecovered gaps contain no invented text:

- **TA-PH-MESSAGE-FAMILY-01 — Messages, partial; timestamp unavailable.** Daniel: “I found the biscuits you like. Don't tell Sophie I bought two packets.” **[unrecovered segment]**
- **TA-PH-MESSAGE-JUNE-01 — Messages, partial; timestamp unavailable.** Daniel: “June Ellis said the old records might be worth another look.” **[unrecovered segment]** The recipient and context are not established by this fragment alone.
- **TA-PH-NOTE-ORDINARY-01 — Notes, partial; timestamp unavailable.** “Dinner with Maya: remember dessert. Actual dessert, not biscuits.” **[unrecovered segment]**
- **TA-PH-NOTE-RECORDS-01 — Notes, partial; timestamp unavailable.** “Greyhaven records — ask June which copy she meant.” **[unrecovered segment]**

The player opens the required fragments and explicitly saves at least one source-linked observation. TRACE's rule-based summary only cites recovered, actually opened sources. Inspect Source returns to the cited fragment. It distinguishes recovered words, unavailable metadata and inference; no fragment establishes why Daniel disappeared.

## 09 — Returning to Unknown

**A:** “Some fragments mention June Ellis. Who is she?”

**Unknown:** “You've found her name in the archive. I can tell you Daniel was looking at material connected to her, but a name in a fragment doesn't establish what happened.”

**B:** “Parts of the archive are still missing.”

**Unknown:** “Then keep those gaps visible. Missing text isn't a reason to guess what Daniel wrote.”

**C:** “I still can't verify the source of this backup.”

**Unknown:** “That's fair. Treat it as unverified until you can compare specific records with independent sources.”

This decision is available only after the player has opened the required fragments. The June option sends the name to Unknown; merely reading or saving it privately does not inform him.

## 10 — A limited report

**A:** “I found partial messages and notes. June Ellis is mentioned, but the context is missing.”

**Unknown:** “Thank you. That's a limited finding, and it's worth keeping the missing context clear.”

**B:** “The archive has readable fragments, but I won't draw conclusions from the gaps.”

**Unknown:** “That's sensible. We need sources we can actually inspect.”

**C:** “I found some partial material. I'm keeping my interpretation private.”

**Unknown:** “Understood. You don't owe me your private notes.”

Each option is an explicit required Send and discloses only its own text. A prior June question is a separate receipt; Unknown never learns an unsent finding.

**Unknown:** “There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.”

The closing response is delivered, Scene 5 completes at 12% and Scene 6 becomes available for manual entry. Activity Logs do not open or recover automatically.
