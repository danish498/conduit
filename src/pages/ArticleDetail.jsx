import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import APIClient from '../api/APIClient';
import { RxPlus } from 'react-icons/rx';
import { CiHeart } from 'react-icons/ci';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import moment from 'moment';

import UserProfile from '../components/common/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsData } from '../features/comments/commentSlice';

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { URLSlug: slug } = useParams();
  const [articles, setArticles] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const [favorited, setFavorited] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const { username } = useSelector((state) => state.persistedReducer.auth);
  // console.log('CHECK THE FOLLOWING RESPONSE OVER HERE', following);

  // console.log('CHECK THE FAVAFASDKFJASDFASDF COUNDT', favoritesCount);
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    const getAnArticle = async () => {
      try {
        const response = await APIClient.AxiosInstance.get(`articles/${slug}`);
        setArticles(response.data.article);
        setFavoritesCount(response.data.article.favoritesCount);
        setFavorited(response.data.article.favorited);
        setFollowing(response.data.article.author.following);
      } catch (error) {
        console.log('####ARTICLE DETAILS error HERE', error);
        return error;
      }
    };

    getAnArticle();
  }, [slug]);

  useEffect(() => {
    dispatch(getCommentsData(slug));
  }, []);

  if (articles === null) {
    return <div>Loading...</div>;
  }

  const favCount = async () => {
    try {
      await APIClient.AxiosInstance.post(`articles/${slug}/favorite`);
      setFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    } catch (error) {}
  };

  const unFavCount = async () => {
    try {
      await APIClient.AxiosInstance.delete(`articles/${slug}/favorite`);
      setFavorited(false);
      setFavoritesCount(favoritesCount - 1);
    } catch (error) {}
  };

  const handleFavoriteCount = async () => {
    setIsDisabled(true);
    favorited ? await unFavCount() : await favCount();

    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  const followUser = async () => {
    try {
      const response = await APIClient.AxiosInstance.post(
        `profiles/${articles.author.username}/follow`
      );
      setFollowing(response.data.profile.following);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      const response = await APIClient.AxiosInstance.delete(
        `profiles/${articles.author.username}/follow`
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
    <>
      <div className=' '>
        <div className='bg-true-black px-36 py-10 mt-5 '>
          <Link to='/editor'>
            <p className='text-white text-4xl mb-7 font-bold '>
              {articles.title}
            </p>
          </Link>
          <div className='flex gap-5'>
            <UserProfile
              username={articles.author.username}
              image={articles?.author?.image}
              createdAt={articles?.createdAt}
              color={'white'}
            />

            <div className='flex gap-1'>
              {username === articles.author.username ? (
                <>
                  <div className='flex items-center gap-1 '>
                    <div className=' '>
                      <button
                        onClick={() => navigate(`editor/${articles.slug}`)}
                        className=' flex items-center hover:bg-gray-400 border p-0.5 rounded-sm '
                      >
                        <MdModeEditOutline color='white' />
                        <p className='px-2 text-sm text-gray-200'>
                          Edit Article
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className='flex items-center gap-1 '>
                    <div className=' '>
                      <button className='flex items-center  border border-red-600 p-0.5 rounded-sm hover:bg-red-500'>
                        <RiDeleteBin6Fill />
                        <p className='px-1 text-sm text-red-400 hover:text-gray-300  '>
                          Delete Article
                        </p>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex items-center gap-1 '>
                    <div className=''>
                      <button
                        className='flex items-center hover:bg-gray-400 hover:border-0 border p-1  rounded-sm '
                        onClick={handleFollow}
                        disabled={isDisabled}
                      >
                        <RxPlus />
                        <p className='px-2 text-sm text-gray-200 '>
                          {following ? 'Unfollow' : 'Follow'}{' '}
                          {articles.author.username}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center gap-1 '>
                    <div className=''>
                      <button
                        className='flex items-center hover:bg-true-green hover:border-0 border p-1 border-true-green rounded-sm'
                        onClick={handleFavoriteCount}
                        disabled={isDisabled}
                      >
                        <CiHeart color='red' fill='red' />
                        <p className='px-1 text-sm text-true-green hover:text-white '>
                          {favorited ? 'Unfavorite ' : 'Favorite'} Article (
                          {favoritesCount})
                        </p>
                      </button>
                    </div>
                  </div>{' '}
                </>
              )}
            </div>
          </div>
        </div>

        <div className=' px-36 py-3'>
          <div className=''>
            <p className='text-lg m-2'>{articles.body}</p>
            {articles.tagList.map((tag) => {
              return (
                <ul className='inline-flex  m-1 '>
                  <li className='border rounded-full px-2 py-0.5  border-gray-400 text-sm'>
                    {tag}
                  </li>
                </ul>
              );
            })}

            <hr className=' border mt-10 text-red-500   ' />
          </div>

          <div className='flex  gap-5 mt-5 items-center justify-center'>
            <UserProfile
              username={articles.author?.username}
              image={articles?.author?.image}
              createdAt={articles?.createdAt}
              color='green'
            />

            {username === articles.author.username ? (
              <>
                <div className='flex items-center gap-1 '>
                  <div className=' '>
                    <button
                      onClick={() => navigate(`editor/${articles.slug}`)}
                      className=' flex items-center hover:bg-gray-400 border p-0.5 rounded-sm '
                    >
                      <MdModeEditOutline color='white' />
                      <p className='px-2 text-sm text-gray-200'>Edit Article</p>
                    </button>
                  </div>
                </div>

                <div className='flex items-center gap-1 '>
                  <div className=' '>
                    <button className='flex items-center  border border-red-600 p-0.5 rounded-sm hover:bg-red-500'>
                      <RiDeleteBin6Fill />
                      <p className='px-1 text-sm text-red-400 hover:text-gray-300  '>
                        Delete Article
                      </p>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex gap-1'>
                <div className='flex items-center gap-1 '>
                  <div className=' '>
                    <button
                      className='flex items-center hover:bg-gray-400 hover:border-0 border p-1  rounded-sm'
                      onClick={handleFollow}
                      disabled={isDisabled}
                    >
                      <RxPlus />
                      <p className='px-2 text-sm'>
                        {following ? 'Unfollow' : 'Follow'}{' '}
                        {articles.author.username}
                      </p>
                    </button>
                  </div>
                </div>

                <div className='flex items-center gap-1 '>
                  <div className=' '>
                    <button
                      className='flex items-center hover:bg-true-green hover:border-0 border p-1 border-true-green rounded-sm'
                      onClick={handleFavoriteCount}
                      disabled={isDisabled}
                    >
                      <CiHeart />
                      <p className='px-1 text-sm text-true-green hover:text-white'>
                        {favorited ? 'Unfavorite ' : 'Favorite'} Article (
                        {favoritesCount})
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className=' flex flex-col mt-10 ml-56 '>
            <p className='mb-6'>
              <Link to='login' className='text-green-600  hover:underline'>
                Sign in
              </Link>{' '}
              or {''}
              <Link to='register' className='text-green-700 hover:underline'>
                sign up
              </Link>{' '}
              {''}
              to add comments on this article
            </p>

            <div className='mb-3'>
              <div className=''>
                {comments?.comments?.map((comment) => {
                  return (
                    <>
                      <div className='border mb-4 w-3/4  '>
                        <p className='  p-3 '>{comment.body}</p>
                        <div className='flex gap-1 p-3  items-center  border-t bg-gray-100'>
                          <img
                            src={comment.author.image}
                            className='w-5 h-5 rounded-full ml-2'
                          />
                          <p className='text-xs text-gray-400'>
                            {comment.author.username}
                          </p>
                          <span className='text-xs text-gray-400'>
                            {moment(comment.createdAt).format('MMMM D, YYYY')}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
