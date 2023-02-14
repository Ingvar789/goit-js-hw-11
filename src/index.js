import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import getRefs from './get-refs';
import PictureApiService from './api-service'
import axios from "axios";
const DELAY = 300;
const refs = getRefs();
const imagerPerPage = 40;
const pictureApiService = new PictureApiService(imagerPerPage);

refs.searchInput.addEventListener('input', debounce(onInput, DELAY));
refs.searchFormSubmit.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onInput(e) {
    e.preventDefault();
    pictureApiService.query = e.target.value.trim();
    pictureApiService.resetPage();
}

function onSearch(e) {
    e.preventDefault();
    
    pictureApiService.getPictures()
        .then(response => {
            clearPicturesContainer();
            filterPictures(response);
        })
    .catch(error => { Notiflix.Notify.failure('There are problems with your request.Please try again later.') });
}

function onLoadMore(e) {
    e.preventDefault();
    pictureApiService.getPictures()
    .then(response => { filterPictures(response) })
    .catch(error => { Notiflix.Notify.failure('There are problems with your request.Please try again later.') });
}

function filterPictures(pictures) {
    if (pictures.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.loadMoreBtn.classList.add('load-more');
    }
    else {
        renderPicturesContainer(pictures);
    } 
}

function renderPicturesContainer({ hits, total, totalHits }) {
    if (totalHits > ((pictureApiService.page-1)*imagerPerPage)) {
        refs.loadMoreBtn.classList.remove('load-more');
    }
    else {
        refs.loadMoreBtn.classList.add('load-more');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    let markup = '';
    for (let picture of hits) {
        markup += `<div style="
            margin-right: 20px;
            margin-bottom: 20px;
            max-height: 400px;
            outline: 1px solid;
            border-top: 1px solid;" 
            class="photo-card">
        <img src="${picture.webformatURL}" alt='${picture.tags}' loading="lazy" />
        <div class="info" style="
             display: flex;
             margin: 0;
             padding: 0;
             justify-content: space-between;">
            <p class="info-item" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 65px;
                padding-top: 10px;
                padding-right: 8px;
                border-right: 1px solid;">
                <b>${picture.likes}</b>
                <b>Likes</b>
                </p>
            <p class="info-item" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 65px;
                padding-top: 10px;
                padding-right: 8px;
                border-right: 1px solid;">
                <b>${picture.views}</b>
                <b>Views</b>
                </p>
            <p class="info-item" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 65px;
                padding-top: 10px;
                padding-right: 8px;
                border-right: 1px solid;">
                <b>${picture.comments}</b>
                <b>Comments</b>
                </p>
            <p class="info-item" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 65px;
                padding-top: 10px;
                padding-right: 8px;">
                <b>${picture.downloads}</b>
                <b>Downloads</b>
                </p>
            </div>
        </div>`;
    }
    refs.galerry.insertAdjacentHTML('beforeend', markup);
    return 
}

function clearPicturesContainer(){
    refs.galerry.innerHTML = '';
}





