import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const SettingsPage = () => {
  const handleFormSubmit = (e:any) => {
    e.preventDefault();
  };

  return (
    <>
    <Header />
    <Navbar />
    <main className="flex-1 p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Settings</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="emailNotifications" className="text-lg text-gray-600">Email Notifications</label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  className="w-5 h-5 text-blue-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="accountPrivacy" className="text-lg text-gray-600">Account Privacy</label>
              <div className="mt-2">
                <select
                  id="accountPrivacy"
                  name="accountPrivacy"
                  className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};

export default SettingsPage;
