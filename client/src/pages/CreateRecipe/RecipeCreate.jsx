import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions/recipes";
import { v4 as uuidv4 } from "uuid";
import newRecipeStyles from "./RecipeCreate.module.css";
import { validateName } from "../../helpers/regex";
import api from "../../services/api";
import veganBW from "../../images/VeganBW.png";
import veganColor from "../../images/VeganColor.png";
import vegetarianBW from "../../images/VegetarianBW.png";
import vegetarianColor from "../../images/VegetarianColor.png";
import glutenFreeBW from "../../images/GlutenFreeBW.png";
import glutenFreeColor from "../../images/GlutenFreeColor.png";

export function validate(input) {
  let errors = {};

  // input.name ? (errors.name = "") : (errors.name = "You must name the recipe");

  // input.summary
  //   ? (errors.summary = "")
  //   : (errors.summary = "You must provide a summary");

  // input.diets.length < 1
  //   ? (errors.diets = "Choose at least one diet")
  //   : (errors.diets = "");

  // if (!input.image.includes("https://") && !input.image.includes("http://")) {
  //   errors.image = "This isn't a valid image address";
  // } else {
  //   errors.image = "";
  // }

  // if (input.score < 1 || input.score > 100) {
  //   errors.score = "Number required. Must be a number between 1-100";
  // }
  // if (input.healthScore < 1 || input.healthScore > 100) {
  //   errors.healthScore = "Number required. Must be a number between 1-100";
  // }

  return errors;
}

export default function RecipeCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const diets = useSelector((state) => state.recipes.diets);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    step: "",
    stepByStep: [],
    vegan: false,
    vegetarian: false,
    glutenFree: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.name &&
      input.image &&
      input.summary &&
      input.healthScore &&
      input.stepByStep &&
      input.diets
    ) {
      dispatch(postRecipe(input));
      setSuccess(true);
      // alert("Recipe created correctly");
      setErrors("");
      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: 0,
        step: "",
        stepByStep: [],
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        diets: [],
      });
      navigate("/Home");
    } else {
      // alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // Cargar imagen de tipo File
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("no image selected");

  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(e.target.files[0]?.name);
    var formatImage = e.target.files[0]?.name.split(".");
    setFormat(formatImage[formatImage?.length - 1]);
    await uploadUserFile(e);
  };

  const uploadUserFile = async (e) => {
    const code = uuidv4();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);
    try {
      await api.post(`upload/static/${code}.${format}`, formData);
      setInput({
        ...input,
        image: code + "." + format,
      });
      // alert("Imagen cargada con Exito", "", "success");
    } catch (ex) {
      console.error(ex);
    }
  };

  // const [addSteps, setAddSteps] = useState([1]);

  // let i = 0;
  // const addStep = () => {
  //   i = i + 1;
  //   setAddSteps([...addSteps, i]);
  //   console.log(addSteps);
  // };

  const inputStep = useRef();

  const [deleted, setDeleted] = useState({
    wasDelete: false,
  });

  const addStep = () => {
    setInput({
      ...input,
      stepByStep: [...input.stepByStep, inputStep.current.defaultValue],
      step: "",
    });
    deleted.wasDelete
      ? setDeleted({
          wasDelete: false,
        })
      : console.log(false);
  };

  const deleteStep = (value) => (event) => {
    let stepLength = input.stepByStep.length;
    let index = input.stepByStep.indexOf(value);
    input.stepByStep.splice(index, 1);
    if (stepLength > input.stepByStep.length) {
      setDeleted({
        wasDelete: true,
      });
    }
  };

  const handleVegan = () => {
    input.vegan
      ? setInput({
          ...input,
          vegan: false,
        })
      : setInput({
          ...input,
          vegan: true,
        });
  };
  const handleVegetarian = () => {
    input.vegetarian
      ? setInput({
          ...input,
          vegetarian: false,
        })
      : setInput({
          ...input,
          vegetarian: true,
        });
  };
  const handleGlutenFree = () => {
    input.glutenFree
      ? setInput({
          ...input,
          glutenFree: false,
        })
      : setInput({
          ...input,
          glutenFree: true,
        });
  };

  const fileInput = useRef(null);

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
      <hr className={newRecipeStyles.hr}></hr>
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
        <div className={newRecipeStyles.inputFileContainer}>
          <input
            id="inputTag"
            type="file"
            accept="image/x-png,image/jpeg"
            className={newRecipeStyles.inputFile}
            name="image"
            multiple={false}
            ref={fileInput}
            placeholder="Image"
            onChange={(e) => {
              saveFile(e);
            }}
          />{" "}
          <button
            type="button"
            className={newRecipeStyles.fileButton}
            onClick={() => fileInput.current.click()}
          >
            <i className="fa fa-2x fa-camera"></i> <br />
            <br />
            {uploadSuccess === "no image selected" ? "Select image" : null}{" "}
            {uploadSuccess === "no image selected" ? null : uploadSuccess}{" "}
          </button>
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div className={newRecipeStyles.inputTextAreaContainer}>
          <textarea
            className={newRecipeStyles.inputTextArea}
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
          <label>Health Score:</label>
          <input
            className={newRecipeStyles.input}
            type="range"
            min="0"
            max="100"
            step="1"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Health score"
            autoComplete="off"
          />
          <div className={newRecipeStyles.scoreSpan}>
            <span className={newRecipeStyles.labelDiet}>
              {input.healthScore}
            </span>
          </div>
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <div className={newRecipeStyles.inputContainer}>
          <h3 className={newRecipeStyles.labelDiet}>Directions:</h3>
          <input
            ref={inputStep}
            className={newRecipeStyles.input}
            type="text"
            value={input.step}
            name="step"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Write instruction"
            autoComplete="off"
          />{" "}
          <button
            type="button"
            className={newRecipeStyles.stepButton}
            onClick={addStep}
          >
            Add direction
          </button>
          <ol className={newRecipeStyles.stepList}>
            {input.stepByStep?.map((s, i) => {
              return (
                <>
                  <br key={uuidv4()} />
                  <div
                    className={newRecipeStyles.stepItemContainer}
                    key={uuidv4()}
                  >
                    <div className={newRecipeStyles.buttonItem}>
                      <li className={newRecipeStyles.stepItem} key={uuidv4()}>
                        {s}
                      </li>
                      <button
                        type="button"
                        className={newRecipeStyles.buttonDelete}
                        onClick={deleteStep(s)}
                      >
                        x
                      </button>{" "}
                    </div>
                  </div>
                </>
              );
            })}
          </ol>
          {errors.stepByStep && <p>{errors.stepByStep}</p>}
        </div>
        <label className={newRecipeStyles.labelDiet}>Recipe is:</label>
        <div className={newRecipeStyles.inputContainerDiet}>
          <button
            type="button"
            className={newRecipeStyles.buttonDiet}
            onClick={handleVegan}
          >
            {input.vegan ? (
              <img
                className={newRecipeStyles.imgDiet}
                src={veganColor}
                alt="vegan"
              />
            ) : (
              <img
                className={newRecipeStyles.imgDiet}
                src={veganBW}
                alt="vegan"
              />
            )}
          </button>
          <button
            type="button"
            className={newRecipeStyles.buttonDiet}
            onClick={handleVegetarian}
          >
            {input.vegetarian ? (
              <img
                className={newRecipeStyles.imgDiet}
                src={vegetarianColor}
                alt="vegetarian"
              />
            ) : (
              <img
                className={newRecipeStyles.imgDiet}
                src={vegetarianBW}
                alt="vegetarian"
              />
            )}
          </button>
          <button
            type="button"
            className={newRecipeStyles.buttonDiet}
            onClick={handleGlutenFree}
          >
            {input.glutenFree ? (
              <img
                className={newRecipeStyles.imgDiet}
                src={glutenFreeColor}
                alt="glutenFree"
              />
            ) : (
              <img
                className={newRecipeStyles.imgDiet}
                src={glutenFreeBW}
                alt="glutenFree"
              />
            )}
          </button>
        </div>
        <label className={newRecipeStyles.labelDiet}>Diets</label>
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
