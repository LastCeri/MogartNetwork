import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../Api/Api';
import axios from 'axios';

export default function PopularTags() {
  const [popularTags, setPopularTags] = useState<{ Tgid: number; Tgname: string; Tgdesc: string }[]>([]);
  
  useEffect(() => {
    const apiUrl = `${API_URL}/GetPopularTags`; 
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
              <li key={tag.Tgid} className="bg-gray-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-300 transition duration-200">
                <Link to={`/Tags/${tag.Tgname}`}>
                  #{tag.Tgname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
