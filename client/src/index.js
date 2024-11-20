import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext'
import axios from "axios"

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://image-generator-ai-full-stack.vercel.app";
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
