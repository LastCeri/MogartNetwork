import React, { useState, useEffect } from 'react';
import './Groups.css'; 
import PopUp from '../../MogartBase/ThemeParts/Inpart/PopupMenu/PopupMenu';
import Groupas from '../../MogartBase/ThemeParts/Inpart/Groups/Groups';
import RightBar from '../../MogartBase/ThemeParts/Inpart/Right-Bar/RightBar';

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}


const mockGroups: Group[] = [
  { id: 1, name: 'React Developers', description: 'React Group1!', memberCount: 1023 },
  { id: 2, name: 'TypeScript Developers', description: 'Welcome TypeScript world!', memberCount: 984 },
];

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    setGroups(mockGroups);
  }, []);

    return (
        <div className="Main-Container">
          <header className="Main-Header">
          <div className="header">
            <span className="social-score">Social Score</span>
            <span className="title">Mogart Network</span>
            <button className="menu-btn">...</button>
            </div>
          </header>
          <div className="Main-Content">
            <aside className="Main-Content-Left">
              <nav>
              <PopUp />
              </nav>
            </aside>
            <main className="Main-Content-Center">
                <Groupas />
            </main>
            <aside className="Main-Content-Right">
                <RightBar />
            </aside>
          </div>
        </div>
      );
};

export default Groups;
