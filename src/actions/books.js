import types from "../types";
import api from "../api";

const addBook = book => ({
  type: types.ADD_BOOK,
  book
});

const getBooks = books => ({
  type: types.FETCH_BOOKS,
  books
});

export const createBook = book => dispatch =>
  api.book.add(book).then(book => dispatch(addBook(book)));

export const fetchBooks = () => dispatch =>
  api.book.fetchBooks().then(books => dispatch(getBooks(books)));
