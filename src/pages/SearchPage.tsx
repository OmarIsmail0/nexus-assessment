import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieDetailsSlider from "../components/MovieDetailsSlider";
import { APP_CONFIG, getContainerClasses } from "../config/appConfig";
import api from "../api";
import { message } from "antd";
import type { MovieDetails, MovieSearchResponse } from "../types";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<MovieDetails[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentPageRef = useRef(1);

  // Function to calculate items per page based on screen size and grid layout
  // Grid layout: grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
  // Always show exactly 2 rows per page
  const calculateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    let columns;
    const rows = 2; // Always 2 rows per page

    if (width >= 1280) {
      // xl breakpoint: 5 columns
      columns = 5; // 5 × 2 = 10 items per page
    } else if (width >= 1024) {
      // lg breakpoint: 4 columns
      columns = 4; // 4 × 2 = 8 items per page
    } else if (width >= 640) {
      // sm breakpoint: 3 columns
      columns = 3; // 3 × 2 = 6 items per page
    } else {
      // mobile: 1 column
      columns = 1; // 1 × 2 = 2 items per page
    }

    return columns * rows;
  }, []);

  // Update items per page on window resize (debounced)
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce resize events to avoid excessive re-renders
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newItemsPerPage = calculateItemsPerPage();
        // Only update if the value actually changed
        if (newItemsPerPage !== itemsPerPage) {
          setItemsPerPage(newItemsPerPage);
        }
      }, 150); // Wait 150ms after resize stops
    };

    // Set initial value
    const initialItemsPerPage = calculateItemsPerPage();
    setItemsPerPage(initialItemsPerPage);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [itemsPerPage]);

  // Debounced search function
  useEffect(() => {
    const search = async () => {
      try {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        if (searchQuery.trim()) {
          setIsSearching(true);
          searchTimeoutRef.current = setTimeout(async () => {
            try {
              const response = (await api.omdbApi.getMovies({
                title: searchQuery,
                type: typeFilter == "All" ? null : typeFilter,
                year: yearFilter,
                page: currentPage,
              })) as MovieSearchResponse;

              if (response && response.Response === "True" && response.Search) {
                const hydratedMovies = await Promise.all(
                  response.Search.map(async (movie) => {
                    const movieDetails = await api.omdbApi.getMovies({ imdbID: movie.imdbID });
                    return { ...movie, ...movieDetails } as MovieDetails;
                  })
                );

                setSearchResults(hydratedMovies);
                setTotalResults(parseInt(response.totalResults) || 0);
              } else {
                messageApi.error(response.Error || "An error occurred");
                setSearchResults([]);
                setTotalResults(0);
              }
            } catch (error) {
              messageApi.error((error as Error).message);
              setSearchResults([]);
              setTotalResults(0);
            }

            setIsSearching(false);
          }, 500);
        } else {
          setSearchResults([]);
          setTotalResults(0);
          setCurrentPage(1);
          setIsSearching(false);
        }

        return () => {
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
        };
      } catch (error) {
        console.error(error);
        setIsSearching(false);
        setSearchResults([]);
        setTotalResults(0);
        setCurrentPage(1);
      }
    };

    search();
  }, [searchQuery, typeFilter, yearFilter, currentPage, messageApi]);

  // Recalculate total pages when results change
  // OMDb API returns 10 results per page
  useEffect(() => {
    if (totalResults > 0) {
      const apiResultsPerPage = 10; // OMDb API default
      const newTotalPages = Math.ceil(totalResults / apiResultsPerPage);
      setTotalPages(newTotalPages);
    }
  }, [totalResults]);

  // Separate effect to handle page changes when total pages change
  useEffect(() => {
    if (currentPageRef.current > totalPages && totalPages > 0) {
      setCurrentPage(1);
      currentPageRef.current = 1;
    }
  }, [totalPages]);

  const handleMovieClick = useCallback((movie: MovieDetails) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseSlider = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleViewDetails = useCallback(
    (movieId: string) => {
      navigate(`/movie/${movieId}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    currentPageRef.current = newPage;
  }, []);

  // API already handles pagination, so we use searchResults directly
  const paginatedResults = useMemo(() => searchResults, [searchResults]);

  return (
    <div className="min-h-screen bg-gray-50">
      {contextHolder}
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className={`${getContainerClasses()} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex items-center justify-end py-4">
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
              <h1 className="text-xl font-bold text-gray-900">{APP_CONFIG.app.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={`${getContainerClasses()} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            {/* Search Inputs Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search movies, series, episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <div className="sm:w-32">
                <select
                  value={typeFilter || ""}
                  onChange={(e) => setTypeFilter(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  {APP_CONFIG.filters.types.map((type) => (
                    <option key={type.label} value={type.value || ""}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:w-40">
                <input
                  type="text"
                  placeholder="Year (e.g., 2014)"
                  value={yearFilter || ""}
                  onChange={(e) => setYearFilter(e.target.value || undefined)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searchQuery && (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Results Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {isSearching ? "Searching..." : `${totalResults} results`}
                  </h2>
                  {!isSearching && totalResults > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Showing {searchResults.length} results on page {currentPage} of {totalPages}
                      <span className="ml-1 text-xs">({totalResults} total results)</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {paginatedResults.map((movie, index) => (
                    <MovieCard key={movie?.imdbID + index} movie={movie} onClick={() => handleMovieClick(movie)} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-8 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ← Prev
                      </button>

                      {/* Page Numbers */}
                      {(() => {
                        const pages: React.ReactElement[] = [];
                        const maxVisiblePages = 5;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                        // Adjust start page if we're near the end
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }

                        // Add first page and ellipsis if needed
                        if (startPage > 1) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => handlePageChange(1)}
                              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              1
                            </button>
                          );
                          if (startPage > 2) {
                            pages.push(
                              <span key="ellipsis1" className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                        }

                        // Add visible page numbers
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                i === currentPage
                                  ? "bg-blue-600 text-white border border-blue-600"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }

                        // Add last page and ellipsis if needed
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <span key="ellipsis2" className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => handlePageChange(totalPages)}
                              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              {totalPages}
                            </button>
                          );
                        }

                        return pages;
                      })()}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No results found</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-500">Enter a movie or series title to begin searching</p>
          </div>
        )}
      </div>

      {/* Movie Details Slider */}
      {selectedMovie && (
        <MovieDetailsSlider movie={selectedMovie} onClose={handleCloseSlider} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default SearchPage;
