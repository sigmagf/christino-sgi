import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import {
  RiArrowLeftSLine as IconArrowLeft,
  RiArrowLeftSFill as IconArrowLeftFill,
  RiArrowRightSLine as IconArrowRight,
  RiArrowRightSFill as IconArrowRightFill,
} from 'react-icons/ri';

import { Select } from '../Form';
import { Paginator, PaginatorNumbers } from './styles';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onNumberClick: (n: number) => void;
  onMaxResultsChange: (n: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onNumberClick,
  onMaxResultsChange,
}) => {
  const formRef = useRef<FormHandles>(null);

  const pages: number[] = [];

  for(let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  const calcPagesToShow = () => {
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
    console.log('changed');
    onMaxResultsChange(parseInt(data.resultsPerPage, 10));
  };

  return (
    <Paginator>
      <PaginatorNumbers>
        <button type="button" onClick={() => onNumberClick(1)} disabled={currentPage < 2}>
          <IconArrowLeftFill size={20} />
        </button>
        <button type="button" onClick={() => onNumberClick(currentPage - 1)} disabled={currentPage < 2}>
          <IconArrowLeft size={20} />
        </button>

        {pagesToShow.map((e) => (
          <button
            key={e}
            type="button"
            className={e === currentPage ? 'current' : ''}
            disabled={e === currentPage}
            onClick={() => onNumberClick(e)}
          >
            { e }
          </button>
        ))}

        <button type="button" onClick={() => onNumberClick(currentPage + 1)} disabled={currentPage >= totalPages}>
          <IconArrowRight size={20} />
        </button>
        <button type="button" onClick={() => onNumberClick(totalPages)} disabled={currentPage >= totalPages}>
          <IconArrowRightFill size={20} />
        </button>
      </PaginatorNumbers>

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
          onMenuClose={() => formRef.current?.submitForm()}
        />
      </Form>
    </Paginator>
  );
};
