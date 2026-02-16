# GuardianAI 🛡️

**Automated Compliance & Security for the AI Era.**

GuardianAI is a high-ROI enterprise solution designed to bridge the gap between rapid AI adoption and rigorous security/compliance standards (GDPR, SOC2, HIPAA).

## 🚀 Key Features

- **Guardian CLI Scanner**: Audit your local codebases and datasets for PII (SSN, Emails, IPs) and Secrets (API Keys, Private Keys) before they reach the cloud.
- **Guardian Gateway Proxy**: A real-time middleware that redacts sensitive information from outgoing LLM requests, ensuring zero data leakage.
- **Premium Security Dashboard**: A high-fidelity, glassmorphism-inspired UI for CIOs and CISOs to monitor risk scores and compliance status in real-time.
- **Compliance Automation**: Automatically generates evidence for SOC2 and GDPR audits based on AI interaction logs.

## 🛠️ Tech Stack

- **Backend**: Node.js (Regex-based detection engines)
- **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript, Lucide Icons
- **Security**: Zero-knowledge architecture, TLS 1.3, AES-256

## 📦 Getting Started

### 1. Run the Scanner
```bash
node guardian-scanner.js <directory-to-scan>
```
This will generate a `guardian-report.json` file.

### 2. Start the Proxy
```bash
node guardian-proxy.js
```
The proxy runs on `http://localhost:3001`. Send your LLM requests through it to automatically redact sensitive data.

### 3. Open the Dashboard
Simply open `dashboard/index.html` in your browser.

## 💰 Monetization Strategy

GuardianAI follows a tiered SaaS model:
- **Community**: Free CLI scanner for individual developers.
- **Pro ($49/mo)**: Hosted dashboard + CI/CD integration.
- **Enterprise (Custom)**: Real-time Gateway + SOC2 Evidence Generation + Dedicated Support.

## ⚖️ Ethics & Cybersecurity
We adhere to the highest ethical and cybersecurity standards. See our [Ethics Charter](ethics_charter.md) for more details.

## 📄 License
This project is licensed under the MIT License.
