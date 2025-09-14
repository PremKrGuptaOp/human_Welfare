import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import AuthModal from './components/AuthModal';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([
    { id: 1, title: "New Chat", messages: [], createdAt: new Date().toISOString() }
  ]);
  const [activeConversationId, setActiveConversationId] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setConversations([
      { id: 1, title: "New Chat", messages: [], createdAt: new Date().toISOString() }
    ]);
    setActiveConversationId(1);
  };

  const createNewConversation = () => {
    const newId = Date.now();
    const newConversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString()
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newId);
  };

  const updateConversation = (id, updates) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, ...updates } : conv
    ));
  };

  const deleteConversation = (id) => {
    if (conversations.length === 1) return;
    
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations[0].id === id ? conversations[1].id : conversations[0].id);
    }
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || conversations[0];

  return (
    <div className="h-screen bg-gray-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        <ChatInterface
          conversation={activeConversation}
          onUpdateConversation={updateConversation}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;