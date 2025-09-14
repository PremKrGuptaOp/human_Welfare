import React from 'react';
import { 
  Menu, 
  Plus, 
  MessageSquare, 
  Trash2, 
  User, 
  LogOut, 
  LogIn,
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({
  isOpen,
  onToggle,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isAuthenticated,
  user,
  onLogin,
  onLogout
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full bg-gray-800 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-80 md:w-64 border-r border-gray-700 flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">ChatGPT Clone</h1>
            <button
              onClick={onToggle}
              className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <button
            onClick={onNewConversation}
            className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`
                  group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${activeConversationId === conversation.id 
                    ? 'bg-gray-700 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                  }
                `}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <MessageSquare size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(conversation.createdAt)}
                  </div>
                </div>
                {conversations.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 text-sm text-gray-300">
                <User size={16} />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition-colors text-sm">
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={onLogout}
                  className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;