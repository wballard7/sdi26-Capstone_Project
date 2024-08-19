import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

const SupervisorContext = createContext({
  id: '',
  first_name: '',
  last_name: '',
  supervisor_id: '',
  my_unit_id: '',
  available: false,
  admin: false,
  supervisor: false,
  setSupervisor: () => {},
});

const SupervisorProvider = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  // Load supervisor data from localStorage
  const [supervisor, setSupervisor] = useState(() => {
    const savedSupervisor = localStorage.getItem('supervisor');
    return savedSupervisor
      ? JSON.parse(savedSupervisor)
      : {
          id: '',
          first_name: '',
          last_name: '',
          supervisor_id: '',
          my_unit_id: '',
          available: false,
          admin: false,
          supervisor: false,
        };
  });

  // Sync supervisor state with localStorage
  useEffect(() => {
    localStorage.setItem('supervisor', JSON.stringify(supervisor));
  }, [supervisor]);

  // Clear supervisor data when loggedIn is false
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem('supervisor');
      setSupervisor({
        id: '',
        first_name: '',
        last_name: '',
        supervisor_id: '',
        my_unit_id: '',
        available: false,
        admin: false,
        supervisor: false,
      });
    }
  }, [loggedIn]); // The effect runs when loggedIn changes

  return (
    <SupervisorContext.Provider value={{ ...supervisor, setSupervisor }}>
      {children}
    </SupervisorContext.Provider>
  );
};

export { SupervisorProvider, SupervisorContext };
