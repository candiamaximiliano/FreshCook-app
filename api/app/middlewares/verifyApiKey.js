const config = require("../config");

let apiKey = `${config.keyFoodApi.firstKey}`;

const verifyApiKey = (data = { status: 200 }) => {
  if (data.status !== 200) {
    if (apiKey === `${config.keyFoodApi.firstKey}`) {
      apiKey = `${config.keyFoodApi.secondKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.secondKey}`) {
      apiKey = `${config.keyFoodApi.thirdKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.thirdKey}`) {
      apiKey = `${config.keyFoodApi.fourthKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.fourthKey}`) {
      apiKey = `${config.keyFoodApi.fifthKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.fifthKey}`) {
      apiKey = `${config.keyFoodApi.sixthKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.sixthKey}`) {
      apiKey = `${config.keyFoodApi.seventhKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.seventhKey}`) {
      apiKey = `${config.keyFoodApi.eighthKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    if (apiKey === `${config.keyFoodApi.eighthKey}`) {
      apiKey = `${config.keyFoodApi.firstKey}`;
      console.log("se cambió la apiKey: ", apiKey);
      return apiKey;
    }
    return apiKey;
  }
  return apiKey;
};

module.exports = verifyApiKey;
