export function initSwiper() {
    const el = document.querySelector('.swiper');
    if (!el) {
        console.log('Swiper not found');
        return;
    }

    // new Swiper(el, {
    //     slidesPerView: 1,
    //     loop: true,
    //     grabCursor: true,
    //     spaceBetween: 20, // nice spacing
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true
    //     }
    // });
    new Swiper(el, {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,

        spaceBetween: 1,

        speed: 1000, // 👈 THIS controls slide animation duration

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 2000,  // 👈 time BETWEEN slides
            disableOnInteraction: false
        }
    });
}