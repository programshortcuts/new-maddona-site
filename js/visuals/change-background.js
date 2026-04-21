
export function initBgSlider() {
    const container = document.querySelector('.bg-slider');
    if (!container) return;

    const slides = container.querySelectorAll('.bg-slide');

    const images = [
        "imgs/rustic rockymoutains-1024.JPEG",
        "pages/medical-spa-services/media/peptide.jpeg",
        "pages/medical-spa-services/media/AS-Botox2000.webp.png",
        // "pages/ivInfustionTherepy/media/iv-infusion.jpeg"
        // "../imgs/MadMediSpa-sihlouette.png",
    ];

    // assign images
    slides.forEach((slide, i) => {
        slide.style.backgroundImage = `url(${images[i]})`;
    });

    let current = 0;

    
    setInterval(() => {
        const currentSlide = slides[current];
        const nextIndex = (current + 1) % slides.length;
        const nextSlide = slides[nextIndex];

        // fade out current
        currentSlide.classList.remove('active');

        // fade in next
        nextSlide.classList.add('active');

        current = nextIndex;

    }, 3000);
}