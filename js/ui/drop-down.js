// drop-down.js
export function initDropDown(){
    const dropDowns = document.querySelectorAll('.drop-down')
    dropDowns.forEach(el => {
        el.addEventListener('click', toggleContent)
        el.addEventListener('keydown', toggleContent)
    })

    function toggleContent(e){
        if(e.type == 'click'){
            // content.classList.toggle('hide')
            e.preventDefault()
            e.stopPropagation()
            const section = e.target.closest('.section')
            const content = section.querySelector('.content')
            content.classList.toggle('hide')
            console.log('click')
            return
        }
        if(e.type == 'keydown'){
            const key = e.key.toLowerCase()
            if(key != 'enter')return
            const section = e.target.closest('.section')
            const content = section.querySelector('.content')
            console.log('enter')
            content.classList.toggle('hide')
        }
        

    }
}