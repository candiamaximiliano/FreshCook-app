const { mv } = require("express-fileupload");

const saveImage = (req, res, next) => {
  let { code } = req.params;
  try {
    let File = req.files.file;
    File.mv(`./assets/static/${code}`, (err) => {
      if (err) return res.status(500).send({ message: err });

      return res.status(200).send({ message: "File upload" });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  saveImage,
};
