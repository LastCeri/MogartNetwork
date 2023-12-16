import React from 'react';

const popularTags = [
    { id: 1, name: '#technology' },
    { id: 2, name: '#innovation' },
    { id: 3, name: '#design1' },
    { id: 4, name: '#design2' },
    { id: 5, name: '#design3' },
    { id: 6, name: '#design4' },
    { id: 7, name: '#design5' },
    { id: 8, name: '#design6' },
    { id: 9, name: '#design7' },
];

export default function PopularTags() {
    return (
        <>
            <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold mb-4">Popular Tags</h5>
                <div className="overflow-y-auto max-h-48">
                    <ul className="space-y-2">
                        {popularTags.map((tag) => (
                            <li key={tag.id} className="bg-gray-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-300 transition duration-200">
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}