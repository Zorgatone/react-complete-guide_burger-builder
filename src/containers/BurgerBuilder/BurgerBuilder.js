import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";
import * as actions from "../../store/actions";

import Aux from "../../hoc/Aux";

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = { purchasing: false };

    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).reduce((sum, igKey) => {
      return sum + ingredients[igKey];
    }, 0);

    return sum > 0;
  }

  purchaseHandler() {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            price={this.props.price}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
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

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName =>
    dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onAuthSetRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
