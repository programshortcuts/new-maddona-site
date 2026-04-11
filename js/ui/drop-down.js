// drop-down.js
export function initDropDown() {
    const dropDowns = document.querySelectorAll('.drop-down')

    dropDowns.forEach(el => {
        el.removeEventListener('click', toggleContent) // ✅ prevent stacking
        el.addEventListener('click', toggleContent)
    })

    function toggleContent(e) {
        e.preventDefault()
        e.stopPropagation()

        const section = e.target.closest('.section')
        const content = section.querySelector('.content')
        content.classList.toggle('hide')


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