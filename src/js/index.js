//https://www.food2fork.com/api/search
//a4e721b6fcba92f963de59ce7d1b05f5

import Search from './models/Search';
import Recipe from './models/Recipe';
import{element, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

const state = {};


const controlSearch = async() => {
    // get the query
    const query = searchView.getInput();
    //new search object and add to state
    if (query) {
        state.search = new Search(query);

        //prepare UI result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(element.searchResult);

        //search for recipe
        try {
            await state.search.getResults();
            //render results
            clearLoader();
            searchView.renderResult(state.search.results)
        }
        catch(err){
            console.log(err)
            clearLoader();
        }

    }
}


element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
// show search results
    controlSearch();
});

element.searchResultPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.results, goToPage)
    }
});


//Recipe Controller

const controlRecipe = async()=>
{
    //prepare UI
    //get The id
    const id = window.location.hash.replace('#', '');
    //call the getRecipe function
    if(id){

        state.receipe = new Recipe(id);
        try{
            await state.receipe.getRecipe();
            state.receipe.calcServing();
            state.receipe.calcTime();

            console.log(state.receipe);
            console.log( state.receipe.parseIngredients());

        }
        catch(err){
            console.log(err);
        }

    }

}




['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


