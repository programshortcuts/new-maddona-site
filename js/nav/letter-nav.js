// letter-nav.js
export function initLetterNav({
    container = document,
} = {}) {

    if (!container) {
        console.warn('initLetterNav: container not found');
        return;
    }

    let lastLetterPressed = null;
    

    document.addEventListener('keydown', (e) => {

        // Ignore typing fields
        if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
        console.log('here')
        // Ignore modifier keys
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        const key = e.key.toLowerCase();

        // Only letters & numbers
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

        // ✅ Get all selectable elements (no over-filtering)
        const allEls = [...container.querySelectorAll('a,button,#biote')].filter(el => {
            return el.offsetParent !== null; // keeps visible elements only
        });

        // ✅ Match by first letter
        const matches = allEls.filter(el =>
            el.textContent.trim().toLowerCase().startsWith(key)
        );

        if (!matches.length) return;

        const active = document.activeElement;

        // Allow immediately OR if inside container
        const isInitialState = active === document.body;
        const isInside = container.contains(active);

        if (!isInitialState && !isInside) return;

        // ✅ PRIORITY: buttons (dropdowns) first, then links
        const buttonMatches = matches.filter(el => el.tagName === 'BUTTON');
        const linkMatches = matches.filter(el => el.tagName === 'A');

        let orderedMatches = matches;

// ✅ ONLY prioritize local on first press
        const isNewKey = key !== lastLetterPressed;

// ✅ SPECIAL CASE:
// Only when switching FROM a different letter → TO this one
        if (isNewKey && active && active !== document.body) {
            const currentIndexInAll = allEls.indexOf(active);

            if (currentIndexInAll > 0) {
                const prevEl = allEls[currentIndexInAll - 1];

                const prevElStartsWithKey = prevEl.textContent
                    .trim()
                    .toLowerCase()
                    .startsWith(key);

                if (prevElStartsWithKey) {
                    prevEl.focus();
                    prevLetterPressed = lastLetterPressed;
                    lastLetterPressed = key;
                    return; // 🚨 STOP here (skip normal logic)
                }
            }
        }

        const currentIndex = orderedMatches.indexOf(active);

        let nextEl;

        if (key !== lastLetterPressed || currentIndex === -1) {
            nextEl = orderedMatches[0];
        } else {
            if (e.shiftKey) {
                const i = (currentIndex - 1 + orderedMatches.length) % orderedMatches.length;
                nextEl = orderedMatches[i];
            } else {
                const i = (currentIndex + 1) % orderedMatches.length;
                nextEl = orderedMatches[i];
            }
        }

        nextEl?.focus();
        lastLetterPressed = key;
    });
}