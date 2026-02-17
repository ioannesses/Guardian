# Guardian Protocol: Final Verification Guide 🧪

Before you push the button and go live, follow these steps to see the extension in action.

## 1. Load the Extension in your Browser
Since it's not in the Web Store yet, you can load it as a "Developer":
1. Open **Google Chrome** or **Microsoft Edge**.
2. Go to: `chrome://extensions/` (or `edge://extensions/`).
3. Toggle on **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"**.
5. Select the `C:\Users\Spartak IV\.gemini\antigravity\scratch\GuardianAI\extension` folder.

## 2. The "Real-World" Test
We have a built-in test page that simulates a malicious site.
1. Open the file `C:\Users\Spartak IV\.gemini\antigravity\scratch\GuardianAI\test-scam-page.html` in the same browser.
2. Observe the page:
   - Does the text containing the email `support@fake-scam.com` get replaced with `[GUARDED_EMAIL]`?
   - Do the fake credit card numbers get redacted?
3. Click the **Guardian Extension Icon** (the Shield) in your toolbar:
   - Does it show a low "Trust Score" (around 40-60)?
   - Does it list "High Density Privacy Threats" and "Manipulation Detected"?

## 3. Verify the "Sync" Dashboard
1. Open `C:\Users\Spartak IV\.gemini\antigravity\scratch\GuardianAI\dashboard\index.html`.
2. Check the **"Investor Insights"** section.
3. Does it show "● Synced v1.2.0"? (This confirms our integrity module is active).

## 📊 Quality Checklist
- [ ] **Privacy Check**: PII is redacted BEFORE you can read it.
- [ ] **Trust Check**: The algorithm catches "Urgent" and "Limited Time" scams.
- [ ] **Performance**: Browser doesn't lag while scanning.
- [ ] **Integrity**: Extension doesn't crash on long pages.

---
**If all these pass, the Guardian is ready to be released to the world.**
