import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postBook = createAsyncThunk(
  'books/addBook',
  async (book) => {
    try {
      await axios.post(
        'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/GYyCqiiRoOj0083JgG28/books',
        book,
      );
    } catch (e) {
      throw new Error(e);
    }
    return book;
  },
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (bookID) => {
    try {
      await axios.delete(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/GYyCqiiRoOj0083JgG28/books/${bookID}`,
      );
    } catch (e) {
      throw new Error(e);
    }
    return bookID;
  },
);

export const getBook = createAsyncThunk('books/getBooks', async () => {
  const response = await axios.get(
    'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/GYyCqiiRoOj0083JgG28/books',
  );
  const books = Object.entries(response.data).map((item) => ({
    ...item[1][0],
    item_id: item[0],
  }));
  return books;
});

const initialState = {
  value: [],
  isLoading: false,
  isError: undefined,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postBook.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.value = state.value.filter(
        (book) => book.item_id !== action.payload,
      );
    });

    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });

    builder.addCase(getBook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default bookSlice.reducer;
