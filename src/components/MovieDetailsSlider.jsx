import { useEffect, useState } from "react";
import tomatoes from "../assets/tomatoes.svg";

const MovieDetailsSlider = ({ movie, onClose, onViewDetails }) => {
  const [drawerEntering, setDrawerEntering] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setDrawerEntering(true);
  }, []);

  const closeDrawer = () => {
    setDrawerEntering(false);
    onClose();
  };

  const handleViewDetailsClick = () => {
    onViewDetails(movie?.imdbID);
  };

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" onClick={closeDrawer}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          drawerEntering ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`ml-auto h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          drawerEntering ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{movie?.Title}</h2>
          <button onClick={closeDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-6 space-y-6 pb-4">
            {/* Poster */}
            <div className="aspect-[2/3] w-1/2 max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=No+Image";
                }}
              />
            </div>

            {/* Title and Basic Info */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{movie?.Title}</h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                <span>{movie?.Year}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="capitalize">{movie?.Type}</span>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="bg-[#fdf8f0] rounded-xl p-4 space-y-4">
              {/* IMDb Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#E6B91E] text-black font-bold text-xs px-2 py-1 rounded-sm border border-[#E6B91E] flex items-center justify-center h-6 w-12">
                    IMDb
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold text-sm">IMDb Rating</span>
                    <span className="text-gray-600 text-xs">{movie?.imdbVotes} votes</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{movie?.imdbRating}</span>
                  <span className="text-gray-600 text-sm">/10</span>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Rotten Tomatoes Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-6 w-8">
                    <img src={tomatoes} alt="Rotten Tomatoes" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold text-sm">Rotten Tomatoes</span>
                    <span className="text-gray-600 text-xs">Critics Score</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {movie?.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A"}
                  </span>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Metacritic Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#1f2937] text-white font-bold text-xs px-2 py-1 rounded-sm flex items-center justify-center h-6 w-16">
                    Meta
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold text-sm">Metacritic</span>
                    <span className="text-gray-600 text-xs">Critics Score</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {movie?.Ratings?.find((r) => r.Source === "Metacritic")?.Value || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Director
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{movie?.Director}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cast
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{movie?.Actors}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Genre
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie?.Genre?.split(", ").map((genre, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer with Action Button */}
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleViewDetailsClick}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Full Details
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MovieDetailsSlider;
