import React, { createContext, useState } from 'react';

const UserContext = createContext({
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  supervisor_id: '',
  my_unit_id: '',
  available: false,
  admin: false,
  supervisor: false,
  loggedIn: false,
  org: {
    id: '',
    name: '',
    reports_to: '',
  },
  setUser: () => {},
  setOrg: () => {},
  setLoggedIn: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    supervisor_id: '',
    my_unit_id: '',
    available: false,
    admin: false,
    supervisor: false,
    loggedIn: false,
    unit: {
      id: '',
      name: '',
      reports_to: '',
    },
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const setOrg = (orgDetails) => {
    setUser((prevUser) => ({
      ...prevUser,
      org: { ...prevUser.org, ...orgDetails },
    }));
  };

  return (
    <UserContext.Provider value={{ ...user, loggedIn, setUser, setOrg, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
