import APIClient from '../../api/APIClient';

const getComment = async (slug) => {
  try {
    const response = await APIClient.AxiosInstance.get(
      `articles/${slug}/comments`
    );
    console.log('########PRINT COMMENTS#########', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const commentsService = { getComment };
