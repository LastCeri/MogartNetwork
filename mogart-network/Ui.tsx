import React, { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    navbar: {
        backgroundColor: '#1DA1F2',
        padding: '10px 20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    logo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    PostsContainer: {
        backgroundColor: '#F7F9FA',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    PostsHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    PostsContent: {
        marginTop: '10px',
    },
};

type PostsProps = {
    username: string;
    content: string;
};

const Posts: React.FC<PostsProps> = ({ username, content }) => (
    <div style={styles.PostsContainer}>
        <div style={styles.PostsHeader}>
            <img src="https://via.placeholder.com/50" alt="avatar" style={styles.avatar} />
            <strong>{username}</strong>
        </div>
        <div style={styles.PostsContent}>{content}</div>
    </div>
);

const MogartUI: React.FC = () => (
    <div style={styles.container}>
        <nav style={styles.navbar}>
            <span style={styles.logo}>MogartNetwork</span>
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
        </nav>
        <Posts username="user1" content="Hello this is a Posts!" />
        <Posts username="user2" content="Hello MogartNetwork" />
    </div>
);

export default MogartUI;
