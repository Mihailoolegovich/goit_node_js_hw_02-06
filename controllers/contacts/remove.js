const { Contact } = require("../../models");
const { madeNewError } = require("../../middlewares");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    madeNewError({
      message: "Not found",
      status: 404,
    });
  }

  res.json({ message: "contact deleted" });
};

module.exports = remove;
