import React from "react";
import { useDispatch } from "react-redux";
import { orderByScore } from "../../redux/actions/filters";
import filterStyles from "./Filter.module.css";

export default function FilterByScore({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();

  function handleChangeFilter(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <select
      onChange={(e) => handleChangeFilter(e)}
      className={filterStyles.nameFilter}
      defaultValue
    >
      <option defaultValue={true} disabled="disabled">
        {" "}
        Order By Score
      </option>
      <option value="LESS">Order less score</option>
      <option value="HIGH">Order higher score</option>
    </select>
  );
}
