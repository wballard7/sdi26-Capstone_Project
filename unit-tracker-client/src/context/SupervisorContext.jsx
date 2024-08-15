import React, { createContext, useState } from 'react';

const SupervisorContext = createContext({
  id: '',
  first_name: '',
  last_name: '',
  supervisor_id: '',
  parent_unit_id: '',
  available: false,
  admin: false,
  supervisor: false,

  setSupervisor: () => {},
});

const SupervisorProvider = ({ children }) => {
  const [supervisor, setSupervisor] = useState({
    id: '',
    first_name: '',
    last_name: '',
    supervisor_id: '',
    parent_unit_id: '',
    available: false,
    admin: false,
    supervisor: false,
  });

  return <SupervisorContext.Provider value={{ ...supervisor, setSupervisor }}>{children}</SupervisorContext.Provider>;
};

export { SupervisorProvider, SupervisorContext };
