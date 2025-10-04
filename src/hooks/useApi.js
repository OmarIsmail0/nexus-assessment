import { useState, useEffect, useCallback } from 'react';
import { API_STATUS } from '../services/api/types.js';

/**
 * Custom hook for making API calls
 * @param {Function} apiCall - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, status }
 */
export const useApi = (apiCall, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  const {
    immediate = true, // Whether to call API immediately
    onSuccess = null, // Success callback
    onError = null,   // Error callback
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      setStatus(API_STATUS.LOADING);

      const response = await apiCall(...args);
      
      if (response.status === API_STATUS.SUCCESS) {
        setData(response.data);
        setStatus(API_STATUS.SUCCESS);
        onSuccess?.(response.data, response);
      } else {
        setError(response.error);
        setStatus(API_STATUS.ERROR);
        onError?.(response.error, response);
      }
    } catch (err) {
      setError(err);
      setStatus(API_STATUS.ERROR);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, onSuccess, onError]);

  const refetch = useCallback((...args) => {
    return execute(...args);
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    status,
    refetch,
  };
};

/**
 * Custom hook for paginated API calls
 * @param {Function} apiCall - The API function to call
 * @param {Object} initialParams - Initial parameters
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch, loadMore, hasMore, page, setPage }
 */
export const usePaginatedApi = (apiCall, initialParams = {}, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const {
    immediate = true,
    onSuccess = null,
    onError = null,
    pageSize = 10,
  } = options;

  const execute = useCallback(async (pageNum = page, reset = false) => {
    try {
      setLoading(true);
      setError(null);
      setStatus(API_STATUS.LOADING);

      const params = {
        ...initialParams,
        page: pageNum,
        limit: pageSize,
      };

      const response = await apiCall(params);
      
      if (response.status === API_STATUS.SUCCESS) {
        const newData = response.data;
        
        if (reset || pageNum === 1) {
          setData(newData);
        } else {
          setData(prev => [...prev, ...newData]);
        }
        
        setStatus(API_STATUS.SUCCESS);
        setHasMore(pageNum < (response.meta?.totalPages || 1));
        setTotalPages(response.meta?.totalPages || 1);
        onSuccess?.(newData, response);
      } else {
        setError(response.error);
        setStatus(API_STATUS.ERROR);
        onError?.(response.error, response);
      }
    } catch (err) {
      setError(err);
      setStatus(API_STATUS.ERROR);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, initialParams, page, pageSize, onSuccess, onError]);

  const refetch = useCallback(() => {
    setPage(1);
    return execute(1, true);
  }, [execute]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      return execute(nextPage, false);
    }
  }, [hasMore, loading, page, execute]);

  const goToPage = useCallback((pageNum) => {
    setPage(pageNum);
    return execute(pageNum, true);
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute(1, true);
    }
  }, []);

  return {
    data,
    loading,
    error,
    status,
    refetch,
    loadMore,
    hasMore,
    page,
    totalPages,
    goToPage,
  };
};

/**
 * Custom hook for mutation operations (POST, PUT, DELETE)
 * @param {Function} mutationFn - The mutation function
 * @param {Object} options - Additional options
 * @returns {Object} - { mutate, data, loading, error, status }
 */
export const useMutation = (mutationFn, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  const {
    onSuccess = null,
    onError = null,
  } = options;

  const mutate = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      setStatus(API_STATUS.LOADING);

      const response = await mutationFn(...args);
      
      if (response.status === API_STATUS.SUCCESS) {
        setData(response.data);
        setStatus(API_STATUS.SUCCESS);
        onSuccess?.(response.data, response);
        return response;
      } else {
        setError(response.error);
        setStatus(API_STATUS.ERROR);
        onError?.(response.error, response);
        return response;
      }
    } catch (err) {
      setError(err);
      setStatus(API_STATUS.ERROR);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus(API_STATUS.IDLE);
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
    status,
    reset,
  };
};
