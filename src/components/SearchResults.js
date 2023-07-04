import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const searchResults = useSelector((state) => state.search.searchResults);

  return (
    <div className="mt-4">
      <h2>Search Results:</h2>
      {searchResults && searchResults.length > 0 ? (
        <ul className="list-group">
          {searchResults.map((result) => (
            <li key={result.id} className="list-group-item">{result.title}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
