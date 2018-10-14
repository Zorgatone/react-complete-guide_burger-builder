import React, { Component } from "react";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

import classes from "./Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "E-mail address"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          }
        }
      }
    };

    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }

  inputChangedHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
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

  render() {
    const formElementsArray = Object.keys(this.state.controls).map(id => ({
      id: id,
      config: this.state.controls[id]
    }));

    const form = formElementsArray.map(formElement => (
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
    ));

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
