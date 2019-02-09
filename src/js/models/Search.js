/**
 * Created by dhwchoub on 1/30/2019.
 */
import axios from 'axios';
import {key} from '../config'


export default class search {
    constructor(query) {
        this.query = query;
    }

    async   getResults(query) {
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
        }
        catch (error) {
            alert(error);
        }

    }
}
