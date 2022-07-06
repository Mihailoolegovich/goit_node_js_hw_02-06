const { User } = require("../../models");
const sendEmail = require("../../helpers");
const { madeNewError } = require("../../middlewares");

const verifyEmailAgain = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    madeNewError({
      message: "Missing required field email",
      status: 400,
    });
  }

  const findUser = await User.findOne({ email });
  if (!findUser) {
    madeNewError({
      message: "User not found",
      status: 404,
    });
  }

  const { verificationToken, verify } = findUser;
  if (verify) {
    madeNewError({
      message: "Verification has already been passed",
      status: 400,
    });
  }

  const msg = {
    to: email,
    subject: "Confirm mail",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Click to confirm</a>`,
  };

  await sendEmail(msg);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyEmailAgain;
