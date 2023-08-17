import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hoc/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <ResponsiveDrawer /> */}
        <App />
      </AuthProvider>  
    </BrowserRouter>
  </React.StrictMode>
);