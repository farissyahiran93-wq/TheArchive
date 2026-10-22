# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui01.spec.ts >> layout at 320x720
- Location: tests\e2e\ui01.spec.ts:69:3

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 08:41" [ref=e5]: 8:41
  - main [ref=e22]:
    - paragraph [ref=e23]: UNKNOWN NUMBER / GREYHAVEN
    - heading "Someone is trying to reach you." [level=1] [ref=e24]
    - paragraph [ref=e25]: Sophie Mercer has left you a message about her missing brother. Choose your display name to open the conversation.
    - generic [ref=e26]:
      - generic [ref=e27]: Your name
      - textbox "Your name" [ref=e28]:
        - /placeholder: Display name
      - generic [ref=e29]: Pronouns (optional)
      - combobox "Pronouns (optional)" [ref=e30]:
        - option "Choose later" [selected]
        - option "she/her"
        - option "he/him"
        - option "they/them"
        - option "prefer not to say"
      - button "Set up phone" [disabled] [ref=e31]
  - navigation "Phone navigation" [ref=e34]:
    - button "Go home" [disabled] [ref=e35]
```