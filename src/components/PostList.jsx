import React, { useState } from 'react';
import { usePosts, useCreatePost, useDeletePost } from '../hooks/index.js';

const PostList = () => {
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });

  // Fetch posts
  const { data: posts, loading, error, refetch } = usePosts();

  // Create post mutation
  const createPostMutation = useCreatePost({
    onSuccess: () => {
      setShowForm(false);
      setNewPost({ title: '', body: '', userId: 1 });
      refetch(); // Refresh the list
    },
  });

  // Delete post mutation
  const deletePostMutation = useDeletePost({
    onSuccess: () => {
      refetch(); // Refresh the list
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate(newPost);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading posts: {error.message}</p>
        <button
          onClick={refetch}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add Post'}
        </button>
      </div>

      {/* Add Post Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Post</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <input
                type="number"
                value={newPost.userId}
                onChange={(e) => setNewPost({ ...newPost, userId: parseInt(e.target.value) })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={createPostMutation.loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {createPostMutation.loading ? 'Creating...' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="grid gap-4">
        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.body}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>User ID: {post.userId}</span>
                  <span>Post ID: {post.id}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={deletePostMutation.loading}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 ml-4"
              >
                {deletePostMutation.loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default PostList;
