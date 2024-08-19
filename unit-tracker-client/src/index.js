import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { SupervisorProvider } from './context/SupervisorContext';
import { PersonnelProvider } from './context/PersonnelContext';
import { DynamicProvider } from './context/DynamicContext';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SupervisorProvider>
        <PersonnelProvider>
          <DynamicProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </DynamicProvider>
        </PersonnelProvider>
      </SupervisorProvider>
    </UserProvider>
  </React.StrictMode>,
);
