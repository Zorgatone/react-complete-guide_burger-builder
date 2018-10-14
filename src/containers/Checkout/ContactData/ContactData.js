import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button";
import Spinner from "../../../components/UI/Spinner";
import Input from "../../../components/UI/Input";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/WithErrorHandler";
import * as actions from "../../../store/actions";

import classes from "./ContactData.css";

class ContactData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Zorgatone Zorg"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "ZIP"
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
            isNumeric: true
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your E-Mail"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              {
                value: "fastest",
                displayValue: "Fastest"
              },
              {
                value: "cheapest",
                displayValue: "Cheapest"
              }
            ]
          },
          value: "fastest",
          valid: true,
          touched: false
        }
      },
      formIsValid: false
    };

    this.orderHandler = this.orderHandler.bind(this);
  }

  orderHandler(event) {
    event.preventDefault();

    const formData = Object.keys(this.state.orderForm).reduce(
      (data, formElementIdentifier) => {
        data[formElementIdentifier] = this.state.orderForm[
          formElementIdentifier
        ].value;
        return data;
      },
      {}
    );

    const order = {
      ingredients: { ...this.props.ings },
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  }

  checkValidity(value, rules) {
    let isValid = true;
    const { required, minLength, maxLength } = rules || {};

    if (required) {
      isValid = isValid && value.trim() !== "";
    }

    if (minLength) {
      isValid = isValid && value.length >= minLength;
    }

    if (maxLength) {
      isValid = isValid && value.length <= maxLength;
    }

    if (rules.isEmail) {
      const pattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      isValid = isValid && pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = isValid && pattern.test(value);
    }

    return isValid;
  }

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    console.log(updatedFormElement);

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    const formIsValid = Object.keys(updatedOrderForm).every(
      id => !updatedOrderForm[id].validation || updatedOrderForm[id].valid
    );

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map(id => ({
      id: id,
      config: this.state.orderForm[id]
    }));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={!!formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
