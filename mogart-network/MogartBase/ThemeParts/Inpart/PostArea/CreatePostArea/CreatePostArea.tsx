import React from 'react';
import './CreatePostArea.css';

const CreatePostArea: React.FC = () => {
  return (
    <div className="create-post-area">
      <textarea placeholder="Write your post..."></textarea>
      <button className="submit-post">Submit</button>
    </div>
  );
}

export default CreatePostArea;
