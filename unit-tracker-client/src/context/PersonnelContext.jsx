import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from './UserContext';

const PersonnelContext = createContext({
  personnelList: [],
  setPersonnel: () => {},
});

const PersonnelProvider = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  const [personnelList, setPersonnelList] = useState(() => {
    try {
      const savedPersonnel = localStorage.getItem('personnelList');
      return savedPersonnel ? JSON.parse(savedPersonnel) : [];
    } catch (error) {
      console.error('Failed to parse personnel list from localStorage:', error);
      return [];
    }
  });

  const setPersonnel = useCallback((newPersonnel) => {
    setPersonnelList(newPersonnel);
  }, []);

  // Sync personnelList state with localStorage
  useEffect(() => {
    localStorage.setItem('personnelList', JSON.stringify(personnelList));
  }, [personnelList]);

  // Clear personnel data when loggedIn is false
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem('personnelList');
      setPersonnelList([]);
    }
  }, [loggedIn]);

  return (
    <PersonnelContext.Provider value={{ personnelList, setPersonnel }}>
      {children}
    </PersonnelContext.Provider>
  );
};

export { PersonnelProvider, PersonnelContext };
