import React from 'react';
import './Groups.css';

const Groups: React.FC = () => {
  return (
    <div className="groups">
      <h3>Groups</h3>
      <ul>
        <li>Group 1</li>
        <li>Group 2</li>
        <li>Group 3</li>
        {}
      </ul>
    </div>
  );
}

export default Groups;
