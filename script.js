const container = document.getElementById('dorks-container');
const domainInput = document.getElementById('target-domain');
const engineSelect = document.getElementById('search-engine');

const engines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
};

async function loadDorks() {
    if (typeof dorksData !== 'undefined') {
        renderDorks(dorksData);
    } else {
        console.error('Error loading dorks: dorksData is undefined');
        container.innerHTML = '<p>Failed to load dorks.</p>';
    }
}

function renderDorks(dorks) {
    container.innerHTML = dorks.map(category => `
        <div class="category">
            <h2 class="category-title">${category.category}</h2>
            <div class="dork-grid">
                ${category.items.map(dork => {
        // Safely encode the query for the data attribute
        const safeQuery = dork.query.replace(/"/g, '&quot;');
        return `
                    <div class="dork-card" data-query="${safeQuery}">
                        <div class="dork-header">
                            <div class="dork-name">${dork.name}</div>
                        </div>
                        <div class="dork-desc">${dork.desc}</div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `).join('');

    // Add event listeners after rendering
    document.querySelectorAll('.dork-card').forEach(card => {
        card.addEventListener('click', (e) => {

            const query = card.getAttribute('data-query');
            performSearch(query);
        });
    });
}

function sanitizeDomain(domain) {
    return domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
}



function performSearch(query) {
    let domain = domainInput.value.trim();
    if (!domain) {
        domainInput.focus();

        return;
    }

    domain = sanitizeDomain(domain);

    let fullQuery = "";
    if (query.includes("{domain}")) {
        fullQuery = query.replace(/{domain}/g, domain);
    } else {
        fullQuery = `site:${domain} (${query})`;
    }

    // Replace | with OR for better cross-engine compatibility
    fullQuery = fullQuery.replace(/ \| /g, ' OR ');

    const encodedQuery = encodeURIComponent(fullQuery);
    const engine = engineSelect.value;
    const searchUrl = `${engines[engine]}${encodedQuery}`;

    window.open(searchUrl, '_blank');
}

// Initialize
document.addEventListener('DOMContentLoaded', loadDorks);

// Allow 'Enter' key in input to trigger a basic search
domainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const domain = domainInput.value.trim();
        if (domain) {
            const engine = engineSelect.value;
            const encodedDomain = encodeURIComponent(domain);
            window.open(`${engines[engine]}site:${encodedDomain}`, '_blank');
        }
    }
});
