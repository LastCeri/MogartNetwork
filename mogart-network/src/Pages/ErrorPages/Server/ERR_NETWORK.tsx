import React from 'react';

const ERR_NETWORKPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">Network Error</h1>
      <p className="text-xl mt-4">A server error occurred.</p>
      <p className="mt-2">Please try again later.</p>
    </div>
  );
};

export default ERR_NETWORKPage;
