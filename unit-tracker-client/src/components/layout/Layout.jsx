import React from 'react';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};
