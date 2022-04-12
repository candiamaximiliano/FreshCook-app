import { FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE } from "./types"

export function filterRecipesByDiets (payload) {
  return {
    type: FILTER_BY_DIETS,
    payload
  }
};

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload
  }
}