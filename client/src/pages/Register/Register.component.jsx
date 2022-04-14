import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth";

import { validUsername, validEmail, validPassword } from "../../helpers/regex";
import registerStyles from "./Register.module.css";

export function validate(input) {
  let errors = {};

  if (!input.username) {
    errors.username = "Username is required";
  }
  if (!validUsername.test(input.username)) {
    errors.usernameRegex =
      "Username must be al least 3 characters and maximum 15 characters";
  }
  if (!input.email) {
    errors.email = "Email is required";
  }
  if (!validEmail.test(input.email)) {
    errors.emailRegex = "Please, put a valid email";
  }
  if (!input.password) {
    errors.password = "Please, enter a password";
  }
  // if (!validPassword.test(input.password)) {
  //   errors.passwordRegex =
  //     "Password must be minimum eight characters, at least one letter, one number and one special character:";
  // }

  return errors;
}

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
    setErrors(
      validate({
        ...username,
        [e.target.name]: e.target.value,
      })
    );

    const username2 = e.target.value;
    setUsername(username2);
  };
  const onChangeEmail = (e) => {
    setErrors(
      validate({
        ...email,
        [e.target.name]: e.target.value,
      })
    );

    const email2 = e.target.value;
    setEmail(email2);
  };
  const onChangePassword = (e) => {
    setErrors(
      validate({
        ...password,
        [e.target.name]: e.target.value,
      })
    );
    const password2 = e.target.value;
    setPassword(password2);
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
                className={
                  errors.username
                    ? registerStyles.danger
                    : registerStyles.registerInput
                }
                type="text"
                name="username"
                value={username}
                onChange={onChangeUsername}
                placeholder=" Username "
                autoComplete="off"
              />
              {errors.username && (
                <p className={registerStyles.errorDanger}>{errors.username}</p>
              )}
              {errors.usernameRegex && (
                <p className={registerStyles.errorDanger}>
                  {errors.usernameRegex}
                </p>
              )}
              <div className={registerStyles.registerCut}></div>
            </div>
            <div className={registerStyles.registerInputContainerIc2}>
              <input
                id="email"
                className={
                  errors.username
                    ? registerStyles.danger
                    : registerStyles.registerInput
                }
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Email"
                autoComplete="off"
              />
              {errors.email && (
                <p className={registerStyles.errorDanger}>{errors.email}</p>
              )}
              {errors.emailRegex && (
                <p className={registerStyles.errorDanger}>
                  {errors.emailRegex}
                </p>
              )}
              <div className={registerStyles.registerCutShort}></div>
            </div>
            <div className={registerStyles.registerInputContainerIc2}>
              <input
                id="password"
                className={
                  errors.username
                    ? registerStyles.danger
                    : registerStyles.registerInput
                }
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
                autoComplete="off"
              />
              {errors.password && (
                <p className={registerStyles.errorDanger}>{errors.password}</p>
              )}
              {errors.passwordRegex && (
                <p className={registerStyles.errorDanger}>
                  {errors.passwordRegex}
                </p>
              )}
              <div className={registerStyles.registerCut}></div>
            </div>
            <button
              type="submit"
              onSubmit={handleRegister}
              disabled={Object.keys(errors).length > 0}
              className={registerStyles.registerSubmit}
            >
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
