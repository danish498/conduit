import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

class APIClient {
  static AxiosInstance = axios.create({
    baseURL: 'https://api.realworld.io/api/',
    headers: {},
  });
  // static headers = {};

  static setHeader(_token) {
    let token = _token || localStorage.getItem('token');
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    // APIClient.headers=headers;
    APIClient.AxiosInstance = axios.create({
      baseURL: 'https://api.realworld.io/api/',
      headers: headers,
    });
  }

  static resetToken() {
    token: '';
    localStorage.clear();
    APIClient.headers = {};
  }
}

// export const baseUrl = 'https://api.realworld.io/api';

// const [token, setToken] = useState();

// let token = localStorage.getItem('token');

// const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}) };

export default APIClient;
