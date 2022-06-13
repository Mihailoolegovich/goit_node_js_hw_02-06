const { User } = require("../../models");

const patchUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({ email: user.email, subscription: user.subscription });
};

module.exports = patchUser;
