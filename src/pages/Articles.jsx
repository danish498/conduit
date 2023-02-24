import React, { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

import MainArticle from '../components/Articles/MainArticle';
import { useDispatch, useSelector } from 'react-redux';
import { getTagsData } from '../features/articleTagSlice';
import PopularTag from '../components/Tags/PopularTag';

import { FiHash } from 'react-icons/fi';

const Articles = () => {
  const { isLoggedIn } = useSelector((state) => state.persistedReducer.auth);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tagClick, setTagClick] = useState(false);

  const { tags } = useSelector((state) => state.tags);
  const [tag, setTag] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagsData('tags'));
  }, []);

  const handleSelectChange = (index) => {
    setSelectedIndex(index);
    setTagClick(false);
  };

  const tagHandle = (tag) => {
    setTag(tag);
    isLoggedIn ? setSelectedIndex(2) : setSelectedIndex(1);
    setTagClick(true);
  };

  if (tags === null) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <div className='flex items-center justify-center bg-true-green shadow-inner mt-4'>
        <div className='py-12 flex items-center justify-center flex-col gap-1'>
          <h1 className='text-white font-titillium text-4xl font-bold'>
            conduit
          </h1>
          <p className='text-white font-sans text-lg'>
            A place to share your knowledge.
          </p>
        </div>
      </div>

      <div className=' flex ml-36 gap-5 mt-10'>
        <div className='w-9/12'>
          <Tab.Group
            selectedIndex={selectedIndex}
            onChange={handleSelectChange}
          >
            <Tab.List className='flex gap-3'>
              {isLoggedIn ? (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? ' text-green-900  outline-none  border-b-2 pb-2 px-4 border-green-800'
                          : 'bg-white text-gray-500 pb-2 px-4'
                      }
                    >
                      Your Feed{' '}
                    </button>
                  )}
                </Tab>
              ) : null}
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={
                      selected
                        ? ' text-green-700 outline-none  border-b-2 pb-2 px-4 border-green-800'
                        : 'bg-white text-gray-500 pb-2 px-4'
                    }
                  >
                    Global Feed{' '}
                  </button>
                )}
              </Tab>

              {tagClick ? (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    /* Use the `selected` state to conditionally style the selected tab. */
                    <button
                      className={
                        selected
                          ? ' text-green-700 outline-none  border-b-2 pb-2 px-4 border-green-800'
                          : 'bg-white text-gray-500 pb-2 px-4'
                      }
                    >
                      <div className='flex items-center gap-0.5'>
                        <FiHash />
                        {tag}
                      </div>
                    </button>
                  )}
                </Tab>
              ) : null}
            </Tab.List>
            <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700' />
            <Tab.Panels className='mt-6'>
              {isLoggedIn ? (
                <Tab.Panel>
                  <MainArticle query='/feed?' />
                </Tab.Panel>
              ) : null}
              <Tab.Panel>
                <MainArticle query='?' />
              </Tab.Panel>
              <Tab.Panel>
                <MainArticle query={`?tag=${tag}&`} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className=' w-56 h-40 bg-gray-100 p-3 shadow-sm rounded-sm'>
          <p>Popular Tags</p>
          {tags.map((tag) => {
            return <PopularTag tag={tag} tagHandle={tagHandle} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Articles;
