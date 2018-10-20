import * as actionTypes from "./actionTypes";

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

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER,
  orderData: orderData,
  token: token
});

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

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token: token,
  userId: userId
});
