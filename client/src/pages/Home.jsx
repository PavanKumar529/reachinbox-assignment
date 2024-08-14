import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to ReachInbox.ai</h1>
      <p className="text-lg text-gray-700 mt-4">
        AI-driven platform transforming cold outreach.
      </p>
      <div className="mt-6">
        <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Log In
        </a>
      </div>
    </div>
  );
};

export default Home;
