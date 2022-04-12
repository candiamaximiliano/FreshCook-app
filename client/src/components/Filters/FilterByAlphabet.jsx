import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../redux/actions/filters";
import filterStyles from "./Filter.module.css";

export default function FilterbyAlphabet({ setCurrentPage, setOrder }) {
  const dispach = useDispatch();

  function handleFilter(e) {
    e.preventDefault();
    dispach(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  return (
    <select
      onChange={(e) => {
        handleFilter(e);
      }}
      name="filterAZ"
      id="filterAZ"
      className={filterStyles.nameFilter}
    >
      <option
        defaultValue={true}
        disabled="disabled"
        className={filterStyles.optionSelect}
      >
        Order A - Z
      </option>
      <option value="AZ" className={filterStyles.optionSelect}>
        {" "}
        A - Z
      </option>
      <option value="ZA" className={filterStyles.optionSelect}>
        {" "}
        Z - A
      </option>
    </select>
  );
}
