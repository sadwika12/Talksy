# Talksy 💬  
A modern real-time chat application built with React, Node.js,Express.js, and Socket.IO.

---

## 🚀 About the Project
**Talksy** is a full-stack real-time chat application that enables users to communicate instantly with a clean and responsive user interface.  
It supports real-time messaging, authentication, and live user presence using WebSockets.

This project was built to understand real-time systems, full-stack development, and scalable communication between user and server.

---

## 🛠️ Tech Stack

### Frontend
- React
- DiasyUI
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT authentication
- bcrypt (password Hashing)
- NodeMailer (Email Services)
- Cloudinary (Image Storage)
- Arcjet (Security & Rate Limiting)
- MongoDB (for data storage)

### Other Tools
- Postman (for testing of routes)
- Git & GitHub

---

## ✨ Key Features
- 🔐 Secure authentication using **JWT & bcrypt**
- 💬 Real-time messaging with **Socket.IO**
- 🟢 Online / offline user presence
- 📷 Image uploads via **Cloudinary**
- 📩  Welcome Email & password recovery using **Nodemailer**
- 🛡️ Security & rate limiting with **Arcjet**
- 🎨 Clean UI using **Tailwind CSS + DaisyUI**
- ⚡ Fast, responsive, and mobile-friendly UI
- 🔔 Notification sound on receiving message

---

# Create .env inside Backend folder and add these
PORT=5000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

ARCJET_KEY=your_arcjet_key

📍 Frontend: http://localhost:5173

📍 Backend: http://localhost:5000

## Future Improvements
- Typing indicators
- Read receipts
- Group chats
- File sharing
- Message search


