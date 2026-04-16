// inject-content.js
import { isSafePath } from "./security-utils.js";
// import { maybeInitAnimations } from "../app.js";
import { initDropDown } from "../ui/drop-down.js";
import { initImageHandling } from "../visuals/handleImages.js";
import { initProdImgHandle } from "../visuals/handleProductImgs.js";
import { initItemsScroll } from "../visuals/items-scroll.js";
const mainLandingPage = document.querySelector('.main-landing-page')
if (!mainLandingPage) {
    throw new Error("Missing .main-landing-page in index.html");
}
const DEFAULT_PAGE =
// "pages/medical-spa-services/medical-spa-services.html";
// "pages/products/products.html";
    "pages/home/home.html";
    // "pages/contact/contact.html";
const pageCache = new Map()
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
    })
    
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
    const newContent = doc.querySelector(".main-landing-page");

    if (!newContent) {
        throw new Error(`Page missing .main-landing-page wrapper: ${href}`);
    }

    // ✅ Sanitize before injecting
    mainLandingPage.innerHTML = DOMPurify.sanitize(newContent.innerHTML, {
        ALLOWED_TAGS: [
            'form', 'input', 'textarea', 'label',
            'div', 'p', 'span', 'ul', 'ol', 'li',
            'pre', 'code',
            'img',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'section', 'article', 'header', 'footer',
            'iframe', 'button', 'canvas',
            'svg', 'path', 'circle', 'g'
        ],
        ALLOWED_ATTR: [
            'src', 'href', 'class', 'id', 'alt', 'tabindex',
            'allow', 'allowfullscreen', 'frameborder',
            'width', 'height', 'viewBox', 'fill', 'd', 'cx', 'cy', 'r',
            'type', 'name', 'value', 'for', 'required', 'action', 'method'
        ],
        FORBID_ATTR: ['style']

    })
    initImageHandling()
    initProdImgHandle()
    initItemsScroll()
    initDropDown()   
}