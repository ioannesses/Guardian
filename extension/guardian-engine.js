/**
 * Guardian Engine - Core Ethical Logic (Local-First)
 */
const GuardianEngine = {
    PATTERNS: {
        PRIVACY: {
            EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
            SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
            CREDIT_CARD: /\b(?:\d[ -]*?){13,16}\b/g
        },
        TRUST: {
            MANIPULATIVE: /\b(buy now|limited time|computer is infected|urgent|act fast|verify account immediately)\b/gi,
            AI_SUSPICION: /\b(as an AI language model|delve|unprecedented|vibrant|holistic)\b/gi
        }
    },

    analyzeText(text) {
        let alerts = { privacy: 0, trust: 0 };
        let analyzedText = text;

        // Integrity Check: Ensure PATTERNS hasn't been corrupted
        if (!this.checkIntegrity()) {
            console.error("🚨 Guardian Engine Integrity Compromised!");
            return { analyzedText, alerts, integrity_fail: true };
        }

        // Privacy Check
        for (const [type, regex] of Object.entries(this.PATTERNS.PRIVACY)) {
            const matches = text.match(regex);
            if (matches) {
                alerts.privacy += matches.length;
                analyzedText = analyzedText.replace(regex, `[GUARDED_${type}]`);
            }
        }

        // Trust Check
        for (const [category, patterns] of Object.entries(this.PATTERNS)) {
            if (category === 'PRIVACY') continue; // Handled above
            for (const [type, regex] of Object.entries(patterns)) {
                const matches = text.match(regex);
                if (matches) {
                    alerts.trust += matches.length;
                }
            }
        }

        return { analyzedText, alerts };
    },

    checkIntegrity() {
        // In a full build, this would verify a checksum of the Engine's code
        return true;
    },

    getTrustScore(alerts) {
        let score = 100 - (alerts.trust * 10) - (alerts.privacy * 5);
        return Math.max(0, score);
    }
};


if (typeof module !== 'undefined') {
    module.exports = GuardianEngine;
}
