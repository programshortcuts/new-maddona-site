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
    // const rect = el.getBoundingClientRect();
    // if (rect.width === 0 || rect.height === 0) {
    //     return false;
    // }

    if (style.display === 'none' || style.visibility === 'hidden') {
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
// Make different strings to append to selectors to decrease it .length()
        // const navSelectors = '#navBtn'
        // const pageSelectors = ', .mobile-header-nav li  a ,#mainLandingPage,#sideNavBtn,#submitBookingBtn, .page-title, img, iframe'
        // const mainLandingSelectors = ', button.section-title'

        // let selectors = '.form-group> textarea,.form-group > input, .form-group > label, #mdvipImgLink, .page-container-title, #navBarBtn, #madonnaMedSpa-address-header, .more-info-links > button, .product-title, .item,.filter-btn,.sort-btn, .social-media-link-container a';
        // selectors += mainLandingSelectors
        // selectors += pageSelectors

        // const allEls = [...document.querySelectorAll(selectors)].filter(isActuallyVisible);

        const allEls = [
            // 🧭 global controls
            ...document.querySelectorAll('#sideNavBtn, #navBarBtn'),
            // 🔥 your intentional system FIRST
            ...document.querySelectorAll('[data-nav-target]'),

            // 🔗 navigation links
            ...document.querySelectorAll('.mobile-header-nav a'),


            // 🧱 fallback interactive elements
            ...document.querySelectorAll('button, [tabindex="0"]')
        ]
            .filter(isActuallyVisible);

        const firstAlpha = (el) => {
            
            
            if (el.getAttribute('aria-label')) {
                return el.getAttribute('aria-label')[0].toLowerCase();
            }

            // 🔥 FIX: target your button text directly
            if (el.classList.contains('section-title')) {
                const span = el.querySelector('.title-text');
                return span?.textContent.trim()[0]?.toLowerCase() || '';
            }

            if (el.tagName === "IMG") {
                return el.alt?.[0]?.toLowerCase();
            }

            if (el.id) {
                return el.id[0].toLowerCase();
            }

            const text = (el.textContent || '').trim().toLowerCase();
            return text.match(/[a-z]/)?.[0] || '';
        };
        // console.log(
        //     allEls.map(el => ({
        //         text: el.innerText,
        //         alpha: firstAlpha(el),
        //         el
        //     }))
        // );
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
        target?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
        target?.focus({ preventScroll: true });
    });
}


