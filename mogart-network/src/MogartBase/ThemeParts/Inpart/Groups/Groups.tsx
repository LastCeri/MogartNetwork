import React, { useState } from 'react';
import './Groups.css';

const GroupDetailsPopup = ({ group, onClose }) => {
  return (
    <div className="group-details-popup">
      <div className="group-details-content">
        <h3 className="group-title">{group.name} Details</h3>
        <p className="group-description">Here you can put more information about the group, such as its description or upcoming events.</p>
        <div className="button-container">
          <button className="join-btn" onClick={() => alert('Joined to ' + group.name)}>Join Group</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Groups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groups = [
    { id: 1, name: 'React Developers - 1 member' },
    { id: 2, name: 'UI/UX Designers - 1 member' },
    { id: 3, name: 'Full Stack Engineers - 1 member' },
  ];

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const closePopup = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="groups-container">
      <div className="group-header">
        <h2>Groups</h2>
        <button className="create-group-btn">Create Group</button>
      </div>
      <ul className="group-list">
        {groups.map(group => (
          <li key={group.id} onClick={() => handleGroupClick(group)} className="group-item">{group.name}</li>
        ))}
      </ul>

      {selectedGroup && <GroupDetailsPopup group={selectedGroup} onClose={closePopup} />}
    </div>
  );
}

export default Groups;
