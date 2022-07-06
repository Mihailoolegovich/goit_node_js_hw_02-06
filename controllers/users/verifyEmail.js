const { User } = require("../../models");
const { madeNewError } = require("../../middlewares");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const findUser = await User.findOne({ verificationToken });
  if (!findUser) {
    madeNewError({
      message: "User not found",
      status: 404,
    });
  }

  await User.findByIdAndUpdate(findUser._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
