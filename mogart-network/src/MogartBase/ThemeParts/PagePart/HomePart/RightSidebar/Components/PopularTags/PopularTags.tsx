import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PopularTags() {
  const [popularTags, setPopularTags] = useState<{ id: number; PopularTags_Name: string; PopularTags_Desc: string }[]>([]);
  
  useEffect(() => {

    const apiUrl = 'http://localhost:3040/PopularTags'; 

    axios.get(apiUrl)
      .then((response) => {
        setPopularTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching popular tags from API:', error);
      });
  }, []);

  return (
    <>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
        <h5 className="text-lg font-semibold mb-4">Popular Tags</h5>
        <div className="overflow-y-auto max-h-48">
          <ul className="space-y-2">
            {popularTags.map((tag) => (
              <li key={tag.id} className="bg-gray-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-300 transition duration-200">
                #{tag.PopularTags_Name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
