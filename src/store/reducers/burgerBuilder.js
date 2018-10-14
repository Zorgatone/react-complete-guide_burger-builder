import { updateObject } from "../utils";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};

const updateIngredient = (state, action, inc) => ({
  [action.ingredientName]: state.ingredients[action.ingredientName] + inc
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateObject(state, {
        ingredients: updateObject(
          state.ingredients,
          updateIngredient(state, action, 1)
        ),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      });
    case actionTypes.REMOVE_INGREDIENT:
      return updateObject(state, {
        ingredients: updateObject(
          state.ingredients,
          updateIngredient(state, action, -1)
        ),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      });
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: Object.keys(action.ingredients).reduce(
          (count, key) =>
            count + action.ingredients[key] * INGREDIENT_PRICES[key],
          initialState.totalPrice
        ),
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
