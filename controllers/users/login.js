const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { madeNewError } = require("../../middlewares");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  const comparePass = findUser
    ? bcrypt.compareSync(password, findUser.password)
    : false;

  if (!findUser || !findUser.verify || !comparePass) {
    madeNewError({
      message: "Email is wrong or not verify, or password is wrong",
      status: 401,
    });
  }

  const payload = { id: findUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(findUser._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: findUser.subscription,
    },
  });
};

module.exports = login;
