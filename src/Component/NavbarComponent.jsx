// File path: src/components/NavbarComponent.jsx

import React, { useState, useEffect } from 'react';


function NavbarComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage on first render
    return localStorage.getItem('darkMode') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const apiKey = "68c15d82b94d4bd56f451db4207d8730";
  const baseUrl = "https://api.themoviedb.org/3";
  const urlImg = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    // Set the initial dark mode class based on localStorage value
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Toggle dark mode class on body when `isDarkMode` changes
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode); // Store dark mode preference
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&limit=10`);
          const data = await response.json();
          setSearchResults(data.results.slice(0, 5));
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div className="navbar bg-white sticky top-0 z-50 shadow-md dark:bg-gray-800 transition-all">
      <div className="navbar-start flex items-center">
        {/* <img src={logo} alt="ReteFlix Logo" className="h-10 w-auto mr-2" /> */}
        <button className="btn btn-ghost btn-circle text-black dark:text-white" onClick={toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl font-bold text-black dark:text-white" href="/">ReteFlix</a>
      </div>
      <div className="navbar-end flex items-center space-x-2">
        {/* Dark Mode Toggle */}
        <button
          className="btn btn-circle bg-transparent text-black dark:text-white border-0"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <i class="fa-regular fa-lightbulb text-black dark:text-white text-2xl"></i>
          ) : (
            <i class="fa-solid fa-lightbulb text-black dark:text-white text-2xl"></i>
          )}
        </button>
      </div>

      {/* Modal for search */}
      {isModalOpen && (
        <div className="modal modal-open bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center">
          <div className="modal-box opacity-100 bg-white dark:bg-[#0D0D0D] rounded-lg shadow-xl p-6 transition-all transform duration-300">
            <h3 className="font-bold text-lg text-center text-black dark:text-white mb-4">Search</h3>
            <button onClick={toggleModal} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
            <input
              type="text"
              placeholder="Search for movies..."
              className="input input-bordered w-full mt-2 bg-white dark:bg-[#0D0D0D] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="mt-4 max-h-64 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <a
                    href={`/film/${result.id}`}
                    key={result.id}
                    className="flex items-center p-2 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-md"
                  >
                    {result.poster_path ? (
                      <img
                        src={`${urlImg}${result.poster_path}`}
                        alt={result.title}
                        className="w-16 h-24 rounded-md object-cover mr-3"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        alt="placeholder"
                        className="w-16 h-24 rounded-md object-cover mr-3"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-black dark:text-white">{result.title}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{`Rating: ${result.vote_average} ⭐`}</span>
                    </div>
                  </a>
                ))
              ) : (
                searchQuery && (
                  <p className="text-center text-black dark:text-white">No results found.</p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarComponent;
