import React, { Component } from "react";

import Burger from "../../components/Burger";

import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2
      }
    };
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
