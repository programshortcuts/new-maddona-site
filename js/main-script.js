import { initLetterNav } from "./nav/letter-nav.js";
const pageWrapper = document.querySelector('.page-wrapper')
function initMain(){

    initLetterNav({
        pageWrapper
    });
}


initMain()