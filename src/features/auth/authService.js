import APIClient from '../../api/APIClient';

const getAuth = async (requestParams) => {
  // let token = localStorage.getItem('token');
  // const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}) };

  const response = await APIClient.AxiosInstance.post('users', requestParams);

  return response;

  // try {
  //   console.log('check the api response', response);

  //   // if (response.status !== 200) {
  //   //   throw new Error(`API error: ${response.status} ${response.statusText}`);
  //   // }
  //   return response.data.user;
  // } catch (error) {
  //   console.error(error);
  //   return error.response.data;
  // }
};

const getAuthLogin = async (requestParams) => {
  const response = await APIClient.AxiosInstance.post(
    'users/login',
    requestParams
  );

  return response;
};

export const authService = { getAuth, getAuthLogin };
