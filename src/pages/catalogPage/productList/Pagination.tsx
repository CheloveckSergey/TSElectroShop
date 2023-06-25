import React, { FC } from 'react';

interface PaginationProps {
  pageQty: number, 
  curPageNumber: number,
  setCurPageNumber: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: FC<PaginationProps> = ({ pageQty, curPageNumber, setCurPageNumber }) => {

  function getPages(pageQty: number): number[] {
    let pages = [];
    for (let i = 0; i < pageQty; i++) {
      pages.push(i + 1)
    }
    return pages;
  }

  return (
    <div className='pagination'>
      {getPages(pageQty).map((pageNumber, index) => 
        <button 
          key={index} 
          className={pageNumber == curPageNumber ? 'checked' : ''}
          onClick={() => {
            if (pageNumber == curPageNumber) return;
            setCurPageNumber(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      )}
    </div>
  );
}

export default Pagination;
