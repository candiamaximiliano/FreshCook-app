import api from "./api";
import getTokenData from "./getTokenData";
import TokenService from "./tokenService";

const register = ({ name, lastname, username, email, password, image }) => {
  return api.post("/auth/signup", {
    name,
    lastname,
    username,
    email,
    password,
    image,
  });
};

const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  const clientSessionStorage = JSON.parse(sessionStorage.getItem("user"));
  return getTokenData(clientSessionStorage.accessToken);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
