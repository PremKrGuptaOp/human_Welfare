import React, { useEffect, useRef } from 'react';
import { User, Bot, Image as ImageIcon, Mic } from 'lucide-react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <Bot size={48} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
          <p className="text-sm">Start a conversation by typing a message, recording audio, or uploading an image.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${message.sender === 'user' ? 'bg-blue-600' : 'bg-green-600'}
          `}>
            {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
          </div>

          {/* Message Content */}
          <div className={`
            max-w-[70%] rounded-2xl px-4 py-3 
            ${message.sender === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-100'
            }
          `}>
            {/* Message Type Indicator */}
            {message.type !== 'text' && (
              <div className="flex items-center gap-2 mb-2 text-sm opacity-75">
                {message.type === 'voice' && <Mic size={14} />}
                {message.type === 'image' && <ImageIcon size={14} />}
                <span className="capitalize">{message.type} message</span>
              </div>
            )}

            {/* File Preview */}
            {message.file && message.type === 'image' && (
              <div className="mb-3">
                <img 
                  src={message.file} 
                  alt="Uploaded content" 
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {/* Timestamp */}
            <div className={`
              text-xs mt-2 opacity-60
              ${message.sender === 'user' ? 'text-right' : 'text-left'}
            `}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;