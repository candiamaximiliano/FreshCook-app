import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import profileStyles from "./Profile.module.css";
import profilePicture from "../../images/profilePicture.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return navigate("/login");
  }
  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.card}>
        <img
          className={profileStyles.profilePicture}
          src={profilePicture}
          alt="profilePicture"
        />
        <header className={profileStyles.header}>
          <h3 className={profileStyles.username}>
            <strong>
              {currentUser.username.charAt(0).toUpperCase() +
                currentUser.username.slice(1) +
                "\nProfile"}
            </strong>
          </h3>
        </header>
        <p className={profileStyles.email}>
          <strong>Email:</strong> {currentUser?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
