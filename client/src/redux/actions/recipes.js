import axios from 'axios';
import { GET_ALL_RECIPES, GET_DETAIL, GET_DIETS, GET_NAME_RECIPES} from './types';

export function getAllRecipes(){
  return async function(dispatch){
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: json.data,
    })
  }
}

export function getNameRecipes(name){
  return async function(dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: GET_NAME_RECIPES,
        payload: json.data,
      })
    } catch (error) {
      return dispatch ({
        type: GET_NAME_RECIPES,
        payload: []
    },
      console.error(error, dispatch))
    }
  }
}

export function getDiets(){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/types`);
      return dispatch({
        type: GET_DIETS,
        payload: json.data,
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export function postRecipe(payload){
  return async function(){
    try {
      var json = await axios.post(`http://localhost:3001/recipe`, payload);
      return json;
    } catch (error) {
      console.error(error);
    }
  }
}

export function getDetail(id) {
  return async function(dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data
      });
    } catch (error) {
      console.error(error);
    }
  }
}

