# 11 — Choice, relationship, branch and timer rules

**Private spoilers; design rules only.** SB2 §§5, 10–12 fixes four independent 0–100 relationship dimensions and one historical truth. Values and thresholds below are **P**, not in SB2, and require D21 approval before runtime work. Phase 00 currently initializes all dimensions at zero; importing that state into these proposed neutral bands without a migration would be wrong.

## Four dimensions and consent

| Dimension | Means | Must not mean |
|---|---|---|
| Trust | Belief that player handles information and promises responsibly | Access to private evidence without a source/permission receipt |
| Affinity | Personal ease and desire for voluntary contact | Agreement with every theory or forced romance |
| Suspicion | Character's concern about player's motives/methods | Proof the player is guilty, or a global hostility flag |
| Romance | Mutually invited attraction in approved adult routes | A universal reward meter, truth gate, or substitute for consent |

Proposed initial values for *new canonical saves*: Trust 50, Affinity 45, Suspicion 20, Romance 0 for newly met characters; actual first-contact values can differ for Sophie/Nora if explicitly approved. Proposed bands: Trust <35 guarded, 35–64 cautious/neutral, ≥65 comfortable; Suspicion ≥65 triggers a method check. These bands affect tone, private optional contact and what *personal* detail someone volunteers. Mandatory record routes have a documented public/custodian fallback. No romance increments from investigative compliance alone. Romance route roster and safe start date remain open D13; Sophie never receives early grief-linked flirt choices.

## Meaningful choice contracts (proposed numeric deltas, clamp 0–100)

Every row has a committed choice ID, explicit options, immediate response, stored consequence/callback, and convergence. Deltas are intentionally small; facts do not change. Player text exists only after Send/Submit.

| Choice ID / scene | Explicit options and NPC immediate reaction | State change and long-term payoff | Safe convergence |
|---|---|---|---|
| **C01-TIP** E01-S08/S09 | **Anonymous return token:** Maya says she can reply without a name; **handle:** she uses only that name. | Store `tipIdentityMode`; Maya Trust +0/+2 respectively, Suspicion +1/0. E03 remembers chosen privacy boundary. | Both obtain reply and E012 public export; no legal-name reveal. |
| **C02-SHARE** E01-S14 | **Cropped image:** Maya can point to exact row but notes crop; **text-only:** she asks one follow-up but respects privacy; **defer:** she leaves public route open. | Receipt lists actual shared artifact/fact IDs; Trust +2/+1/−1, Suspicion 0/0/+1. E03 wording differs. | Public version comparison and export remain accessible. |
| **C03-FRAME** E01-S26 | **Ask carefully:** Maya engages source issue; **name a culprit early:** she pushes back on evidence; **say unsure:** she offers a verification task. | Trust +2/−3/+1; Suspicion −1/+4/0; E03 S07 callback references the player's caution/accusation. | Same E012 route and E01 ending; no premature culprit badge. |
| **C04-SOPHIE** E02-S18 | **Tell known/unknown separately:** she appreciates clarity; **reassure without basis:** she challenges claim; **wait to reply:** she takes space. | Sophie Trust +3/−4/−1, Affinity +1/0/0; E08 reaction to welfare update differs. | E02 route lead comes through Lucas/custodian, not Sophie's approval. |
| **C05-LUCAS** E03-S06/S13 | **Private evidence question:** he may share E005 photo; **public group pressure:** he defers to custodian; **respect shift:** he answers later in-story. | Lucas Trust +3/−5/+1, Suspicion −1/+5/0; E04 S08/S11 tone and E09 support differ. | E013/E014 custodian route always yields mandatory stop proof. |
| **C06-NORA** E05-S09 | **Honor redaction:** Nora supplies scoped transcript; **demand identity:** she withholds personal contact and explains why; **ask for non-identifying source:** she supplies insurer route. | Nora Trust +3/−5/+1, Suspicion −1/+5/0; E06 consent workflow tone differs. | E006 redacted content and E016 provenance accessible via alternate custodian; K07 not mandatory. |
| **C07-ELI** E05-S18/E06-S18 | **Ask what field means:** she examines form; **accuse from initials:** she is hurt but offers check; **defer judgment:** she thanks player. Later **apologize** or **decline**. | Eli Trust +2/−5/+1, Suspicion −1/+5/0; apology restores up to +3, not an erase. E09 optional collaboration tone changes. | E007 glossary from records officer if Eli opts out. |
| **C08-WELFARE** E08-S13/S17 | **Tell Sophie promptly when released:** relief and anger; **ask counsel to tell her:** appreciates verification but dislikes distance; **request another check first:** later questions delay. | Sophie Trust +3/0/−4, Suspicion −1/0/+3; E10 family check-in callback. | S13 drafts the route; S17 releases R12 and requires an explicit Send by the selected messenger. Sophie receives the verified status in every branch. |
| **C09-DANIEL** E09-S07/S09 | **Demand accountability:** he answers without defense; **need space:** he respects it; **offer immediate forgiveness:** he declines to use it as exoneration. | Daniel Trust +1/0/+1; Sophie response depends on whether player spoke for her, not on Daniel meter. E10 apology style differs. | E015 work order proves publication even if player refuses call; Vivian order proof independent. |
| **C10-STRATEGY** E10-S14/S15 | **Protect & Verify:** staged protected disclosure; **Public Pressure:** redacted facts published early, source identity still hidden; **Legal First:** private hold/inquiry first. NPCs disagree in character. | Store distribution recipients, timing, Ana consent scope, institutional reaction and epilogue variants. Nora/Maya/Sophie Trust adjust independently; no romance gate. | All paths require E020 hold and a cited minimum E011 packet; no path promises automatic conviction. |

## Branch graph and true convergence

```
anonymous ─┐
handle ────┴─> Maya verifies tip → public/custodial v1 export → K02
Lucas private photo ─┐
Lucas guarded ────────┴─> dispatch E013 + shelter E014 → Depot lead
Ana named consent ───┐
anonymous testimony ─┴─> insurer E016 + paper E009 + approval E015 → K13
Daniel direct admission ─┐
work order only ──────────┴─> K12 publication accountability
three release strategies ──> E020 formal hold + E011 cited case → fixed truth, varied social/public cost
```

Convergence preserves the core evidence chain, **not** identical experience. A branch must create at least one later callback and a visible change in channel, timing, disclosure scope, relationship or public response. If a choice only changes a sentence, label it as expression rather than “changes the story.” Choice log should store `choiceId`, selected option, Send receipt, effect IDs and callback scene IDs. No choice changes who ordered the diversion or June's cause of death.

## Information receipts

Before Send, UI shows recipient and attachment/fact scope. After Send, create one immutable receipt: source message/file ID, recipient ID(s), fact IDs, consent scope, in-world timestamp, and delivery state. Group messages list members present at send time; late joiners do not inherit prior private knowledge. A player can draft, leave and resume without a sent bubble. Public knowledge requires actual publication scene and redaction review. [06](06_KNOWLEDGE_AND_DISCLOSURE_MATRIX.md) is the per-fact contract.

## Narrative timers and offline continuity

- Default typing indication is 1–3 seconds for a short reply, reduced/instant under accessibility preference. It is not counted toward 2.5–4-hour duration.
- A character checking a document may be “away” for an *in-world* block, but at least one relevant investigation remains playable. The story clock advances at authored gates, not device wall time.
- Schedule each message/event with a stable ID and an in-world due condition; persist pending and delivered IDs. On resume, replay only due undelivered events in story order, never repeat a player Send or generate a player message automatically.
- A call missed while the player is away becomes a transcript/voice note or reschedule option. Critical evidence is not lost to a real-world missed timer.
- If the player is reading older chat, show a New Messages indicator. Do not force-scroll. Read receipts appear only when that recipient actually opens/acknowledges, not by arbitrary timer.
- Episode transitions require explicit Continue after completion, preserving the fictional date and evidence state. No next-episode spoiler notification fires before the gate.

## Relationship QA checks

Test low Trust for all six, high Suspicion, zero Romance and all optional social scenes declined. Mandatory E012/E013/E014/E016/E009/E015/E019/E020 remain available. Test each route with and without apology, anonymous tip, no group chat, consent withheld, and Daniel direct-contact refusal. The same fixed case truth must be reachable; later reactions should still differ meaningfully.
