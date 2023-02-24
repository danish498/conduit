import moment from 'moment/moment';
import React, { useEffect, useState, useMemo } from 'react';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import APIClient from '../../api/APIClient';
import { getArticleData } from '../../features/articlesSlice';
import Pagination from '../common/Pagination';
import UserProfile from '../common/UserProfile';

const ArticlePreview = ({ data, follow, unfollow, isFollowed, favorited }) => {
  const navigate = useNavigate();
  const handleFavoriteCount = async (_data) => {
    isFollowed ? await unfollow(_data) : await follow(_data);
  };

  return (
    <div key={`${data.slug}`}>
      <div className=' '>
        <div className='flex justify-between items-center mb-3'>
          <UserProfile
            username={data.author.username}
            image={data.author.image}
            createdAt={data.createdAt}
            color={'green'}
          />
          <button
            className={`${
              favorited ? 'true-green' : ''
            }  inline-flex items-center  leading-sm uppercase px-1 py-1 border border-true-green text-sm text-true-green hover:bg-true-green hover:text-white rounded-sm `}
            onClick={() => handleFavoriteCount(data)}
          >
            <CiHeart style={{ fill: 'black' }} /> {data.favoritesCount}
          </button>
        </div>
        <Link to={`article/${data.slug}`} replace={true}>
          <h1 className='text-2xl font-semibold  '>{data.title}</h1>

          <h1 className='text-gray-300'>{data.description}</h1>

          <div className='flex items-center my-4 justify-between '>
            <div>
              <span className='text-gray-300'>Read more..</span>
            </div>
            <div>
              {data.tagList.map((tag, index) => {
                return (
                  <span
                    className='border rounded-full px-2 py-0.5 m-0.5  border-gray-200 text-sm text-gray-300'
                    key={index}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </Link>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
      </div>
    </div>
  );
};

export default ArticlePreview;
