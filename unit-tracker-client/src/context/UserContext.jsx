import React, { createContext, useState, useEffect } from 'react';

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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser
      ? JSON.parse(savedUser)
      : {
          id: '',
          username: '',
          first_name: '',
          last_name: '',
          supervisor_id: '',
          my_unit_id: '',
          available: false,
          admin: false,
          supervisor: false,
          org: {
            id: '',
            name: '',
            reports_to: '',
          },
        };
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const setOrg = (orgDetails) => {
    setUser((prevUser) => ({
      ...prevUser,
      org: { ...prevUser.org, ...orgDetails },
    }));
  };

  // Sync user and loggedIn states with localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', loggedIn.toString());
  }, [user, loggedIn]);

  // Clear user data and localStorage when loggedIn is set to false
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
      setUser({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        supervisor_id: '',
        my_unit_id: '',
        available: false,
        admin: false,
        supervisor: false,
        org: {
          id: '',
          name: '',
          reports_to: '',
        },
      });
    }
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ ...user, loggedIn, setUser, setOrg, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
