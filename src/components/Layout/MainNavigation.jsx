import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginNavigation from './LoginNavigation';
import LogoutNavigation from './LogoutNavigation';

const MainNavigation = () => {
  const userData = useSelector((state) => state.persistedReducer.auth);

  return (
    <>
      <div className='flex justify-between ml-36 mr-16 mt-4 '>
        <Link
          to='/'
          className='text-xl font-bold font-titillium text-true-green  '
        >
          conduit
        </Link>
        {userData.isLoggedIn ? <LoginNavigation /> : <LogoutNavigation />}
      </div>
    </>
  );
};

export default MainNavigation;
