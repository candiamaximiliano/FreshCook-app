import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import registerStyles from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({});

  const { message } = useSelector((state) => state.message);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    if (/* Object.keys(errors).length > 0 */ true) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
          navigate("/login");
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className={registerStyles.registerBody}>
      <form className={registerStyles.registerForm} onSubmit={handleRegister}>
        {!successful && (
          <>
            <div className={registerStyles.registerTitle}>Welcome</div>
            <div className={registerStyles.registerSubtitle}>
              Let's create your account!
            </div>
            <div className={registerStyles.registerInputContainerIc1}>
              <input
                id="username"
                className={registerStyles.registerInput}
                type="text"
                name="username"
                value={username}
                onChange={onChangeUsername}
                placeholder=" Username "
                autoComplete="off"
              />
              <div className={registerStyles.registerCut}></div>
            </div>
            <div className={registerStyles.registerInputContainerIc2}>
              <input
                id="email"
                className={registerStyles.registerInput}
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Email"
                autoComplete="off"
              />
              <div className={registerStyles.registerCutShort}></div>
            </div>
            <div className={registerStyles.registerInputContainerIc2}>
              <input
                id="password"
                className={registerStyles.registerInput}
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
                autoComplete="off"
              />
              <div className={registerStyles.registerCut}></div>
            </div>
            <button type="text" className={registerStyles.registerSubmit}>
              Sign Up
            </button>
          </>
        )}
        {message && (
          <div>
            <div role="alert">{message}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
