import React from 'react';

export default function LeftSidebarComponentsBlogs() {
  return (
      <>
          <div className="mb-10 bg-white rounded-lg shadow p-4">
              <h5 className="text-lg font-semibold mb-2">BLOG</h5>
              <ul className="space-y-2">
                  <li className="hover:bg-gray-100 rounded-md transition duration-200">
                      <a href="#" className="flex items-center space-x-2 p-2">
                          <img className="h-6 w-6 rounded-lg" src="https://cdn.discordapp.com/attachments/1184661241009033257/1184661323687145513/tree-736885_1280.png?ex=658cc8d5&is=657a53d5&hm=05bccd80da01ee5120f02641758bf837c32e2fd3decf49baaa141504f16680af&" alt="Blog Thumbnail" />
                          <span className="text-sm font-medium">5 Tips for Remote Work - Read More</span>
                      </a>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md transition duration-200">
                      <a href="#" className="flex items-center space-x-2 p-2">
                          <img className="h-6 w-6 rounded-lg" src="https://cdn.discordapp.com/attachments/1184661241009033257/1184661376690561034/images.png?ex=658cc8e2&is=657a53e2&hm=12c130744ed9cbbaa091e885b979828e068918ab8aa409039798382c993d3265&" alt="Blog Thumbnail" />
                          <span className="text-sm font-medium">The Future of Collaboration Tools</span>
                      </a>
                  </li>
              </ul>
          </div>
      </>
  );
}


