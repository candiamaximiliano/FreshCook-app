import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth";

import Styles from "./Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (/* Object.keys(errors).length > 0 */ true) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return navigate("/profile");
  }

  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginProfilePictureContainer}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className={Styles.loginProfilePicture}
        />
      </div>
      <form className={Styles.formLogin} onSubmit={handleLogin}>
        <div className={Styles.inputLoginContainer}>
          <input
            className={Styles.inputLogin}
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder="Enter your username"
            // validations={[required]}
          />
        </div>
        <div className={Styles.inputLoginContainer}>
          <input
            className={Styles.inputLogin}
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter your password"
            // validations={[required]}
          />
        </div>
        <div>
          <button className={Styles.loginButton} disabled={loading}>
            {loading && <span></span>}
            <span>Login</span>
          </button>
        </div>
        {message && (
          <div>
            <div role="alert">{message}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
