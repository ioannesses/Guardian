/**
 * GuardianAI Dashboard Logic
 */

const data = {
    riskScore: 12,
    piiDetected: 24,
    compliance: 98,
    activity: [
        { time: '23:25:01', target: 'LLM-Proxy-01', severity: 'Low', status: 'Redacted' },
        { time: '23:20:45', target: 'CLI-Scanner', severity: 'Medium', status: 'Flagged' },
        { time: '23:15:12', target: 'LLM-Proxy-02', severity: 'Low', status: 'Redacted' },
        { time: '23:10:30', target: 'S3-Bucket-Scan', severity: 'High', status: 'Blocked' }
    ]
};

function updateDashboard() {
    // Simulating real-time updates
    const tableBody = document.querySelector('#activity-table tbody');
    tableBody.innerHTML = '';

    data.activity.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>2026-02-15 ${row.time}</td>
            <td>${row.target}</td>
            <td><span class="badge badge-${row.severity.toLowerCase()}">${row.severity}</span></td>
            <td><span class="badge badge-${row.status.toLowerCase()}">${row.status}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();

    // Smooth hover effect for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
