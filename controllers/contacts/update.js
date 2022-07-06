const { Contact } = require("../../models");
const { madeNewError } = require("../../middlewares");

const update = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;

  const contact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });

  if (!contact) {
    madeNewError({
      message: "Not found",
      status: 404,
    });
  }

  res.json({ contact });
};

module.exports = update;
