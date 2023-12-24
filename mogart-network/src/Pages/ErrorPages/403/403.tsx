import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-xl mt-4">Forbidden - Access Denied.</p>
      <p className="mt-2">You do not have permission to view this page.</p>
      <a href="/" className="text-lg text-blue-600 hover:underline mt-4">Return to Home</a>
    </div>
  );
};

export default ForbiddenPage;
