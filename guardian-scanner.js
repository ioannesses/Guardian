const fs = require('fs');
const path = require('path');

/**
 * Guardian Scanner - Detects PII and Secrets in codebases.
 */

const PATTERNS = {
    EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    IPV4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
    API_KEY: /(?:key|api|token|secret|password|passwd|pwd)[_-]?[a-z0-9]{16,}/gi,
    PRIVATE_KEY: /-----BEGIN (?:RSA|OPENSSH) PRIVATE KEY-----/g
};

async function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];

    for (const [type, regex] of Object.entries(PATTERNS)) {
        let match;
        while ((match = regex.exec(content)) !== null) {
            findings.push({
                type,
                line: content.substring(0, match.index).split('\n').length,
                match: match[0].substring(0, 4) + '****' // Masking for safety
            });
        }
    }

    return findings;
}

async function scanDirectory(dirPath) {
    const results = {};
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            Object.assign(results, await scanDirectory(fullPath));
        } else {
            const findings = await scanFile(fullPath);
            if (findings.length > 0) {
                results[file] = findings;
            }
        }
    }

    return results;
}

const target = process.argv[2] || '.';
console.log(`🚀 GuardianAI Scanner starting on: ${path.resolve(target)}`);

scanDirectory(target).then(results => {
    const reportPath = 'guardian-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`✅ Scan complete. Report saved to ${reportPath}`);
    console.log(`📊 Found ${Object.keys(results).length} files with potential issues.`);
}).catch(err => {
    console.error('❌ Scan failed:', err);
});
