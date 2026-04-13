// letter-nav.js
export function isActuallyVisible(el) {
    if (!el) return false;
    // 1. Sidebar collapsed → block ALL sidebar descendants

    // 2. CSS visibility checks
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false;
    }
    // 3. Zero-size or clipped
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }
    // 4. Any hidden ancestor (dropdowns, containers, etc.)
    let parent = el.parentElement;
    while (parent) {
        const ps = getComputedStyle(parent);
        if (ps.display === 'none' || ps.visibility === 'hidden') {
            return false;
        }
        parent = parent.parentElement;
    }
    return true;
}
export function initLetterNav({
    container = document,
} = {}) {
    if (!container) {
        console.warn('initLetterNav: container not found');
        return;
    }
    let lastLetterPressed = null;
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
        if (e.metaKey) return;

        const key = e.key.toLowerCase();
        if (!/^[a-z]$/.test(key)) return;

        const selectors = 'ul > li > a, .page-title, img, iframe, .section-title, #mdvipImgLink, #navBarBtn, #madonnaMedSpa-address-header, .more-info-links > button, .letter-alphabet, .product-title, .item';

        const allEls = [...document.querySelectorAll(selectors)].filter(isActuallyVisible);

        const firstAlpha = (el) => {
            if (el.classList.contains('title-item')) {
                const item = el.closest('.item');
                return item?.innerText.trim()[0]?.toLowerCase();
            }

            if (el.tagName === "IMG") {
                return el.alt?.[0]?.toLowerCase();
            }

            if (el.id) {
                return el.id[0].toLowerCase();
            }

            const text = (el.innerText || '').trim().toLowerCase();
            return text.match(/[a-z]/)?.[0] || '';
        };

        const matching = allEls.filter(el => firstAlpha(el) === key);
        if (!matching.length) return;

        const activeEl = document.activeElement;
        const currentIndex = allEls.indexOf(activeEl);

        let target = null;

        if (e.shiftKey) {
            // 🔼 GO BACKWARD
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (firstAlpha(allEls[i]) === key) {
                    target = allEls[i];
                    break;
                }
            }

            // wrap to end if nothing found
            if (!target) {
                for (let i = allEls.length - 1; i > currentIndex; i--) {
                    if (firstAlpha(allEls[i]) === key) {
                        target = allEls[i];
                        break;
                    }
                }
            }

        } else {
            // 🔽 GO FORWARD
            for (let i = currentIndex + 1; i < allEls.length; i++) {
                if (firstAlpha(allEls[i]) === key) {
                    target = allEls[i];
                    break;
                }
            }

            // wrap to start if nothing found
            if (!target) {
                for (let i = 0; i < currentIndex; i++) {
                    if (firstAlpha(allEls[i]) === key) {
                        target = allEls[i];
                        break;
                    }
                }
            }
        }

        target?.focus();
        target?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
    });
}


