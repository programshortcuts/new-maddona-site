export function initDropDown(){
    const dropDowns = document.querySelector('.drop-down')
    dropDowns.addEventListener('click', toggleContent)
    dropDowns.addEventListener('keydown', toggleContent)

    function toggleContent(e){
        console.log(e)
        const section = e.target.closest('.section')
        const content = section.querySelector('.content')
        if(e.type == 'click'){
            content.classList.toggle('hide')
            
        }
        if(e.type == 'keydown'){
            const key = e.key.toLowerCase()
            if(key === 'enter'){
                content.classList.toggle('hide')
            }
        }
        

    }
}