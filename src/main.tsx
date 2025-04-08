// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditPost from './pages/EditPost'
import App from './pages/App'
import User from './pages/User'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
