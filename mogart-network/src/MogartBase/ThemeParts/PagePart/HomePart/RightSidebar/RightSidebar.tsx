import React from 'react';
import Groups from './Components/Groups/Groups.tsx';
import MostPMember from './Components/MostPopular/MostPopularMembers.tsx';
import ActiveFriends from './Components/PopularTags/PopularTags.tsx';

export default function RightSidebar() {


  return (
    <aside className="w-1/4 h-full bg-white p-4 rounded-lg shadow-lg top-16 right-0 overflow-y-auto">

       {/* Most Popular Members */}
      <MostPMember />

      {/* Active Friends */}
      <ActiveFriends />
      
      {/* Groups */}
      <Groups />
    </aside>
  );
}
