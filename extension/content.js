// Guardian Content Script - The "Eyes" of the Protocol

async function runGuardian() {
    console.log("🛡️ GuardianAI Protocol: Scanning page for Ethical Alignment...");

    const bodyText = document.body.innerText;

    // We'll import the engine logic here (simulated for now by copying or using a background script in a real build)
    const { alerts } = analyzeLocal(bodyText);

    console.log(`🛡️ GuardianAI Scan Complete. Trust Score: ${getScore(alerts)}%`);

    // Notify the popup
    chrome.runtime.sendMessage({
        type: "GUARDIAN_REPORT",
        alerts: alerts,
        score: getScore(alerts),
        url: window.location.hostname
    });
}

function analyzeLocal(text) {
    const patterns = {
        trust: /\b(buy now|limited time|computer is infected|urgent|act fast|verify account immediately|as an AI language model)\b/gi,
        privacy: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    };

    const trustMatches = text.match(patterns.trust) || [];
    const privacyMatches = text.match(patterns.privacy) || [];

    return {
        trust: trustMatches.length,
        privacy: privacyMatches.length
    };
}

function getScore(alerts) {
    let score = 100 - (alerts.trust * 10) - (alerts.privacy * 5);
    return Math.max(0, score);
}

// Run on load
runGuardian();

// Listen for form inputs to protect PII in real-time
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        const { alerts } = analyzeLocal(e.target.value);
        if (alerts.privacy > 0) {
            console.warn("🛡️ GuardianAI: Potential PII detected in input field. Protection active.");
            // In a full version, we might highlight the field or warn the user.
        }
    }
});
