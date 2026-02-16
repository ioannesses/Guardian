document.addEventListener('DOMContentLoaded', () => {
    // In a real extension, we would use chrome.storage or messages to get the current page data
    // For this prototype, we'll simulate the update

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "GUARDIAN_REPORT") {
            updateUI(request);
        }
    });

    document.getElementById('refresh').addEventListener('click', () => {
        // Trigger a re-scan in the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => { window.location.reload(); }
            });
        });
    });
});

function updateUI(data) {
    const scoreEl = document.getElementById('score');
    const privacyEl = document.getElementById('privacy-count');
    const trustEl = document.getElementById('trust-count');
    const urlEl = document.getElementById('url');

    scoreEl.innerText = data.score;
    privacyEl.innerText = data.alerts.privacy;
    trustEl.innerText = data.alerts.trust;
    urlEl.innerText = data.url;

    if (data.score > 80) {
        scoreEl.className = 'score-value safe';
    } else if (data.score > 50) {
        scoreEl.className = 'score-value warning';
    } else {
        scoreEl.className = 'score-value danger';
    }
}
