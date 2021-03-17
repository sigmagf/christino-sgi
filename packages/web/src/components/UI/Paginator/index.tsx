import React from 'react';
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

import { PaginatorContainer, PaginatorNumbers } from './styles';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  inLoading: boolean;
  onNumberClick: (n: number) => void;
  leftContent?: JSX.Element;
}

export const Paginator: React.FC<IPaginationProps> = ({ currentPage, totalPages, inLoading, onNumberClick, leftContent }) => {
  const pages: number[] = [];

  for(let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  const calcPagesToShow = () => {
    if(pages.length <= 7) {
      return pages;
    }

    let minPage = currentPage - 1;
    let maxPage = currentPage + 1;

    if(currentPage >= 4) {
      minPage = currentPage - 4;
    } else if(currentPage === 3) {
      minPage = currentPage - 3;
    } else if(currentPage === 2) {
      minPage = currentPage - 2;
    }

    if(currentPage + 3 < totalPages) {
      maxPage = currentPage + 3;
    } else if(currentPage + 2 < totalPages - 2) {
      minPage = currentPage + 2;
    } else if(currentPage + 1 < totalPages) {
      minPage = currentPage + 1;
    }

    if(currentPage <= 3) {
      maxPage = 7;
    }

    if(currentPage > totalPages - 4) {
      minPage = totalPages - 7;
      maxPage = totalPages;
    }

    return pages.slice(minPage, maxPage);
  };

  const pagesToShow = calcPagesToShow();

  return (
    <PaginatorContainer>
      <PaginatorNumbers>
        <button type="button" onClick={() => onNumberClick(1)} disabled={currentPage < 2 || inLoading}>
          <FaAngleDoubleLeft size={20} />
        </button>
        <button type="button" onClick={() => onNumberClick(currentPage - 1)} disabled={currentPage < 2 || inLoading}>
          <FaAngleLeft size={20} />
        </button>

        {pagesToShow.map((e) => (
          <button key={e} type="button" className={e === currentPage ? 'current' : ''} disabled={e === currentPage || inLoading} onClick={() => onNumberClick(e)}>
            { e }
          </button>
        ))}

        <button type="button" onClick={() => onNumberClick(currentPage + 1)} disabled={currentPage >= totalPages || inLoading}>
          <FaAngleRight size={20} />
        </button>
        <button type="button" onClick={() => onNumberClick(totalPages)} disabled={currentPage >= totalPages || inLoading}>
          <FaAngleDoubleRight size={20} />
        </button>
      </PaginatorNumbers>

      {leftContent && (
        <div className="right-content">
          {leftContent}
        </div>
      )}
    </PaginatorContainer>
  );
};
