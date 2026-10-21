# Relationship baseline and save safety contract

**Documentation contract only. D21 = CONDITIONAL A.** Owner selection establishes the intended character-specific starting values and `unintroduced` semantics. Canonical validation, scene adoption, and backup-first compatibility remain required before Phase 02. D13 = APPROVED A: romance is inactive in the early story. This does not approve a later partner roster or a romance scene.

## First-contact baseline

Values are on the existing proposed 0–100 narrative scale. They describe an initial **direct contact**, not the character's opinion of an unknown player before meeting. All four axes remain independent.

| Character | Trust | Affinity | Suspicion | Romance | Introduction and first contact boundary |
| --- | ---: | ---: | ---: | ---: | --- |
| Maya | 50 | 45 | 20 | 0 | Her verified Bulletin byline may introduce her; replying through a token becomes contact only when her token reply is received. This does not opt in to Messages. |
| Lucas | 42 | 40 | 30 | 0 | Public role listing or a verified referral introduces him; contact requires a direct exchange. A missing personal photo never gates evidence. |
| Sophie | 38 | 35 | 25 | 0 | A referral or record mention introduces her; contact requires her direct consented exchange. Daniel's welfare statement needs its own R12 permission. |
| Eli | 50 | 48 | 15 | 0 | A verified channel introduces her; contact follows her own response. Her emergency-intake role is not a shortcut to private records. |
| Nora | 40 | 38 | 30 | 0 | A byline or public archive listing introduces her; contact requires a direct exchange. Source consent remains separate. |
| Daniel | 45 | 40 | 25 | 0 | A historical work order or phone trace is only a record mention. Contact requires a verified live exchange; the investigation can finish without it. |

## State and knowledge rules

| State | Meaning | Relationship values | Allowed knowledge |
| --- | --- | --- | --- |
| `unintroduced` | Player has not encountered a verified name/channel in play. | No expressed opinion; display no numeric assessment. An old save's zero is not evidence of hostility. | Neither side gains private facts. |
| `introduced` | Player has encountered a verified public mention or consented referral. | The proposed first-contact tuple may be held as a pending template, never treated as an exchange. | Public/referral facts only; no permission to message or see files. |
| `contacted` | The character and player have directly exchanged through a verified channel. | Apply the character's tuple once, then record authored changes from explicit actions. | Only the facts actually exchanged, with independent disclosure receipts where required. |

An anonymous Bulletin tip may generate a reply token and a Maya conversation in that token inbox while the player's identity remains undisclosed. `contacted` here records a channel exchange, **not** identity disclosure or Messages access. An ignored token is at most `introduced`. A handle-based tip is no broader: the handle is a channel identifier, not a real-name grant. A historical Daniel document must never mark Daniel `contacted`.

No Trust/Affinity/Suspicion threshold grants E012, E013, E014, E009, E015, E019, E020 or any private source. Permission comes from custodians and R01–R15 scopes. The low-trust route must be able to collect mandatory proof. Romance starts at zero, stays inactive in early episodes, and cannot rise merely through case progress, care during crisis, or compliance with an investigation request. Any later romance needs an owner-approved roster, adult status, mutual optional entry, a reversible exit and separate consent review; it cannot control evidence.

## Existing save boundary and proposed future compatibility

Phase 00 has `GameSave.schemaVersion: 1` and a fixture `newGame()` with zero relationship values in the reboot save store. Those zeros are implementation defaults, not approved character views. The legacy localStorage key `the-archive:game-save:v1` is outside this reboot contract and must remain untouched. No runtime schema, UI, migration or existing save is changed in Phase 01D.

For a later implementation proposal, first inventory all actual v1 shapes and distinguish a pristine fixture from a save with play history. Write a raw backup of every source record before transformation. Convert into a new versioned record in a separate slot, carrying original data and provenance; never overwrite the v1 source or the legacy key. Map an untouched fixture's zeros to `unintroduced` plus pending first-contact baselines. Preserve genuinely authored relationship changes with their event history; if the save does not contain enough provenance to distinguish them, quarantine it for explicit recovery rather than guessing. Do not interpret a zero as a hostile relationship or silently apply a new baseline to past interactions.

Before any later migration is allowed, verify repeat-run idempotence, interruption recovery, unsupported-version refusal without overwrite, rollback from the raw backup, introduced/contacted transition order, anonymous-token privacy, and low-trust/zero-romance evidence access. Validate on a copy of real v1 fixtures and any supported historical records. These are future acceptance tests, **not tests run in Phase 01D**.

**D21 remains CONDITIONAL** until owner/narrative validation of the values and states plus a reviewed, tested backup-first compatibility design. The table is the owner-selected proposal, not proof that existing saves are safe.
