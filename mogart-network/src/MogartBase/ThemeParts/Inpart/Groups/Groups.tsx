import React, { useState } from 'react';
import './Groups.css';

const GroupDetailsPopup = ({ group, onClose }) => {
  return (
    <div className="group-details-popup">
      <div className="group-details-content">
        <h3>{group.name} Details</h3>
        <p>Here you can put more information about the group, such as its description or upcoming events.</p>
        <div className="button-container">
          <button className="join-btn" onClick={() => alert('Joined to ' + group.name)}>Join Group</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const createGroup = () => {
  console.log('Create Group button clicked');
};

const Groups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
  ];

  const handleGroupClick = group => {
    setSelectedGroup(group);
  };

  const closePopup = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="main-groups">
       <div className="group-header">
      <button onClick={createGroup}>Create Group</button>
      <h3>Groups</h3>
      </div>
      <ul>
        {groups.map(group => (
          <li key={group.id} onClick={() => handleGroupClick(group)}>{group.name}</li>
        ))}
      </ul>

      {selectedGroup && <GroupDetailsPopup group={selectedGroup} onClose={closePopup} />}
    </div>
  );
}

export default Groups;
