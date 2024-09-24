import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarComponent from "../Component/NavbarComponent";
import "../Component/CSS/Index.css";

const apiKey = "68c15d82b94d4bd56f451db4207d8730";
const baseUrl = "https://api.themoviedb.org/3";
const urlImg = "https://image.tmdb.org/t/p/w500";

const FilmComponent = () => {
  const { id } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredit = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${baseUrl}/movie/${id}/credits?language=en-US&api_key=${apiKey}`
          );
          setMovieCredits(response.data);
        } catch (error) {
          console.error(
            "Error fetching movie credits:",
            error.response ? error.response.data : error.message
          );
          setError(error);
        }
      }
    };

    const fetchDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${baseUrl}/movie/${id}?language=en-US&api_key=${apiKey}`
          );
          setMovie(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            "Error fetching movie details:",
            error.response ? error.response.data : error.message
          );
          setError(error);
          setLoading(false);
        }
      }
    };

    const fetchTrailer = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`
          );
          const trailer = response.data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        } catch (error) {
          console.error(
            "Error fetching trailer:",
            error.response ? error.response.data : error.message
          );
          setError(error);
        }
      }
    };

    fetchCredit();
    fetchDetails();
    fetchTrailer();
  }, [id]);

  if (loading) {
    return (
      <section className="dots-container ">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const topCast = movieCredits?.cast?.slice(0, 5) || [];
  const director = movieCredits?.crew?.find(
    (crewMember) => crewMember.job === "Director"
  );

  return (
    <>
      <NavbarComponent />
      <section className="bg-[#0D0D0D] min-h-screen">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${urlImg}${movie.backdrop_path})`,
            backgroundPosition: "center",
          }}
        >
          <div
            className="movie-detail z-0 h-auto py-10 lg:h-[87.3vh] flex justify-center items-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)",
            }}
          >
            <div className="container mx-auto flex flex-col lg:flex-row items-center h-full px-4">
              <figure className="w-full lg:w-1/4 mb-6 lg:mb-0">
                <img
                  src={
                    movie.poster_path
                      ? `${urlImg}${movie.poster_path}`
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.title}
                  className="rounded-lg shadow-lg w-2/3 lg:w-full mx-auto"
                />
                <button
                  className="btn dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 text-white btn-xl mt-4 text-center w-full w-1/2"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  <ion-icon name="play"></ion-icon>
                  <span>Watch Trailer</span>
                </button>
                <a
                  className="btn dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 text-white btn-xl mt-4 text-center w-full w-1/2"
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="play"></ion-icon>
                  <span>Watch Now</span>
                </a>
              </figure>
              <div className="movie-detail-content w-full lg:w-2/3 lg:pl-10 text-white">
                <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
                  {movie.title}{" "}
                  <span className="text-lg lg:text-2xl font-normal">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </h1>
                <div className="meta-wrapper mb-4 flex flex-wrap justify-center lg:justify-start">
                  <div className="badge badge-fill mr-2">{movie.runtime} minutes</div>
                  <div className="badge badge-outline mr-2">HD</div>
                  {movie.genres.map((genre, index) => (
                    <span className="text-white ml-2" key={index}>
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="storyline mb-4 text-center lg:text-left">{movie.overview}</p>

                <div className="rating mb-4 flex items-center justify-center lg:justify-start">
                  <div className="flex items-center justify-center lg:justify-start">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = (index + 1) * 2;
                      return (
                        <i
                          key={index}
                          className={`fa-solid fa-star mr-1 ${
                            ratingValue <= movie.vote_average
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      );
                    })}
                    <span className="ml-2">{movie.vote_average.toFixed(1)} / 10</span>
                  </div>
                </div>

                <div className="cast-info mt-8">
                  <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Cast</h2>
                  <ul className="cast-list flex flex-wrap justify-center lg:justify-start">
                    {topCast.map((castMember) => (
                      <li
                        key={castMember.id}
                        className="w-full sm:w-1/2 md:w-1/3 mb-4 flex items-center"
                      >
                        <img
                          src={`${urlImg}${castMember.profile_path}`}
                          alt={castMember.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <span>{castMember.name} as {castMember.character}</span>
                      </li>
                    ))}
                  </ul>
                  {director && (
                    <div className="director-info mt-6 text-center lg:text-left">
                      <h2 className="text-3xl font-bold">Director</h2>
                      <p className="mt-2">{director.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Watch Trailer</h3>
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Trailer"
              width="100%"
              height="400px"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      </dialog>

      <footer className="dark:bg-gray-800 bg-gray-200 dark:text-gray-300 text-black p-6 lg:mt-[-100px]">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">2024 RateFlix. All rights reserved.</p>
          <p className="">
            Built by
            <a
              className="text-blue-500 dark:text-blue-400 hover:underline"
              href="https://sites.google.com/view/puteraeaportofolio/designer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Putera
            </a>
            .
          </p>
          <div className="mt-1 flex justify-center mb-[-20px] space-x-4">
            <a href="https://instagram.com/puteraeaa_" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-pink-600 hover:text-pink-800"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FilmComponent;
