
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './components/Frontend/LoginPage';
import Dashboard from './components/Frontend/Dashboard';
import Profile from './components/Frontend/Profile';
import SignUp from './components/SignUp';
import Error from './components/Frontend/Error';
import ContactUs from './components/Frontend/ContactUs';
import ResetPassword from './components/Frontend/ResetPassword'; 

function App() {
  return (
    <BrowserRouter> 
      <Routes>
      <Route path="/" element={<Dashboard/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<LoginPage />} />
        <Route path='/*' element={<Error/> } />
      </Routes>
      </BrowserRouter>
  );
}

export default App;