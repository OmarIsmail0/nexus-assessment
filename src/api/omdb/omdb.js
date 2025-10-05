import agent from "../agent";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

/**
 * Fetches movies from the OMDb API based on provided parameters.
 *
 * @param {string} imdbID - The IMDb ID of the movie (optional).
 * @param {string} title - The title of the movie (optional).
 * @param {string} type - The type of result to return: "movie", "series", or "episode" (optional).
 * @param {string} year - The year of release (optional).
 * @param {number} page - The page number to return (optional, for paginated results).
 * @returns {Promise<Object>} The response data from the OMDb API.
 */
export const getMovies = async ({ imdbID, title, type, year, page }) => {
  const response = await agent.get(``, {
    params: {
      apikey: API_KEY,
      s: title || undefined,
      i: imdbID || undefined,
      type: type || undefined,
      y: year?.trim() || undefined,
      page: page || undefined,
    },
  });
  return response.data;
};

/**
 * Fetches the poster image for a movie from the OMDb API using the imdbID.
 *
 * @param {string} imdbID - The IMDb ID of the movie.
 * @returns {Promise<Object>} The response data from the OMDb API.
 */
export const getMoviePoster = async (imdbID) => {
  const response = await agent.get(``, {
    params: {
      apikey: API_KEY,
      i: imdbID,
    },
    baseURL: import.meta.env.VITE_OMDB_IMG_URL,
  });
  return response.data;
};
