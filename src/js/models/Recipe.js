/**
 * Created by dhwchoub on 2/3/2019.
 */
import axios from 'axios'
import {key} from '../config'

export default class recipe{
    constructor(id){
        this.id = id;
    }


    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error){
            console.log(error);
            //alert('something went wrong :(')
        }
    }

    calcTime(){
        //assuming that we need 15 minutes for each 3 ingredient
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServing(){
        this.serving = 4;
    }

    parseIngredients(){

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el =>{
            //uniform the ingredients
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitsShort[i])

            });
            //remove paranthese
            ingredient.replace(/ *\([^)]*\) */g, ' ');

            //parse ingreditenst into count, units and ingredients
            const arrIng =ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2=> unitsShort.includes(el2));
            let objIng;

            if(unitIndex>-1){
                //there is an unit

                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length ===1){
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng ={
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                };

            }
            else if(parseInt(arrIng[0], 10)){
                //there is not unit but a number
                objIng ={
                    count:parseInt(arrIng[0], 10),
                    unit:'',
                    ingredient: arrIng.slice(1).join(' ')
                }

            }
            else if(unitIndex===-1){
                //there is not unit
                objIng ={
                    count:1,
                    unit:'',
                ingredient

                }

            }
            return objIng
        });
        this.ingredients = newIngredients;


    }
}
