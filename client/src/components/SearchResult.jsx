import React, { useState } from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p className="text-gray-600">{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
