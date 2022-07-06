const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers");
const { madeNewError } = require("../../middlewares");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    madeNewError({
      message: "Email in use",
      status: 409,
    });
  }

  const avatarURL = gravatar.url(email);
  const userPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = v4();

  const newUser = await User.create({
    email,
    password: userPass,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: "Confirm mail",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Click to confirm</a>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    user: { email, subscription: newUser.subscription, verificationToken },
  });
};

module.exports = register;
