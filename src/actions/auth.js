import types from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: types.USER_LOGGED_IN,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.setItem("userJWT", user.token);
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => {
  localStorage.removeItem("userJWT");
  setAuthorizationHeader();
  return {
    type: types.USER_LOGGED_OUT
  };
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.setItem("userJWT", user.token);
    dispatch(userLoggedIn(user));
  });

export const resendToken = email => dispatch =>
  api.user.resendToken(email).then(user => {
    localStorage.setItem("userJWT", user.token);
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
