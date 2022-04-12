import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRecipesByDiets } from "../../redux/actions/filters";
import { getDiets } from "../../redux/actions/recipes";
import Styles from "./Filter.module.css";

export default function FiltroByDiet({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.recipes.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function handleFilterDiet(e) {
    e.preventDefault();

    dispatch(filterRecipesByDiets(e.target.value));

    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <select onChange={(e) => handleFilterDiet(e)} className={Styles.nameFilter}>
      <option key={0} value="all">
        All Diets
      </option>
      {diets?.map((diet) => (
        <option value={diet.name} key={diet.id}>
          {diet.name}
        </option>
      ))}
    </select>
  );
}
