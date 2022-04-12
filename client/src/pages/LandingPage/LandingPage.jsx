import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import landingPageStyles from "./LandingPage.module.css";
import logo from "../../logo.svg";

export default function LandindPage() {
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
    <div className={landingPageStyles.background}>
      <img className={landingPageStyles.logo} src={logo} alt="Fresh Recipes" />
      <button className={landingPageStyles.buttonLogin} onClick={handlerClick}>
        Login
      </button>
    </div>
  );
}
