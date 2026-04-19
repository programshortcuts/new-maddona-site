// toggle-nav.js

export function initToggleNav() {
    const sideNavBtn = document.querySelector('#sideNavBtn')
    sideNavBtn.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase()
        if(key == 'enter'){
            const mobileHeaderNavUl = document.querySelector('.mobile-header-nav > ul') 
            mobileHeaderNavUl.classList.toggle('hide')
            console.log()
        }
    });
}