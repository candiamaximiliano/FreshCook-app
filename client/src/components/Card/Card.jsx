import React from "react";
import cardStyles from "../Card/Card.module.css";

export default function Card({ name, image, score, diets, id }) {
  return (
    <div key={id} className={cardStyles.container}>
      <div className={cardStyles.imageContainer}>
        <img className={cardStyles.image} src={image} alt="content not found" />
      </div>
      <h3 className={cardStyles.title}>{name}</h3>
      <h5 className={cardStyles.score}>Score: {score}</h5>
      <ul className={cardStyles.listDiets}>
        {diets?.map((diet, index) => (
          <li className={cardStyles.diet} key={index}>
            {diet}
          </li>
        ))}
      </ul>
    </div>
  );
}
