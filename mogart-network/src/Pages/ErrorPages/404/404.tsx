import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <a href="/" className="text-lg text-blue-600 hover:underline mt-4">Back To Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
