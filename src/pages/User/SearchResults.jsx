import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import api from '../../api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim()) {
      fetchSearchResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/searchLaptops?query=${encodeURIComponent(searchQuery)}`);
      if (res.data.success) {
        setResults(res.data.data);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Error fetching search results');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </button>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FaSearch />
            <span>Search Results for: "{query}"</span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Searching...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {results.length > 0 ? (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map((laptop) => (
                    <div
                      key={laptop._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {laptop.images && laptop.images.length > 0 ? (
                          <img
                            src={laptop.images[0]}
                            alt={laptop.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-gray-500">No Image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {laptop.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          Brand: {laptop.brand}
                        </p>
                        <p className="text-gray-900 dark:text-white font-bold mb-4">
                          RS {laptop.price}
                        </p>
                        <button
                          onClick={() => navigate(`/product/${laptop._id}`)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : query && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No laptops found matching "{query}"
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
