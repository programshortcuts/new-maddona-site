// filter-sort-items-down.js

export function initFilterSortItems() {
    const sortBtns = document.querySelectorAll('.sort-btn')
    const filterBtn = document.querySelectorAll('.filter-btn')
    sortBtns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            sortItems(e)

        });
    })

    function sortItems(e){
        const productsContent = e.target.closest('.products-content')
        const itemsContainer = productsContent.querySelector('.items-container')
        toggleSort(itemsContainer)
    }
    function toggleSort(el){
        el.classList.toggle('sort')
    }
}