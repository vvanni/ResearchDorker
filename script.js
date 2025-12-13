const container = document.getElementById('dorks-container');
const domainInput = document.getElementById('target-domain');
const topicInput = document.getElementById('search-topic');
const engineSelect = document.getElementById('search-engine');

const engines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
};

function loadDorks() {
    if (typeof dorksData === 'undefined') {
        container.innerHTML = '<p>Failed to load dorks.</p>';
        return;
    }

    container.innerHTML = dorksData.map(category => `
        <div class="category">
            <h2 class="category-title">${category.category}</h2>
            <div class="dork-grid">
                ${category.items.map(dork => `
                    <div class="dork-card" data-query="${dork.query.replace(/"/g, '&quot;')}">
                        <div class="dork-name">${dork.name}</div>
                        <div class="dork-desc">${dork.desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.addEventListener('click', e => {
        const card = e.target.closest('.dork-card');
        if (card) performSearch(card.dataset.query);
    });
}

function sanitizeDomain(domain) {
    return domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
}

function performSearch(query) {
    const domain = domainInput.value.trim();
    const topic = topicInput.value.trim();
    const cleanDomain = domain ? sanitizeDomain(domain) : '';

    let fullQuery;

    if (query.includes("{domain}")) {
        // Cloud/repo searches - use domain or topic as the search term
        const searchTerm = cleanDomain || topic || '';
        fullQuery = searchTerm ? query.replace(/{domain}/g, searchTerm) : query.replace(/\"{domain}\"/g, '');
    } else {
        // Regular dorks - build query from parts
        const parts = [];
        if (cleanDomain) parts.push(`site:${cleanDomain}`);
        parts.push(`(${query})`);
        if (topic) parts.push(`"${topic}"`);
        fullQuery = parts.join(' ');
    }

    // Clean up: replace | with OR, normalize spaces
    fullQuery = fullQuery.replace(/ \| /g, ' OR ').replace(/\s+/g, ' ').trim();

    const searchUrl = engines[engineSelect.value] + encodeURIComponent(fullQuery);
    window.open(searchUrl, '_blank');
}

function handleEnterKey(e) {
    if (e.key !== 'Enter') return;

    const domain = domainInput.value.trim();
    const topic = topicInput.value.trim();
    if (!domain && !topic) return;

    let query = '';
    if (domain) query += `site:${sanitizeDomain(domain)} `;
    if (topic) query += `"${topic}"`;

    window.open(engines[engineSelect.value] + encodeURIComponent(query.trim()), '_blank');
}

document.addEventListener('DOMContentLoaded', loadDorks);
domainInput.addEventListener('keypress', handleEnterKey);
topicInput.addEventListener('keypress', handleEnterKey);
