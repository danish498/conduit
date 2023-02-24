import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import APIClient from '../api/APIClient';
import { logout } from '../features/auth/authSlice';

function MySettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    APIClient.resetToken();
    navigate('/');
  };

  return (
    <form className='max-w-md mx-auto my-4'>
      <h1 className='text-center text-4xl mb-3'>Your Settings</h1>
      <div className='mb-4'>
        <input
          type='text'
          id='label1'
          name='image'
          placeholder='URL of profile picture'
          className=' border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:border-cyan-600  '
        />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          id='label1'
          name='username'
          placeholder='Usernmae'
          className=' border rounded w-full py-3 px-3 text-gray-700 leading-tight outline-none focus:border-cyan-600 '
        />
      </div>

      <div className='mb-4'>
        <textarea
          id='textarea1'
          name='bio'
          placeholder='Short bio about you'
          className=' border rounded w-full h-36 py-3 px-3 text-gray-700 leading-tight outline-none focus:border-cyan-600 '
        />
      </div>

      <div className='mb-4'>
        <input
          type='text'
          id='label1'
          name='email'
          placeholder='Email'
          className=' border rounded w-full py-3 px-3 text-gray-700 leading-tight outline-none focus:border-cyan-600 '
        />
      </div>

      <div className='mb-4'>
        <input
          type='text'
          id='label1'
          name='password'
          placeholder='New Password'
          className=' border rounded w-full py-3 px-3 text-gray-700 leading-tight outline-none focus:border-cyan-600 '
        />
      </div>

      <div className='grid grid-row-3 gap-4 items-center max-w-screen-md mx-auto'>
        <button className='  bg-true-green hover:bg-green-900 text-white  py-2 px-4 rounded row-span-1  justify-self-end'>
          Update Settings
        </button>
        <hr className='border-t border-gray-400 h-0 row-span-1' />
        <button
          className=' text-red-500 hover:text-white border border-red-600 hover:bg-red-700  py-1 px-3 rounded row-span-1 justify-self-start'
          onClick={logoutHandler}
        >
          Or click here to logout
        </button>
      </div>
    </form>
  );
}

export default MySettings;
