import React, { createContext, useState } from 'react';

const DynamicContext = createContext({
  dynamicList: [],
  setDynamicList: () => {},
});

const DynamicProvider = ({ children }) => {
  const [dynamicList, setDynamicList] = useState([]);

  const setPersonnel = (newPersonnel) => {
    setDynamicList((prevList) => [...dynamicList]);
  };

  return (
    <DynamicContext.Provider value={{ dynamicList, setDynamicList }}>
      {children}
    </DynamicContext.Provider>
  );
};

export { DynamicProvider, DynamicContext };
