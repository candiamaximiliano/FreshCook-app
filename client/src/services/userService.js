import api from './api';

const getPublicContent = () => {
  return api.get("/user/test/all");
};

const getUserBoard = () => {
  return api.get("/user/test/user");
};

const getModeratorBoard = () => {
  return api.get("/user/test/mod");
};

const getAdminBoard = () => {
  return api.get("/user/test/admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;