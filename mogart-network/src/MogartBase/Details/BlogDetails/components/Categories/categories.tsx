import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../Api/Api';

interface Category {
  CatID: number;
  CatName: string;
  CatDesc: string;
  CatIcon: string;
}

const BlogDetailsCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/GetCategory`)
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(error => console.error('Error fetching categories:', error));  
  }, []);

  return (
    <aside className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
      <h3 className="font-semibold text-xl mb-4 text-gray-800">Categories</h3>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.CatID} className="rounded-md flex items-start">
            <img src={category.CatIcon} alt={`Category Icon ${category.CatName}`} className="w-10 h-10 mr-2 rounded-full" />
            <div>
              <a href="#" className="block text-sm font-semibold text-blue-500 hover:text-blue-700">{category.CatName}</a>
              <p className="text-xs text-gray-600">{category.CatDesc}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogDetailsCategories;
