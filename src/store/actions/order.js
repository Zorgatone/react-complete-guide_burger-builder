import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post(
      token
        ? "/orders.json?" + new URLSearchParams({ auth: token })
        : "/orders.json",
      orderData
    )
    .then(response =>
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    )
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrdersSucces = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error: error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());
  axios
    .get(
      token
        ? "/orders.json?" +
          new URLSearchParams({
            auth: token,
            orderBy: '"userId"',
            equalTo: `"${userId}"`
          })
        : "/orders.json"
    )
    .then(({ data }) => {
      const fetchedOrders = Object.keys(data).map(id => ({
        ...data[id],
        id: id
      }));
      dispatch(fetchOrdersSucces(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
};
