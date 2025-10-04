import BaseService from './baseService.js';

/**
 * Post API Service
 * Handles all post-related API calls
 */
class PostService extends BaseService {
  constructor() {
    super('/posts');
  }

  /**
   * Get all posts
   * @param {Object} params - Query parameters (page, limit, filters)
   * @returns {Promise<ApiResponse>}
   */
  async getPosts(params = {}) {
    return this.get('', params);
  }

  /**
   * Get post by ID
   * @param {number|string} postId - Post ID
   * @returns {Promise<ApiResponse>}
   */
  async getPostById(postId) {
    return this.get(`/${postId}`);
  }

  /**
   * Create a new post
   * @param {Object} postData - Post data
   * @returns {Promise<ApiResponse>}
   */
  async createPost(postData) {
    return this.post('', postData);
  }

  /**
   * Update post
   * @param {number|string} postId - Post ID
   * @param {Object} postData - Updated post data
   * @returns {Promise<ApiResponse>}
   */
  async updatePost(postId, postData) {
    return this.put(`/${postId}`, postData);
  }

  /**
   * Partially update post
   * @param {number|string} postId - Post ID
   * @param {Object} postData - Partial post data
   * @returns {Promise<ApiResponse>}
   */
  async patchPost(postId, postData) {
    return this.patch(`/${postId}`, postData);
  }

  /**
   * Delete post
   * @param {number|string} postId - Post ID
   * @returns {Promise<ApiResponse>}
   */
  async deletePost(postId) {
    return this.delete(`/${postId}`);
  }

  /**
   * Get post comments
   * @param {number|string} postId - Post ID
   * @param {Object} params - Query parameters
   * @returns {Promise<ApiResponse>}
   */
  async getPostComments(postId, params = {}) {
    return this.get(`/${postId}/comments`, params);
  }

  /**
   * Get posts by user
   * @param {number|string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise<ApiResponse>}
   */
  async getPostsByUser(userId, params = {}) {
    return this.get('', { userId, ...params });
  }

  /**
   * Search posts
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters
   * @returns {Promise<ApiResponse>}
   */
  async searchPosts(query, params = {}) {
    const searchParams = {
      q: query,
      ...params,
    };
    return this.get('', searchParams);
  }
}

// Export singleton instance
export default new PostService();
