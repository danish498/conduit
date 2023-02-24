import React from 'react';

const PopularTag = ({ tag, tagHandle }) => {
  return (
    <div className='inline-flex m-0.5 '>
      <button
        className=' text-sm px-1 bg-gray-400 text-white  items-center border rounded-full'
        onClick={() => tagHandle(tag)}
      >
        {tag}
      </button>
    </div>
  );
};

export default PopularTag;
