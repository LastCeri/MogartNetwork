import React from 'react';

interface SendPopupProps {
    message: string;
    onClose: boolean;
  }

const SendPopup: React.FC<SendPopupProps> = ({ message}) => {
    return (
        <>
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-300 transform transition duration-300 ease-out scale-95 hover:scale-105 max-w-md mx-auto overflow-hidden animate-bounce">
                <div className="px-8 py-6 text-center">
                <div className="mb-4 p-2 rounded-full bg-green-100 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-lg text-gray-800 font-medium">{message}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SendPopup;