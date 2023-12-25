import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';

import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const MessagePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useData();
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login');
      }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Header />
            <Navbar />
            <div className="flex flex-col h-screen"> 
                <div className="flex-grow">
                    <div className="flex h-full"> 
                        <div className="w-1/3 border-r border-gray-300">
                            <div className="overflow-y-auto h-full"> 
                            </div>
                        </div>
                        <div className="w-2/3">
                            <div className="flex flex-col h-full"> 

                                <div className="flex-1 overflow-y-auto p-4">
                                </div>
                                <div className="border-t border-gray-300 p-4 flex items-center">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-full border-gray-300 p-2 mr-2"
                                        placeholder="Type a message..."
                                    />
                                    <button className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagePage;
