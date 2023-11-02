import React from 'react';
import './RightBar.css';

const RightBar: React.FC = () => {
  return (
    <div className="right-bar">
      <section className="most-populars">
        <h2>MP</h2>
        {}
      </section>
      <section className="active-members">
        <h2>RECENTLY ACTIVE MEMBERS</h2>
        {}
      </section>
      <section className="groups">
        <h2>GROUPS</h2>
        <div className="group-tab">
          <span className="active">Active</span>
          <span>Newest</span>
          <span>Popular</span>
        </div>
        {}
      </section>
    </div>
  );
}

export default RightBar;
