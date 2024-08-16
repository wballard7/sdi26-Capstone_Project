import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
const PersonnelContext = createContext({
  personnelList: [],
  setPersonnel: () => {},
});

const PersonnelProvider = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  const [personnelList, setPersonnelList] = useState(() => {
    const savedPersonnel = localStorage.getItem('personnelList');
    return savedPersonnel ? JSON.parse(savedPersonnel) : [];
  });

  const setPersonnel = (newPersonnel) => {
    setPersonnelList((prevList) => [...prevList, newPersonnel]);
  };

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
  }, [loggedIn]); // The effect runs when loggedIn changes

  return (
    <PersonnelContext.Provider value={{ personnelList, setPersonnel }}>
      {children}
    </PersonnelContext.Provider>
  );
};

export { PersonnelProvider, PersonnelContext };
