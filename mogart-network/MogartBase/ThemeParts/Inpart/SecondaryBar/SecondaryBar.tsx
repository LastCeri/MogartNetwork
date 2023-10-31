import React from 'react';
import './SecondaryBar.css';

const SecondaryBar: React.FC = () => {
  return (
    <div className="secondary-bar">
      <div className="icon-menu">
        <i className="fa fa-home" aria-hidden="true"> A </i>
        <i className="fa fa-comment" aria-hidden="true"> B</i>
        <i className="fa fa-users" aria-hidden="true"> C</i>
        <i className="fa fa-cogs" aria-hidden="true">D</i>
      </div>
    </div>
  );
}

export default SecondaryBar;
