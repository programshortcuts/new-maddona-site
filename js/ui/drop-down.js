// drop-down.js
export function initDropDown() {
    const dropDowns = document.querySelectorAll('.drop-down')
    
    dropDowns.forEach(el => {
        // SUPER IMPORTANT 
        el.removeEventListener('click', toggleContent) // ✅ prevent stacking
        el.addEventListener('click', toggleContent)
    })

    function toggleContent(e) {
        e.preventDefault()
        e.stopPropagation()

        const section = e.target.closest('.section')
        if(!section) return
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
    function hideEls(els){
        els.forEach(el =>{
            console.log(el)
            if(!el.classList.contains('hide')){
                el.classList.add('hide')
                
            }
        })
    }
}