// app.js
import { initInjectContentListeners } from "./core/inject-content.js";
import { initLetterNav } from "./nav/letter-nav.js";
import { initDropDown } from "./ui/drop-down.js";

import { initMedicalSpaAnimation } from "./visuals/animation.js";

let animationCleanup = null;

export function maybeInitAnimations() {
    const isMedicalPage = document.querySelector("#canvas");

    if (isMedicalPage) {
        if (animationCleanup) animationCleanup(); // prevent duplicates
        animationCleanup = initMedicalSpaAnimation();
    }
}

const pageWrapper = document.querySelector('.page-wrapper')
addEventListener('DOMContentLoaded', initMain())
function initMain(){
    initInjectContentListeners()
    initLetterNav({
        pageWrapper
    });
    const mdvipImgLink = document.querySelector('#mdvipImgLink')
    if(mdvipImgLink){
        mdvipImgLink.addEventListener('keydown', e => {
            const key = e.key.toLowerCase()
            if(key === 'enter'){
                const a = e.target.closest('#mdvipImgLink')
                a.click()
            }
        })
    }
    
}

function setupGlobalListeners(){
    initDropDown()
}
setupGlobalListeners()
