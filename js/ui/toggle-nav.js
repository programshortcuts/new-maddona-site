// toggle-nav.js

export function initToggleNav() {
    const sideNavBtn = document.querySelector('#sideNavBtn')
    const imgSmoke = document.querySelector('#madonnaShilouetteLogo')
    sideNavBtn.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase()
        if(key == 'enter'){
            const mobileHeaderNavUl = document.querySelector('.mobile-header-nav > ul') 
            mobileHeaderNavUl.classList.toggle('expand')
            imgSmoke.classList.toggle('smoke-img')
            console.log(imgSmoke)
        }
    });
    sideNavBtn.addEventListener('click', (e) => {
        const mobileHeaderNavUl = document.querySelector('.mobile-header-nav > ul') 
        mobileHeaderNavUl.classList.toggle('expand')
    });
}