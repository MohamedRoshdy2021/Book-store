import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { postBook, deleteBook, getBook } from '../redux/Books/booksSlice';
import Button from './Buttons';

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.value);

  const handleDeleteOrEditBook = async (id) => {
    dispatch(deleteBook(id));
  };
  const itemid = nanoid();
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('');

  const handleAddBook = () => {
    if (newBookTitle && newAuthor && newBookCategory) {
      const newBook = {
        item_id: itemid,
        title: newBookTitle,
        author: newAuthor,
        category: newBookCategory,
      };
      dispatch(postBook(newBook));
    }
  };

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  return (
    <>
      {books.map((book) => (
        <main key={book.item_id} className="book-parent-div">
          <section className="book-first-div">
            <h3 className="margin-zero">{book.category}</h3>
            <h2 className="margin-zero">{book.title}</h2>
            <h4 className="margin-zero list-btn" >{book.author}</h4>
            <ul>
              <li className="list-btn">Comments</li>
              <li>
                <Button
                  className="list-btn"
                  type="button"
                  onClick={() => handleDeleteOrEditBook(book.item_id)}
                >
                  Remove
                </Button>
              </li>
              <li>
                <Button
                  className="list-btn"
                  type="button"
                  onClick={() => handleDeleteOrEditBook(book.item_id)}
                >
                  Edit
                </Button>
              </li>
            </ul>
          </section>
          <section className="book-second-div">
            <div className="book-second-div-ball">
                <div className="circular-progress" />
              <div className="div-second-presentage">
                <p className="presentage">64%</p>
                <p className='completed'>Completed</p>
              </div>
            </div>
            <div>
              <h3>Current Chapter</h3>
              <h2 className='chapter'>
                Chapter:
                {book.chapter}
              </h2>
              <button className="button" type="button" onClick={() => {}}>Update Progress</button>
            </div>
          </section>
        </main>
      ))}
      <footer>
        <h2>Add New Book</h2>
        <form>
          <input
            type="text"
            placeholder="Book Title"
            className="input"
            name="title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
          />
          <input
            className='input2'
            type="text"
            placeholder="author Title"
            name="author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <select
            name="category"
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
          >
            <option>--choose Categories--</option>
            <option>Categories 1</option>
            <option>Categories 2</option>
            <option>Categories 3</option>
            <option>Categories 4</option>
          </select>
          <button className='button-add' onClick={handleAddBook}>Add Book</button>
        </form>
      </footer>
    </>
  );
}

export default Books;
