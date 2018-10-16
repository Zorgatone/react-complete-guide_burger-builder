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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationDate => dispatch => {
  console.log(expirationDate);
  setTimeout(() => {
    dispatch(logout());
  }, expirationDate * 1000);
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
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    console.log(expirationDate);

    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(logout());
    }
  }
};
