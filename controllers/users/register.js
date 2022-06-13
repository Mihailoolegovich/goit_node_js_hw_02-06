const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const userPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({ email, password: userPass });

  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

module.exports = register;
