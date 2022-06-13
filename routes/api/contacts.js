const express = require("express");
const { joiSchemaContact, joiSchemaStatus } = require("../../models");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { contactsApi: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchemaContact), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  auth,
  validation(joiSchemaContact),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(joiSchemaStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

module.exports = router;
