import React, { Component } from "react";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";

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
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };

    this.updatePurchaseState = this.updatePurchaseState.bind(this);
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  updatePurchaseState() {
    this.setState(prevState => {
      const ingredients = {
        ...prevState.ingredients
      };
      const sum = Object.keys(ingredients).reduce((sum, igKey) => {
        return sum + ingredients[igKey];
      }, 0);
      return { purchasable: sum > 0 };
    });
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

      setTimeout(this.updatePurchaseState, 0);
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

        setTimeout(this.updatePurchaseState, 0);
        return { ingredients: updatedIngredients, totalPrice: newPrice };
      });
    }
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    alert("You continue!");
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
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
