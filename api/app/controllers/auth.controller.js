const Op = require("sequelize").Op;
const config = require("../config/auth.config");
const { User, Role, RefreshToken } = require("../config/db.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  const { fotoDePerfil, nombre, apellido, usuario, email, contraseña } =
    req.body;

  User.create({
    fotoDePerfil,
    nombre,
    apellido,
    usuario,
    email,
    contraseña: bcrypt.hashSync(contraseña, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      usuario: req.body.usuario,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.contraseña,
        user.contraseña
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      let authorities = [];
      await user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
      });
      const token = jwt.sign(
        {
          id: user.id,
          fotoDePerfil: user.fotoDePerfil,
          usuario: user.usuario,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          roles: authorities,
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );
      let refreshToken = await RefreshToken.createToken(user);
      res.status(200).send({
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign(
      {
        id: user.id,
        fotoDePerfil: user.fotoDePerfil,
        usuario: user.usuario,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        roles: authorities,
      },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
