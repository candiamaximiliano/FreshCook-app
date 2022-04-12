import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterCreated } from "../../redux/actions/filters";
import Styles from "./Filter.module.css";

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
    <select className={Styles.filter} onChange={(e) => handleFilterCreated(e)}>
      <option value="all" className={Styles.optionSelect}>
        All
      </option>
      <option value="created" className={Styles.optionSelect}>
        Created
      </option>
      <option value="exist" className={Styles.optionSelect}>
        Existentes
      </option>
    </select>
  );
}
