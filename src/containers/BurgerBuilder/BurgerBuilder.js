import React, { Component } from "react";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";

import Aux from "../../hoc/Aux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    };

    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
  }

  addIngredientHandler(type) {
    this.setState(prevState => {
      const oldCount = prevState.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...prevState.ingredients
      };

      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = prevState.totalPrice;
      const newPrice = oldPrice + priceAddition;

      return { ingredients: updatedIngredients, totalPrice: newPrice };
    });
  }

  removeIngredientHandler(type) {
    if (this.state.ingredients[type] > 0) {
      this.setState(prevState => {
        const oldCount = prevState.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
          ...prevState.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = prevState.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        return { ingredients: updatedIngredients, totalPrice: newPrice };
      });
    }
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
