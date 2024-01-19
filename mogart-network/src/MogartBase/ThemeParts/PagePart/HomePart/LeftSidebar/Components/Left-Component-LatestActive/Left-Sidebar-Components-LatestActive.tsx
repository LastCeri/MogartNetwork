import React from 'react';


export default function LeftSidebarComponentsLatestActive() {
  return (
      <>
          <div className="mb-10 bg-white rounded-lg shadow p-4">
              <h5 className="text-lg font-semibold mb-2">LATEST Active</h5>
              <ul className="space-y-2">
                  <li className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
                      <a href="#" className="flex items-center space-x-2">
                          <img className="h-6 w-6 rounded-full" src="https://cdn.discordapp.com/attachments/1178319248012095509/1184661912978460702/profile-picture.png" alt="Avatar" />
                          <span className="text-sm font-medium">Anna posted an update just now</span>
                      </a>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
                      <a href="#" className="flex items-center space-x-2">
                          <img className="h-6 w-6 rounded-full" src="https://cdn.discordapp.com/attachments/1178319248012095509/1184661745093054515/98511ee98a1930b8938e42caf0904d2d.png" alt="Avatar" />
                          <span className="text-sm font-medium">Mark shared a new article 30 mins ago</span>
                      </a>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
                      <a href="#" className="flex items-center space-x-2">
                          <img className="h-6 w-6 rounded-full" src="https://cdn.discordapp.com/attachments/1178319248012095509/1184661828949770300/cool-profile-pictures-retouching-1.png" alt="Avatar" />
                          <span className="text-sm font-medium">Julie commented on your post 1h ago</span>
                      </a>
                  </li>
              </ul>
          </div>
      </>
  );
}

