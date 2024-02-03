import React, { useState } from 'react';

const CreateGroupPage = () => {
  const [groupLogo, setGroupLogo] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupTags, setGroupTags] = useState('');
  const [uploadOption, setUploadOption] = useState('device');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Creating group:', groupLogo, groupName, groupDescription, groupTags);
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
    <main className="flex p-4 bg-gray-100 h-screen">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Create New Group</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative group">
            {groupLogo && (
              <img
                src={groupLogo}
                alt="Group Logo Preview"
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
          </div>

          <label htmlFor="groupLogo" className="text-gray-700 text-sm font-bold">
            Image Upload
          </label>
          <input
            type="file"
            id="groupLogo"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileUpload}
          />

          <label htmlFor="groupName" className="text-gray-700 text-sm font-bold">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            placeholder='Set Group Name'
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label htmlFor="groupDescription" className="text-gray-700 text-sm font-bold">
            Group Description
          </label>
          <textarea
            id="groupDescription"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={groupDescription}
            placeholder='Set Group Description'
            onChange={(e) => setGroupDescription(e.target.value)}
          />

          <label htmlFor="groupTags" className="text-gray-700 text-sm font-bold">
            Group Tags
          </label>
          <input
            type="text"
            id="groupTags"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={groupTags}
            onChange={(e) => setGroupTags(e.target.value)}
            placeholder="Separate tags with commas"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Group
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateGroupPage;
