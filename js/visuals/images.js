// images.js
export function initImageHandling(){
    const sections = document.querySelectorAll('.section')
    const sectionTitles = document.querySelectorAll('.section')
    sections.forEach(el => {
        el.removeEventListener('click',handleImgColors);
        el.addEventListener('click',handleImgColors);
        el.addEventListener('focusin',handleImgColors);
        
    })
    function greyOutSectionImgs(){
        sections.forEach(el => {
            if(el.classList.contains('colored') ){
                el.classList.remove('colored')
            }
        })    
    }
    function handleImgColors(e){
        const section = e.target.closest('.section')
        const img = section.querySelector('img')
        if(e.type == 'click'){
            toggleColor(section)
            return
        }
        if(e.type == 'focusin') {
            greyOutSectionImgs()
            toggleColor(section)
            return
        }
        

    }
    function toggleColor(el){
        console.log(el)
        greyOutSectionImgs()
        el.classList.toggle('colored')
    }
}
