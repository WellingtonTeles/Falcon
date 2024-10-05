import React from "react"
import styled from "styled-components"
import Button from "./button";
import {useState, useEffect} from 'react';

export default function Pagination(props) {
  const {pos, total, onPageChange, rows = 10} = props;
  const [currentPage, setCurrentPage] = useState(pos);
  useEffect(() => {
    setCurrentPage(pos === 0 ? 1: pos);
  }, [pos]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 2; // Adjust this value to set how many page numbers to show on each side of the current page.

    for (let i = Math.max(1, currentPage - range); i <= Math.min(total === 0 ? 1 : Math.ceil(total / rows), currentPage + range); i++) {
      pageNumbers.push(
        <div key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </div>
      );
    }

    return pageNumbers;
  };

  return (<PaginationWrapper>
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <Button  title="Previous" icon="arrowLeft" outline href="#" onClickBtn={() => {
          if (currentPage > 1)
            handlePageClick(currentPage - 1)
          }} />
      </li>
      <li className={`page-item`} style={{display:'flex'}}>
      {renderPageNumbers()}
      </li>
      <li className={`page-item ${currentPage === total ? 'disabled' : ''}`}>
        <Button title="Next" icon="arrowRight" outline href="#" onClickBtn={() => {
          if (currentPage < Math.min(total == 0 ? 1 : Math.ceil(total / rows), currentPage + 2))
            handlePageClick(currentPage + 1)
        }} />
      </li>
    </ul>
  </PaginationWrapper>)
}
const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  ul.pagination {
    width: 100%;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 0px;
    li.page-item a {
      border: 0px;
      color: var(--gray-800, #1D2939);
      text-align: center;
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
      background: white;
    }
    li.page-item.active a {
      border-radius: 8px;
      background: var(--gray-50, #F9FAFB);
    }
  }
`
