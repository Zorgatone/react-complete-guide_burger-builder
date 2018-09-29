import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button";
import Spinner from "../../../components/UI/Spinner";
import Input from "../../../components/UI/Input";
import axios from "../../../axios-orders";

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
            maxLength: 5
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
            required: true
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
      formIsValid: false,
      loading: false
    };

    this.orderHandler = this.orderHandler.bind(this);
  }

  orderHandler(event) {
    event.preventDefault();

    this.setState({ loading: true });

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

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
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

    if (this.state.loading) {
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
  ings: state.ingredients,
  price: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);
