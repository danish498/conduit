import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import APIClient from './api/APIClient';
import Layout from './components/Layout/Layout';
import ArticleDetail from './pages/ArticleDetail';
import Articles from './pages/Articles';
import EditArticle from './pages/EditArticle';
import Editor from './pages/Editor';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MySettings from './pages/Settings';
import Signup from './pages/Signup';

const App = () => {
  useEffect(() => {
    const setAPIConfig = () => {
      APIClient.setHeader();
    };

    setAPIConfig();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Articles />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/article/:URLSlug' element={<ArticleDetail />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/editor/:slug' element={<EditArticle />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/settings' element={<MySettings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
