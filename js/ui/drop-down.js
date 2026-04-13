// drop-down.js
let lastClickedDrop 
export function initDropDown() {
    const dropDowns = document.querySelectorAll('.drop-down')
    const ALLdowns = document.querySelectorAll('.downs')
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
        const productTitle = e.target.closest('.product-title')
        const sectionTitleDropDown = e.target.closest('.section-title.drop-down')

        // 🟣 PRODUCT DROPDOWN
        if (productTitle) {
            const productsContainer = productTitle.closest('.products-container')
            if (!productsContainer) return

            const downs = productsContainer.querySelector('.products-content.downs')
            if (!downs) return

            downs.classList.toggle('hide')
            return
        }

        // 🔵 SECTION DROPDOWN
        if (sectionTitleDropDown) {
            const section = sectionTitleDropDown.closest('.section')
            hideAllDowns()
            if (!section) return
            // if(!section.classList.contains('drop-down')) return
            const downs = section.querySelector('.downs')
            if (!downs) return

            if(e.target != lastClickedDrop){
                hideAllDowns()
                // downs.foor
            } else {
            }
            // console.log(section)
            console.log(downs)
            downs.classList.toggle('hide')
            lastClickedDrop = e.target
            return
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