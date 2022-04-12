// import { FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE } from "../actions/types";

// const initialState = {};

// function filters(state=initialState, action){
//   switch (action.type) {
//     case FILTER_BY_DIETS:
//       const dietFiltered = action.payload !== 'all' ? state.allRecipes.filter(recipe => recipe.diets.includes(action.payload.toLowerCase())) : state.allRecipes;
//       return {
//         ...state,
//         recipes: dietFiltered,
//       }

//     case FILTER_CREATED:
//       const createdFilter = action.payload === 'created' ? state.allRecipes.filter(recipe => recipe.createdInDb) : state.allRecipes.filter(recipe => !recipe.createdInDb);
//       return {
//         ...state,
//         recipes: action.payload === 'all' ? state.allRecipes : createdFilter
//       }

//     case ORDER_BY_NAME:
//       const sortedArr = action.payload === 'AZ' ? state.allRecipes.sort(function (a,b){
//         if (a.name > b.name) {
//           return 1;
//         }
//         if (a.name < b.name) {
//           return -1;
//         }
//         return 0;
//       }) : state.allRecipes.sort(function (a,b){
//         if (a.name < b.name) {
//           return 1;
//         }
//         if (a.name > b.name) {
//           return -1;
//         }
//         return 0;
//       });
//       return {
//         ...state,
//         recipes: sortedArr
//       }
    
//     case ORDER_BY_SCORE:
//       const sortedArrByPoints = action.payload === 'LESS' ? state.allRecipes.sort(function (a,b){
//         if (a.score > b.score) {
//           return 1;
//         }
//         if (a.score < b.score) {
//           return -1;
//         }
//         return 0;
//       }) : state.allRecipes.sort(function (a,b){
//         if (a.score < b.score) {
//           return 1;
//         }
//         if (a.score > b.score) {
//           return -1;
//         }
//         return 0;
//       });
//       return {
//         ...state,
//         recipes: sortedArrByPoints
//       }
  
//     default:
//       return state
//   }
  
// };

// export default filters;