import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth";

import loginStyles from "./Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(username, password))
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return navigate("/profile");
  }

  return (
    <div className={loginStyles.loginBody}>
      <form className={loginStyles.loginForm} onSubmit={handleLogin}>
        <div className={loginStyles.loginTitle}>Welcome</div>
        <div className={loginStyles.loginSubtitle}>Please Login</div>
        <div className={loginStyles.loginInputContainerIc1}>
          <input
            id="username"
            className={loginStyles.loginInput}
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
            autoComplete="off"
          />
          <div className={loginStyles.loginCut}></div>
        </div>
        <div className={loginStyles.loginInputContainerIc2}>
          <input
            id="password"
            className={loginStyles.loginInput}
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            autoComplete="off"
          />
          <div className={loginStyles.loginCut}></div>
        </div>
        <button
          type="text"
          className={loginStyles.loginSubmit}
          disabled={loading}
        >
          {loading && <span></span>}
          <span>Sign In</span>
        </button>
        {message && (
          <div>
            <p className={loginStyles.danger} role="alert">
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
