import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { json, Link, useNavigate } from 'react-router-dom';
import data from '../../../db';
import APIClient from '../../api/APIClient';
import { getArticleData } from '../../features/articlesSlice';
import Pagination from '../common/Pagination';
import UserProfile from '../common/UserProfile';
import ArticlePreview from './ArticlePreview';

const MainArticle = ({ query }) => {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState(null);
  const [articlesCount, setArticlesCount] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  let offset = 10 * (page - 1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const getArticle = useCallback(async () => {
    let token = localStorage.getItem('token');
    try {
      const response = await APIClient.AxiosInstance.get(
        `articles${query}limit=10&offset=${offset}`
      );
      setArticles(response.data.articles);
      setArticlesCount(response.data.articlesCount);
    } catch (error) {
      console.log(error);
    }
  }, [query, offset, isFollowed]);

  useEffect(() => {
    getArticle();
  }, [query, offset, isFollowed]);

  if (articles === null) {
    return <div>Loading</div>;
  }

  const follow = async (data) => {
    try {
      const response = await APIClient.AxiosInstance.post(
        `articles/${data.slug}/favorite`
      );

      setArticles([...articles, response.data.article]);
      setIsFollowed(true);
      console.log(response);
      setFavorited(response.data.article.favorited);
      // setFavorited(true);
      // setFavoritesCount(favoritesCount + 1);
    } catch (error) {
      navigate('/register');
      console.log(error);
    }
  };

  const unfollow = async (data) => {
    try {
      const response = await APIClient.AxiosInstance.delete(
        `articles/${data.slug}/favorite`
      );

      // setFavorited(false);
      setArticles([...articles, response.data.article]);
      setIsFollowed(false);
      setFavorited(response.data.article.favorited);

      // setFavoritesCount(favoritesCount - 1);
    } catch (error) {
      navigate('/register');
    }
  };

  // console.log(articlesCount);

  if (articles.length < 1) {
    return <div>No articles are here... yet. </div>;
  }

  return (
    <>
      {articles.map((data, index) => (
        <ArticlePreview
          key={index}
          data={data}
          follow={follow}
          unfollow={unfollow}
          isFollowed={isFollowed}
          favorited={favorited}
        />
      ))}
      <Pagination
        articlesCount={articlesCount}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default MainArticle;
