import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

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
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(err => {
      console.error(err);
      dispatch(authFail());
    });
};
