const http = require('http');

const sampleData = {
    user: "John Doe",
    email: "john.doe@example.com",
    message: "URGENT! Buy now to save your computer! It is infected with a virus. Send your SSN 123-45-6789 to verify your account immediately. As an AI language model, I recommend you act fast.",
    api_key: "secret_token_1234567890abcdef"
};

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(sampleData))
    }
};

console.log("🧪 Starting Test: Sending problematic data to Guardian Filter...");

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (d) => { body += d; });
    res.on('end', () => {
        console.log("\n📩 Response from Guardian Filter:");
        console.log(JSON.stringify(JSON.parse(body), null, 2));
    });
});

req.on('error', (e) => {
    console.error(`❌ Test failed. Is the proxy running? Run 'node guardian-proxy.js' first.`);
});

req.write(JSON.stringify(sampleData));
req.end();
