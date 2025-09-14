import React from 'react';
import { Menu } from 'lucide-react';
import MessageList from './MessageList';
import InputArea from './InputArea';

const ChatInterface = ({ 
  conversation, 
  onUpdateConversation, 
  onToggleSidebar,
  isSidebarOpen 
}) => {
  const handleSendMessage = async (content, type = 'text', file = null) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      content,
      type,
      file,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...conversation.messages, userMessage];
    
    // Update conversation title if it's the first message
    const updates = {
      messages: updatedMessages,
      title: conversation.messages.length === 0 ? content.slice(0, 50) + '...' : conversation.title
    };
    
    onUpdateConversation(conversation.id, updates);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: generateAIResponse(content, type),
        type: 'text',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      onUpdateConversation(conversation.id, {
        messages: [...updatedMessages, aiMessage]
      });
    }, 1000);
  };

  const generateAIResponse = (userContent, type) => {
    // This is where you'd integrate with your Gemini 2.5 backend
    const responses = {
      text: [
        "I understand your question. Let me help you with that.",
        "That's an interesting point. Here's what I think...",
        "Thanks for sharing that. I can provide some insights on this topic.",
        "Great question! Let me break this down for you.",
      ],
      voice: [
        "I heard your voice message. Here's my response to what you said.",
        "Thanks for the voice input. Let me address your question.",
      ],
      image: [
        "I can see the image you've shared. Let me analyze what I observe.",
        "Thanks for sharing this image. Here's what I can tell you about it.",
      ]
    };

    const typeResponses = responses[type] || responses.text;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-700">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold truncate">{conversation.title}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={conversation.messages} />
      </div>

      {/* Input */}
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;