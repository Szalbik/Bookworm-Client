import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = credentials => dispatch =>
  api.user.signup(credentials).then(user => {
    localStorage.setItem("userJWT", user.token);
    dispatch(userLoggedIn(user));
  });
