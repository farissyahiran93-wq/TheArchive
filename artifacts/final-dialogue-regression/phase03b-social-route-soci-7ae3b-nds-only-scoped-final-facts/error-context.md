# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03b-social-route.spec.ts >> social route accepts separate permissions, opens optional Maya scenes and sends only scoped final facts
- Location: tests\e2e\phase03b-social-route.spec.ts:4:1

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 17:45" [ref=e5]: 17:45
  - generic [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - button "Back to home" [ref=e25] [cursor=pointer]
        - generic [ref=e28]:
          - generic [ref=e29]: GREYHAVEN MEMORY PROJECT
          - heading "Bulletin." [level=1] [ref=e30]
        - generic [ref=e31]: LOCALRECORDS
      - list "Case reading progress" [ref=e32]:
        - listitem [ref=e33]: 01The brief
        - listitem [ref=e34]: 02Records
        - listitem [ref=e35]: 03Your tip
        - listitem [ref=e36]: 04Research
    - generic [ref=e37]:
      - paragraph [ref=e38]:
        - generic [ref=e39]: THE MISSING ENTRY
        - generic [ref=e40]: CASE MP-DM-07
      - heading "The part that is still open" [level=2] [ref=e41]
      - article [ref=e42]:
        - heading "Case Board · one answer" [level=3] [ref=e43]
        - paragraph [ref=e44]: The versions changed after verification. The GCRO copy remains private to your request session.
      - button "Open Maya in Messages" [ref=e45] [cursor=pointer]
      - button "Compare public directory and open status card" [disabled] [ref=e46]
      - article [ref=e47]:
        - text: CIVIC PORTAL VALIDATION DESK · GH-PV-02 v1
        - heading "Public correction queue status" [level=3] [ref=e48]
        - paragraph [ref=e49]: "Service: public record correction queue. Role class: correction queue submitter. Capability: ENABLED. As of 8 Oct 2026."
        - paragraph [ref=e50]: This public card lists no individual account, login, submission or operator.
      - heading "What does this add?" [level=3] [ref=e51]
      - button "The role can still submit correction work." [disabled] [ref=e52]
      - button "The same person is changing records now." [ref=e53] [cursor=pointer]
      - button "The office must have removed June deliberately." [ref=e54] [cursor=pointer]
      - article [ref=e55]:
        - paragraph [ref=e56]: The archive kept the older line. The public page did not. The queue that can change what everyone sees is still enabled—and the public card will not say whose hand is on it.
        - paragraph [ref=e57]: "Board question: Who reviews changes to a record once a verified version exists? No operator identified. No new submission established."
      - button "Open Maya in Messages" [ref=e58] [cursor=pointer]
      - button "End episode" [disabled] [ref=e59]
  - navigation "Phone navigation" [ref=e60]:
    - button "Go home" [ref=e61] [cursor=pointer]
```