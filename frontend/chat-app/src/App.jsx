import { Routes, Route,Navigate } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import React from "react";
import {useAuthStore} from "./store/useAuthStore.js";
import PageLoader from "./components/PageLoader.jsx";
function App() {
  const {checkAuth,isCheckingAuth,authUser}=useAuthStore();
  React.useEffect(()=>{
    checkAuth();
  },[]);
  console.log({authUser})
  if(isCheckingAuth) return <PageLoader />;
  return (
    <div className="relative h-screen w-full overflow-hidden">

      
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d3a] via-[#0f2a5f] to-[#163b8a]" />

      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)]" />

     
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-blue-400/30 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] bg-indigo-500/25 rounded-full blur-[160px]" />
      
      
      <div className="relative z-10 min-h-screen">
        
      
        <Routes>
          <Route path="/" element={authUser ? <ChatPage/> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to={"/"}/>} />
          <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to={"/"} />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
