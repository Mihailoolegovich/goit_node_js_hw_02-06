const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  const findEl =
    favorite === undefined ? { owner: _id } : { owner: _id, favorite };

  const contact = await Contact.find(findEl, "", {
    skip,
    limit: Number(limit),
  });

  res.json({ contact });
};

module.exports = getAll;
