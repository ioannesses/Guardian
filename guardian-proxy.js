const http = require('http');

/**
 * Guardian Ethical Filter - A real-time interceptor for privacy and trust.
 */

const ETHICAL_PATTERNS = {
    PRIVACY: {
        EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
        API_KEY: /(?:key|api|token|secret|password|passwd|pwd)[_-]?[a-z0-9]{16,}/gi,
        CREDIT_CARD: /\b(?:\d[ -]*?){13,16}\b/g
    },
    TRUST: {
        MANIPULATIVE_LANGUAGE: /\b(buy now|limited time|your computer is infected|urgent|act fast|guaranteed win|verify your account immediately)\b/gi,
        AI_GENERATED_SUSPICION: /\b(as an AI language model|unprecedented growth|delve|vibrant|holistic)\b/gi
    }
};

function processEthicalGuidelines(text) {
    let processed = text;
    let scores = { privacy_alerts: 0, trust_alerts: 0 };

    // 1. Redact Privacy Data
    for (const [type, regex] of Object.entries(ETHICAL_PATTERNS.PRIVACY)) {
        const matches = text.match(regex);
        if (matches) {
            scores.privacy_alerts += matches.length;
            processed = processed.replace(regex, `[PROTECTED_${type}]`);
        }
    }

    // 2. Flag Trust Issues (without redacting, just tagging)
    for (const [type, regex] of Object.entries(ETHICAL_PATTERNS.TRUST)) {
        const matches = text.match(regex);
        if (matches) {
            scores.trust_alerts += matches.length;
            // Highlight for the dashboard
            processed = processed.replace(regex, (match) => `[ETHICAL_FLAG_${type}: ${match}]`);
        }
    }

    return { processed, scores };
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const originalRequest = JSON.parse(body);
                console.log('📥 Incoming Raw Content:', body);

                const { processed, scores } = processEthicalGuidelines(body);
                const result = JSON.parse(processed);

                console.log('🛡️ Guardian Filter applied. Alerts:', scores);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    guardian_layer: 'v1.0.0',
                    ethical_scores: scores,
                    data: result
                }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('GuardianAI Ethical Filter is active.');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`\n🛡️  GuardianAI Ethical Filter running on http://localhost:${PORT}`);
    console.log(`🛡️  Protecting Privacy and Truth in real-time.\n`);
});

