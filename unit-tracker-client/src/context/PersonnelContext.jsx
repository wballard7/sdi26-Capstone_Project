import React, { createContext, useState } from 'react';

const PersonnelContext = createContext({
  personnelList: [],
  setPersonnel: () => {},
});

const PersonnelProvider = ({ children }) => {
  const [personnelList, setPersonnelList] = useState([]);

  const setPersonnel = (newPersonnel) => {
    setPersonnelList((prevList) => [...prevList, newPersonnel]);
  };

  return (
    <PersonnelContext.Provider value={{ personnelList, setPersonnel }}>
      {children}
    </PersonnelContext.Provider>
  );
};

export { PersonnelProvider, PersonnelContext };
