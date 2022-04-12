import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions/recipes";
import { useDispatch, useSelector } from "react-redux";

import newRecipeStyles from "./RecipeCreate.module.css";

function validate(input) {
  let errors = {};
  input.name ? (errors.name = "") : (errors.name = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const diets = useSelector((state) => state.recipes.diets);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    score: "",
    healthScore: "",
    stepByStep: [],
    vegan: "",
    vegetarian: "",
    glutenFree: "",
    diets: [],
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else {
      const diets = input.diets.filter((diet) => {
        return diet !== e.target.value;
      });
      setInput({
        ...input,
        diets: diets,
      });
    }
  };

  // const handleDelete = (el) => {
  //   setInput({
  //     ...input,
  //     diets: input.diets.filter((diet) => diet !== el),
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.name &&
      input.image &&
      input.summary &&
      input.score &&
      input.healthScore &&
      input.stepByStep &&
      input.diets
    ) {
      dispatch(postRecipe(input));
      setSuccess(true);
      alert("Recipe created correctly");
      setErrors("");
      setInput({
        name: "",
        image: "",
        summary: "",
        score: "",
        healthScore: "",
        stepByStep: [],
        vegan: "",
        vegetarian: "",
        glutenFree: "",
        diets: [],
      });
    } else {
      alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={newRecipeStyles.container}>
      <header className={newRecipeStyles.header}>
        <h1 className={newRecipeStyles.title}>
          <strong>
            {currentUser.username.charAt(0).toUpperCase() +
              currentUser.username.slice(1)}
          </strong>{" "}
          make your own recipe!
        </h1>
      </header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className={newRecipeStyles.form}
      >
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Name"
            autoComplete="off"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Image's URL"
            autoComplete="off"
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text-area"
            value={input.summary}
            name="summary"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Write a summary"
            autoComplete="off"
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text"
            value={input.score}
            name="score"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Score"
            autoComplete="off"
          />
          {errors.score && <p>{errors.score}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Health score"
            autoComplete="off"
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <input
            className={newRecipeStyles.input}
            type="text"
            value={input.stepByStep}
            name="stepByStep"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Step by step"
            autoComplete="off"
          />
          {errors.stepByStep && <p>{errors.stepByStep}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <label>Vegan:</label>
          <select
            name="vegan"
            rows="5"
            onChange={(e) => {
              handleChange(e);
            }}
            className={newRecipeStyles.select}
          >
            <option value={true} className={newRecipeStyles.optionSelect}>
              True
            </option>
            <option value={false} className={newRecipeStyles.optionSelect}>
              False
            </option>
          </select>
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <label>Vegetarian:</label>
          <select
            name="vegetarian"
            onChange={(e) => {
              handleChange(e);
            }}
            className={newRecipeStyles.select}
          >
            <option value={true} className={newRecipeStyles.optionSelect}>
              True
            </option>
            <option value={false} className={newRecipeStyles.optionSelect}>
              False
            </option>
          </select>
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <label>Gluten Free:</label>
          <select
            name="glutenFree"
            onChange={(e) => {
              handleChange(e);
            }}
            className={newRecipeStyles.select}
          >
            <option value={true} className={newRecipeStyles.optionSelect}>
              True
            </option>
            <option value={false} className={newRecipeStyles.optionSelect}>
              False
            </option>
          </select>
        </div>
        <label>Diets</label>
        <div className={newRecipeStyles.checkboxContainer}>
          {diets?.map((diet) => (
            <label key={diet.id + "label"}>
              <input
                className={newRecipeStyles.checkbox}
                type="checkbox"
                name={diet.name}
                value={diet.name}
                key={diet.id + "diet"}
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              {diet.name.charAt(0).toUpperCase() + diet.name.slice(1)}
            </label>
          ))}
        </div>
        {/* {input.diets?.map((diet, index) => (
        <div key={index}>
          <p>{diet}</p>
          <button onClick={() => handleDelete(diet)}>X</button>
        </div>
      ))} */}
        <button className={newRecipeStyles.button} type="submit">
          Create Recipe
        </button>
        <Link to="/home">
          <button className={newRecipeStyles.button}>Back To Home</button>
        </Link>
      </form>
      {success ? (
        <h2 className={newRecipeStyles.message}>Created Successfully</h2>
      ) : null}
      {Object.keys(errors).length > 0 ? (
        <h2 className={newRecipeStyles.message}>Something went wrong!</h2>
      ) : null}
    </div>
  );
}
