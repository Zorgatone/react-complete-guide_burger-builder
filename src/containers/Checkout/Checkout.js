import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
      }
    };

    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (const [ingredientName, ingredientAmount] of query.entries()) {
      ingredients[ingredientName] = parseInt(ingredientAmount, 10);
    }

    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler() {
    this.props.history.goBack();
  }

  checkoutContinuedHandler() {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
