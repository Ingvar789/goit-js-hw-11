export default function getRefs() {
    return {
        searchInput: document.querySelector('input[name="searchQuery"]'),
        searchFormSubmit: document.querySelector('#search-form'),
        galerry: document.querySelector('.gallery'),
        loadMoreBtn:document.querySelector('.js-load-more')
    }
}