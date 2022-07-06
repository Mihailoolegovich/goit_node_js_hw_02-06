const { Contact } = require("../../models");
const { madeNewError } = require("../../middlewares");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!contact) {
    madeNewError({
      message: "Not found",
      status: 404,
    });
  }

  res.json({ contact });
};

module.exports = updateStatusContact;
