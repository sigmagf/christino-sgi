import React from 'react';
import {
  RiArrowLeftSLine as IconArrowLeft,
  RiArrowLeftSFill as IconArrowLeftFill,
  RiArrowRightSLine as IconArrowRight,
  RiArrowRightSFill as IconArrowRightFill,
} from 'react-icons/ri';

import { Paginator } from './styles';

interface IPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (number: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pagesNumbers: number[] = [];

  for(let i = 0; i < Math.ceil(totalItems / itemsPerPage); i++) {
    pagesNumbers.push(i + 1);
  }

  const minPage = currentPage - 4 < 0 ? 0 : currentPage - 4;
  const maxPage = currentPage + 3 > pagesNumbers.length - 1 ? pagesNumbers.length : currentPage + 3;

  const calcMaxPage = () => {
    if(minPage === 0) {
      if(currentPage === 1) { return maxPage + 3; }
      if(currentPage === 2) { return maxPage + 2; }
      if(currentPage === 3) { return maxPage + 1; }
    }

    return maxPage;
  };

  const calcMinPage = () => {
    if(maxPage === pagesNumbers.length) {
      if(currentPage === pagesNumbers.length) { return minPage - 3; }
      if(currentPage === pagesNumbers.length - 1) { return minPage - 2; }
      if(currentPage === pagesNumbers.length - 2) { return minPage - 1; }
    }

    return minPage;
  };

  const currentPageShows = pagesNumbers.slice(calcMinPage(), calcMaxPage());

  return (
    <Paginator>
      <button type="button" onClick={() => paginate(1)} disabled={currentPage < 2}>
        <IconArrowLeftFill size={20} />
      </button>
      <button type="button" onClick={() => paginate(currentPage - 1)} disabled={currentPage < 2}>
        <IconArrowLeft size={20} />
      </button>

      {currentPageShows.map((number) => (
        <button
          type="button"
          key={number}
          className={currentPage === number ? 'current' : ''}
          disabled={currentPage === number}
          onClick={() => paginate(number)}
        >
          { number }
        </button>
      ))}

      <button type="button" onClick={() => paginate(currentPage + 1)} disabled={currentPage >= pagesNumbers.length}>
        <IconArrowRight size={20} />
      </button>
      <button type="button" onClick={() => paginate(pagesNumbers.length)} disabled={currentPage >= pagesNumbers.length}>
        <IconArrowRightFill size={20} />
      </button>
    </Paginator>
  );
};
