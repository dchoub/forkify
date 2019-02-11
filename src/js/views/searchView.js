/**
 * Created by dhwchoub on 1/30/2019.
 */

import {element} from './base';

export const getInput = () => element.searchInput.value;
export const clearInput = () => {
    element.searchInput.value = '';
};
export const clearResult = ()=> {
    element.searchResultList.innerHTML = '';
    element.searchResultPage.innerHTML = '';
};
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

const limitrecipeTitle = (title, limit = 17) => {
    //to add in array
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`

    }
    return title;
};


const createButton = (page, type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


const renderButton = (page, numResults, resperPage) => {
    const pages = Math.ceil(numResults / resperPage);
    let button;
    if (page === 1 && pages > 1) {
        //show next button
        button = createButton(page, 'next');
    }
    else if (page < pages) {
        //show both the button
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        //show only prev button
        button = createButton(page, 'prev')
    }
    element.searchResultPage.insertAdjacentHTML('afterbegin', button);


};


const renderRecipe = recipe => {
    const markup = `
     <li>
                <a class="results__link results" href=#${recipe.recipe_id}>
                    <figure class="results__fig">
                        <img src=${recipe.image_url}" alt=${recipe.title}>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitrecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`

    element.searchResultList.insertAdjacentHTML('beforeend', markup)
};

export const renderResult = (recipe, page = 1, resPerPage = 10)=> {
    //getting results per page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipe.slice(start, end).forEach(renderRecipe);

    //render pagination button
    renderButton(page, recipe.length, resPerPage)
};
