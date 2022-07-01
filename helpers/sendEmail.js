const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: "mihailoolegovich@gmail.com" };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
