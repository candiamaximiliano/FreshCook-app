import { FILTER_BY_DIETS, FILTER_CREATED, GET_ALL_RECIPES, GET_DIETS, GET_NAME_RECIPES, ORDER_BY_NAME, ORDER_BY_SCORE, POST_RECIPE } from "../actions/types";

const initialState = {
  recipes : [],
  allRecipes : [],
  diets : [],
}

function recipes(state=initialState, action, payload){
  switch(action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      }

    case GET_NAME_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
    
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      }

    case POST_RECIPE:
      return {
        ...state,
      }

    case FILTER_BY_DIETS:
      const dietFiltered = action.payload !== 'all' ? state.allRecipes.filter(recipe => recipe.diets.includes(action.payload.toLowerCase())) : state.allRecipes;
      return {
        ...state,
        recipes: dietFiltered,
      }

    case FILTER_CREATED:
      const createdFilter = action.payload === 'created' ? state.allRecipes.filter(recipe => recipe.createdInDb) : state.allRecipes.filter(recipe => !recipe.createdInDb);
      return {
        ...state,
        recipes: action.payload === 'all' ? state.allRecipes : createdFilter
      }

    case ORDER_BY_NAME:
      const sortedArr = action.payload === 'AZ' ? state.allRecipes.sort(function (a,b){
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }) : state.allRecipes.sort(function (a,b){
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedArr
      }
    
    case ORDER_BY_SCORE:
      const sortedArrByPoints = action.payload === 'LESS' ? state.allRecipes.sort(function (a,b){
        if (a.score > b.score) {
          return 1;
        }
        if (a.score < b.score) {
          return -1;
        }
        return 0;
      }) : state.allRecipes.sort(function (a,b){
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedArrByPoints
      }

    default:
      return state
  }
  
};

export default recipes;