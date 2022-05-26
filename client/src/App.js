import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Protected from "./Routes/Protected";

import Login from "./pages/Login/Login.component";
import Register from "./pages/Register/Register.component";
import Home from "./pages/Home/Home.component";
import RecipeCreate from "./pages/CreateRecipe/RecipeCreate";
import Profile from "./pages/Profile/Profile.component";
import LandindPage from "./pages/LandingPage/LandingPage";
import Detail from "./pages/Detail/Detail";
import NotFound from "./pages/NotFound/NotFound";
import { logout } from "./redux/actions/auth";
import logoutIcon from "./images/logout_black_24dp.svg";
import accountCircle from "./images/account_circle_black_24dp.svg";
import freshCookLogo from "./images/banner.svg";
import Unauthorized from "./pages/Unauthorized";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="logoNav-container">
            <NavLink to={"/home"} className="navigation">
              <img
                className="freshCookLogo"
                src={freshCookLogo}
                alt="freshCookLogo"
              />
            </NavLink>
          </div>
          {currentUser ? (
            <div className="access-container">
              <li className="item-container">
                <NavLink to={"/profile"} className="navigation">
                  <img
                    className="accountCircle"
                    src={accountCircle}
                    alt="accountCircle"
                  />
                  {currentUser.username.charAt(0).toUpperCase() +
                    currentUser.username.slice(1)}
                </NavLink>
              </li>
              <li className="item-container">
                <a href="/login" onClick={logOut} className="navigation">
                  <img src={logoutIcon} alt="logoutIcon" />
                </a>
              </li>
            </div>
          ) : (
            <div className="access-container">
              <li className="item-container">
                <NavLink to={"/login"} className="navigation">
                  Sing In
                </NavLink>
              </li>
              <li className="item-container">
                <NavLink to={"/register"} className="navigation">
                  Sign Up
                </NavLink>
              </li>
            </div>
          )}
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<LandindPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route
              element={
                <Protected allowedRoles={[process.env.REACT_APP_USER]} />
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/home/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recipe" element={<RecipeCreate />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
