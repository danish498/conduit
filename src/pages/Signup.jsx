import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthData } from '../features/auth/authSlice';

const Signup = () => {
  const navigate = useNavigate();

  // const selectPersistedState = (state) =>
  //   state._persist?.rehydrated ? state : undefined;

  // const persistedState = useSelector(selectPersistedState);

  // console.log(
  //   '44444444444444444444444 PERSISTED STATE VALUE ###############',
  //   persistedState
  // );
  // console.log(
  //   '55555555555555555555555555 PERSISTED STATE VALUE ###############',
  //   JSON.parse(localStorage.getItem('persist:root'))
  // );

  const { isSuccess, error } = useSelector(
    (state) => state.persistedReducer.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess]);

  console.log('CHECK OUT THE ERROR', error);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  // const onSuccess = () => {
  //   console.log('====onSuccess==');
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 2000);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      getAuthData({
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      })
    );

    // dispatch(
    //   getAuthData({
    //     data: {
    //       user: {
    //         username: formData.username,
    //         email: formData.email,
    //         password: formData.password,
    //       },
    //     },
    //     onSuccess: onSuccess,
    //   })
    // );

    // setTimeout(() => {
    //   navigate('/');
    // }, 500);
  };

  return (
    <>
      <section className=''>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
          <div className='w-full md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
              <div className='flex flex-col items-center'>
                <h1 className='text-xl leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white'>
                  Sign up
                </h1>
                <Link to='/login' className='text-true-green hover:underline '>
                  <p>Have an account?</p>
                </Link>
              </div>

              {error === null ? (
                ''
              ) : (
                <ul>
                  {error?.username && <li>Username {error?.username[0]}</li>}
                  {error?.email && <li>Email {error?.email[0]}</li>}
                </ul>
              )}

              <form
                className='space-y-4 md:space-y-6'
                action='#'
                onSubmit={submitHandler}
              >
                <div>
                  <input
                    type='text'
                    name='username'
                    value={formData.username}
                    id='username'
                    onChange={changeHandler}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  outline-none focus:border-cyan-400'
                    placeholder='Username'
                    required=''
                  />
                </div>

                <div>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={changeHandler}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:border-cyan-400'
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
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:border-cyan-400'
                    required=''
                  />
                </div>
                <button className=' bg-true-green hover:bg-green-900 text-white font-bold py-2 px-4 rounded'>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
