import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    filterValue: '',
    keyword: '',
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setFilterValue, setKeyword, setSearchResults, setCurrentPage, setTotalPages } = searchSlice.actions;

export default searchSlice.reducer;
