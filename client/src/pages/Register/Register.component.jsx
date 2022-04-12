import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import Styles from "./Register.module.css";

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
    <div className={Styles.registerContainer}>
      <div className={Styles.RegisterProfilePictureContainer}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className={Styles.RegisterProfilePicture}
        />
      </div>

      <form className={Styles.formRegister} onSubmit={handleRegister}>
        {!successful && (
          <>
            <div className={Styles.inputRegisterContainer}>
              <input
                className={Styles.inputRegister}
                type="text"
                name="username"
                value={username}
                onChange={onChangeUsername}
                placeholder="Enter your username"
                // validations={[required, vusername]}
              />
            </div>

            <div className={Styles.inputRegisterContainer}>
              <input
                className={Styles.inputRegister}
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Enter your email"
                // validations={[required, validEmail]}
              />
            </div>

            <div className={Styles.inputRegisterContainer}>
              <input
                className={Styles.inputRegister}
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Enter your password"
                // validations={[required, vpassword]}
              />
            </div>

            <div>
              <button className={Styles.registerButton}>Sign Up</button>
            </div>
          </>
        )}

        {message && (
          <>
            <div role="alert">{message}</div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
