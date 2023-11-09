import React, { useState, useEffect } from 'react';
import './LoginPage.css'; 
import { requestAccounts } from '../../MogartBase/WalletProc/Wallet';
import Notification, { MessageType } from '../../MogartBase/ThemeParts/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { Request, useCsrfToken } from '../../MogartBase/Api/Api';


const SignInPage = () => {
    const navigate = useNavigate();
    const { csrfToken, fetchCsrfToken } = useCsrfToken();
    const [notification, setNotification] = useState({ type: null, message: "", show: false });
    useEffect(() => {
        fetchCsrfToken();
    }, []);
    useEffect(() => {
        let timeoutId;
        if (notification.show) {
            timeoutId = setTimeout(() => {
                setNotification({ ...notification, show: false });
            }, 5000); 
        }

        return () => clearTimeout(timeoutId);
    }, [notification.show]);

    const LoginWallet = async () => {
        if (!window.mina) {
            setNotification({ type: MessageType.Error, message: "Please install the Mina wallet extension.", show: true });
            return;
        }
        
        try {
            const accounts = await requestAccounts();
            const response = await Request('LoginWallet', { walletAddress: accounts[0] }, csrfToken);
            handleResponse(response);
        } catch (error) {
            console.error('Error in LoginWallet:', error);
            setNotification({ type: MessageType.Error, message: "There was an error during wallet login.", show: true });
        }
    };
    
    const handleResponse = (response) => {
        if (response.status === "Ok") {
            setNotification({ type: MessageType.Success, message: response.message, show: true });
            navigate('/'); // Navigate to home page or dashboard as appropriate
        } else {
            setNotification({ type: MessageType.Error, message: response.message, show: true });
        }
    };

  return (
    <div className="signin-container">
      <div className="form-section">
        <h2>Log In</h2>
        <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="sign-button" type="submit">LogIn</button>
            <span className="signin-or">Or</span>
            <button type="button" onClick={LoginWallet} className="sign-connect-wallet-button">Connect Wallet</button>
        </form>
      </div>
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}/Images/BackgroundImages/MogartNetworkLoginBackground.png`} alt="LogIn" />
      </div>
      {notification.show && (
                <Notification type={notification.type} message={notification.message} />
            )}
    </div>
  );
};

export default SignInPage;
