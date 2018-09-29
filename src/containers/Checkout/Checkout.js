import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
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
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.props.ings}
              price={this.props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});

export default connect(mapStateToProps)(Checkout);
