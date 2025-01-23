import  { useState } from 'react';
import OpenAI from 'openai';





const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I contribute to the school?', sender: 'donor' },
    {
      text: 'Welcome to Parho Pakistan! Ask me anything about our programs, donation opportunities, and educational resources.',
      sender: 'assistant',
    },
  ]);

  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'donor' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant for Parho Pakistan, helping users with information about educational programs, scholarships, and donation opportunities.',
          },
          ...newMessages.map((msg) => ({
            role: msg.sender === 'donor' ? 'user' : 'assistant',
            content: msg.text,
          })),
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;

      setMessages([...newMessages, { text: aiResponse, sender: 'assistant' }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages([
        ...newMessages,
        {
          text: 'Sorry, something went wrong. Please try again.',
          sender: 'assistant',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-5 right-5 w-96 shadow-lg">
          <div className="flex flex-col flex-grow w-full bg-white rounded-lg overflow-hidden border border-gray-400">
            <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
              <span className="text-lg font-semibold">
                Parho Pakistan Assistant
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
              {loading && <p className="text-gray-500 text-sm">Thinking...</p>}
            </div>
            <div className="bg-gray-300 p-4 flex">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="ml-2 px-4 bg-green-600 text-white rounded"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
