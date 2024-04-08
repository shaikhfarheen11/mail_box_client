import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './Components/store/store'; 
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Welcome from './Components/Welcome/Welcome';
import Compose from './Components/Compose';
import Inbox from './Components/Inbox';
import Sent from './Components/Sent';

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome/*" element={<Welcome />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/mails/inbox" element={<Inbox />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
