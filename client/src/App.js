import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, /* useLocation, */ NavLink } from "react-router-dom";

import Login from "./pages/Login/Login.component";
import Register from "./pages/Register/Register.component";
import Home from "./pages/Home/Home.component";
import Profile from "./pages/Profile/Profile.component";
import { logout } from "./redux/actions/auth";
// import { clearMessage } from "./redux/actions/message";

import "./App.css";
import LandindPage from "./pages/LandingPage/LandingPage";
import Detail from "./pages/Detail/Detail";

const App = () => {
  const dispatch = useDispatch();
  // const { pathname } = useLocation();

  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //     dispatch(clearMessage()); // clear message when changing location
  // }, [pathname, dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="logoNav-container">
            <NavLink to={"/"} className="navigation">
              FreshFood App
            </NavLink>
          </div>
          {currentUser ? (
            <div className="access-container">
              <li>
                <NavLink to={"/profile"} className="navigation">
                  {currentUser.username}
                </NavLink>
              </li>
              <li>
                <a href="/login" onClick={logOut} className="navigation">
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="access-container">
              <li>
                <NavLink to={"/login"} className="navigation">
                  Login
                </NavLink>
              </li>
              <li>
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
            <Route path="/home" element={<Home />} />
            <Route path='/home/:id' element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;