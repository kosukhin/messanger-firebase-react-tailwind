import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Регистрация сервисов
import './services/request';
import './services/firebase';
import './services/security';
import './services/browser';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App/>
);
