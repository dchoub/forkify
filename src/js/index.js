//https://www.food2fork.com/api/search
//a4e721b6fcba92f963de59ce7d1b05f5

import Search from './models/Search';
import{element, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

const state ={};


const controlSearch = async () => {
    // get the query
    const query = searchView.getInput();
    //new search object and add to state
    if(query) {
        state.search = new Search(query);

        //prepare UI result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(element.searchResult);

        //search for recipe
         await state.search.getResults();
        //render results
        clearLoader();
        searchView.renderResult(state.search.results)
    }
}




element.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
// show search results
    controlSearch();
});

element.searchResultPage.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.results, goToPage)
    }
})

