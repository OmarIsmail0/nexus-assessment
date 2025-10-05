import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import api from "../api";
import { getContainerClasses } from "../config/appConfig";
import tomatoes from "./../assets/tomatoes.svg";
import type { MovieDetails, MovieDetailsResponse } from "../types";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        if (!id) return;
        const response = (await api.omdbApi.getMovies({ imdbID: id })) as MovieDetailsResponse;
        setMovie(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Movie not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className={`${getContainerClasses()} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">OMDb Light Mode</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className={`${getContainerClasses()} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="lg:flex">
            {/* Poster */}
            <div className="lg:w-1/3 xl:w-1/4">
              <div className="aspect-[3/4] lg:aspect-[4/5] lg:max-h-[500px]">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x600/f3f4f6/9ca3af?text=No+Image";
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-2/3 xl:w-3/4 p-8 lg:p-12">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.Title}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <span>{movie.Year}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="capitalize">{movie.Type}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{movie.Runtime}</span>
                </div>

                {/* Ratings Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Ratings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* IMDb Rating */}
                    <div className="bg-[#fdf8f0] rounded-lg p-4 border border-[#E6B91E]/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="bg-[#E6B91E] text-black font-bold text-xs px-2 py-1 rounded-sm border border-[#E6B91E] flex items-center justify-center h-6 w-12">
                            IMDb
                          </div>
                          <span className="text-gray-800 font-semibold text-sm">IMDb</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-900">{movie?.imdbRating || "N/A"}</span>
                        <span className="text-gray-600 text-sm">/10</span>
                        {movie?.imdbVotes && <p className="text-gray-600 text-xs mt-1">{movie.imdbVotes} votes</p>}
                      </div>
                    </div>

                    {/* Rotten Tomatoes Rating */}
                    <div className="bg-[#fdf8f0] rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center h-6 w-8">
                            <img src={tomatoes} alt="Rotten Tomatoes" className="h-5 w-5" />
                          </div>
                          <span className="text-gray-800 font-semibold text-sm">Rotten Tomatoes</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {movie?.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A"}
                        </span>
                        <p className="text-gray-600 text-xs mt-1">Critics Score</p>
                      </div>
                    </div>

                    {/* Metacritic Rating */}
                    <div className="bg-[#fdf8f0] rounded-lg p-4 border border-gray-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="bg-[#1f2937] text-white font-bold text-xs px-2 py-1 rounded-sm flex items-center justify-center h-6 w-16">
                            Meta
                          </div>
                          <span className="text-gray-800 font-semibold text-sm">Metacritic</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {movie?.Ratings?.find((r) => r.Source === "Metacritic")?.Value || movie?.Metascore || "N/A"}
                        </span>
                        <p className="text-gray-600 text-xs mt-1">Critics Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plot */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Plot</h2>
                <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Director</h3>
                  <p className="text-gray-700">{movie?.Director || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Writer</h3>
                  <p className="text-gray-700">{movie?.Writer || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cast</h3>
                  <p className="text-gray-700">{movie?.Actors || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie?.Genre ? (
                      movie.Genre.split(", ").map((genre, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {genre.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-700">N/A</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Runtime</h3>
                  <p className="text-gray-700">{movie?.Runtime || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rated</h3>
                  <p className="text-gray-700">{movie?.Rated || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Released</h3>
                  <p className="text-gray-700">{movie?.Released || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Language</h3>
                  <p className="text-gray-700">{movie?.Language || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Country</h3>
                  <p className="text-gray-700">{movie?.Country || "N/A"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Box Office</h3>
                  <p className="text-gray-700">{movie?.BoxOffice || "N/A"}</p>
                </div>

                {movie?.Awards && movie.Awards !== "N/A" && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Awards</h3>
                    <p className="text-gray-700">{movie.Awards}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {/* <div className="mt-8 flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Add to Watchlist
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Share
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
