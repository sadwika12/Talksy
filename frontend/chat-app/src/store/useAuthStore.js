import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {io} from "socket.io-client";
const BASE_URL=import.meta.env.MODE === "development" ? "http://localhost:5000" :"/";
export const useAuthStore = create((set,get) => ({
  authUser:null,
  isCheckingAuth:true,
  isSigningUp:false,
  isLoggingUp:false,
  isUpdating:false,
  socket:null,
  onlineUsers:[],
  checkAuth : async()=>{
    try{
      const res=await axiosInstance.get("/auth/check");
      set({authUser:res.data});
      get().connectSocket();
    }
    catch(error){
      console.log("Error checking auth:",error);
      set({authUser:null});
    }finally{
      set({isCheckingAuth:false});
    }
  },
  signup:async(data)=>{
    set({isSigningUp:true});
    try{
      const res=await axiosInstance.post("/auth/register",data);
      set({authUser:res.data});
      alert("user registered successfully");
      get().connectSocket();
    }
    catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
    finally{
      set({isSigningUp:false});
    }
  },
  login:async(data)=>{
    set({isLoggingUp:true});
    try{
      const res=await axiosInstance.post("/auth/login",data);
      set({authUser:res.data});
      alert("user login successfully");
      get().connectSocket();
    }
    catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
    finally{
      set({isLoggingUp:false});
    }
  },
  logout:async()=>{
    try{
      await axiosInstance.post("/auth/logout");
      set({authUser:null});
      alert("Logged out sucessfully");
      get().disconnectSocket();
    }
    catch(error){
     alert(error.response?.data?.message || "Signup failed");
    }
  },
  updateProfile:async(data)=>{
    set({isUpdating:true});
    try{
      const res=await axiosInstance.put("/auth/update-profile",data);
      set({authUser:res.data.user});
      alert("profile updated sucessfully");
    }
    catch (error) {
      alert(error.response?.data?.message);
    }
    finally{
      set({isUpdating:false});
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, 
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
