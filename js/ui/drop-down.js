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

        const productTitle = e.target.closest('.product-title')
        const sectionTitle = e.target.closest('.section-title')

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
        if (sectionTitle) {
            const section = sectionTitle.closest('.section')
            if (!section) return
            // if(!section.classList.contains('drop-down')) return

            const content = section.querySelector('.content')
            if (!content) return

            content.classList.toggle('hide')
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