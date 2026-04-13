let cleanupItemsScroll = null;

export function initItemsScroll() {
    const productsContainers = document.querySelectorAll('.products-container');

    if (!productsContainers.length) return;

    // =========================
    // CLEANUP OLD LISTENERS (INJECT SAFE)
    // =========================
    if (cleanupItemsScroll) cleanupItemsScroll();

    // =========================
    // CENTER SCROLL (APPLE STYLE)
    // =========================
    const scrollToItem = (el) => {
        const container = el.closest('.items-container');
        if (!container) return;

        const containerWidth = container.clientWidth;
        const itemWidth = el.offsetWidth;

        const targetScroll =
            el.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

        container.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        });
    };

    // =========================
    // ALPHA NAV (SCOPED PER PRODUCT SECTION)
    // =========================
    const alphaLinks = document.querySelectorAll('.letter-alphabet');

    alphaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const letter = e.target.textContent.trim().toUpperCase();

            // scope to correct product section ONLY
            const productsContainer = e.target.closest('.products-container');
            if (!productsContainer) return;

            const items = productsContainer.querySelectorAll('.item');

            const match = Array.from(items).find(item => {
                const title = item.querySelector('.title-item');
                if (!title) return false;

                return title.textContent.trim().toUpperCase().startsWith(letter);
            });

            if (!match) return;

            scrollToItem(match);
            match.focus();
        });
    });

    // =========================
    // ITEM INTERACTIONS
    // =========================
    const items = document.querySelectorAll('.item');

    const removeAllClickedItems = () => {
        items.forEach(el => el.classList.remove('clicked-item'));
    };

    const focusHandler = (e) => {
        removeAllClickedItems();
        scrollToItem(e.target);
    };

    const itemClick = (e) => {
        const item = e.currentTarget;

        scrollToItem(item);

        // prevent accidental drag-click conflict
        item.classList.toggle('clicked-item');
    };

    const itemKeydown = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            e.currentTarget.classList.toggle('clicked-item');
            scrollToItem(e.currentTarget);
        }
    };

    items.forEach(item => {
        item.addEventListener('click', itemClick);
        item.addEventListener('keydown', itemKeydown);
        item.addEventListener('focus', focusHandler);
        item.addEventListener('focusout', removeAllClickedItems);
    });

    // =========================
    // DRAG SCROLL (MOUSE)
    // =========================
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e) => {
        if (e.target.closest('.item')) return;

        const container = e.currentTarget;

        isDown = true;
        container.classList.add('active');

        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();

        const container = e.currentTarget;

        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2.2;

        container.scrollLeft = scrollLeft - walk;
    };

    const mouseUp = () => {
        isDown = false;
    };

    const mouseLeave = () => {
        isDown = false;
    };

    // =========================
    // DRAG SCROLL (TOUCH)
    // =========================
    let startTouchX = 0;

    const touchStart = (e) => {
        const container = e.currentTarget;

        startTouchX = e.touches[0].pageX;
        scrollLeft = container.scrollLeft;
    };

    const touchMove = (e) => {
        const container = e.currentTarget;

        const x = e.touches[0].pageX;
        const walk = (x - startTouchX) * 1.5;

        container.scrollLeft = scrollLeft - walk;
    };

    // =========================
    // BIND CONTAINERS (IMPORTANT FOR MULTIPLE PRODUCTS)
    // =========================
    productsContainers.forEach(container => {
        const itemsContainer = container.querySelector('.items-container');
        if (!itemsContainer) return;

        itemsContainer.addEventListener('mousedown', mouseDown);
        itemsContainer.addEventListener('mousemove', mouseMove);
        itemsContainer.addEventListener('mouseup', mouseUp);
        itemsContainer.addEventListener('mouseleave', mouseLeave);

        itemsContainer.addEventListener('touchstart', touchStart, { passive: true });
        itemsContainer.addEventListener('touchmove', touchMove, { passive: true });
    });

    // =========================
    // CLEANUP (INJECT SAFE)
    // =========================
    cleanupItemsScroll = () => {
        items.forEach(item => {
            item.removeEventListener('click', itemClick);
            item.removeEventListener('keydown', itemKeydown);
            item.removeEventListener('focus', focusHandler);
            item.removeEventListener('focusout', removeAllClickedItems);
        });

        alphaLinks.forEach(link => {
            link.replaceWith(link.cloneNode(true)); // hard reset alpha listeners
        });

        productsContainers.forEach(container => {
            const itemsContainer = container.querySelector('.items-container');
            if (!itemsContainer) return;

            itemsContainer.replaceWith(itemsContainer.cloneNode(true));
        });
    };
}