import React from "react";
import { Pagination } from "react-bootstrap";

export default function JobPagination({ page, setPage }) {
  const isFirstPage = page === 1;
  const isSecondOrLesserPage = page <= 2;
  const isLastPage = false;
  return (
    <Pagination>
      <Pagination.Prev hidden={isFirstPage} />
      <Pagination.Item hidden={isFirstPage}>1</Pagination.Item>
      <Pagination.Ellipsis hidden={isSecondOrLesserPage} />
      <Pagination.Item hidden={isSecondOrLesserPage}>
        {page - 1}
      </Pagination.Item>

      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Item hidden={isLastPage}>{page + 1}</Pagination.Item>
      <Pagination.Next hidden={isLastPage} />
    </Pagination>
  );
}
