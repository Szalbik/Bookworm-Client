import { Object } from "core-js";
import { createSelector } from "reselect";
import _ from "lodash";
import types from "../types";

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case types.ADD_BOOK:
      return { ...state, [action.book.goodreadsId]: action.book };
    case types.FETCH_BOOKS:
      return _.mapKeys(action.books, "goodreadsId");
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
