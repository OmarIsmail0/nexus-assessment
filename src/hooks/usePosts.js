import { useApi, usePaginatedApi, useMutation } from './useApi.js';
import { postService } from '../services/api/index.js';

/**
 * Hook for fetching all posts
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const usePosts = (params = {}, options = {}) => {
  return useApi(
    () => postService.getPosts(params),
    [JSON.stringify(params)],
    options
  );
};

/**
 * Hook for fetching posts with pagination
 * @param {Object} initialParams - Initial parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, loadMore, hasMore, page, totalPages, goToPage }
 */
export const usePaginatedPosts = (initialParams = {}, options = {}) => {
  return usePaginatedApi(
    (params) => postService.getPosts(params),
    initialParams,
    options
  );
};

/**
 * Hook for fetching a single post by ID
 * @param {number|string} postId - Post ID
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const usePost = (postId, options = {}) => {
  return useApi(
    () => postService.getPostById(postId),
    [postId],
    { immediate: !!postId, ...options }
  );
};

/**
 * Hook for creating a new post
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useCreatePost = (options = {}) => {
  return useMutation(
    (postData) => postService.createPost(postData),
    options
  );
};

/**
 * Hook for updating a post
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useUpdatePost = (options = {}) => {
  return useMutation(
    ({ postId, postData }) => postService.updatePost(postId, postData),
    options
  );
};

/**
 * Hook for partially updating a post
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const usePatchPost = (options = {}) => {
  return useMutation(
    ({ postId, postData }) => postService.patchPost(postId, postData),
    options
  );
};

/**
 * Hook for deleting a post
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useDeletePost = (options = {}) => {
  return useMutation(
    (postId) => postService.deletePost(postId),
    options
  );
};

/**
 * Hook for fetching post comments
 * @param {number|string} postId - Post ID
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const usePostComments = (postId, params = {}, options = {}) => {
  return useApi(
    () => postService.getPostComments(postId, params),
    [postId, JSON.stringify(params)],
    { immediate: !!postId, ...options }
  );
};

/**
 * Hook for fetching posts by user
 * @param {number|string} userId - User ID
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const usePostsByUser = (userId, params = {}, options = {}) => {
  return useApi(
    () => postService.getPostsByUser(userId, params),
    [userId, JSON.stringify(params)],
    { immediate: !!userId, ...options }
  );
};

/**
 * Hook for searching posts
 * @param {string} query - Search query
 * @param {Object} params - Additional parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useSearchPosts = (query, params = {}, options = {}) => {
  return useApi(
    () => postService.searchPosts(query, params),
    [query, JSON.stringify(params)],
    { immediate: !!query, ...options }
  );
};
