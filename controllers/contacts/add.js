const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  console.log("req.user", req.user._id);
  const contact = await Contact.create({
    ...req.body,
    owner: _id,
    price: 2000,
  });
  console.log("contact", contact);
  res.status(201).json({ contact });
};

module.exports = add;
