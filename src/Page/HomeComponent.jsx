import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../Component/NavbarComponent.jsx";
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [loading, setLoading] = useState(true); // tambahkan state loading
  const apiKey = "68c15d82b94d4bd56f451db4207d8730";
  const baseUrl = "https://api.themoviedb.org/3";
  const baseimgUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchGuestSessionId = async () => {
      try {
        const response = await axios.get(`${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`);
        setGuestSessionId(response.data.guest_session_id);
      } catch (error) {
        console.error("Error fetching guest session ID:", error.response ? error.response.data : error.message);
      }
    };

    const fetchMovies = async () => {
      try {
        let apiUrl = searchQuery
          ? `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
          : `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genre}&page=${currentPage}`;

        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setCurrentPage(response.data.page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error.response ? error.response.data : error.message);
      }
    };

    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
        setNowPlayingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error.response ? error.response.data : error.message);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
        setUpcomingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error.response ? error.response.data : error.message);
      }
    };

    const fetchRecommendedMovies = async () => {
      if (selectedMovie) {
        try {
          const response = await axios.get(`${baseUrl}/movie/${selectedMovie.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
          setRecommendedMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching recommended movies:", error.response ? error.response.data : error.message);
        }
      }
    };

    fetchGuestSessionId();
    fetchMovies();
    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();
    fetchRecommendedMovies();
  }, [searchQuery, genre, currentPage, selectedMovie]);

  const showMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setRating(0);
    navigate(`/film/${movie.id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderCarousel = (movies, title, colors) => (
    <div className="carousel-section my-8">
      <h3 className="text-3xl font-bold w-full pt-6 text-center text-blue-900 tracking-widest dark:text-white ">
        {title}
      </h3>
      <div className="flex overflow-x-auto gap-4 p-4">
        {movies.map((movie) => (
          <a
            key={movie.id}
            href="/film"
            onClick={(event) => {
              event.preventDefault();
              showMovieDetails(movie);
            }}
            className="min-w-[200px] transform transition-transform duration-300 hover:scale-105 dark:bg-gray-800 shadow-lg p-2 rounded-lg"
          >
            <img
              src={baseimgUrl + movie.poster_path}
              alt={movie.title}
              className="rounded-lg w-full h-[300px] object-cover"
            />
            <div className="text-center mt-2">
              <p className="text-black font-semibold  dark:text-gray-300">{movie.title}</p>
              <span className="text-yellow-500">
                <i className="fa-solid fa-star"></i> {movie.vote_average}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        // skeleton loading
        <div className="skeleton-section min-h-screen">
          <div className="flex justify-center mt-6 space-x-4">
          <div className="skeleton w-full h-[90px] rounded-lg"></div>
        </div>
          <div className="flex justify-center mt-6 space-x-4">
          <div className="skeleton w-full h-[100px] rounded-lg"></div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <div className="skeleton w-full h-[200px] rounded-lg"></div>
          <div className="skeleton w-full h-[200px] rounded-lg"></div>
          <div className="skeleton w-full h-[200px] rounded-lg"></div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
        <div className="skeleton w-full h-[200px] rounded-lg"></div>
      </div>
        </div>
      ) : (
        // konten asli
        <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 min-h-screen">
          <NavbarComponent />
  
          <div className="header w-full bg-gradient-to-r from-blue-400 to-blue-600 dark:bg-gray-800 p-4 md:p-8">
            <h2 className="text-3xl font-bold w-full pt-1 text-center md:text-4xl text-white dark:text-white">
              Selamat Datang di RateFlix
            </h2>
            <p className="text-lg w-full pt-2 text-center text-gray-200 md:text-xl">
              Setiap hari website ini akan memberikan informasi film
            </p>
          </div>
  
          {/* Carousels */}
          {renderCarousel(popularMovies, "Most Popular Films", "yelow-200")}
          {renderCarousel(nowPlayingMovies, "Now Playing")}
          {renderCarousel(upcomingMovies, "Upcoming Movies")}
          {selectedMovie && renderCarousel(recommendedMovies, "Recommended Movies")}
  
          {/* Search and Genre Filters */}
          <div className="flex justify-center mt-6 space-x-4 md:p-0 p-4">
          <h1 className="text-3xl font-bold w-full pt-6 text-center text-blue-900 tracking-widest dark:text-white">All Film</h1>
           
          </div>

  
          {/* Movie List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 mt-6 ">
            {movies.map((movie) => (
              <a
                key={movie.id}
                href="/film"
                onClick={(event) => {
                  event.preventDefault();
                  showMovieDetails(movie);
                }}
                className="min-w-[200px] transform transition-transform duration-300 hover:scale-105 dark:bg-gray-800 shadow-2xl p-4 rounded-lg mt-4 bord"
              >
                <img
                  src={baseimgUrl + movie.poster_path}
                  alt={movie.title}
                  className="rounded-lg w-full h-[300px] object-cover"
                />
                <div className="text-center mt-2">
                  <p className="text-black font-semibold dark:text-gray-300">{movie.title}</p>
                  <p className="text-gray-400 font-semibold dark:text-gray-400 text-sm">{movie.release_date}</p>
                  <span className="text-yellow-500">
                    <i className="fa-solid fa-star mr-1"></i> {movie.vote_average}
                  </span>
                </div>
              </a>
            ))}
          </div>
  
          <div className="flex justify-center mt-6 space-x-4 pb-7">
            <button
              className="btn dark:bg-gray-800 dark:text-white"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              «
            </button>
            <span className="btn dark:bg-gray-800 dark:text-white">
              Page {currentPage}
            </span>
            <button
              className="btn dark:bg-gray-800 dark:text-white"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}

<footer className="dark:bg-gray-800 bg-gray-200 dark:text-gray-300 text-black p-6 ">
  <div className="container mx-auto text-center">
    <p className="text-lg font-semibold">© 2024 RateFlix. All rights reserved.</p>
    <p className="mt-2">
      Built by 
      <a className="text-blue-500 dark:text-blue-400 hover:underline" href="https://sites.google.com/view/puteraeaportofolio/designer" target="_blank" rel="noopener noreferrer"> Putera</a>.
    </p>
    <div className="mt-1 flex justify-center mb-[-20px]">
      <a href="https://instagram.com/puteraeaa_" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram text-pink-600 hover:text-pink-800"></i>
      </a>
      {/* <a href="https://github.com/puteraeaa" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github text-gray-800 hover:text-gray-600"></i>
      </a> */}
    </div>
  </div>
</footer>
    </>
  );
}

export default HomeComponent;