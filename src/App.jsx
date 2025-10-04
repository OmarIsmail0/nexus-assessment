import React, { useState } from "react";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800">API Demo with Axios</h1>
          <p className="text-gray-600 mt-2">
            A well-structured API service using axios with React hooks
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "posts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Posts
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === "users" && <UserList />}
        {activeTab === "posts" && <PostList />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            This demo showcases a well-structured API service architecture using:
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-sm text-gray-300">
            <span>• Axios for HTTP requests</span>
            <span>• Custom React hooks</span>
            <span>• Service layer pattern</span>
            <span>• Error handling</span>
            <span>• Loading states</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
