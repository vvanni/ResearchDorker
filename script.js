const container = document.getElementById('dorks-container');
const domainInput = document.getElementById('target-domain');
const topicInput = document.getElementById('search-topic');
const engineSelect = document.getElementById('search-engine');

const engines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
};

function sanitizeDomain(domain) {
    return domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
}

function compileQuery(rawQuery) {
    const domain = domainInput.value.trim();
    const topic = topicInput.value.trim();
    const cleanDomain = domain ? sanitizeDomain(domain) : '';

    let fullQuery = rawQuery;
    const hasSiteOperator = /site:/i.test(rawQuery);

    // Replace placeholders if they exist
    if (fullQuery.includes("{domain}") || fullQuery.includes("{topic}")) {
        const domainReplacement = cleanDomain || topic || '';
        const topicReplacement = topic || cleanDomain || '';

        if (domainReplacement) {
            fullQuery = fullQuery.replace(/{domain}/g, domainReplacement);
        } else {
            // Remove the placeholder and any surrounding quotes
            fullQuery = fullQuery.replace(/"?{domain}"?/g, '').trim();
        }

        if (topicReplacement) {
            fullQuery = fullQuery.replace(/{topic}/g, topicReplacement);
        } else {
            // Remove the placeholder and any surrounding quotes
            fullQuery = fullQuery.replace(/"?{topic}"?/g, '').trim();
        }
    } else {
        // For general queries without placeholders:
        const parts = [];
        
        // 1. Prepend target domain constraint only if the query itself doesn't contain a site limit
        if (cleanDomain && !hasSiteOperator) {
            parts.push(`site:${cleanDomain}`);
        }
        
        // 2. Include the query itself (wrap in parentheses only if it contains OR operators and is not already grouped)
        const hasLogicalOr = /\||or/i.test(fullQuery);
        const hasParentheses = fullQuery.includes('(');
        if (hasLogicalOr && !hasParentheses) {
            parts.push(`(${fullQuery})`);
        } else {
            parts.push(fullQuery);
        }
        
        // 3. Append the topic if present and not already matched as the domain
        if (topic) {
            parts.push(`"${topic}"`);
        }
        
        // 4. If target domain is present, query is site-specific (like site:github.com), but no topic is present,
        // we append the target domain as a search keyword to search for it on that site
        if (hasSiteOperator && cleanDomain && !topic) {
            parts.push(`"${cleanDomain}"`);
        }

        fullQuery = parts.join(' ');
    }

    // Clean up spaces and convert OR operators
    fullQuery = fullQuery
        .replace(/ \| /g, ' OR ')
        .replace(/\s+/g, ' ')
        .trim();

    // Remove empty parenthetical groups
    fullQuery = fullQuery.replace(/\(\s*\)/g, '').trim();

    return fullQuery;
}

function loadDorks() {
    if (typeof dorksData === 'undefined') {
        container.innerHTML = '<p class="error-msg">Failed to load OSINT dorks. Please ensure data.js is loaded correctly.</p>';
        return;
    }

    container.innerHTML = dorksData.map(category => `
        <div class="category">
            <h2 class="category-title">${category.category}</h2>
            <div class="dork-grid">
                ${category.items.map(dork => `
                    <div class="dork-card" data-query="${dork.query.replace(/"/g, '&quot;')}">
                        <div class="dork-header">
                            <div class="dork-name">${dork.name}</div>
                        </div>
                        <div class="dork-desc">${dork.desc}</div>
                        <div class="dork-actions">
                            <button class="action-btn launch-btn" title="Launch Search">
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                                <span>Launch</span>
                            </button>
                            <button class="action-btn copy-btn" title="Copy Compiled Query">
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

container.addEventListener('click', async (e) => {
    const actionBtn = e.target.closest('.action-btn');
    if (!actionBtn) return;

    const card = actionBtn.closest('.dork-card');
    const rawQuery = card.dataset.query;
    const compiledQuery = compileQuery(rawQuery);

    if (actionBtn.classList.contains('launch-btn')) {
        if (!compiledQuery) {
            alert("Query is empty. Please enter a Target Domain or Search Topic.");
            return;
        }
        const searchUrl = engines[engineSelect.value] + encodeURIComponent(compiledQuery);
        window.open(searchUrl, '_blank');
    } else if (actionBtn.classList.contains('copy-btn')) {
        if (!compiledQuery) {
            alert("Query is empty. Please enter a Target Domain or Search Topic.");
            return;
        }
        try {
            await navigator.clipboard.writeText(compiledQuery);
            const originalHTML = actionBtn.innerHTML;
            actionBtn.innerHTML = `
                <svg class="icon success-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Copied!</span>
            `;
            actionBtn.classList.add('copied');
            setTimeout(() => {
                actionBtn.innerHTML = originalHTML;
                actionBtn.classList.remove('copied');
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy query to clipboard.");
        }
    }
});

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
