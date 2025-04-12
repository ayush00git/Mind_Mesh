import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Home from './home.tsx';
import Homepage from './components/Homepage.tsx';

createRoot(document.getElementById('root')!).render(
  
    <App/>
  
);
