import React from 'react'
import { useChatStore } from '../store/useChatStore';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import ChatsList from '../components/ChatsList.jsx';
import ContactList from '../components/ContactList.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import NoConversationContainer from '../components/NoConversationContainer.jsx';
function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full h-screen flex justify-center bg-slate-900 py-6">
      <div className="relative w-full max-w-6xl h-full flex bg-slate-900/50 backdrop-blur-sm border border-slate-700">
        <div className="w-80 flex flex-col bg-slate-800/90 border-r border-slate-700 text-slate-100">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-slate-900/90 text-slate-100">
          {selectedUser ? <ChatContainer /> : <NoConversationContainer />}
        </div>

      </div>
    </div>
  );
}

export default ChatPage;
