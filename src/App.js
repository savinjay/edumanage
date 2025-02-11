import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './components/Frontend/LoginPage';
import Dashboard from './components/Frontend/Dashboard';
import Profile from './components/Frontend/Profile';
import PasswordResetPage from './components/Frontend/PasswordResetPage';
import SignIn from './components/Frontend/SignIn';
import Error from './components/Frontend/Error';
import ContactUs from './components/Frontend/ContactUs';

function App() {
  return (
    <BrowserRouter> 
    {/* <Ntg/>
    <PasswordReset  Page /> */}
    {/* <SignIn/> */}
    {/* <Profile /> */}
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/*' element={<Error/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
