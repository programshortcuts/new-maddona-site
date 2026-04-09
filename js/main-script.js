import { initLetterNav } from "./nav/letter-nav.js";
import { initDropDown } from "./ui/drop-down.js";
const pageWrapper = document.querySelector('.page-wrapper')

function initMain(){
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
initMain()
function initGlobalListeners(){
    addEventListener('keydown', e =>{
        initDropDown()
    })
}
initGlobalListeners()