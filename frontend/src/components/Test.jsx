import { useEffect, useState } from 'react';
import { FaCheckDouble, FaSchool, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const chatSequence = [
  {
    type: 'user',
    text: 'Good afternoon, I wanted to check how the recent donation was utilized.',
  },
  {
    type: 'bot',
    text: 'Good afternoon! Thank you for reaching out. The donation helped us purchase 25 new chairs for the primary wing.',
  },
  {
    type: 'user',
    text: 'That’s great to hear! Were they distributed across classrooms?',
  },
  {
    type: 'bot',
    text: 'Yes, they were allocated to Class 1 and Class 2 where the need was highest.',
  },
  { type: 'user', text: 'Please let me know if any urgent needs arise again.' },
  {
    type: 'bot',
    text: 'We truly appreciate your support. We’re currently in need of science lab supplies as our next priority.',
  },
  {
    type: 'user',
    text: 'Understood. I’ll see what I can arrange by next week.',
  },
  {
    type: 'bot',
    text: 'Thank you once again. Your continued involvement is making a real impact!',
  },
];

export default function Test() {
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (index < chatSequence.length) {
      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, chatSequence[index]]);
        setNotification(
          chatSequence[index].type === 'bot' ? 'New message from School' : null
        );
        setIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col font-sans">
      <header className="backdrop-blur-lg bg-blue-700/80 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold tracking-wide">
          Parho Pakistan · Messaging Console
        </h1>
        <div className="relative">
          <FaBell className="text-white text-xl animate-pulse" />
          {notification && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 shadow-md"
            >
              {notification}
            </motion.span>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto bg-[#1e293b] border border-blue-800 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="px-6 py-4 border-b border-blue-900 text-blue-400 font-semibold flex items-center gap-2">
            <FaSchool className="text-blue-300" /> Donor-School Quantum Channel
          </div>
          <div className="h-96 overflow-y-auto p-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`mb-4 flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`relative max-w-xs px-4 py-3 rounded-xl text-sm ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/30 shadow-md'
                      : 'bg-slate-600 text-slate-100 rounded-tl-none shadow-md shadow-blue-900/20'
                  }`}
                >
                  {msg.text}
                  {msg.type === 'user' && (
                    <span className="absolute -bottom-5 right-2 text-xs text-blue-300 flex items-center gap-1">
                      <FaCheckDouble className="text-blue-300" /> Seen
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-blue-900 flex gap-2">
            <input
              type="text"
              placeholder="Encrypted message..."
              className="flex-grow px-4 py-2 bg-slate-800 text-slate-200 border border-blue-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
              disabled
            />
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full opacity-60 cursor-not-allowed shadow">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
