import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";
import FilterByAlphabet from "../../components/Filters/FilterByAlphabet";
import FilterByDiet from "../../components/Filters/FilterByDiet";
import FilterByCreated from "../../components/Filters/FilterByCreated";
import FilterByScore from "../../components/Filters/FilterByScore";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
// import Detail from "../../pages/Detail/Detail";
import { getAllRecipes } from "../../redux/actions/recipes";

import Styles from "./Home.module.css";
import reloadIcon from "../../images/autorenew_white_24dp.svg";

const Home = () => {
  const dispatch = useDispatch();

  //Una vez montado el componente traigo todas las recetas:
  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  //Me traigo todo el estado recipes
  const allRecipes = useSelector((state) => state.recipes.recipes);

  //currentPage para que si cambio de página el home se vuelva a renderizar:
  const [currentPage, setCurrentPage] = useState(1);

  //order para que el home se vuelva a renderizar si se cambia el filtro o el orden:
  const [order, setOrder] = useState("");

  //Lógica para que la pagina sepa cuantas recetas mostrar por página:
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginationNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  const helper = (arr) => {
    let result = [];
    arr?.map((el) => {
      return result.push(el.name);
    });
    return result;
  };

  return (
    <div className={Styles.homeContainer}>
      <div className={Styles.navContainer}>
        <div className={Styles.newRecipeButtonContainer}>
          <Link to="/recipe">
            <p className={Styles.newRecipeButton}>Create Your Own Recipe!</p>
          </Link>
        </div>
        <SearchBar />
        <button
          className={Styles.reloadButton}
          onClick={(e) => {
            handlerClick(e);
          }}
        >
          <img
            className={Styles.reloadIcon}
            src={reloadIcon}
            alt="reloadIcon"
          />
        </button>
      </div>
      <div className={Styles.filters}>
        <FilterByAlphabet setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <FilterByDiet setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <FilterByScore setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <FilterByCreated setCurrentPage={setCurrentPage} setOrder={setOrder} />
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginationNumber={paginationNumber}
      />
      <div className={Styles.cardsContainer}>
        {currentRecipes?.map((recipe, index) => {
          if (recipe.createdInDb) {
            return (
              <div key={index} className={Styles.cardRecipe}>
                <Link key={index} to={"/home/" + recipe.id}>
                  <Card
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    score={recipe.score}
                    diets={helper(recipe.diets)}
                  />
                </Link>
              </div>
            );
          } else {
            return (
              <div key={index} className={Styles.cardRecipe}>
                <Link key={index} to={"/home/" + recipe.id}>
                  <Card
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    score={recipe.score}
                    diets={recipe.diets?.map((diet) => {
                      return diet;
                    })}
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
