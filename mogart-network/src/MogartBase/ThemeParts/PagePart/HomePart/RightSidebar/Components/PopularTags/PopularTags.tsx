import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../Api/Api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';

interface Tag {
  Tgid: number;
  Tgname: string;
  Tgdesc: string;
  Tgpoints: string;
  TgViews: string;
}

export default function PopularTags() {
  const [popularTags, setPopularTags] = useState<Tag[]>([]);

  useEffect(() => {
    const apiUrl = `${API_URL}/GetPopularTags`;
    axios.get<Tag[]>(apiUrl)
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
          <ul className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <li key={tag.Tgid} className="flex items-center bg-gray-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-300 transition duration-200">
                <Link to={`/Tags/${tag.Tgname}`} className="flex items-center gap-2">
                  #{tag.Tgname}
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                  <span className="text-xs">{tag.Tgpoints} Points</span>
                  <FontAwesomeIcon icon={faEye} className="ml-2" />
                  <span className="text-xs">{tag.TgViews} Views</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
