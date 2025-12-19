import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import {useAuthStore} from "./useAuthStore.js";
export const useChatStore=create((set,get)=>({
  allContacts:[],
  chats:[],
  messages:[],
  activeTab:"chats",
  selectedUser:null,
  isUsersLoading:false,
  isMessagesLoading:false,
  isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled"))===true,

  toggleSound:()=>{
    localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
    set({isSoundEnabled:!get().isSoundEnabled})
  },
  
  setActiveTab :(tab)=>set({activeTab:tab}),
  setSelectedUser:(selectedUser)=>set({selectedUser:selectedUser}),

  getAllContacts:async()=>{
    set({isUsersLoading:true});
    try{
      const res=await axiosInstance.get("/message/contacts");
      set({allContacts:res.data});

    }
    catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
    finally{
      set({isUsersLoading:false});
    }
  },
  getMyChats:async()=>{
      set({isChatsLoading:true});
      try{
        const res=await axiosInstance.get("/message/chats");
        set({chats:res.data});
      }
      catch (error) {
        alert(error.response?.data?.message);
        console.log(error)
      }
      finally{
        set({isUsersLoading:false});
      }
  },
  getMessagesByUserId:async(userId)=>{
    set({isMessagesLoading:true});
    try{
      const res=await axiosInstance(`/message/${userId}`);
      console.log(res.data);
      set({messages:res.data});
      
    }
     catch (error) {
      alert(error.response?.data?.message);
      console.log(error)
    }
    finally{
      set({isMessagesLoading:false});
    }
  },
  sendMessages:async(data)=>{
    const {selectedUser,messages}=get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: data.text,
      image: data.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, 
    };
    set({ messages: [...messages, optimisticMessage] });
    try{
      const res=await axiosInstance.post(`message/send/${selectedUser._id}`,data);
      set({messages:messages.concat(res.data)});
    }
    catch (error) {
      set({messages:messages})
      alert(error.response?.data?.message);
      console.log(error)
    }
  },
  incomingMessages: () => {
    const { selectedUser,isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      
      if (!isMessageFromSelectedUser) return;

      
      set({
        messages: [...get().messages, newMessage],
      });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        notificationSound.currentTime = 0; // reset to start
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  offMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  }

}));