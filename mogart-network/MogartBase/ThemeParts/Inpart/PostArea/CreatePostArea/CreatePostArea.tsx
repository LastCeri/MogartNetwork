import React from 'react';
import './CreatePostArea.css';

const CreatePostArea: React.FC = () => {
  return (
    <div className="create-post-area">
      <textarea placeholder="What's on your mind?"></textarea>
      <button className="submit-post">Share</button>
    </div>
  );
}

export default CreatePostArea;
