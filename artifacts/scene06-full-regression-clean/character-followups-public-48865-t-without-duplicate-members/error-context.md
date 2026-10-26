# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: character-followups.spec.ts >> public-fact private contacts and consented group reunion persist without duplicate members
- Location: tests\e2e\character-followups.spec.ts:3:1

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
  - generic "Greyhaven story time 8 October 2026 08:41" [ref=e5]: 8:41
  - region "Sophie Mercer first contact" [ref=e22]:
    - generic [ref=e23]:
      - button "Back" [ref=e24] [cursor=pointer]
      - generic [ref=e28]:
        - strong [ref=e29]: Sophie Mercer
        - generic [ref=e30]: Unknown number · identity unverified
    - generic [ref=e33]:
      - generic [ref=e34]: Thursday 8 October · 08:41
      - status "Sophie is typing" [ref=e35]: ...
    - generic [ref=e36]: Sophie is typing...
  - navigation "Phone navigation" [ref=e38]:
    - button "Go home" [ref=e39] [cursor=pointer]
```