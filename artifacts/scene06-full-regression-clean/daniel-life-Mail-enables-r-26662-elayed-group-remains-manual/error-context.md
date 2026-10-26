# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: daniel-life.spec.ts >> Mail enables recovery, test preview opens it immediately and the delayed group remains manual
- Location: tests\e2e\daniel-life.spec.ts:72:1

# Error details

```
Error: clock.pauseAt: Error: Cannot fast-forward to the past
    at ClockController._innerFastForwardTo (<anonymous>:202:13)
    at ClockController.pauseAt (<anonymous>:133:16)
    at async <anonymous>:396:30
```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 08:33 PM" [ref=f1e5]: 8:33 PM
  - main "Alex's home screen" [ref=f1e22]:
    - generic [ref=f1e23]:
      - generic [ref=f1e24]:
        - generic [ref=f1e25]: Alex's phone
        - button "Lock phone" [ref=f1e26] [cursor=pointer]
      - region "Home widgets" [ref=f1e31]:
        - button "Open photo widget" [ref=f1e32] [cursor=pointer]:
          - generic [ref=f1e33]:
            - generic [ref=f1e34]: GREYHAVEN
            - strong [ref=f1e35]: Along the water
        - button "Open calendar widget" [ref=f1e36] [cursor=pointer]:
          - strong [ref=f1e37]: OCTOBER
          - generic [aria-hidden] [ref=f1e38]:
            - generic [ref=f1e39]: S
            - generic [ref=f1e40]: M
            - generic [ref=f1e41]: T
            - generic [ref=f1e42]: W
            - generic [ref=f1e43]: T
            - generic [ref=f1e44]: F
            - generic [ref=f1e45]: S
            - generic [ref=f1e50]: "1"
            - generic [ref=f1e51]: "2"
            - generic [ref=f1e52]: "3"
            - generic [ref=f1e53]: "4"
            - generic [ref=f1e54]: "5"
            - generic [ref=f1e55]: "6"
            - generic [ref=f1e56]: "7"
            - generic [ref=f1e57]: "8"
            - generic [ref=f1e58]: "9"
            - generic [ref=f1e59]: "10"
            - generic [ref=f1e60]: "11"
            - generic [ref=f1e61]: "12"
            - generic [ref=f1e62]: "13"
            - generic [ref=f1e63]: "14"
            - generic [ref=f1e64]: "15"
            - generic [ref=f1e65]: "16"
            - generic [ref=f1e66]: "17"
            - generic [ref=f1e67]: "18"
            - generic [ref=f1e68]: "19"
            - generic [ref=f1e69]: "20"
            - generic [ref=f1e70]: "21"
            - generic [ref=f1e71]: "22"
            - generic [ref=f1e72]: "23"
            - generic [ref=f1e73]: "24"
            - generic [ref=f1e74]: "25"
            - generic [ref=f1e75]: "26"
            - generic [ref=f1e76]: "27"
            - generic [ref=f1e77]: "28"
            - generic [ref=f1e78]: "29"
            - generic [ref=f1e79]: "30"
            - generic [ref=f1e80]: "31"
      - region "Home page 1 apps" [ref=f1e81]:
        - button "Open The Archive" [ref=f1e82] [cursor=pointer]:
          - generic [ref=f1e87]: The Archive
        - button "Open Photos" [ref=f1e88] [cursor=pointer]:
          - generic [ref=f1e100]: Photos
        - button "Open Calendar" [ref=f1e101] [cursor=pointer]:
          - generic [ref=f1e103]:
            - generic [ref=f1e104]: WED
            - strong [ref=f1e105]: "21"
          - generic [ref=f1e106]: Calendar
        - button "Open Notes" [ref=f1e107] [cursor=pointer]:
          - generic [ref=f1e113]: Notes
        - button "Open Contacts" [ref=f1e114] [cursor=pointer]:
          - generic [ref=f1e123]: Contacts
    - generic [ref=f1e124]:
      - generic "Home pages" [ref=f1e125]:
        - button "Show home page 1" [ref=f1e126] [cursor=pointer]
        - button "Show home page 2" [ref=f1e128] [cursor=pointer]
      - navigation "Quick apps" [ref=f1e130]:
        - button "Open Calls" [ref=f1e131] [cursor=pointer]
        - button "Open Messages" [ref=f1e135] [cursor=pointer]:
          - generic [ref=f1e139]: "179"
        - button "Open Contacts" [ref=f1e140] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e149]:
    - button "Go home" [disabled] [ref=f1e150]
```