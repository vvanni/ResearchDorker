const container = document.getElementById('dorks-container');
const targetInput = document.getElementById('search-target');
const engineSelect = document.getElementById('search-engine');
const modeToggle = document.getElementById('target-mode');
const modeHint = document.getElementById('mode-hint');

const engines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q=",
    yandex: "https://yandex.com/search/?text="
};

function getTargetMode() {
    return modeToggle.querySelector('.mode-btn.active').dataset.mode;
}

function updateHint() {
    const target = targetInput.value.trim();
    const mode = getTargetMode();

    if (!target) {
        modeHint.innerHTML = mode === 'site'
            ? 'Queries will be scoped to a specific website using <code>site:</code>'
            : 'Your target will be added as a search keyword';
    } else {
        modeHint.innerHTML = mode === 'site'
            ? `Results limited to <code>site:${target}</code>`
            : `Searching for mentions of <code>"${target}"</code>`;
    }

    document.querySelectorAll('.dynamic-badge').forEach(badge => {
        badge.textContent = mode === 'site' ? 'Site' : 'Keyword';
    });
}

modeToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.mode-btn');
    if (!btn) return;
    modeToggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateHint();
});

targetInput.addEventListener('input', updateHint);
updateHint();

function compileQuery(rawQuery) {
    const target = targetInput.value.trim();
    const mode = getTargetMode();

    let fullQuery = rawQuery;

    // Replace {target} placeholder if present
    if (fullQuery.includes("{target}")) {
        if (target) {
            fullQuery = fullQuery.replace(/{target}/g, target);
        } else {
            // Remove the placeholder and any surrounding quotes
            fullQuery = fullQuery.replace(/"?{target}"?/g, '').trim();
        }
    } else {
        // For generic queries without placeholders, apply target based on mode
        if (target) {
            const parts = [];

            if (mode === 'site') {
                // Site mode: prepend site: operator, then the query
                parts.push(`site:${target}`);

                const hasLogicalOr = /\||or/i.test(fullQuery);
                const hasParentheses = fullQuery.includes('(');
                if (hasLogicalOr && !hasParentheses) {
                    parts.push(`(${fullQuery})`);
                } else {
                    parts.push(fullQuery);
                }
            } else {
                // Keyword mode: query first, then quoted target
                const hasLogicalOr = /\||or/i.test(fullQuery);
                const hasParentheses = fullQuery.includes('(');
                if (hasLogicalOr && !hasParentheses) {
                    parts.push(`(${fullQuery})`);
                } else {
                    parts.push(fullQuery);
                }

                parts.push(`"${target}"`);
            }

            fullQuery = parts.join(' ');
        }
    }

    fullQuery = fullQuery
        .replace(/ \| /g, ' OR ')
        .replace(/\s+/g, ' ')
        .trim();

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
                            ${dork.query.includes('{target}') 
                                ? `<span class="badge fixed-badge" title="This dork always inserts the target as a keyword">Keyword Only</span>`
                                : `<span class="badge dynamic-badge" title="This dork adapts to your selected Target Mode">${getTargetMode() === 'site' ? 'Site' : 'Keyword'}</span>`
                            }
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
            alert("Query is empty. Please enter a Search Target.");
            return;
        }
        const searchUrl = engines[engineSelect.value] + encodeURIComponent(compiledQuery);
        window.open(searchUrl, '_blank');
    } else if (actionBtn.classList.contains('copy-btn')) {
        if (!compiledQuery) {
            alert("Query is empty. Please enter a Search Target.");
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

    const target = targetInput.value.trim();
    if (!target) return;

    const mode = getTargetMode();
    const query = mode === 'site' ? `site:${target}` : `"${target}"`;
    window.open(engines[engineSelect.value] + encodeURIComponent(query), '_blank');
}

document.addEventListener('DOMContentLoaded', loadDorks);
targetInput.addEventListener('keypress', handleEnterKey);
