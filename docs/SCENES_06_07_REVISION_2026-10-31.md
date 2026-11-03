# GREYHAVEN — Scene 06 and 07 revision, 31 October 2026

Source: `docs/sources/scene06-07-revision-2026-10-31/markdown.txt` and `plain.txt`.

The canonical Version History conversation now activates Scene 06 without navigating away. The committed `R-GB-VH-001` receipt alone enables the persisted 1.6-second email event. Email read state is independent from the Desk thread. If a previously optional Scene 05 request is sent after activation, the same event is scheduled once. A draft does not create mail. The register can be opened through the article or email; saving its private finding activates Scene 07 without sharing it.

Scene 07 retains the existing article and `GB-NV-CHANNEL-001` professional route. Visiting the byline and profile and explicitly saving the source question completes the scene without requiring contact, and activates the existing Scene 08 state without navigating there. A professional inquiry requires a selected question, review and Send; its saved delayed reply opens in Messages. The revised Desk, Nora, Sophie and group scripts use new `OPEN-S06-REV-*` and `OPEN-S07-REV-*` nodes in the existing conversation runner. Prior delivered dialogue and IDs remain unchanged. Index disclosure requires the existing index inspection, and group replies skip absent members.

Unfinished canonical saves are adapted at hydration, retaining their saved records, receipts, pending events, drafts, thread checkpoints and delivered messages. Completed historical scenes remain pinned. Existing in-progress old conversation checkpoints and previously sent questions keep their original graph; new conversations use the revision. The adapter does not touch the legacy localStorage save.

Three playable routes:

- Delivered Scene 05 question → Email → optionally continue with the Desk in Messages → public register → Save finding → byline.
- No earlier question → public article → corrections register → optionally prepare, review and send a new Desk request → Save finding → byline. The new request has receipt `R-GB-CD-002` and no authored reply.
- Public register → Save finding → article byline → reporter directory → Save as private lead, with no correspondence required.

The version, index, publisher notice and professional conversation remain source-limited: no earlier article body, edit, editor, authenticated index, original notice, issuer, suspect or Daniel's fate is established. NPCs receive only lines deliberately sent to them. No real messaging, accounts, contacts or network services are used.

Automated tests cover the revised Desk and Nora openings, follow-up choices, optional Sophie and group paths, private saves, receipt-only requests, migration and save reload. `tests/e2e/scene0607-email.spec.ts` covers empty/delivered email, read state, deep links, no automatic send and the register-only path. Android physical-device execution remains separate from browser automation. No APK packaging, commit or push is included.
