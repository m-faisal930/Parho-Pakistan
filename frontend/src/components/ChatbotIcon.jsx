import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import AiAssistant from './AiAssistant';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-5 left-5 bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot size={28} />
      </div>

      {isOpen && (<AiAssistant />
      )}
    </>
  );
};

export default ChatbotIcon;
