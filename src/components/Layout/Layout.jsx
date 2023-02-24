import React from 'react';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
