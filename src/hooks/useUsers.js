import { useApi, usePaginatedApi, useMutation } from './useApi.js';
import { userService } from '../services/api/index.js';

/**
 * Hook for fetching all users
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useUsers = (params = {}, options = {}) => {
  return useApi(
    () => userService.getUsers(params),
    [JSON.stringify(params)],
    options
  );
};

/**
 * Hook for fetching users with pagination
 * @param {Object} initialParams - Initial parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, loadMore, hasMore, page, totalPages, goToPage }
 */
export const usePaginatedUsers = (initialParams = {}, options = {}) => {
  return usePaginatedApi(
    (params) => userService.getUsers(params),
    initialParams,
    options
  );
};

/**
 * Hook for fetching a single user by ID
 * @param {number|string} userId - User ID
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useUser = (userId, options = {}) => {
  return useApi(
    () => userService.getUserById(userId),
    [userId],
    { immediate: !!userId, ...options }
  );
};

/**
 * Hook for creating a new user
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useCreateUser = (options = {}) => {
  return useMutation(
    (userData) => userService.createUser(userData),
    options
  );
};

/**
 * Hook for updating a user
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useUpdateUser = (options = {}) => {
  return useMutation(
    ({ userId, userData }) => userService.updateUser(userId, userData),
    options
  );
};

/**
 * Hook for partially updating a user
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const usePatchUser = (options = {}) => {
  return useMutation(
    ({ userId, userData }) => userService.patchUser(userId, userData),
    options
  );
};

/**
 * Hook for deleting a user
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status, reset }
 */
export const useDeleteUser = (options = {}) => {
  return useMutation(
    (userId) => userService.deleteUser(userId),
    options
  );
};

/**
 * Hook for fetching user posts
 * @param {number|string} userId - User ID
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useUserPosts = (userId, params = {}, options = {}) => {
  return useApi(
    () => userService.getUserPosts(userId, params),
    [userId, JSON.stringify(params)],
    { immediate: !!userId, ...options }
  );
};

/**
 * Hook for fetching user albums
 * @param {number|string} userId - User ID
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useUserAlbums = (userId, params = {}, options = {}) => {
  return useApi(
    () => userService.getUserAlbums(userId, params),
    [userId, JSON.stringify(params)],
    { immediate: !!userId, ...options }
  );
};

/**
 * Hook for searching users
 * @param {string} query - Search query
 * @param {Object} params - Additional parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useSearchUsers = (query, params = {}, options = {}) => {
  return useApi(
    () => userService.searchUsers(query, params),
    [query, JSON.stringify(params)],
    { immediate: !!query, ...options }
  );
};
