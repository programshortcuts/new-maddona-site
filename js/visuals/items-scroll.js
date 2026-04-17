// items-scroll.js
let cleanupItemsScroll = null;

export function initItemsScroll() {
    const productsContainers = document.querySelectorAll('.products-container');
    if (!productsContainers.length) return;

    // 🔥 CLEANUP (important for injected pages)
    if (cleanupItemsScroll) cleanupItemsScroll();

    const listeners = [];

    // =========================
    // 🎯 SCROLL LOGIC
    // =========================
    const scrollToItem = (el) => {
    const container = el.closest('.items-container');
    if (!container) return;

    const isVertical = container.classList.contains('sort');

    if (isVertical) {
        const containerHeight = container.clientHeight;
        const itemHeight = el.offsetHeight;

        const containerScrollTop = container.scrollTop;
        const itemTop = el.offsetTop;

        // 🎯 center item vertically in container
        const targetScroll =
            itemTop - (containerHeight / 2) + (itemHeight / 2);

        container.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });

    } else {
        const containerWidth = container.clientWidth;
        const itemWidth = el.offsetWidth;

        const targetScroll =
            el.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

        container.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        });
    }
};

    // =========================
    // 🔤 ALPHA NAV
    // =========================
    const alphaLinks = document.querySelectorAll('.letter-alphabet');

    const alphaClickHandler = (e) => {
        e.preventDefault();

        const letter = e.currentTarget.textContent.trim().toUpperCase();
        const container = e.currentTarget.closest('.products-container');
        if (!container) return;

        const items = container.querySelectorAll('.item');

        const match = Array.from(items).find(item => {
            const title = item.querySelector('.title-item');
            return title && title.textContent.trim().toUpperCase().startsWith(letter);
        });

        if (!match) return;

        match.focus();
        scrollToItem(match);
    };

    alphaLinks.forEach(link => {
        link.addEventListener('click', alphaClickHandler);
        listeners.push(() => link.removeEventListener('click', alphaClickHandler));
    });

    // =========================
    // 🎯 ITEM INTERACTIONS
    // =========================
    const allItems = document.querySelectorAll('.item');

    const removeAllClicked = () => {
        allItems.forEach(el => el.classList.remove('clicked-item'));
    };

    const handleFocus = (e) => {
        removeAllClicked();
        scrollToItem(e.currentTarget);
    };

    const handleClick = (e) => {
        const item = e.currentTarget;

        item.focus(); // 🔥 unify behavior
        scrollToItem(item);

        item.classList.toggle('clicked-item');
    };

    const handleKeydown = (e) => {
        const key = e.key.toLowerCase();
        const current = e.currentTarget;

        const container = current.closest('.items-container');
        if (!container) return;

        const items = Array.from(container.querySelectorAll('.item'));
        const index = items.indexOf(current);

        let nextIndex = null;
        const isVertical = container.classList.contains('sort');

        // =========================
        // 🎯 HORIZONTAL
        // =========================
        if (!isVertical) {
            if (key === 'arrowright') nextIndex = index + 1;
            if (key === 'arrowleft') nextIndex = index - 1;
        }

        // =========================
        // 🎯 GRID (VERTICAL)
        // =========================
        if (isVertical) {
            const styles = getComputedStyle(container);
            const gap = parseInt(styles.gap) || 0;

            const itemWidth = current.offsetWidth + gap;
            const itemsPerRow =
                Math.floor(container.clientWidth / itemWidth) || 1;

            if (key === 'arrowright') nextIndex = index + 1;
            if (key === 'arrowleft') nextIndex = index - 1;
            if (key === 'arrowdown') nextIndex = index + itemsPerRow;
            if (key === 'arrowup') nextIndex = index - itemsPerRow;
        }

        // ENTER
        if (key === 'enter') {
            current.classList.toggle('clicked-item');
            scrollToItem(current);
            return;
        }

        // APPLY NAV
        if (nextIndex !== null && items[nextIndex]) {
            e.preventDefault();
            items[nextIndex].focus();
            scrollToItem(items[nextIndex]);
        }
    };

    allItems.forEach(item => {
        item.addEventListener('click', handleClick);
        item.addEventListener('focus', handleFocus);
        item.addEventListener('keydown', handleKeydown);
        item.addEventListener('focusout', removeAllClicked);

        listeners.push(() => {
            item.removeEventListener('click', handleClick);
            item.removeEventListener('focus', handleFocus);
            item.removeEventListener('keydown', handleKeydown);
            item.removeEventListener('focusout', removeAllClicked);
        });
    });

    // =========================
    // 🖱 DRAG SCROLL (HORIZONTAL ONLY)
    // =========================
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const isTouchDevice = () =>
        window.matchMedia("(pointer: coarse)").matches;

    const mouseDown = (e) => {
        if (isTouchDevice()) return;
        if (e.target.closest('.item')) return;

        const container = e.currentTarget;

        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const mouseMove = (e) => {
        if (isTouchDevice()) return;
        if (!isDown) return;

        e.preventDefault();

        const container = e.currentTarget;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;

        container.scrollLeft = scrollLeft - walk;
    };

    const stopDrag = () => { isDown = false; };

    productsContainers.forEach(product => {
        const container = product.querySelector('.items-container');
        if (!container) return;

        container.addEventListener('mousedown', mouseDown);
        container.addEventListener('mousemove', mouseMove);
        container.addEventListener('mouseup', stopDrag);
        container.addEventListener('mouseleave', stopDrag);

        listeners.push(() => {
            container.removeEventListener('mousedown', mouseDown);
            container.removeEventListener('mousemove', mouseMove);
            container.removeEventListener('mouseup', stopDrag);
            container.removeEventListener('mouseleave', stopDrag);
        });
    });

    // =========================
    // 🧹 CLEANUP FUNCTION
    // =========================
    cleanupItemsScroll = () => {
        listeners.forEach(fn => fn());
    };
}