const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({
    ...req.body,
    owner: _id,
    price: 2000,
  });

  res.status(201).json({ contact });
};

module.exports = add;
