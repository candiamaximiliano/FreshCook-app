// import jwt from "jsonwebtoken";

const jwt = {
  decode: "",
};

const getTokenData = (token) => {
  let data = null;
  try {
    data = jwt.decode(token);
  } catch (error) {
    console.error(error);
  }
  return data;
};

export default getTokenData;
