// drop-down.js
export function initDropDown() {
    const dropDowns = document.querySelectorAll('.drop-down')
    const downs = document.querySelectorAll('.downs')
    const sectionTitles = document.querySelectorAll('.section-title')
    dropDowns.forEach(el => {
        // SUPER IMPORTANT 
        el.removeEventListener('click', toggleContent) // ✅ prevent stacking
        el.addEventListener('click', toggleContent)
    })
    sectionTitles.forEach(el => {
        // SUPER IMPORTANT 
        el.removeEventListener('click', toggleContent) // ✅ prevent stacking
        el.addEventListener('click', toggleContent)
    })

    function toggleContent(e) {
        e.preventDefault()
        e.stopPropagation()

        const section = e.target.closest('.section')
        if(!section) return
        const downs = section.querySelector('.content.downs')
        console.log(downs)
        
        if(downs){
            
            downs.classList.toggle('hide')
        } else {
            hideAllDowns()
        }
        // if(!downs) return


        if(e.type == 'keydown'){
            const key = e.key.toLowerCase()
            if(key != 'enter')return
            const section = e.target.closest('.section')
            const downs = section.querySelector('.downs')
            console.log('enter')
            content.classList.toggle('hide')
        }
    }
    function hideAllDowns(){
        downs.forEach(el => {
            el.classList.add('hide')
        })
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