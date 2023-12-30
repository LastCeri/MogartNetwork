import React, { useState } from 'react';

import Header from '../../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Creating group:', groupName, groupDescription);
    setGroupName('');
    setGroupDescription('');
  };

  return (
    <>  
     <Header />
      <Navbar />
      <main className="flex-1 p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Create New Group</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="groupName" className="block text-gray-700 text-sm font-bold mb-2">
              Group Name
            </label>
            <input 
              type="text"
              id="groupName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="groupDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Group Description
            </label>
            <textarea 
              id="groupDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Group
          </button>
        </form>
      </div>
    </main>
    </>
  );
};

export default CreateGroupPage;
