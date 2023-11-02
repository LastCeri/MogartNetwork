import React, { useState } from 'react';
import './CreatePostArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faImage, faHighlighter, faFaceSmile, faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';

const CreatePostArea: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="create-post-area-wrapper">
      {!isMenuOpen && (
        <button onClick={toggleMenu} className="menu-toggle-btn">
          <FontAwesomeIcon icon={faEye} />
        </button>
      )}

      <div className={`create-post-area ${isMenuOpen ? 'expand' : 'collapse'}`}>
        <ul className="shortcut-menu">
          <li><FontAwesomeIcon icon={faLink} /></li>
          <li><FontAwesomeIcon icon={faImage} /></li>
          <li><FontAwesomeIcon icon={faHighlighter} /></li>
          <li><FontAwesomeIcon icon={faFaceSmile} /></li>
          <li onClick={toggleMenu}><FontAwesomeIcon icon={faEyeSlash} /></li>
        </ul>
        <textarea placeholder="What's on your mind?"></textarea>
        <button className="submit-post">Share</button>
      </div>
    </div>
  );
}

export default CreatePostArea;
