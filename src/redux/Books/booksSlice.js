// redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: Date.now(),
    title: 'The hunger games',
    author: 'Suzanne Collins',
    chapter: 17,
    progress: 64,
    category: 'Categories 1',
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
