const GuardianEngine = require('../extension/guardian-engine.js');
const scenarios = require('./scenarios.json');

console.log("🛠️  GuardianAI Master Test Runner starting...");
console.log(`📊 Loaded ${scenarios.length} test scenarios.\n`);

let passed = 0;
let failed = 0;

scenarios.forEach(scenario => {
    const { alerts } = GuardianEngine.analyzeText(scenario.text);

    const privacyPass = alerts.privacy === scenario.expected.privacy;
    const trustPass = alerts.trust === scenario.expected.trust;

    if (privacyPass && trustPass) {
        console.log(`✅ [PASS] ${scenario.name}`);
        passed++;
    } else {
        console.log(`❌ [FAIL] ${scenario.name}`);
        console.log(`   Expected: Privacy ${scenario.expected.privacy}, Trust ${scenario.expected.trust}`);
        console.log(`   Actual:   Privacy ${alerts.privacy}, Trust ${alerts.trust}`);
        failed++;
    }
});

console.log(`\n🏁 Test Results: ${passed} Passed, ${failed} Failed.`);

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
