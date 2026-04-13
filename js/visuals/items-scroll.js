// items-scroll.js
let cleanupItemsScroll = null;
export function initItemsScroll() {
    const productsContainers = document.querySelectorAll('.products-container');
    if (!productsContainers.length) return;
    // 🔥 CLEANUP (inject-safe)
    if (cleanupItemsScroll) cleanupItemsScroll();
    const isTouchDevice = () =>
        window.matchMedia("(pointer: coarse)").matches;
    // =========================
    // 🎯 CENTER ITEM (APPLE STYLE)
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
    // 🔤 ALPHA NAV (SCOPED CORRECTLY)
    // =========================
    const alphaLinks = document.querySelectorAll('.letter-alphabet');
    const alphaClickHandler = (e) => {
        e.preventDefault();

        const letter = e.currentTarget.textContent.trim().toUpperCase();
        const productsContainer = e.currentTarget.closest('.products-container');
        if (!productsContainer) return;

        const items = productsContainer.querySelectorAll('.item');

        const match = Array.from(items).find(item => {
            const title = item.querySelector('.title-item');
            return title && title.textContent.trim().toUpperCase().startsWith(letter);
        });

        if (!match) return;

        scrollToItem(match);
        match.focus();
    };

    alphaLinks.forEach(link => {
        link.addEventListener('click', alphaClickHandler);
    });

    // =========================
    // 🎯 ITEM INTERACTIONS
    // =========================
    const allItems = document.querySelectorAll('.item');

    const removeAllClickedItems = () => {
        allItems.forEach(el => el.classList.remove('clicked-item'));
    };

    const focusHandler = (e) => {
        removeAllClickedItems();
        scrollToItem(e.currentTarget);
    };

    const itemClick = (e) => {
        const item = e.currentTarget;
        scrollToItem(item);
        item.classList.toggle('clicked-item');
    };

    const itemKeydown = (e) => {
        const key = e.key.toLowerCase()
        if (key.toLowerCase() === 'enter') {
            e.currentTarget.classList.toggle('clicked-item');
            scrollToItem(e.currentTarget);
        }
        console.log(key)
    };

    allItems.forEach(item => {
        item.addEventListener('click', itemClick);
        item.addEventListener('keydown', itemKeydown);
        item.addEventListener('focus', focusHandler);
        item.addEventListener('focusout', removeAllClickedItems);
    });

    // =========================
    // 🖱 DESKTOP DRAG ONLY
    // =========================
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e) => {
        if (isTouchDevice()) return; // 🔥 disable on mobile
        if (e.target.closest('.item')) return;

        const container = e.currentTarget;

        isDown = true;
        container.classList.add('active');

        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const mouseMove = (e) => {
        if (isTouchDevice()) return; // 🔥 disable on mobile
        if (!isDown) return;

        e.preventDefault();

        const container = e.currentTarget;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2.2;

        container.scrollLeft = scrollLeft - walk;
    };

    const mouseUp = () => { isDown = false; };
    const mouseLeave = () => { isDown = false; };

    // =========================
    // 📦 BIND EACH CONTAINER
    // =========================
    const containers = [];

    productsContainers.forEach(product => {
        const itemsContainer = product.querySelector('.items-container');
        if (!itemsContainer) return;

        itemsContainer.addEventListener('mousedown', mouseDown);
        itemsContainer.addEventListener('mousemove', mouseMove);
        itemsContainer.addEventListener('mouseup', mouseUp);
        itemsContainer.addEventListener('mouseleave', mouseLeave);

        containers.push(itemsContainer);
    });

    // =========================
    // 🧹 CLEANUP
    // =========================
    cleanupItemsScroll = () => {
        alphaLinks.forEach(link => {
            link.removeEventListener('click', alphaClickHandler);
        });

        allItems.forEach(item => {
            item.removeEventListener('click', itemClick);
            item.removeEventListener('keydown', itemKeydown);
            item.removeEventListener('focus', focusHandler);
            item.removeEventListener('focusout', removeAllClickedItems);
        });

        containers.forEach(container => {
            container.removeEventListener('mousedown', mouseDown);
            container.removeEventListener('mousemove', mouseMove);
            container.removeEventListener('mouseup', mouseUp);
            container.removeEventListener('mouseleave', mouseLeave);
        });
    };
}