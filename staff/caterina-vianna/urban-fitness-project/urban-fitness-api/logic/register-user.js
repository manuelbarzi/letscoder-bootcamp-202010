const {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
} = require("./helpers/validations");
const semaphore = require("./helpers/semaphore");
const { ConflictError } = require("../errors");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");

module.exports = function (firstName, lastName, email, password) {
  validateFirstName(firstName);
  validateLastName(lastName);
  validateEmail(email);
  validatePassword(password);

  return semaphore(() =>
    User.findOne({ email })
      .then((user) => {
        if (user)
          throw new ConflictError(
            `user with e-mail ${email} already registered`
          );

        return bcryptjs.hash(password, 10);
      })
      .then((hash) =>
        User.create({ firstName, lastName, email, password: hash })
      )
      .then(() => {})
  );
};
