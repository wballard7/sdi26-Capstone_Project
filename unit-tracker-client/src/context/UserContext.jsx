import React, { createContext, useState } from 'react';

const UserContext = createContext({
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  supervisor_id: '',
  parent_unit_id: '',
  available: false,
  admin: false,
  supervisor: false,
  loggedIn: false,
  org: {
    org_id: '',
    org_name: '',
    reports_to: '',
  },
  setUser: () => {},
  setOrg: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    supervisor_id: '',
    parent_unit_id: '',
    available: false,
    admin: false,
    supervisor: false,
    loggedIn: false,
    org: {
      org_id: '',
      org_name: '',
      higher_unit_id: '',
    },
  });

  const setOrg = (orgDetails) => {
    setUser((prevUser) => ({
      ...prevUser,
      org: { ...prevUser.org, ...orgDetails },
    }));
  };

  return <UserContext.Provider value={{ ...user, setUser, setOrg }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
