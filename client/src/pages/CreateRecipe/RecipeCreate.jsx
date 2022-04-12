import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";
// import Styles from "../CreatedRecipe/RecipeCreate.module.css";

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required";
  }

  if (!input.image) {
    errors.image = "An image is required";
  }

  if (!input.summary) {
    errors.summary = "Please, complete the summary";
  }

  if (input.score && parseInt(input.score) < 0 && parseInt(input.score) > 100) {
    errors.height = "The score must be between 0 and 100 ";
  }

  if (
    input.healthScore &&
    parseInt(input.healthScore) < 0 &&
    parseInt(input.healthScore) > 100
  ) {
    errors.height = "The healthScore must be between 0 and 100 ";
  }

  return errors;
};

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    dishType: [],
    score: 0,
    healthScore: 0,
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
    }
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== el),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.name &&
      input.image &&
      input.summary &&
      input.dishType &&
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
        dishType: [],
        score: 0,
        healthScore: 0,
        stepByStep: [],
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        diets: [],
      });
      {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } else {
      alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Make your own recipe!</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Upload your image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Write a summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div>
          <label>Dish Type:</label>
          <input
            type="text"
            value={input.dishType}
            name="dishType"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.dishType && <p>{errors.dishType}</p>}
        </div>
        <div>
          <label>Score:</label>
          <input
            type="text"
            value={input.score}
            name="score"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.score && <p>{errors.score}</p>}
        </div>
        <div>
          <label>Health score:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <div>
          <label>Step by step:</label>
          <input
            type="text"
            value={input.stepByStep}
            name="stepByStep"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.stepByStep && <p>{errors.stepByStep}</p>}
        </div>
        <div>
          <label>Vegan:</label>
          <input
            type="text"
            value={input.vegan}
            name="vegan"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>Vegetarian:</label>
          <input
            type="text"
            value={input.vegetarian}
            name="vegetarian"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>Gluten Free:</label>
          <input
            type="text"
            value={input.glutenFree}
            name="glutenFree"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>Diets</label>
          <label>
            <input
              type="checkbox"
              name="lacto vegetarian"
              value="lacto vegetarian"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Lacto Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="ovo vegetarian"
              value="ovo vegetarian"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Ovo Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Lacto Ovo Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Pescatarian
          </label>
          <label>
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Paleolithic
          </label>
          <label>
            <input
              type="checkbox"
              name="dairy free"
              value="dairy free"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Dairy Free
          </label>
          <label>
            <input
              type="checkbox"
              name="primal"
              value="pescaprimaltarian"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Primal
          </label>
          <label>
            <input
              type="checkbox"
              name="whole30"
              value="whole30"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Whole 30
          </label>
          <label>
            <input
              type="checkbox"
              name="ketogenic"
              value="ketogenic"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Ketogenic
          </label>
          <label>
            <input
              type="checkbox"
              name="low fodmap"
              value="low fodmap"
              onChange={(e) => {
                handleCheck(e);
              }}
            />
            Low Fodmap
          </label>
          {errors.diets && <p>{errors.diets}</p>}
        </div>
        {/* {input.diets?.map((diet, index) => (
        <div key={index}>
          <p>{diet}</p>
          <button onClick={() => handleDelete(diet)}>X</button>
        </div>
      ))} */}
        <button type="submit">Create Recipe</button>
        <Link to="/home">
          <button>Back To Home</button>
        </Link>
      </form>
      {success ? <h2>Created Successfully</h2> : null}
      {Object.keys(errors).length > 0 ? <h2>Something went wrong!</h2> : null}
    </div>
  );
}
