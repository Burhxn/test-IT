// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditPost from './pages/EditPost'
import App from './App'
import User from './pages/User'
import './index.css'
import CreatePost from './components/CreatePost'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/users" element={<User />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
)
