// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/variables.css';
import './assets/css/main.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);