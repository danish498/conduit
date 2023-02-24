import React from 'react';

const Pagination = ({ articlesCount, handlePageChange }) => {
  const pageNumber = Math.round(articlesCount / 10);

  const totalPage = Array.from({ length: pageNumber }, (_, index) => index + 1);

  return (
    <>
      <div class='bg-white mt-8 mb-8 items-center'>
        <nav aria-label=' navigation'>
          <ul class='inline-flex flex-wrap'>
            {totalPage.map((page, index) => {
              return (
                <li className='' key={index}>
                  <button
                    class='px-3 py-3 text-green-600  bg-white border  border-gray-300 '
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
