const crypto = require("crypto");
const salt = require("../json/password-salt.json");
// const { performance } = require("perf_hooks"); // If you want to see the time it takes for the operation.

module.exports = class Encrypt {
  // Sha 256-encryption with the built in Node.js module crypto. Crypto has a strange syntax.
  static encrypt(password) {
    return crypto
      .createHmac("sha256", salt) // Choose encryption method and the required salt.
      .update(password) // Encrypts the password
      .digest("hex"); // Form on the return value. Exists several I guess.
  }

  // Multi encryption makes it more cpu-expensive to run a entire wordlist against a stolen database of passwords... But maybe (not implemented) we could be more obsucre by using the last encryption as th salt for the new one - or incorporate an id in the DB as part of the salt, or a combination of things, BUT REMEMBER, obfuscation can always be reverse-enginereed if someone has your source code.
  static multiEncrypt(password, numberOfEncryptions = 999) {
    while (numberOfEncryptions--) {
      // console.log(numberOfEncryptions)
      password = this.encrypt(password);
    }
    return password;
  }
};
