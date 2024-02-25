import React from 'react';

interface IncomingCallModalProps {
  isOpen: boolean;
  callerName: string;
  onAccept: () => void;
  onDecline: () => void; 
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({ isOpen, callerName, onAccept, onDecline }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                <h3 className="text-lg font-semibold">Incoming Call</h3>
                <p className="text-gray-800">{callerName} is calling you.</p>
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                        onClick={onAccept}>
                        Accept
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                        onClick={onDecline}>
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCallModal;
