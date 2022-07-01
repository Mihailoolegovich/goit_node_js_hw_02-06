const jwt = require("jsonwebtoken");
const { User } = require("../models");
const madeNewError = require("./madeNewError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      madeNewError({
        message: "Not authorized",
        status: 401,
      });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      madeNewError({
        message: "Not authorized",
        status: 401,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
