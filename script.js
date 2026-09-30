// KAP Audit Portal — theme toggle, quick filter & footer year. Zero dependencies.
(function () {
    'use strict';

    var root = document.documentElement;
    var btn = document.getElementById('theme-toggle');
    var use = btn && btn.querySelector('use');

    function apply(theme) {
        root.dataset.theme = theme;
        if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
        if (use) use.setAttribute('href', theme === 'dark' ? '#i-moon' : '#i-sun');
    }

    // Sync button to whatever the pre-paint inline script already set.
    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

    if (btn) {
        btn.addEventListener('click', function () {
            var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            apply(next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
        });
    }

    // Dynamic Copyright Year
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Quick Search / Instant Filter
    var searchInput = document.getElementById('tool-search');
    var clearBtn = document.getElementById('search-clear');
    var resetBtn = document.getElementById('reset-search');
    var feedback = document.getElementById('search-feedback');
    var noResults = document.getElementById('no-results');
    var groups = document.querySelectorAll('.group');

    // Cache initial group counts
    var groupCounts = [];
    groups.forEach(function (group, idx) {
        var countEl = group.querySelector('.group-count');
        groupCounts[idx] = countEl ? countEl.textContent : '';
    });

    function doFilter(term) {
        var q = (term || '').trim().toLowerCase();
        var totalVisible = 0;

        if (clearBtn) {
            clearBtn.hidden = (q.length === 0);
        }

        groups.forEach(function (group, idx) {
            var cards = group.querySelectorAll('.tool');
            var groupVisible = 0;

            cards.forEach(function (card) {
                var title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
                var desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
                var cat = (card.dataset.cat || '').toLowerCase();
                var host = (card.querySelector('.host') ? card.querySelector('.host').textContent : '').toLowerCase();

                var isMatch = !q || title.indexOf(q) !== -1 || desc.indexOf(q) !== -1 || cat.indexOf(q) !== -1 || host.indexOf(q) !== -1;

                card.hidden = !isMatch;
                if (isMatch) {
                    groupVisible++;
                    totalVisible++;
                }
            });

            group.hidden = (groupVisible === 0);

            var countEl = group.querySelector('.group-count');
            if (countEl) {
                if (!q) {
                    countEl.textContent = groupCounts[idx];
                } else if (groupVisible > 0) {
                    countEl.textContent = groupVisible + ' cocok';
                }
            }
        });

        if (noResults) {
            noResults.hidden = (totalVisible > 0);
        }

        if (feedback) {
            if (q.length > 0) {
                feedback.textContent = totalVisible > 0 
                    ? totalVisible + ' alat ditemukan untuk "' + q + '".' 
                    : 'Tidak ada hasil untuk "' + q + '".';
            } else {
                feedback.textContent = '';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            doFilter(searchInput.value);
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (searchInput.value) {
                    searchInput.value = '';
                    doFilter('');
                } else {
                    searchInput.blur();
                }
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
                doFilter('');
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
                doFilter('');
            }
        });
    }

    // Keyboard shortcut: Press '/' to focus search input
    document.addEventListener('keydown', function (e) {
        if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            var activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'input' && activeTag !== 'textarea') {
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        }
    });
})();
