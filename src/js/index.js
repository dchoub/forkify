//https://www.food2fork.com/api/search
//a4e721b6fcba92f963de59ce7d1b05f5

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Likes';
import{element, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likesView'

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
            console.log(err);
            clearLoader();
        }

    }
};


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

    //get The id
    const id = window.location.hash.replace('#', '');


    //call the getRecipe function
    if(id){
        //prepare UI
        recipeView.clearRecipe();
        renderLoader(element.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.receipe = new Recipe(id);
        try{
            // Get recipe data and parse ingredients
            await state.receipe.getRecipe();
            state.receipe.parseIngredients();
            // Calculate servings and time
            state.receipe.calcServing();
            state.receipe.calcTime();
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.receipe, state.likes.isLiked(id));

        }
        catch(err){
            console.log(err);
            clearLoader();
        }

    }

}




['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/*
List controller
* */

const controlList = () =>{
    //create a list if there is none yet
    if(!state.list) state.list = new List();

    //add each ingredient to the list
    state.receipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderList(item);

    });

    //handle delete and update list item events
    element.shopping.addEventListener('click', el=>{
        const id = el.target.closest('.shopping__item').dataset.itemid;

        //handle the delete button
        if(el.target.matches('.shopping__delete, .shopping__delete *')) {
            //delete from state
            state.list.deleteItem(id);

            //delete from UI
            listView.deleteItem(id);

            // Handle the count update
        } else if (el.target.matches('.shopping__count-value')) {
            const val = parseFloat(el.target.value, 10);
            state.list.updateCount(id, val);
        }


    });

};


const controlLike =()=>{

    if(!state.likes) state.likes = new Like();
    const currentID = state.receipe.id;

// /user has not liked current recipe
    if(!state.likes.isLiked(currentID)){
        //add like to state
        const newLikes = state.likes.addlike(
            currentID,
            state.receipe.title,
            state.receipe.author,
            state.receipe.img
        );
        //toggle the like button
        likeView.toggleLikeBtn(true);

        //Add the like to UI
        likeView.renderLike(newLikes);

    }
    //user has liked the current receipe
    else{
        //remove like to state
        state.likes.deleteLike(currentID);

        //toggle the like button
        likeView.toggleLikeBtn(false);

        //Remove the like to UI
        likeView.deleteLike(currentID);

    }

    likeView.toggleLikeMenu(state.likes.getNumLikes());



};
//Restore liked recipes on page load
window.addEventListener('load', ()=>{
    state.likes = new Like();

    //Restore likes
    state.likes.readStorage();

    //toggle like menu icon
    likeView.toggleLikeMenu(state.likes.getNumLikes());

    //Render the existing likes
    state.likes.likes.forEach(like => likeView.renderLike(like))

});


element.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.receipe.servings > 1) {
            state.receipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.receipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.receipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.receipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
       controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
       controlLike();
    }
});



