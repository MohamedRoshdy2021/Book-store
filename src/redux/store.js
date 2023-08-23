// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './Books/booksSlice';
import categoryReducer from './Categories/category';

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoryReducer,
  },
});

export default store;
