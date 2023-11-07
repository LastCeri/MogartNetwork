import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignPage.css'; 
import { requestAccounts } from '../../MogartBase/WalletProc/Wallet';
import Notification, { MessageType } from '../../MogartBase/ThemeParts/Notification/Notification';
import { Request } from '../../MogartBase/Api/Api';


const RegisterPage = () => {
    const navigate = useNavigate();
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

    const registerwallet = async () => {
        if (window.mina) {
            try {
                const accounts = await requestAccounts();
                const response = await Request("Register", {
                    RegisterRequest: {
                        walletAddress: accounts[0],
                    }
                });    
                if(response && response.status === "ok")
                {
                    setNotification({ type: MessageType.Success, message: response.message, show: true });
                    navigate('/login'); 
                }
                else{
                    setNotification({ type: MessageType.Error, message: response.message, show: true });
                }
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
            <button className="goto-button" type="submit">Go To Login</button>
            <span className="register-or">Or</span>
        </form>
        <div className="buttons-container">
                <button className="register-connect-wallet-button" onClick={registerwallet}>Register Wallet</button>
                <button className="register-info-button">Info</button>
             </div>
      </div>
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}/Images/BackgroundImages/MogartNetworkLoginBackground.png`} alt="Register" />
      </div>
      {notification.show && (
                <Notification type={notification.type} message={notification.message} />
            )}
    </div>
  );
};

export default RegisterPage;
