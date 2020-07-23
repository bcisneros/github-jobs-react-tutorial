import React from "react";
import { Pagination } from "react-bootstrap";

export default function JobPagination({ page, setPage, isLastPage }) {
  const isFirstPage = page === 1;
  const isSecondOrLesserPage = page <= 2;

  const adjustPage = amount => {
    setPage(prevPage => prevPage + amount);
  };

  return (
    <Pagination>
      <Pagination.Prev hidden={isFirstPage} onClick={() => adjustPage(-1)} />
      <Pagination.Item hidden={isFirstPage} onClick={() => adjustPage(1)}>
        1
      </Pagination.Item>
      <Pagination.Ellipsis hidden={isSecondOrLesserPage} />
      <Pagination.Item
        hidden={isSecondOrLesserPage}
        onClick={() => adjustPage(1)}
      >
        {page - 1}
      </Pagination.Item>

      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Item hidden={isLastPage} onClick={() => adjustPage(1)}>
        {page + 1}
      </Pagination.Item>
      <Pagination.Next hidden={isLastPage} onClick={() => adjustPage(1)} />
    </Pagination>
  );
}
