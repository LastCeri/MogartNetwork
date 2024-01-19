import React from 'react';

const groups = [
    { id: 1, name: 'Business Idea', image: 'https://cdn.discordapp.com/attachments/1178356521470537778/1184662567176646657/gradient-culture-logo-design-template_23-2149878688.png',lastActive:"Dün" },
    { id: 2, name: 'Tech Enthusiasts', image: 'https://cdn.discordapp.com/attachments/1178356521470537778/1184662595756630187/attachment_72912746.png',lastActive:"Bugün" },
    { id: 3, name: 'Fitness Fanatics', image: 'https://cdn.discordapp.com/attachments/1178356521470537778/1184662632712650883/teamwork-group-business-logo-vector-4153487.png',lastActive:"Yarın" },
  ];


  export default function Groups() {
    return (
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
            <h5 className="text-lg font-semibold mb-4 text-center hover:text-blue-600 transition-colors">GROUPS</h5>
            <div className="flex justify-center text-sm font-medium mb-4 space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Newest</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Active</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Popular</a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                {groups.map((group) => (
                    <div key={group.id} className="flex flex-col sm:flex-row items-center justify-between py-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors">
                        <a href="#" className="flex items-center space-x-3 mb-2 sm:mb-0">
                            <img className="h-8 w-8 rounded-full" src={group.image} alt={group.name} />
                            <div>
                                <span className="text-sm font-medium block">{group.name}</span>
                                <span className="text-xs text-gray-500 block">{group.lastActive}</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}