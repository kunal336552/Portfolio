import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign iframe WebSocket disconnection errors in AI Studio preview environment
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason?.message || event.reason || '');
    if (reasonStr.toLowerCase().includes('websocket') || reasonStr.toLowerCase().includes('vite')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const errorStr = String(event.message || '');
    if (errorStr.toLowerCase().includes('websocket') || errorStr.toLowerCase().includes('vite')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

