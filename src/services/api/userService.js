import BaseService from './baseService.js';

/**
 * User API Service
 * Handles all user-related API calls
 */
class UserService extends BaseService {
  constructor() {
    super('/users');
  }

  /**
   * Get all users
   * @param {Object} params - Query parameters (page, limit, filters)
   * @returns {Promise<ApiResponse>}
   */
  async getUsers(params = {}) {
    return this.get('', params);
  }

  /**
   * Get user by ID
   * @param {number|string} userId - User ID
   * @returns {Promise<ApiResponse>}
   */
  async getUserById(userId) {
    return this.get(`/${userId}`);
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<ApiResponse>}
   */
  async createUser(userData) {
    return this.post('', userData);
  }

  /**
   * Update user
   * @param {number|string} userId - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<ApiResponse>}
   */
  async updateUser(userId, userData) {
    return this.put(`/${userId}`, userData);
  }

  /**
   * Partially update user
   * @param {number|string} userId - User ID
   * @param {Object} userData - Partial user data
   * @returns {Promise<ApiResponse>}
   */
  async patchUser(userId, userData) {
    return this.patch(`/${userId}`, userData);
  }

  /**
   * Delete user
   * @param {number|string} userId - User ID
   * @returns {Promise<ApiResponse>}
   */
  async deleteUser(userId) {
    return this.delete(`/${userId}`);
  }

  /**
   * Get user posts
   * @param {number|string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise<ApiResponse>}
   */
  async getUserPosts(userId, params = {}) {
    return this.get(`/${userId}/posts`, params);
  }

  /**
   * Get user albums
   * @param {number|string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise<ApiResponse>}
   */
  async getUserAlbums(userId, params = {}) {
    return this.get(`/${userId}/albums`, params);
  }

  /**
   * Search users
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters
   * @returns {Promise<ApiResponse>}
   */
  async searchUsers(query, params = {}) {
    const searchParams = {
      q: query,
      ...params,
    };
    return this.get('', searchParams);
  }
}

// Export singleton instance
export default new UserService();
