import React from 'react';
import { GroupMember } from '../../GroupDetail'; 

interface GroupMembersProps {
  members: GroupMember[];
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ members }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Members ({members.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map((member) => ( 
          <div key={member.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-xl leading-5 font-medium text-gray-900">{member.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
