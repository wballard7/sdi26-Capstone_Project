import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './styles/App';
import { UserProvider } from './context/UserContext';
import { PersonnelProvider } from './context/PersonnelContext';
import { DynamicProvider } from './context/DynamicContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PersonnelProvider>
        <DynamicProvider>
          <App />
        </DynamicProvider>
      </PersonnelProvider>
    </UserProvider>
  </React.StrictMode>,
);
