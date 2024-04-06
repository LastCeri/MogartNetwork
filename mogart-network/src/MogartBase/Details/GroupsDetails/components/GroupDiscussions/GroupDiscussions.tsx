import React from 'react';
import { GroupDiscussion } from '../../GroupDetail';

interface GroupDiscussionsProps {
  discussions: GroupDiscussion[];
}

const GroupDiscussions: React.FC<GroupDiscussionsProps> = ({ discussions }) => {
  const validDiscussions = discussions.filter(discussion => discussion.DiscussionsTitle && discussion.DiscussionsAuthor);


  return (
    <div className="max-w-6xl mx-auto p-5">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Discussions ({validDiscussions.length})</h3>
      {validDiscussions.length > 0 ? (

      <div className="space-y-5">
          {discussions && discussions.map((discussion) => (
          <article key={discussion.id} className="bg-white rounded-lg shadow-lg p-6 flex">
              <div className="flex-shrink-0">
                  {discussion.DiscussionsAuthorImage && (
                  <img src={discussion.DiscussionsAuthorImage} alt={discussion.DiscussionsAuthor} className="h-20 w-20 rounded-full object-cover mr-4" />
                  )}
                  <p className="text-sm text-gray-500 mt-1 text-center mr-4">{discussion.DiscussionsAuthor}</p>
              </div>
              <div className="flex-grow">
                  <div className="flex justify-between">
                      <h1 className="text-xl font-semibold text-gray-800">{discussion.DiscussionsTitle}</h1>
                      <div className="text-right">
                          <p className={`text-sm ${discussion.DiscussionsStatus==='OPEN' ? 'text-green-500' : 'text-red-500' }`}>
                              {discussion.DiscussionsStatus}
                          </p>
                          <p className="text-sm text-gray-500">{discussion.DiscussionsDate}</p>
                      </div>
                  </div>
              </div>
          </article>
          ))}
      </div> ) : (
      <div className="text-center py-4">
          <span className="text-sm text-gray-500">No Group Discussions found.</span>
      </div>
      )}
  </div>
  );
};

export default GroupDiscussions;
