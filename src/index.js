import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; 
import store from './Components/store/store';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
