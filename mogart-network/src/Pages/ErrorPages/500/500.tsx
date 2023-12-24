import React from 'react';

const ServerErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="text-xl mt-4">A server error occurred.</p>
      <p className="mt-2">Please try again later.</p>
      <a href="/" className="text-lg text-blue-600 hover:underline mt-4">Return to Home</a>
    </div>
  );
};

export default ServerErrorPage;
