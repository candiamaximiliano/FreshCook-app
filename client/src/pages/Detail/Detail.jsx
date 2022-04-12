import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDetail } from "../../redux/actions";
import detailStyles from "./Detail.module.css";
import glutenFreeColor from "../../images/GlutenFreeColor.png";
import glutenFreeBW from "../../images/GlutenFreeColor.png";
import vegetarianColor from "../../images/VegetarianColor.png";
import vegetarianBW from "../../images/VegetarianBW.png";
import veganColor from "../../images/VeganColor.png";
import veganBW from "../../images/VeganBW.png";

export default function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    //   dispatch(getDetail(id));
    // }, []);
    axios.get("http://localhost:3001/recipes/" + id).then((response) => {
      setDetails(response.data);
    });
    // return () => {
    //   setDetails(null);
    // };
  }, []);

  // const details = useSelector((state) => state.detail);

  return (
    <div className={detailStyles.detailContainer}>
      <h1 className={detailStyles.title}>{details.name}</h1>
      <img
        className={detailStyles.imageRecipe}
        src={details.image}
        alt="content not found"
      />
      <div className={detailStyles.subtitleContainer}>
        <h3 className={detailStyles.subtitle}>Summary:</h3>
      </div>
      <div className={detailStyles.parragraphContainer}>
        <p
          className={detailStyles.parragraph}
          dangerouslySetInnerHTML={{ __html: details.summary }}
        ></p>
      </div>
      <div className={detailStyles.subtitleContainer}>
        <h3 className={detailStyles.subtitle}>Dish Types:</h3>
      </div>
      <ul className={detailStyles.uList}>
        {details.dishTypes?.map((dish, index) => (
          <li className={detailStyles.dishItem} key={index}>
            {dish}
          </li>
        ))}
      </ul>
      <div className={detailStyles.subtitleContainer}>
        <h3 className={detailStyles.subtitle}>Score:</h3>
      </div>
      <div className={detailStyles.parragraphContainer}>
        <p className={detailStyles.parragraph}>{details.score}</p>
      </div>
      <div className={detailStyles.subtitleContainer}>
        <h3 className={detailStyles.subtitle}>Health Score:</h3>
      </div>
      <div className={detailStyles.parragraphContainer}>
        <p className={detailStyles.parragraph}>{details.healthScore}</p>
      </div>
      <section className={detailStyles.stepSection}>
        <div className={detailStyles.subtitleContainer}>
          <h3 className={detailStyles.subtitle}>Step By Step:</h3>
        </div>
        <ol className={detailStyles.stepsList}>
          {details.stepByStep?.map((step, index) => (
            <li className={detailStyles.step} key={index}>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <div className={detailStyles.subtitleContainer}>
        <h3 className={detailStyles.subtitle}>Diets:</h3>
      </div>
      <section className={detailStyles.logoSection}>
        {details.vegetarian ? (
          <img
            className={detailStyles.logo}
            src={vegetarianColor}
            alt="content not found"
          />
        ) : (
          <img
            className={detailStyles.logo}
            src={vegetarianBW}
            alt="content not found"
          />
        )}
        {details.vegan ? (
          <img
            className={detailStyles.logo}
            src={veganColor}
            alt="content not found"
          />
        ) : (
          <img
            className={detailStyles.logo}
            src={veganBW}
            alt="content not found"
          />
        )}
        {details.glutenFree ? (
          <img
            className={detailStyles.logo}
            src={glutenFreeColor}
            alt="content not found"
          />
        ) : (
          <img
            className={detailStyles.logo}
            src={glutenFreeBW}
            alt="content not found"
          />
        )}
      </section>
      <ul className={detailStyles.dietsList}>
        {details.diets?.map((diet, index) => (
          <li className={detailStyles.dietItem} key={index}>
            {diet}
          </li>
        ))}
      </ul>
      <div className={detailStyles.goBackContainer}>
        <Link to="/home">
          <span className={detailStyles.goBack}>Go back</span>
        </Link>
      </div>
    </div>
  );
}
