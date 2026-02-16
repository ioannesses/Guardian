const axios = require('axios');
require('dotenv').config();

/**
 * GuardianAI LinkedIn Automation Utility
 * Posts updates directly to LinkedIn using the API.
 */

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_URN = process.env.LINKEDIN_PERSON_URN; // Format: urn:li:person:XXXX

async function postToLinkedIn(content) {
    if (!ACCESS_TOKEN || !PERSON_URN) {
        console.error('❌ Error: Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN in .env file.');
        return;
    }

    const url = 'https://api.linkedin.com/v2/ugcPosts';

    const body = {
        author: PERSON_URN,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: content
                },
                shareMediaCategory: 'NONE'
            }
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Post successful! ID:', response.data.id);
    } catch (error) {
        console.error('❌ LinkedIn API Error:', error.response ? error.response.data : error.message);
    }
}

// Example usage:
// postToLinkedIn("GuardianAI is officially live! Protect your LLM data today. 🛡️ #AI #Security");

module.exports = { postToLinkedIn };
