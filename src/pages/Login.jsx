import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginAuth } from '../features/auth/authSlice';

const Login = () => {
  const { isSuccess, error } = useSelector(
    (state) => state.persistedReducer.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  console.log(
    'check the error of that login state',
    error['email or password'][0]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      getLoginAuth({
        user: {
          email: formData.email,
          password: formData.password,
        },
      })
    );
  };

  return (
    <>
      <section className=' '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
          <div className='w-full md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <div className='flex flex-col items-center'>
                <h1 className='text-xl  leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white'>
                  Sign in
                </h1>
                <Link
                  to='/register'
                  className='text-true-green hover:underline'
                >
                  <p>Need an account?</p>
                </Link>
              </div>

              {error === null ? (
                ''
              ) : (
                <ul>
                  <li>Email or Password {error['email or password'][0]}</li>
                </ul>
              )}
              <form
                className='space-y-4 md:space-y-6'
                action='#'
                onSubmit={submitHandler}
              >
                <div>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={changeHandler}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:border-cyan-400'
                    placeholder='Email'
                    required=''
                  />
                </div>

                <div>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:border-cyan-400'
                    required=''
                  />
                </div>
                <button className=' bg-true-green hover:bg-green-900 text-white font-bold py-2 px-4 rounded'>
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
