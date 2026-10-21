# Maya conversation handoff

20 October 2026. Implemented at the author's request after the Phase07 review.

## Player flow

- Initial public tip and editor replies remain in the Bulletin return inbox.
- Accepting the existing Messages connection enables a direct **Open Maya in Messages** handoff from later case pages. Maya's chat bubbles and reply composer no longer appear inside those Bulletin pages.
- Messages handles revision questions, the permitted note question, personal check-in, claim framing, office questions and the selected final disclosures. The player still chooses a reply and presses **Send**.
- **Return to case in Bulletin** opens the current document/investigation step directly. Check-in/framing continuation returns to the public request without skipping its review or submission.
- Declining Messages keeps the Bulletin return inbox and its original dialogue controls available. Reading the Archive remains a separate permission.

No new story fact, choice ID, scene, permission receipt or evidence disclosure was introduced. Documents, source checks, the private GCRO export and S30 completion remain in their existing case flow.

## Existing saves

New NPC replies use the channel of their triggering player message. This corrects older check-in/framing replies that could be labelled Bulletin despite answering a Messages turn.

The read-only history selector also displays those specific old replies alongside their matching Messages player turn. It requires both the accepted connection and the exact matching player message. It does not rewrite stored channels, import old public tips, migrate the legacy save key or award knowledge. Unpaired Bulletin replies remain outside Messages.

## Verification

- Typecheck, lint and production build: PASS.
- Unit/component suite: PASS,167/167. Added channel-routing, legacy-history isolation and navigation-without-state-mutation coverage.
- Browser suite: PASS,43/43,0 failed/skipped/flaky,exit0,approximately4 minutes. See `qa/maya-messages-browser.json` and `qa/maya-messages-browser.log`.
- Social-route browser assertions now follow the actual Bulletin→Messages→Bulletin handoffs, verify Maya's exact replies in Messages and retain all previous disclosure, private-file and S30 assertions.
- Direct UI inspection confirmed complete old-save Messages history, including the formerly split replies. Screenshot: `qa/maya-messages/messages-history.png`.

The first browser run was intentionally interrupted after the old reply-channel defect was discovered; its partial output is retained as `qa/maya-messages-interrupted.log` and is not acceptance evidence. The subsequent full run uses the completed routing fix.
