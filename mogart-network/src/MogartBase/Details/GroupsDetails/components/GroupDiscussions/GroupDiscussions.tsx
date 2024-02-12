import React from 'react';
import { GroupDiscussion } from '../../GroupDetail';

interface GroupDiscussionsProps {
  discussions: GroupDiscussion[];
}

const GroupDiscussions: React.FC<GroupDiscussionsProps> = ({ discussions }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Discussions ({discussions.length})</h3>
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <article key={discussion.id} className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-800">{discussion.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GroupDiscussions;
