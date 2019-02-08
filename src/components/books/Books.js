import React from "react";
import PropTypes from "prop-types";

const renderBooks = books => {
  return books.map(book => (
    <li key={book.goodreadsId}>
      <p>{book.title}</p>
      <p>{book.authors}</p>
      <p>{book.pages}</p>
    </li>
  ));
};

const Books = ({ books }) => <ul>{renderBooks(books)}</ul>;

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      pages: PropTypes.number.isRequired,
      goodreadsId: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Books;
