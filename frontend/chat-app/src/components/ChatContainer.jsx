
import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader.jsx';
import NoChatHistory from './NoChatHistory.jsx';
import MessageInput from './MessageInput.jsx';
import MessagesLoader from './MessagesLoader.jsx';

function ChatContainer() {
  const { selectedUser, messages, isMessagesLoading, getMessagesByUserId,incomingMessages,offMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(()=>{
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      incomingMessages()
    }
   
    return ()=> offMessages()
  },[selectedUser,getMessagesByUserId,incomingMessages,offMessages]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`
                      chat-bubble relative
                      ${isMe ? "bg-cyan-600 text-white rounded-2xl rounded-br-md" 
                             : "bg-slate-800 text-slate-200 rounded-2xl rounded-bl-md"}
                      ${msg.image && !msg.text ? "p-1" : "p-3"}
                    `}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}

                    {msg.text && (
                      <p className={msg.image ? "mt-2" : ""}>
                        {msg.text}
                      </p>
                    )}
                  </div>

                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoader />
        ) : (
          <NoChatHistory name={selectedUser.Name} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
