const madeNewError = (data) => {
  const { message, status: statusError } = data;
  const error = new Error(message);
  error.status = statusError;
  throw error;
};

module.exports = madeNewError;
