import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignPage.css';
import Notification, { MessageType } from '../../MogartBase/ThemeParts/Notification/Notification';
import { Request, useCsrfToken } from '../../MogartBase/Api/Api';
import { requestAccounts } from '../../MogartBase/WalletProc/Wallet';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { csrfToken, fetchCsrfToken } = useCsrfToken();
    const [notification, setNotification] = useState({ type: null, message: "", show: false });

    useEffect(() => {
        fetchCsrfToken();
    }, []);

    const FormRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const registerData = {
            username: formData.get('username'),
            email: formData.get('email'),
            birdate: formData.get('birdate'),
            passwd: formData.get('passwd'),
            confirmpasswd: formData.get('confirmpasswd'),
        };

        try {
            const response = await Request('Register', { RegisterRequest: registerData }, csrfToken);
            handleResponse(response);
        } catch (error) {
            console.error('Error in FormRegister:', error);
            setNotification({ type: MessageType.Error, message: "There was an error during registration.", show: true });
        }
    };

    const WalletRegister = async () => {
        try {
            const accounts = await requestAccounts();
            const response = await Request('WalletRegister', {RegisterRequest: {
                walletAddress: accounts[0],
            } }, csrfToken);
            handleResponse(response);
        } catch (error) {
            console.error('Error in WalletRegister:', error);
            setNotification({ type: MessageType.Error, message: "There was an error during wallet registration.", show: true });
        }
    };

    const handleResponse = (response) => {
        if (response.status === "Ok") {
            setNotification({ type: MessageType.Success, message: response.message, show: true });
            navigate('/login');
        } else {
            setNotification({ type: MessageType.Error, message: response.message, show: true });
        }
    };


  return (
    <div className="register-container">
      <div className="form-section">
        <h2>Register</h2>
        <form onSubmit={FormRegister}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="date" name="birdate" placeholder="BirthDate" required />
                    <input type="password" name="passwd" placeholder="Password" required />
                    <input type="password" name="confirmpasswd" placeholder="Confirm Password" required />
                    <button className="register-button" type="submit">Register</button>
                </form>
                <button className="goto-button"  onClick={() => navigate('/login')}>Go To Login</button>
                <span className="register-or">Or</span>
            <div className="buttons-container">
            <button className="register-connect-wallet-button" onClick={WalletRegister}>Register Wallet</button>
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
