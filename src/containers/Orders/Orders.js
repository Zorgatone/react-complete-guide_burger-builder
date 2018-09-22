import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "./Order";

import withErrorHandler from "../../hoc/WithErrorHandler";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(({ data }) => {
        const fetchedOrders = Object.keys(data).map(id => ({
          ...data[id],
          id: id
        }));
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render(props) {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
