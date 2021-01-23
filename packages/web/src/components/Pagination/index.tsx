import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

import { Select } from '../Form';
import { Paginator, PaginatorNumbers } from './styles';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  inLoading: boolean;
  onNumberClick: (n: number) => void;
  onMaxResultsChange: (n: number) => void;
  overrideMaxResultsBy?: JSX.Element;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const { currentPage, totalPages, inLoading, onNumberClick, onMaxResultsChange, overrideMaxResultsBy } = props;
  const formRef = useRef<FormHandles>(null);

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

  const onSubmit: SubmitHandler<{resultsPerPage: string}> = (data) => {
    onMaxResultsChange(parseInt(data.resultsPerPage, 10));
  };

  return (
    <Paginator>
      <PaginatorNumbers>
        <button
          type="button"
          onClick={() => onNumberClick(1)}
          disabled={currentPage < 2 || inLoading}
        >
          <FaAngleDoubleLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => onNumberClick(currentPage - 1)}
          disabled={currentPage < 2 || inLoading}
        >
          <FaAngleLeft size={20} />
        </button>

        {pagesToShow.map((e) => (
          <button
            key={e}
            type="button"
            className={e === currentPage ? 'current' : ''}
            disabled={e === currentPage || inLoading}
            onClick={() => onNumberClick(e)}
          >
            { e }
          </button>
        ))}

        <button
          type="button"
          onClick={() => onNumberClick(currentPage + 1)}
          disabled={currentPage >= totalPages || inLoading}
        >
          <FaAngleRight size={20} />
        </button>
        <button
          type="button"
          onClick={() => onNumberClick(totalPages)}
          disabled={currentPage >= totalPages || inLoading}
        >
          <FaAngleDoubleRight size={20} />
        </button>
      </PaginatorNumbers>

      {overrideMaxResultsBy ? (
        <div className="right-content">
          {overrideMaxResultsBy}
        </div>
      ) : (
        <Form ref={formRef} onSubmit={onSubmit} className="page-results-count">
          Resultados por pagina:
          <Select
            name="resultsPerPage"
            defaultValue={{ label: '10', value: '10' }}
            options={[
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '30', value: '30' },
              { label: '40', value: '40' },
              { label: '50', value: '50' },
            ]}
            isDisabled
            onBlur={() => formRef.current?.submitForm()}
          />
        </Form>
      )}
    </Paginator>
  );
};
