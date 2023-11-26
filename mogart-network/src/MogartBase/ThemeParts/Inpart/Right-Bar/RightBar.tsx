import React,{ useEffect, useState }  from 'react';
import './RightBar.css';

const mostPopulars = [
  { title: 'Post 1', views: 1500 },
  { title: 'Post 2', views: 1200 },
  { title: 'Post 3', views: 900 },
];

const activeMembers = [
  { name: 'Alice', imageUrl: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328437035892787/Profile-3.png' },
  { name: 'Bob',  imageUrl: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png' },
];

const groups = [
  { name: 'React Developers',creationTime:'', memberCount: 1,imageUrl:'https://cdn.discordapp.com/attachments/1178356521470537778/1178356559596757083/Groups-1.png'  },
  { name: 'UI/UX Designers',creationTime:'', memberCount: 1 ,imageUrl:'https://cdn.discordapp.com/attachments/1178356521470537778/1178356560024571975/Groups-2.png' },
  { name: 'Full Stack Engineers',creationTime:'', memberCount: 1 ,imageUrl:'https://cdn.discordapp.com/attachments/1178356521470537778/1178356560418852884/Groups-3.png' },
];


const filteredGroups = groups.filter(group => {
  return group;
});

const RightBar: React.FC = () => {

  const [activeTab, setActiveTab] = useState('Newest');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
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
            <li key={index}>
              <img src={member.imageUrl} alt={member.name} />
            </li>
          ))}
        </ul>
      </section>
      
      <section className="groups">
        <div className="group-tab">
          <span 
            className={activeTab === 'Newest' ? 'active' : ''} 
            onClick={() => handleTabClick('Newest')}
          >
            Newest
          </span>
          <span 
            className={activeTab === 'Active' ? 'active' : ''} 
            onClick={() => handleTabClick('Active')}
          >
            Active
          </span>
          <span 
            className={activeTab === 'Popular' ? 'active' : ''} 
            onClick={() => handleTabClick('Popular')}
          >
            Popular
          </span>
        </div>
        <ul>
          {filteredGroups.map((group, index) => (
            <li key={index}>
              <img src={group.imageUrl} alt={group.name} className="group-image" />
              <div>
                <span className="group-name">{group.name}</span>
                <span className="creation-time">{group.creationTime}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RightBar;
