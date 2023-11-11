import React from 'react';
import './BlogPage.css';

const blogs = [
  { title: 'What Is An Online Community? The Basics & Benefits', author: 'Mogart Admin', category: 'Communities', excerpt: 'There’s a huge range in how an online community can scale...', image: 'https://cdn.discordapp.com/attachments/1172709139894521976/1172709174782726164/post-images-07.jpg' },
  { title: 'Figma Power Tips For Template Developers', author: 'Mogart Admin', category: 'Communities', excerpt: 'There’s a huge range in how an online community can scale...', image: 'https://cdn.discordapp.com/attachments/1172709139894521976/1172712038158577744/post-images-06.jpg' },
 { title: 'Learn The Secrets Of Online Community Management', author: 'Mogart Admin', category: 'Communities', excerpt: 'There’s a huge range in how an online community can scale...', image: 'https://cdn.discordapp.com/attachments/1172709139894521976/1172712290949288050/post-images-05.jpg' },
 { title: 'The importance of motivation in open source communities', author: 'Mogart Admin', category: 'Communities', excerpt: 'There’s a huge range in how an online community can scale...', image: 'https://cdn.discordapp.com/attachments/1172709139894521976/1172712588187009025/post-images-04.jpg' },

];

const BlogPage: React.FC = () => {
  return (
    <div className="blog-container">
      <div className="side-container">
        {blogs.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-info">
                <span className="blog-author">{blog.author}</span>
                <span className="blog-category">{blog.category}</span>
              </p>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <a href="/blog/{blog.title}" className="blog-read-more">READ MORE →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
