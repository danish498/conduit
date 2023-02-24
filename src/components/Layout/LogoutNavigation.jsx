import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const LogoutNavigation = () => {
  return (
    <div>
      <ul className='flex gap-2'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-${
              isActive ? 'true-green' : 'gray-300'
            }  rounded-lg px-1 py-1  flex items-center gap-1 `
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to='/login'
          className={({ isActive }) =>
            `text-${
              isActive ? 'true-green' : 'gray-300'
            }  rounded-lg px-1 py-1  flex items-center gap-1 `
          }
        >
          <li>Login</li>
        </NavLink>
        <NavLink
          to='/register'
          className={({ isActive }) =>
            `text-${
              isActive ? 'true-green' : 'gray-300'
            }  rounded-lg px-1 py-1  flex items-center gap-1 `
          }
        >
          <li>Signup</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default LogoutNavigation;
