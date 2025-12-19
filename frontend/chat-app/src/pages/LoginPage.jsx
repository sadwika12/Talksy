import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MailIcon, MessageCircleIcon, UserIcon,LockIcon, LoaderIcon } from 'lucide-react';
import {Link} from "react-router-dom";
function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { login, isLoggingUp } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl flex justify-center">
        <div className="md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md bg-slate-800/70 border border-slate-700 rounded-lg p-8">

            <div className="text-center mb-8">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Login</h2>
              <p className="text-slate-400">Login in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="auth-input-label">Email</label>
                <div className="relative">
                  <MailIcon className="auth-input-icon"/>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData,email: e.target.value})}
                    className="input"
                    placeholder="Enter your Email"
                  />
                </div>
              </div>
              <div>
                <label className="auth-input-label">Password</label>
                <div className="relative">
                  <LockIcon className="auth-input-icon"/>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData, password: e.target.value})}
                    className="input"
                    placeholder="Enter your Password"
                  />
                </div>
              </div>

              <button className="auth-btn" type="submit" disabled={isLoggingUp}>
                {isLoggingUp ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center"/>):
                  ("Login"
                )}
              </button>

            </form>
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">Don't have an account? SignUp</Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
