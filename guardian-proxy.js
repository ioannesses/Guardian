const http = require('http');

/**
 * Guardian Gateway Proxy - Redacts sensitive data in transit.
 */

const REDACTION_PATTERNS = {
    EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
    API_KEY: /(?:key|api|token|secret|password|passwd|pwd)[_-]?[a-z0-9]{16,}/gi
};

function redact(text) {
    let redacted = text;
    for (const [type, regex] of Object.entries(REDACTION_PATTERNS)) {
        redacted = redacted.replace(regex, `[REDACTED_${type}]`);
    }
    return redacted;
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const originalRequest = JSON.parse(body);
            console.log('📥 Incoming Request:', originalRequest);

            // Recursive redaction logic
            const redactedRequest = JSON.parse(redact(body));

            console.log('🛡️ Redacted Request:', redactedRequest);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'success',
                processed_at: new Date().toISOString(),
                data: redactedRequest
            }));
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('GuardianAI Gateway is active.');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🛡️ GuardianAI Gateway Proxy running on http://localhost:${PORT}`);
});
