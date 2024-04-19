import React, { useState,useRef,useEffect } from 'react';

interface StickyNotesModalProps {
    onClose: () => void;
    onSubmit: (note: string) => void;
    isOpen: boolean;
}

export const EmailVerificationModal: React.FC<StickyNotesModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [code, setCode] = useState(new Array(6).fill(""));

    const inputsRef = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
    
    useEffect(() => {
      inputsRef.current = Array(6).fill(null).map((_, i) => inputsRef.current[i] || React.createRef<HTMLInputElement>());
    }, []);
  
    const handleChange = (value: string, index: number) => {
      const newCode = [...code];
      newCode[index] = value[0];
      setCode(newCode);
      if (index < 5 && value) {
        inputsRef.current[index + 1].current?.focus();
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputsRef.current[index - 1].current?.focus();
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(code.join(""));
    };

 if (!isOpen) return null;

 return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-sm rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Verify Your Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={inputsRef.current[idx]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className="w-12 h-12 border-2 border-gray-200 text-center text-lg rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                autoComplete="off"
                style={{ fontSize: '1.25rem' }}
              />
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};