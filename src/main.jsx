import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import App from './components/App.jsx';
import { BrowserRouter } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyALENPMagV9Rj2rQwUliMtTAJk55o95qhk",
  authDomain: "info340-cafeclub.firebaseapp.com",
  databaseURL: "https://info340-cafeclub-default-rtdb.firebaseio.com",
  projectId: "info340-cafeclub",
  storageBucket: "info340-cafeclub.firebasestorage.app",
  messagingSenderId: "308765302019",
  appId: "1:308765302019:web:f05ed8a1c2216d847cdd36"
};

initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
