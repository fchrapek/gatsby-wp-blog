import { Link } from "gatsby";
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  /* border: 2px solid blue; */

  a {
    &[disabled] {
    opacity: .4;
    pointer-events: none;
  }
  }

`

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  console.log(totalPages)
  console.log(nextPage)

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>Prev</Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link className={currentPage === 1 && i === 0 ? 'current' : ''} to={`${base}/${i > 0 ? i + 1 : ''}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>Next</Link>
    </PaginationStyles>
  );
}
