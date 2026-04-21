// inject-content.js
import { isSafePath } from "./security-utils.js";
import { initBookingForm } from "./bookings.js";
import { initSwiper } from "../visuals/swiper.js";
import { initBgSlider } from "../visuals/change-background.js";
// import { maybeInitAnimations } from "../app.js";
// import { initDropDown } from "../ui/drop-down.js";
import { initSectionsDropDown } from "../ui/sections-drop-downs.js";
import { initToggleNav } from "../ui/toggle-nav.js";
import { initFilterSortItems } from "../ui/filter-sort-items.js";
import { initImageHandling } from "../visuals/handleImages.js";
import { initProdImgHandle } from "../visuals/handleProductImgs.js";
import { initItemsScroll } from "../visuals/items-scroll.js";
export const mainLandingPage = document.querySelector('.main-landing-page')
export const pageWrapper = document.querySelector('.page-wrapper')
if (!mainLandingPage) {
    throw new Error("Missing .main-landing-page in index.html");
}
const DEFAULT_PAGE =
"pages/home/home.html";
// "pages/medical-spa-services/medical-spa-services.html";
// "pages/products/products.html";
    // "pages/contact/contact.html";
    // "pages/bookings/bookings.html";
    
const pageCache = new Map()
let lastClickedLink = null
document.addEventListener("submit", (e) => {
    if (e.target.id === "contact-form") {
        e.preventDefault();
       mainLandingPage.textContent = `Failed to load page: ${href}`;
    }
});
export function initInjectContentListeners(){
    const mobileHeaderNav = document.querySelector('.mobile-header-nav')
    
    injectPage(DEFAULT_PAGE)
             
    mobileHeaderNav.addEventListener('click', e => {
        const link = e.target.closest('a')
        if(!link)return
        const href = link.getAttribute("href");
        if (!href || href === "#") return;        
        if (!href || href === "#") return;
        e.preventDefault();
        injectPage(href);
        mainLandingPage.scrollTo(0,0)
        mainLandingPage.scrollIntoView({behavior:'smooth', 
            inline:'nearest',
            block: 'start'})
        if(e.target == lastClickedLink){
            mainLandingPage.focus()
            if(pageWrapper.classList.contains('expand')) {
                pageWrapper.classList.remove('expand')
            }
            lastClickedLink = null
            return
        }
        lastClickedLink = e.target
    })
    
    document.querySelectorAll("*").forEach(el => {
        [...el.attributes].forEach(attr => {
            if (attr.name.startsWith("on")) {
                console.log("INLINE EVENT:", el, attr);
            }
        });
    });
    
}
export async function injectPage(href){
    if(!href)return
    let html
    if(!isSafePath(href)){
        console.warn('Block unsafe path',href)
        return
    }
    try {
        if(pageCache.has(href)){
            html = pageCache.get(href)
        } else {
            const res = await fetch(href)
            if(!res.ok){ throw new Error(`failed to fetch ${href}`)}
            html = await res.text()
            pageCache.set(href,html)

        }
        // maybeInitAnimations()
    } catch (err) {
       mainLandingPage.textContent = `Failed to load page: ${href}`;
    }
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Grab the actual page content
    const newContent = doc.querySelector(".page-container");


    if (!newContent) {
        throw new Error(`Page missing .page-container wrapper: ${href}`);
    }

    // ✅ Sanitize before injecting
    // const cleanHTML = DOMPurify.sanitize(fetchedHtml, {
    //     FORBID_TAGS: ['script']
    // });
    mainLandingPage.innerHTML = DOMPurify.sanitize(newContent.outerHTML, {
        ALLOWED_TAGS: [
            'form', 'input', 'textarea', 'label',
            'div', 'p', 'span', 'ul', 'ol', 'li',
            'pre', 'code',
            'img',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'section', 'article', 'header', 'footer',
            'iframe', 'button', 'canvas',
            'svg', 'path', 'circle', 'g',
            // 'style' // 👈 REMOVE THIS
        ],
        ALLOWED_ATTR: [
            'src', 'href', 'class', 'id', 'alt', 'tabindex',
            'allow', 'allowfullscreen', 'frameborder',
            'width', 'height', 'viewBox', 'fill', 'd', 'cx', 'cy', 'r',
            'type', 'name', 'value', 'for', 'required', 'action', 'method'
        ],
        // FORBID_TAGS: ['script', 'style'],   // 👈 ADD THIS
        // FORBID_TAGS: ['script'],   // 👈 ADD THIS

        // FORBID_ATTR: ['style', 'script', 'onerror', 'onclick', 'onload']

    })

    mainLandingPage.scrollTo(0,0)
    initImageHandling()
    initProdImgHandle()
    initItemsScroll()
    initSectionsDropDown()   
    initFilterSortItems()
    initSwiper();
    initBgSlider()
    // ✅ ONLY INIT IF ON BOOKING PAGE
    if (href.includes("bookings")) {
        initBookingForm();
    }
}