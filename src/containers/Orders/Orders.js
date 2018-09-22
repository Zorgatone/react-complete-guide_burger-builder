import React, { Component } from "react";

import Order from "./Order";

class Orders extends Component {
  render(props) {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
