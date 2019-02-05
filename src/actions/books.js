import types from "../types";
import api from "../api";

const addBook = book => ({
  type: types.ADD_BOOK,
  book
});

export const createBook = book => dispatch =>
  api.book.add(book).then(book => dispatch(addBook(book)));
