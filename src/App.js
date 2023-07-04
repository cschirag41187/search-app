import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setSearchResults,
  setCurrentPage,
  setTotalPages,
} from './redux/slices/searchSlice';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';


const App = () => {
  const filterValue = useSelector((state) => state.search.filterValue);
  const keyword = useSelector((state) => state.search.keyword);
  const currentPage = useSelector((state) => state.search.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ddic.hgsinteractive.com/api/resource-search?page=${currentPage}&_limit=8&filter=${filterValue}&q=${keyword}`
        );
        dispatch(setSearchResults(response.data.results));
        dispatch(setTotalPages(response.data.totalPages));
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [filterValue, keyword, currentPage, dispatch]);

  return (
    <div>
      <SearchForm />
      <SearchResults />
      <Pagination />
    </div>
  );
};

export default App;



