import types from "../types";
import api from "../api";

export const userLoggedIn = user => ({
  type: types.USER_LOGGED_IN,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.setItem("userJWT", user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => {
  console.log("remove localstorage");
  localStorage.removeItem("userJWT");
  return {
    type: types.USER_LOGGED_OUT
  };
};
