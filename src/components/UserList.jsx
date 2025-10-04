import React, { useState } from 'react';
import { useUsers, useCreateUser, useDeleteUser } from '../hooks/index.js';

const UserList = () => {
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  // Fetch users
  const { data: users, loading, error, refetch } = useUsers();

  // Create user mutation
  const createUserMutation = useCreateUser({
    onSuccess: () => {
      setShowForm(false);
      setNewUser({ name: '', email: '', phone: '' });
      refetch(); // Refresh the list
    },
  });

  // Delete user mutation
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      refetch(); // Refresh the list
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(newUser);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading users: {error.message}</p>
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
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New User</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={createUserMutation.loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {createUserMutation.loading ? 'Creating...' : 'Create User'}
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

      {/* Users List */}
      <div className="grid gap-4">
        {users?.map((user) => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                {user.phone && <p className="text-gray-500">{user.phone}</p>}
                <p className="text-sm text-gray-400">ID: {user.id}</p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={deleteUserMutation.loading}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
              >
                {deleteUserMutation.loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {users?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserList;
