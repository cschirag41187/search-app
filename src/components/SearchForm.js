import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterValue, setKeyword, setCurrentPage, setSearchResults, setTotalPages } from '../redux/slices/searchSlice';
import axios from 'axios';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ddic.hgsinteractive.com/api/resource_category');
        setCategoryOptions(response.data?.map((category) => ({
          value: category.tid[0]?.value,
          name: category.name[0]?.value
        })) || []);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setKeyword(searchTerm));
    dispatch(setCurrentPage(1));

    try {
      const response = await axios.get('https://ddic.hgsinteractive.com/api/resource-search', {
        params: {
          page: 1,
          _limit: 8,
          keyword: searchTerm
        }
      });

      dispatch(setSearchResults(response.data.results || []));
      dispatch(setTotalPages(response.data.totalPages || 0));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    dispatch(setFilterValue(''));
    dispatch(setKeyword(''));
    dispatch(setCurrentPage(1));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-4">
      <div className="row">
        <div className="col-md-4">
          <select className="form-select" onChange={handleInputChange}>
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Keyword Search"
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary mx-2">Search</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
