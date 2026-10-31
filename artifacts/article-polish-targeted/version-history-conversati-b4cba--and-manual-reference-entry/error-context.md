# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: version-history-conversation.spec.ts >> Unknown origin: notification, explicit bridge Sends, cancel, installation reload and manual reference entry
- Location: tests\e2e\version-history-conversation.spec.ts:12:1

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - generic "Local time 04:58 PM" [ref=f2e5]: 4:58 PM
  - generic [ref=f2e21]:
    - generic [ref=f2e22]:
      - generic [ref=f2e23]: THE ARCHIVE
      - button "Main Menu" [ref=f2e24] [cursor=pointer]
    - main "Phone lock screen" [ref=f2e25]:
      - generic [ref=f2e26]:
        - paragraph [ref=f2e31]: Friday, January 15
        - heading "4:58 PM" [level=1] [ref=f2e32]
      - generic [ref=f2e33]:
        - paragraph [ref=f2e34]:
          - text: YOUR PHONE
          - generic [ref=f2e35]: PRIVATE DEVICE
        - button "Enter the archive" [ref=f2e36] [cursor=pointer]:
          - generic [ref=f2e39]: Swipe up to open
  - dialog "Device security" [ref=f2e40]:
    - generic [ref=f2e41]:
      - generic [ref=f2e42]: DEVICE SECURITY
      - heading "THE ARCHIVE" [level=2] [ref=f2e43]
      - paragraph [ref=f2e44]: "Package origin: UNKNOWNPublisher: UNVERIFIEDIntegrity: NOT ESTABLISHEDAccess: RESTRICTED"
      - paragraph [ref=f2e45]: This package was shared by an unknown contact. Its origin cannot be authenticated.
      - generic [ref=f2e46]:
        - generic [ref=f2e47]:
          - status [ref=f2e48]: INSTALL COMPLETE
          - strong [ref=f2e49]: 100%
        - progressbar "Archive installation" [ref=f2e50]
        - button "DONE" [active] [ref=f2e51] [cursor=pointer]
  - navigation "Phone navigation" [ref=f2e52]:
    - button "Go home" [ref=f2e53] [cursor=pointer]
```