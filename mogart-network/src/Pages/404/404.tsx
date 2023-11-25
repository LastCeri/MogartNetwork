import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const NotFound = () => {
    return (
        <div>
            <h1>404 Error Page Not Found </h1>

            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
            <Link to="/" className="more-link">Back to Home</Link>
            </div>
        </div>
    );
}

export default NotFound;
