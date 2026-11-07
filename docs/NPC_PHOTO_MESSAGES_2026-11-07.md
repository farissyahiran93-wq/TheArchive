# NPC photo messages — 7 November 2026

Two generated, fictional personal snapshots are delivered as optional-to-view NPC chat attachments. They are narrative character moments, not authenticated evidence, recovered phone fragments or new knowledge for other characters.

- **Scene 3:** Sophie sends `TA-S03-PHOTO-BISCUITS` beside the existing conversation about Daniel's biscuits. The recipient can enlarge it in the existing photo viewer. It does not unlock a clue, attach a Daniel note, alter the Scene 1 opening or create a Photos evidence item.
- **Scene 8:** Maya sends `TA-S08-PHOTO-MUGS` during the personal conversation after she explains why she did not share the check-in sooner. Her photo is separate from the manually inspected message capture and does not prove Daniel's location, access to a record, or the identity of another copy.
- **Scene 9:** Maya's already supplied secondary-card photo retains its separate evidence and provenance guards; it is not replaced by either new snapshot.

Each new message is delivered at a real story beat, has a unique event ID, remains in its original private conversation, and requires the player to open it to view full size. New starts of these scenes carry a `photoRevision` pin; saves that had already started the corresponding scene retain their prior message graph and are not backfilled with new photos. No real contacts, device photos, GPS, timestamps or external media services are used. The image assets are in `public/media/chat/`; they are not linked as recovered Daniel phone evidence.

Typecheck and lint passed. The full unit suite passed 1,495/1,495; focused Scene 3/8/9 browser tests passed 5/5; the full browser regression passed 203/203 in 18.4 minutes on stable code. Production build passed with its existing large-chunk warning. Human and physical-device acceptance remain pending. Scene 7 audio listening acceptance remains a separate outstanding item.
