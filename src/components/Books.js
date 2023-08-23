import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook, editBook } from '../redux/Books/booksSlice';

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const [editingBookId, setEditingBookId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleDeleteOrEditBook = (id) => {
    if (editingBookId === id) {
      dispatch(editBook({ id, title: editedTitle })); // Dispatch the action to edit book
      setEditingBookId(null);
      setEditedTitle('');
    } else {
      dispatch(removeBook(id)); // Dispatch the action to remove book
    }
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    const newBookTitle = event.target.elements.title.value;
    const newBookCategory = event.target.elements.category.value;
    if (newBookTitle && newBookCategory) {
      dispatch(
        addBook({
          id: Date.now(),
          title: newBookTitle,
          category: newBookCategory,
        }),
      );
    }
  };

  return (
    <>
      {books.map((book) => (
        <main key={books.id} className="book-parent-div">
          <section key={book.id} className="book-first-div">
            <h3 className="margin-zero">{book.category}</h3>
            <h2 className="margin-zero">
              {editingBookId === book.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                book.title
              )}
            </h2>
            <h4 className="margin-zero">{book.author}</h4>
            {editingBookId === book.id ? (
              <button type="button" onClick={() => handleDeleteOrEditBook(book.id)}>Save</button>
            ) : (
              <ul>
                <li className="button-add-remove">Comments</li>
                <li key={book.id}>
                  <button
                    className="button-add-remove"
                    type="button"
                    onClick={() => handleDeleteOrEditBook(book.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleDeleteOrEditBook(book.id);
                      }
                    }}
                  >
                    Remove
                  </button>
                </li>
                <li key={book.id + 1}>
                  <button
                    className="button-add-remove"
                    type="button"
                    onClick={() => setEditingBookId(book.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEditingBookId(book.id);
                      }
                    }}
                  >
                    Edit
                  </button>
                </li>
              </ul>
            )}
          </section>
          <section className="book-second-div">
            <div className="book-second-div-ball">
              <div className="ball-container">
                <div className="ball-itself" />
              </div>
              <div className="div-second-presentage">
                <p className="presentage">64%</p>
                <p>Completed</p>
              </div>
            </div>
            <div>
              <h3>Current Chapter</h3>
              <h2>
                Chapter:
                {book.chapter}
              </h2>
              <button className="button" type="button">Update Progress</button>
            </div>
          </section>
        </main>
      ))}
      <footer>
        <h1>Add New Book</h1>
        <form onSubmit={handleAddBook}>
          <input type="text" placeholder="Book Title" className="input" name="title" />
          <select name="category">
            <option>--choose Categories--</option>
            <option>Categories 1</option>
            <option>Categories 2</option>
            <option>Categories 3</option>
            <option>Categories 4</option>
          </select>
          <button className="button" type="submit">Add Book</button>
        </form>
      </footer>
    </>
  );
}

export default Books;
