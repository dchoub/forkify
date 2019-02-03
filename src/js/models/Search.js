/**
 * Created by dhwchoub on 1/30/2019.
 */
import axios from 'axios';


export default class search{
    constructor(query){
        this.query = query;
    }
    async   getResults(query){
        const key = 'a4e721b6fcba92f963de59ce7d1b05f5';
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
        }
        catch(error){
            alert(error);
        }

    }
}
