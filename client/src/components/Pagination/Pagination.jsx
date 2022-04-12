import React from "react";
import paginationStyles from "../Pagination/Pagination.module.css";

export default function Pagination({
  recipesPerPage,
  allRecipes,
  paginationNumber,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers?.map((number) => (
        <button key={number} onClick={() => paginationNumber(number)}>
          {number}
        </button>
      ))}
    </nav>
  );
}
