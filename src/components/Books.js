import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook, editBook } from '../redux/Books/booksSlice';
import Button from './Buttons';
import { nanoid } from 'nanoid'

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const newitemid = nanoid()
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

  const [newBookTitle, setNewBookTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('');

  const handleAddBook = () => {
    if (newBookTitle && newAuthor && newBookCategory) {
      dispatch(
        addBook({
          id: newitemid,
          title: newBookTitle,
          author: newAuthor,
          category: newBookCategory,
        }),
      );
      setNewBookTitle('');
      setNewAuthor('');
      setNewBookCategory('');
    }
  };
  return (
    <>
      {books.map((book) => (
        <main key={book.id}  className="book-parent-div">
          <section className="book-first-div">
            <h3 className="margin-zero">{book.category}</h3>
            <h2 className="margin-zero">
              {editingBookId === book.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : book.title}
            </h2>
            <h4 className="margin-zero">{book.author}</h4>
            {editingBookId === book.id ? (
              <Button onClick={() => handleDeleteOrEditBook(book.id)}>Save</Button>
            ) : (
              <ul>
                <li className="button-add-remove">Comments</li>
                <li key={book.id}>
                  <Button
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
                  </Button>
                </li>
                <li key={book.id + 1}>
                  <Button
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
                  </Button>
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
        <form>
          <input
            type="text"
            placeholder="Book Title"
            className="input"
            name="title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
          />
          <input type="text"
            placeholder="author Title"
            name="author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
          <select name="category" value={newBookCategory} onChange={(e) => setNewBookCategory(e.target.value)}>
            <option>--choose Categories--</option>
            <option>Categories 1</option>
            <option>Categories 2</option>
            <option>Categories 3</option>
            <option>Categories 4</option>
          </select>
          <Button onClick={handleAddBook}>Add Book</Button>
        </form>
      </footer>
    </>
  );
}

export default Books;
