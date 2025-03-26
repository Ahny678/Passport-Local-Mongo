const crypto = require("crypto");

exports.genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 62, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: passwordHash,
  };
};

exports.validPassword = (password, hash, salt) => {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 1000, 62, "sha512")
    .toString("hex");

  return hash === verifyHash;
};
