# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: v4-s30.spec.ts >> an earlier Bulletin save can explicitly continue in MIRROR without a story reset
- Location: tests\e2e\v4-s30.spec.ts:5:1

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Greyhaven story time 8 October 2026 09:00" [ref=f1e5]: 9:00
  - main "Rae's home screen" [ref=f1e22]:
    - generic [ref=f1e23]:
      - generic [ref=f1e24]:
        - generic [ref=f1e25]: Rae's phone
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
        - button "Open Files" [ref=f1e107] [cursor=pointer]:
          - generic [ref=f1e112]: Files
        - button "Open Notes" [ref=f1e113] [cursor=pointer]:
          - generic [ref=f1e119]: Notes
        - button "Open Maps" [ref=f1e120] [cursor=pointer]:
          - generic [ref=f1e130]: Maps
        - button "Open Search" [ref=f1e131] [cursor=pointer]:
          - generic [ref=f1e146]: Search
        - button "Open Contacts" [ref=f1e147] [cursor=pointer]:
          - generic [ref=f1e156]: Contacts
      - button "Continue MIRROR conversation" [ref=f1e157] [cursor=pointer]
    - generic [ref=f1e158]:
      - generic "Home pages" [ref=f1e159]:
        - button "Show home page 1" [ref=f1e160] [cursor=pointer]
        - button "Show home page 2" [ref=f1e162] [cursor=pointer]
      - navigation "Quick apps" [ref=f1e164]:
        - button "Open Calls" [ref=f1e165] [cursor=pointer]
        - button "Open Messages" [ref=f1e169] [cursor=pointer]
        - button "Open Contacts" [ref=f1e173] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e182]:
    - button "Go home" [disabled] [ref=f1e183]
```