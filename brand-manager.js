const fs = require('fs');
const path = require('path');
const { postToLinkedIn } = require('./linkedin-automation');

/**
 * GuardianAI Brand Manager
 * The "Brain" that automates security-to-social authority building.
 */

async function runBrandPipeline(targetDir) {
    console.log(`🔎 Brand Manager: Auditing ${targetDir} for marketing material...`);

    // 1. Run the scanner logic (imported or re-implemented for speed)
    // For this prototype, we'll read the latest report if it exists
    const reportPath = path.join(__dirname, 'guardian-report.json');

    if (!fs.existsSync(reportPath)) {
        console.log('⚠️ No recent security audit found. Run guardian-scanner.js first.');
        return;
    }

    const results = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const fileCount = Object.keys(results).length;

    if (fileCount === 0) {
        console.log('✅ Your codebase is secure. Nothing to report for brand building yet!');
        return;
    }

    console.log(`🚨 Found ${fileCount} files with risks. Generating authority-building post...`);

    // 2. Format the LinkedIn Post
    const postContent = `AI Security Alert: Our latest audit of project assets found potential data leaks in ${fileCount} files. 🛡️

Exposed PII and API keys are the #1 risk to enterprise AI adoption. GuardianAI identified these vulnerabilities instantly.

Don't wait for a breach. Secure your AI future. 
🚀 Repo: https://github.com/ioannesses/Guardian

#AI #CyberSecurity #GuardianAI #DataSafety #Fintech`;

    console.log('📝 Prepared Post Content:');
    console.log('-------------------------');
    console.log(postContent);
    console.log('-------------------------');

    // 3. Post to LinkedIn
    console.log('🚀 Attempting to post to LinkedIn...');
    await postToLinkedIn(postContent);
}

const target = process.argv[2] || '.';
runBrandPipeline(target);
