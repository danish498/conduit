import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import APIClient from '../api/APIClient';
import MainArticle from '../components/Articles/MainArticle';
import FollowButton from '../components/common/FollowButton';

import { FiSettings } from 'react-icons/fi';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [following, setFollowing] = useState(null);

  console.log('check the folllowng data', following);

  const { username } = useSelector((state) => state.persistedReducer.auth);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await APIClient.AxiosInstance.get(
          `profiles/${userId}`
        );
        console.log('WHAT HAPPPPPPEEEEEEN', data);
        setUserProfile(data.profile);
        setFollowing(data.profile.following);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [userId]);

  if (userProfile === null) {
    return <div>Loading...</div>;
  }

  console.log(userProfile);

  return (
    <>
      <div className='h-full grid grid-rows-1  bg-gray-100 gap-4 py-6'>
        <div className='row-span-1 mx-auto'>
          <div className='flex flex-col items-center '>
            <img
              src={userProfile.image}
              alt='user_profile'
              className='w-24 h-24 rounded-full inline-block align-middle'
            />
            <p className='text-2xl font-bold pt-2 inline-block align-middle'>
              {userProfile.username}
            </p>
          </div>
        </div>

        <div className='h-8  justify-self-end mr-20 '>
          {username === userId ? (
            <div className='flex items-center gap-1 '>
              <div className='border p-0.5 '>
                <button
                  className='flex items-center'
                  onClick={() => navigate('/settings')}
                >
                  <FiSettings />
                  <p className='px-1 text-sm text-gray-700  '>
                    Edit Profile Setting
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <FollowButton
              following={following}
              setFollowing={setFollowing}
              author={userProfile.username}
            />
          )}
        </div>
      </div>

      <div className=' w-3/5   ml-52 mt-10'>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className='flex gap-3 '>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? ' text-green-700 outline-none  border-b-2 pb-2  px-4 border-green-800'
                      : 'bg-white text-gray-500 pb-2 px-4'
                  }
                >
                  My Articles
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? ' text-green-700 outline-none  border-b-2 pb-2 px-4 border-green-800'
                      : 'bg-white text-gray-500 pb-2 px-4'
                  }
                >
                  Favorited Articles
                </button>
              )}
            </Tab>
          </Tab.List>
          <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700' />
          <Tab.Panels className='mt-5'>
            <Tab.Panel>
              <MainArticle query={`?author=${userId}&`} />
            </Tab.Panel>
            <Tab.Panel>
              <MainArticle query={`?favorited=${userId}&`} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Profile;
