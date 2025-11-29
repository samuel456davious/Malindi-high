import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// IMPORT PROVIDERS
import { AuthProvider } from './coponents/Authentication/AuthContext';
import { ThemeProvider } from '../src/coponents/Authentication/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Optional performance reporting
reportWebVitals();
