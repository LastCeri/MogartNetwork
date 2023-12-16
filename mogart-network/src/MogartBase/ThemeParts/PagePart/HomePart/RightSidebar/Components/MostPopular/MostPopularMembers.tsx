import React from 'react';

const members = [
    { id: 1, name: 'Emily Davis', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1184662140309745726/round_profil_picture_before_.png?ex=658cc998&is=657a5498&hm=34ee76a60278833c45f686263396eb4a5a4f10fba196c9e6116a7046662e4972&', popularity: 5 },
    { id: 2, name: 'Robert Wilson', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1184662206403588126/images.png?ex=658cc9a7&is=657a54a7&hm=c170156fccb557eb059ca550af9e0bbe84d3f6f24f933dc55115d484ac90e5f3&', popularity: 3 },
    { id: 3, name: 'Sophia Brown', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1184662158265569380/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsX29mZmljZV8zNV9oYXBweV9ibGFja193b21hbl9zbWlsZXNfYXRfY2FtZXJhX2lzb2xhdGVkX182Nzc5ZmU0OC1lMmJiLTQxMmYtOGE3OC1jNzQ2ZmFmNjQxM2VfMS5qcGc.png?ex=658cc99c&is=657a549c&hm=5d781563305eca900e7a88617a56d28912f382b2f6a696373b7fe3595f7e1a8d&', popularity: 4 },
  ];

const mostPopularMembers = members.slice().sort((a, b) => b.popularity - a.popularity);


export default function MostPopularMember() {
    return (
        <>
            <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold mb-4">Most Popular Members</h5>
                <div className="bg-white p-4 rounded-lg">
                    {/* Most Popular Members List */}
                    {mostPopularMembers.map((member) => (
                        <div key={member.id} className="py-2 hover:bg-gray-300 rounded-md transition duration-200">
                            <a href="#" className="flex items-center space-x-3">
                                <img className="h-6 w-6 rounded-full" src={member.avatar} alt={member.name} />
                                <span className="text-sm font-medium">{member.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


