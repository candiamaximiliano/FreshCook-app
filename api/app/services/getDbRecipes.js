const { Recipe, Diet } = require("../config/db.config");

module.exports= async function getDbInfo() {
     return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ['id','name'],
        through: { //comprobacion (mediante)
          attributes: [],
        },
      },
    })
  }