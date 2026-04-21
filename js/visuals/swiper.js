export function initSwiper() {
    const swiperEl = document.querySelector('.swiper');
    const reviewsContainer = document.querySelector('.reviews-container');

    if (!swiperEl) {
        console.log('Swiper not found');
        return;
    }

    const swiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        spaceBetween: 1,
        speed: 1000,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        }
    });

    let isPaused = false;

    if (reviewsContainer) {
        reviewsContainer.addEventListener('click', () => {
            if (!swiper.autoplay) return;
            if (isPaused) {
                swiper.autoplay.start();
            } else {
                swiper.autoplay.stop();
            }
            isPaused = !isPaused;
        });
    }
}