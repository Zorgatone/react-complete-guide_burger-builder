import React, { Component } from "react";

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
          value: ""
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street"
          },
          value: ""
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "ZIP"
          },
          value: ""
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country"
          },
          value: ""
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your E-Mail"
          },
          value: ""
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
          value: ""
        }
      },
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
      ingredients: { ...this.props.ingredients },
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

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    updatedOrderForm[inputIdentifier] = {
      ...updatedOrderForm[inputIdentifier],
      value: event.target.value
    };

    this.setState({ orderForm: updatedOrderForm });
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
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
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

export default ContactData;
