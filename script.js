// KAP Audit Portal — theme toggle + footer year. No dependencies.
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

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
