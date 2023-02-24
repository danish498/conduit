import React, { useState } from 'react';
import { RxPlus } from 'react-icons/rx';
import APIClient from '../../api/APIClient';

const FollowButton = ({ following, setFollowing, author }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const followUser = async () => {
    try {
      const response = await APIClient.AxiosInstance.post(
        `profiles/${author}/follow`
      );
      setFollowing(response.data.profile.following);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      const response = await APIClient.AxiosInstance.delete(
        `profiles/${author}/follow`
      );
      setFollowing(response.data.profile.following);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    setIsDisabled(true);
    following ? await unFollowUser() : await followUser();

    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <div className='border p-0.5'>
      <button
        className='flex items-center'
        onClick={handleFollow}
        disabled={isDisabled}
      >
        <RxPlus />
        <p className='px-2 text-sm'>
          {following ? 'Unfollow' : 'Follow'} {author}
        </p>
      </button>
    </div>
  );
};

export default FollowButton;
