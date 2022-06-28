const { User } = require("../../models");

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  res.status(200).json({ email: user.email, subscription: user.subscription });
};

module.exports = current;
