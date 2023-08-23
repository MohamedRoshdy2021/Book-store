// redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 'item1',
    title: 'The Great Gatsby',
    author: 'John Smith',
    category: 'Fiction',
  },
  {
    id: 'item2',
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    category: 'Fiction',
  },
  {
    id: 'item3',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    category: 'Nonfiction',
  },
];
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    removeBook: (state, action) => state.filter((book) => book.id !== action.payload),
    editBook: (state, action) => {
      const { id, title } = action.payload;
      const bookToEdit = state.find((book) => book.id === id);
      if (bookToEdit) {
        bookToEdit.title = title;
      }
    },
  },
});

export const { addBook, removeBook, editBook } = booksSlice.actions;

export default booksSlice.reducer;
