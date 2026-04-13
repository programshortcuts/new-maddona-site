let cleanupItemsScroll = null;

export function initItemsScroll() {
    const itemsContainer = document.querySelector('.items-container');
    const items = document.querySelectorAll('.item');

    if (!itemsContainer) return;

    // 🔥 CLEANUP OLD LISTENERS FIRST
    if (cleanupItemsScroll) cleanupItemsScroll();

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e) => {
        isDown = true;
        itemsContainer.classList.add('active');
        startX = e.pageX - itemsContainer.offsetLeft;
        scrollLeft = itemsContainer.scrollLeft;
    };

    const mouseLeave = () => {
        isDown = false;
    };

    const mouseUp = () => {
        isDown = false;
    };

    const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - itemsContainer.offsetLeft;
        const walk = (x - startX) * 2.2; // 🔥 stronger Apple-like glide

        itemsContainer.scrollLeft = scrollLeft - walk;
    };

    const focusHandler = (e) => {
        const el = e.target;
        const container = itemsContainer;

        const offset = 40; // Apple-style left breathing room

        const targetScroll =
            el.offsetLeft - offset - container.offsetLeft;

        container.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        });
    };

    // bind
    itemsContainer.addEventListener('mousedown', mouseDown);
    itemsContainer.addEventListener('mouseleave', mouseLeave);
    itemsContainer.addEventListener('mouseup', mouseUp);
    itemsContainer.addEventListener('mousemove', mouseMove);

    items.forEach(item => {
        item.addEventListener('focus', focusHandler);
    });

    // cleanup function (critical for inject system)
    cleanupItemsScroll = () => {
        itemsContainer.removeEventListener('mousedown', mouseDown);
        itemsContainer.removeEventListener('mouseleave', mouseLeave);
        itemsContainer.removeEventListener('mouseup', mouseUp);
        itemsContainer.removeEventListener('mousemove', mouseMove);

        items.forEach(item => {
            item.removeEventListener('focus', focusHandler);
        });
    };
}