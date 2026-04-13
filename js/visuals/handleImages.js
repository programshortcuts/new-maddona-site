// images.js
export function initImageHandling(){
    const sections = document.querySelectorAll('.section')
    const sectionTitles = document.querySelectorAll('.section-title')
    const sectionImgs = document.querySelectorAll('.section > img-wrapper > img')
    const dropDowns = document.querySelectorAll('.drop-down')
    dropDowns.forEach(el => {
        el.removeEventListener('click',handleImgColors);
        el.addEventListener('click',handleImgColors);
    })
    sections.forEach(el => {
        el.removeEventListener('click',handleImgColors);
        el.addEventListener('click',handleImgColors);
    })
    sectionTitles.forEach(el => {
        el.removeEventListener('click',handleImgColors);
        el.addEventListener('click',handleImgColors);
        el.addEventListener('focus', greyOutSectionImgs)
    })
    function greyOutSectionImgs(){
        if(!sections)return
        sections.forEach(el => {
            if(el.classList.contains('colored') ){
                el.classList.remove('colored')
            }
        })    
    }
    function handleImgColors(e){
        const section = e.target.closest('.section')
        if(!section) return
        const img = section.querySelector('img')
        if(e.target.classList.contains('section') ||
            e.target.classList.contains('drop-down')){
            greyOutSectionImgs()
            return
        }
        if(e.type == 'click'){
            e.stopPropagation()
            toggleColor(section)
            return
        }
        if(e.type == 'mouseover') {
            greyOutSectionImgs()
            // toggleColor(section)
            return
        }
        if(e.type == 'mousein') {
            greyOutSectionImgs()
            // toggleColor(section)
            return
        }
        

    }
    function toggleColor(el){
        greyOutSectionImgs()
        el.classList.toggle('colored')
    }
}
