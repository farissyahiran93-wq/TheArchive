# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll
- Location: tests\e2e\scene02-handoff.spec.ts:33:1

# Error details

```
Error: clock.pauseAt: Error: Cannot fast-forward to the past
    at ClockController._innerFastForwardTo (<anonymous>:202:13)
    at ClockController.pauseAt (<anonymous>:133:16)
    at async <anonymous>:396:30
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Local time 08:00 PM" [ref=e5]: 8:00 PM
  - main "Phone lock screen" [ref=e22]:
    - generic [ref=e23]:
      - paragraph [ref=e28]: Thursday, 8 October
      - heading "8:41" [level=1] [ref=e29]
    - generic [ref=e30]:
      - paragraph [ref=e31]:
        - text: YOUR PHONE
        - generic [ref=e32]: PRIVATE DEVICE
      - button "Enter the archive" [ref=e33] [cursor=pointer]:
        - generic [ref=e36]: Swipe up to open
  - navigation "Phone navigation" [ref=e37]:
    - button "Go home" [ref=e38] [cursor=pointer]
```