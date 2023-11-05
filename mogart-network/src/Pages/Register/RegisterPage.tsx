import React, { useState, useEffect } from 'react';
import './RegisterPage.css'; 
import { requestAccounts } from '../../MogartBase/WalletProc/Wallet';
import Notification, { MessageType } from '../../MogartBase/ThemeParts/Notification/Notification';


const RegisterPage = () => {

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
    <div className="register-container">
      <div className="form-section">
        <h2>Register</h2>
        <form>
            <input type="text" name="username"  placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="date" name="birdate" placeholder="BirdDate" required />
            <input type="password" name="passwd" placeholder="Password" required />
            <input type="password" name="confirmpasswd" placeholder="ConfirmPassword" required />
            <button className="register-button" type="submit">Register</button>
            <span className="register-or">Or</span>
            <div className="buttons-container">
                <button className="register-connect-wallet-button">Connect Wallet</button>
                <button className="register-info-button">Info</button>
             </div>
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

export default RegisterPage;
