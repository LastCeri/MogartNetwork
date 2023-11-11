import React from 'react';
import './RightBar.css';

// Mock data for demonstration purposes
const mostPopulars = [
  { title: 'Post 1', views: 1500 },
  { title: 'Post 2', views: 1200 },
  { title: 'Post 3', views: 900 },
];

const activeMembers = [
  { name: 'Alice', activity: '1 hour ago' },
  { name: 'Bob', activity: '2 hours ago' },
  { name: 'Charlie', activity: '3 hours ago' },
];

const groups = [
  { name: 'React Developers', memberCount: 300 },
  { name: 'UI/UX Designers', memberCount: 250 },
  { name: 'Full Stack Engineers', memberCount: 400 },
];

const RightBar: React.FC = () => {
  return (
    <div className="right-bar">
      <section className="most-populars">
        <h2>Most Populars</h2>
        <ul>
          {mostPopulars.map((item, index) => (
            <li key={index}>{item.title} - {item.views} views</li>
          ))}
        </ul>
      </section>

      <section className="active-members">
        <h2>Recently Active Members</h2>
        <ul>
          {activeMembers.map((member, index) => (
            <li key={index}>{member.name} - {member.activity}</li>
          ))}
        </ul>
      </section>

      <section className="groups">
        <h2>Groups</h2>
        <div className="group-tab">
          <span className="active">Active</span>
        </div>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>{group.name} - {group.memberCount} members</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RightBar;
