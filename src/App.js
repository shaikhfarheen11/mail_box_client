import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Welcome from './Components/Welcome/Welcome';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Signup />} />
   <Route path="/signup" element={<Signup />} />
   <Route path="/login" element={<Login />} />
   <Route path="/welcome" element={<Welcome />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
