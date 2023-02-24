import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FiEdit } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const LoginNavigation = () => {
  const userData = useSelector((state) => state.persistedReducer.auth);

  // const { username, image } = JSON.parse(localStorage.getItem('userData'));

  return (
    <div>
      <ul className='flex gap-1 items-center'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `text-${isActive ? 'true-green' : 'gray-300'} 
               rounded-lg px-2 py-1`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/editor'
            className={({ isActive }) =>
              `text-${isActive ? 'true-green' : 'gray-300'}
               rounded-lg px-2 py-1  flex items-center gap-1`
            }
          >
            <FiEdit />
            New Article
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/settings'
            className={({ isActive }) =>
              `text-${
                isActive ? 'true-green' : 'gray-300'
              }  rounded-lg px-2 py-1 flex items-center gap-1 `
            }
          >
            <FiSettings />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/profile/${userData.username}`}
            className={({ isActive }) =>
              `text-${
                isActive ? 'true-green' : 'gray-300'
              }  rounded-lg px-2 py-1  flex items-center gap-1 `
            }
          >
            <img
              src={userData.image}
              alt='profile_image'
              className='w-6 h-6 rounded-full'
            />
            <p>{userData.username}</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LoginNavigation;
