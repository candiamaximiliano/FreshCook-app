import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterCreated } from "../../redux/actions/filters";
import filterStyles from "./Filter.module.css";

export default function FilterByCreated({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.recipes.diets);

  function handleFilterCreated(e) {
    e.preventDefault();

    dispatch(filterCreated(e.target.value));

    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <select
      className={filterStyles.nameFilter}
      onChange={(e) => handleFilterCreated(e)}
    >
      <option value="all" className={filterStyles.optionSelect}>
        All
      </option>
      <option value="created" className={filterStyles.optionSelect}>
        Created
      </option>
      <option value="exist" className={filterStyles.optionSelect}>
        Existentes
      </option>
    </select>
  );
}
