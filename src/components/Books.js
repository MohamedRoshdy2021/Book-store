import React, { useState } from 'react';

function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The hunger games',
      author: 'Suzanne Collins',
      chapter: 17,
      progress: 64,
      category: 'Categories 1'
    },
  ]);

  const [editingBookId, setEditingBookId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleDeleteOrEditBook = (id) => {
    if (editingBookId === id) {
      // Save the edited title
      const updatedBooks = books.map((book) =>
        book.id === id ? { ...book, title: editedTitle } : book
      );
      setBooks(updatedBooks);
      setEditingBookId(null);
      setEditedTitle('');
    } else {
      // Start editing or delete
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      setEditingBookId(id);
      setEditedTitle('');
    }
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    const newBookTitle = event.target.elements.title.value;
    const newBookCategory = event.target.elements.category.value;

    if (newBookTitle && newBookCategory) {
      const newBook = {
        id: Date.now(),
        title: newBookTitle,
        category: newBookCategory,
      };

      setBooks([...books, newBook]);
    }
  };

    return (
      <>
      {books.map((book) => (
        <main className="book-parent-div">
          <section key={book.id}  className="book-first-div">
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
                <button onClick={() => handleDeleteOrEditBook(book.id)}>Save</button>
              ) : (
                <ul>
                  <li>Comments</li>
                  <li onClick={() => handleDeleteOrEditBook(book.id)}>Remove</li>
                  <li onClick={() => setEditingBookId(book.id)}>Edit</li>
                </ul>
              )}
            </section>
            <section className="book-second-div">
              <div className="book-second-div-ball">
                <p className="ball" />
                <div className="div-second-presentage">
                  <p className="presentage">64%</p>
                  <p>Completed</p>
                </div>
              </div>
              <div>
                <h3>Current Chapter</h3>
                <h2>Chapter: {book.chapter}</h2>
                <button type="button">Update Progress</button>
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
          <button type="submit">Add Book</button>
        </form>
      </footer>
    </>
  );
}

export default Books;
