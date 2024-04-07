import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `${API_URL}/GetPopularTags`;
    axios.get<Tag[]>(apiUrl)
      .then((response) => {
        setPopularTags(response.data);
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error('Network error:', error);
          navigate('/NetworkError');
        } else if (error.response) {
          console.error('PopularTags data fetching failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, []);

  return (
    <>
      <div className="mb-6 bg-white p-5 rounded-xl shadow-xl">
        <h5 className="text-xl font-semibold mb-5 text-gray-900">Popular Tags</h5>
        <div className="overflow-y-auto max-h-48 pr-2">
          <ul className="flex flex-wrap gap-3">
            {popularTags.map((tag) => (
              <li key={tag.Tgid} className="flex items-center bg-gray-100 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out">
                <Link to={`/Tags/${tag.Tgname}`} className="flex items-center gap-3 text-gray-800 hover:text-gray-900">
                  <span className="font-bold">#{tag.Tgname}</span>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span className="text-xs font-semibold">{tag.Tgpoints} Points</span>
                  <FontAwesomeIcon icon={faEye} className="text-gray-600" />
                  <span className="text-xs font-semibold">{tag.TgViews} Views</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
