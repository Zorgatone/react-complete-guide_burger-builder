import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import * as actions from "../../store/actions";
import { updateObject, checkValidity } from "../../shared/utility";

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
      },
      isSignup: true
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler(event, controlName) {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    });

    this.setState({ controls: updatedControls });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const formElementsArray = Object.keys(this.state.controls).map(id => ({
      id: id,
      config: this.state.controls[id]
    }));

    const form = this.props.loading ? (
      <Spinner />
    ) : (
      formElementsArray.map(formElement => (
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
      ))
    );

    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    return this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="submit" btnType="Success">
            SUBMIT
          </Button>
          <Button
            type="button"
            btnType="Danger"
            clicked={this.switchAuthModeHandler}
          >
            SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
