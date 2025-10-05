const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden"
    >
      {/* Poster */}
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <img
          src={movie?.Poster}
          alt={movie?.Title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=No+Image";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {movie?.Title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{movie?.Year}</span>
          <span className="capitalize">{movie?.Type}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">{movie?.imdbRating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
