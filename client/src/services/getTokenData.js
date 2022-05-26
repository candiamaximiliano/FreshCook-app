import jwt from "jwt-decode";

const getTokenData = (token) => {
  let data = null;
  try {
    data = jwt(token);
  } catch (error) {
    console.error(error);
    console.log(token);
  }
  return data;
};

export default getTokenData;
