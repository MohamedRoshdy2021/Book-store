import { createSlice } from '@reduxjs/toolkit';

const initstate = [];

const categoriesslice = createSlice({
  name: 'categories',
  initialState: initstate,
  reducers: {
    addCategories: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCategories } = categoriesslice.actions;
export default categoriesslice.reducer;
