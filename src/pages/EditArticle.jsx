import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIClient from '../api/APIClient';

const EditArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((preFormData) => ({
      ...preFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tagListArray = formData.tagList
      .split(' ')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setFormData((prevFormData) => ({ ...prevFormData, tagList: tagListArray }));
    console.log('=======FORM DATA AFTER SUBMIT=====', formData);

    try {
      const { data } = await APIClient.AxiosInstance.post('articles', {
        article: {
          title: formData.title,
          description: formData.description,
          body: formData.body,
          tagList: formData.tagList,
        },
      });

      navigate(`/article/${data.article.slug}`);
    } catch (error) {
      console.log('PRINT THE ERROR', error);
    }
  };

  return (
    <>
      <div className='p-10'>
        <form onSubmit={handleSubmit}>
          <input
            id='title'
            name='title'
            type='text'
            required
            value={formData.title}
            onChange={handleInputChange}
            placeholder='Article Titlee'
            className='mt-1 p-3 w-full border rounded-md  border-gray-400  outline-none  focus:border-indigo-500 '
          />

          <input
            id='decription'
            name='description'
            type='text'
            required
            value={formData.description}
            onChange={handleInputChange}
            placeholder={`What's this article about?`}
            className='mt-4 p-1 w-full border rounded-md  border-gray-400  outline-none  focus:border-indigo-500'
          />

          <textarea
            id='body'
            name='body'
            required
            value={formData.body}
            onChange={handleInputChange}
            placeholder='Write your article (in markdown)'
            className='mt-4 p-2 h-36 w-full border rounded-md  border-gray-400  outline-none  focus:border-indigo-500'
          />

          <input
            id='tagList'
            name='tagList'
            type='text'
            value={formData.tagList}
            onChange={handleInputChange}
            placeholder='Enter tags'
            className='mt-4 p-1 w-full border rounded-md  border-gray-400  outline-none  focus:border-indigo-500'
          />

          <div className='flex justify-end'>
            <button
              type='submit'
              className='inline-flex items-center mt-4 px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
