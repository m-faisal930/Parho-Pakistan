import React, { useState } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I contribute to the school?', sender: 'donor' },
    {
      text: 'Thank you for your interest! We have various programs you can support.',
      sender: 'school',
    },
  ]);

  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'donor' }]);
      setInput('');
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-5 right-5 w-96 shadow-lg">
          <div className="flex flex-col flex-grow w-full bg-white rounded-lg overflow-hidden border border-gray-400">
            <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
              <span className="text-lg font-semibold">
                Green Valley High School
              </span>
              <button
                className="text-white text-xl leading-none focus:outline-none"
                onClick={() => setIsVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col flex-grow h-96 p-4 overflow-auto bg-gray-100">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full mt-3 max-w-xs ${
                    msg.sender === 'donor' ? 'ml-auto justify-end' : ''
                  }`}
                >
                  <div>
                    <div
                      className={`p-4 ${
                        msg.sender === 'donor'
                          ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg'
                          : 'bg-gray-300 rounded-r-lg rounded-bl-lg'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      Just now
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-300 p-4 flex">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Type your message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="ml-2 px-4 bg-green-600 text-white rounded"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
