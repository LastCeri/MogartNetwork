import React, { useState, useEffect } from 'react';
import './SignInPage.css'; 
import { requestAccounts } from '../../MogartBase/WalletProc/Wallet';
import Notification, { MessageType } from '../../MogartBase/ThemeParts/Notification/Notification';


const SignInPage = () => {

    const [notification, setNotification] = useState({ type: null, message: "", show: false });
    
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
        if (window.mina) {
            try {
                const accounts = await requestAccounts();
                const account = accounts[0];
                setNotification({ type: MessageType.Success, message: `Connected via Wallet Connect`, show: true });
            } catch (error) {
                setNotification({ type: MessageType.Error, message: "There was an error connecting to the wallet", show: true });
            }
        } else {
            setNotification({ type: MessageType.Error, message: "Please install the Mina wallet extension.", show: true });
        }
    };

  return (
    <div className="signin-container">
      <div className="form-section">
        <h2>Sign In</h2>
        <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="sign-button" type="submit">Sign In</button>
            <span className="signin-or">Or</span>
            <button type="button" onClick={LoginWallet} className="sign-connect-wallet-button">Connect Wallet</button>
        </form>
      </div>
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}/Images/BackgroundImages/MogartNetworkLoginBackground.png`} alt="Sign In" />
      </div>
      {notification.show && (
                <Notification type={notification.type} message={notification.message} />
            )}
    </div>
  );
};

export default SignInPage;
