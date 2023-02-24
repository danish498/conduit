import axios from 'axios';
import APIClient from '../api/APIClient';

const getArticle = async (requestParams) => {
  console.log('CHECK THE URL DATA FOR THE APP', requestParams);
  // console.log(query);
  // const { data } = await axios.get(
  //   'https://api.realworld.io/api/articles?limit=20&offset=0'
  // );

  const response = await APIClient.AxiosInstance.get(requestParams);
  // console.log('API  RESPONSE ', response);
  return response.data;
};

const getTags = async (requestParams) => {
  console.log('PREINT THE TAG VALUE', requestParams);
  try {
    const response = await APIClient.AxiosInstance.get(requestParams);

    console.log('CHECK THE TAG DATA RESPONSE OF THE TAGS', response);
    return response.data.tags;
  } catch (error) {
    return error;
  }
};

export const articleService = { getArticle, getTags };
