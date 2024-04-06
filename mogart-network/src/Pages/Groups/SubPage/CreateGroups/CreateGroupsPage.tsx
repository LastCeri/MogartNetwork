import React, { useState } from 'react';

const CreateGroupPage = () => {
  const [groupLogo, setGroupLogo] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupTags, setGroupTags] = useState('');
  const [uploadOption, setUploadOption] = useState('device');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setGroupLogo('');
    setGroupName('');
    setGroupDescription('');
    setGroupTags('');
  };

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setGroupLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex p-4h-auto items-center justify-center">
      <div className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Group</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group mb-4">
            {groupLogo && (
              <img
                src={groupLogo}
                alt="Group Logo Preview"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}
            <input
              type="file"
              id="groupLogo"
              className="w-full p-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onChange={handleFileUpload}
            />
          </div>

          <div>
            <label htmlFor="groupName" className="block text-gray-700 text-sm font-bold mb-2">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              placeholder="Set Group Name"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="groupDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Group Description
            </label>
            <textarea
              id="groupDescription"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Set Group Description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="groupTags" className="block text-gray-700 text-sm font-bold mb-2">
              Group Tags
            </label>
            <input
              type="text"
              id="groupTags"
              placeholder="Separate tags with commas"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={groupTags}
              onChange={(e) => setGroupTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Create Group
          </button>
        </form>
      </div>
    </main>

  );
};

export default CreateGroupPage;
