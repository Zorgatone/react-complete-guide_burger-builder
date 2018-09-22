import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
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

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (const [paramKey, paramValue] of query.entries()) {
      if (paramKey === "price") {
        price = parseFloat(paramValue);
      } else {
        ingredients[paramKey] = parseInt(paramValue, 10);
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
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
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
