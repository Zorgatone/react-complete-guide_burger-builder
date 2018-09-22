import React, { Component } from "react";

import axios from "../../axios-orders";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.updatePurchaseState = this.updatePurchaseState.bind(this);
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://react-my-burger-tomz.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
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
    const queryParams = new URLSearchParams();
    for (const key of Object.keys(this.state.ingredients)) {
      queryParams.set(key, this.state.ingredients[key]);
    }
    queryParams.set("price", this.state.totalPrice);

    this.props.history.push({
      pathname: "/checkout",
      search: queryParams.toString()
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
