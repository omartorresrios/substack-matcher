import React, { useState, useEffect } from 'react';

const Chat = ({ connectionId, onClose }) => {
    console.log('Chat component rendered with connectionId:', connectionId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock initial messages (replace with actual data fetching)
  useEffect(() => {
    const initialMessages = [
      { id: 1, sender: 'other', text: 'Hi there! Interesting post you shared.' },
      { id: 2, sender: 'me', text: 'Thanks for reaching out!' }
    ];
    setMessages(initialMessages);
  }, [connectionId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageToSend = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage
    };

    setMessages([...messages, messageToSend]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Chat</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        
        <div className="h-64 overflow-y-auto mb-4 border-b pb-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-2 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`p-2 rounded-lg max-w-[70%] ${
                  message.sender === 'me' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;