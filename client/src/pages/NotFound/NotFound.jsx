import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundStyles from "./NotFound.module.css";
import notFoundImage from "../../images/404NotFound.jpg";
import { useSelector } from "react-redux";

export default function LangindPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handlerClick = () => {
    if (!currentUser) {
      return navigate("/login");
    } else {
      return navigate("/home");
    }
  };
  return (
    <div className={notFoundStyles.background404}>
      <img
        className={notFoundStyles.logo404}
        src={notFoundImage}
        alt="Fresh Recipes"
      />
      <button className={notFoundStyles.goBack404} onClick={handlerClick}>
        Go Back
      </button>
    </div>
  );
}
