import React from 'react';

interface InfoPopupProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Info
                    </h3>
                    <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9a1 1 0 112-0 1 1 0 01-2 0zm2 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfoPopup;
