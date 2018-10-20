import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions/order";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      action.token
        ? "/orders.json?" + new URLSearchParams({ auth: action.token })
        : "/orders.json",
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const response = yield axios.get(
      action.token
        ? "/orders.json?" +
          new URLSearchParams({
            auth: action.token,
            orderBy: '"userId"',
            equalTo: `"${action.userId}"`
          })
        : "/orders.json"
    );
    const fetchedOrders = Object.keys(response.data).map(id => ({
      ...response.data[id],
      id: id
    }));
    yield put(actions.fetchOrdersSucces(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
