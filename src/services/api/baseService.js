import apiClient from './config.js';
import { ApiResponse, ApiError, HTTP_METHODS } from './types.js';

/**
 * Base service class that provides common HTTP methods
 * All specific API services should extend this class
 */
class BaseService {
  constructor(baseEndpoint = '') {
    this.baseEndpoint = baseEndpoint;
  }

  /**
   * Generic method to make HTTP requests
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async request(method, endpoint, data = null, config = {}) {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;
      const response = await apiClient.request({
        method,
        url,
        data,
        ...config,
      });

      return ApiResponse.success(response.data, 'Request successful');
    } catch (error) {
      const apiError = this.handleError(error);
      return ApiResponse.error(apiError, apiError.message);
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async get(endpoint, params = {}, config = {}) {
    return this.request(HTTP_METHODS.GET, endpoint, null, { params, ...config });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async post(endpoint, data = {}, config = {}) {
    return this.request(HTTP_METHODS.POST, endpoint, data, config);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async put(endpoint, data = {}, config = {}) {
    return this.request(HTTP_METHODS.PUT, endpoint, data, config);
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async patch(endpoint, data = {}, config = {}) {
    return this.request(HTTP_METHODS.PATCH, endpoint, data, config);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} config - Additional axios config
   * @returns {Promise<ApiResponse>}
   */
  async delete(endpoint, config = {}) {
    return this.request(HTTP_METHODS.DELETE, endpoint, null, config);
  }

  /**
   * Handle API errors and convert them to ApiError instances
   * @param {Error} error - The error object
   * @returns {ApiError}
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return new ApiError(
        data?.message || `HTTP ${status} Error`,
        status,
        data?.code || 'HTTP_ERROR',
        data
      );
    } else if (error.request) {
      // Network error
      return new ApiError(
        'Network Error: Unable to connect to server',
        0,
        'NETWORK_ERROR'
      );
    } else {
      // Other error
      return new ApiError(
        error.message || 'Unknown error occurred',
        0,
        'UNKNOWN_ERROR'
      );
    }
  }

  /**
   * Build query string from parameters
   * @param {Object} params - Parameters object
   * @returns {string}
   */
  buildQueryString(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    return searchParams.toString();
  }

  /**
   * Create paginated request parameters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Additional filters
   * @returns {Object}
   */
  createPaginationParams(page = 1, limit = 10, filters = {}) {
    return {
      page,
      limit,
      ...filters,
    };
  }
}

export default BaseService;
