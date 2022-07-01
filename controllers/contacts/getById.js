const { Contact } = require("../../models");
const { madeNewError } = require("../../middlewares");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    madeNewError({
      message: "Not found",
      status: 404,
    });
  }

  res.json({ contact });
};

module.exports = getById;
