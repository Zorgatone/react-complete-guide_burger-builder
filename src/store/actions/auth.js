import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup = true) => dispatch => {
  dispatch(authStart());

  const baseUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  const key = "AIzaSyDICEhvn4R9RN8rqyfGr9cOdBlk8-o43Y4";

  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  const url = isSignup
    ? `${baseUrl}/signupNewUser?key=${key}`
    : `${baseUrl}/verifyPassword?key=${key}`;

  axios
    .post(url, authData)
    .then(response => {
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};
