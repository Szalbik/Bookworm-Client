import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resendToken: email =>
      axios
        .post("/api/auth/resend_confirmation", { email })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token =>
      axios.post("/api/auth/validate_token", { token }).then(res => res.data),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  book: {
    add: book => axios.post("/api/books", { book }).then(res => res.data.book)
  }
};
