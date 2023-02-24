import moment from 'moment';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const UserProfile = ({ username, image, createdAt, color }) => {
  const navigate = useNavigate();

  function redirectrToProfile() {
    // return <Navigate to={`profile/${username}`} replace={true} />;
    navigate(`profile/${username}`, { replace: true });
    // onClick={redirectrToProfile}
  }

  console.log(color);
  return (
    <>
      <div className='flex items-center gap-1'>
        <button onClick={redirectrToProfile}>
          <img src={image} alt='user_img' className='rounded-full w-8 h-8' />
        </button>
        <div className='inline-block  leading-4 ml-1.5 mr-0.3'>
          <Link to={`profile/${username}`}>
            <p className='mb-0 hover:underline' style={{ color: `${color}` }}>
              {username}
            </p>
          </Link>
          <span className='inline-block text-xs text-gray-400 '>
            {moment(createdAt).format('MMMM D, YYYY')}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
