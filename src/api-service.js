import Notiflix from 'notiflix';
import getRefs from './get-refs';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '33588957-117fd113af84c86dc96acaa23';

export default class PictureApiService {
    constructor(imagesPerPage) { 
        this.searchQuery = '';
        this.page = 1;
        this.imagesPerPage = imagesPerPage;
    }
    
    async getPictures() {
    try {
        const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.imagesPerPage}&page=${this.page}`);
        this.incrementPage()
        return response.data;
    } catch (error) {
        console.log(error);
         Notiflix.Notify.failure('There are problems with your request.Please try again later.');
           }
    }
    
    incrementPage() {
        this.page += 1;
        return
    }

    resetPage() {
        this.page = 1;
    }

get query(){
    return this.query;
}
set query(newQuery){
this.searchQuery=newQuery;
}
}


