import React from 'react';
import { CiHeart } from 'react-icons/ci';

const FavouriteButton = ({
  favoritesCount,
  children,
  favorited,
  setFavorited,
  setFavoritesCount,
}) => {
  const follow = async () => {
    try {
      await APIClient.AxiosInstance.post(`articles/${slug}/favorite`);
      setFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    } catch (error) {}
  };

  const unfollow = async () => {
    try {
      await APIClient.AxiosInstance.delete(`articles/${slug}/favorite`);
      setFavorited(false);
      setFavoritesCount(favoritesCount - 1);
    } catch (error) {}
  };

  const handleFavoriteCount = async () => {
    favorited ? await unfollow() : await follow();
  };

  return (
    <div>
      <button
        className=' inline-flex items-center  leading-sm uppercase px-2 py-1 border'
        onClick={handleFavoriteCount}
      >
        {children} {favoritesCount}
      </button>
    </div>
  );
};

export default FavouriteButton;
