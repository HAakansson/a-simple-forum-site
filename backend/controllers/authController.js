const Encrypt = require("../classes/Encrypt");
const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const login = (req, res) => {
  let body = req.body;

  if (body.password) {
    body.password = Encrypt.multiEncrypt(body.password);
  }

  let query = db.prepare(/*sql*/ `
    SELECT * FROM users
    WHERE email = $email AND password = $password
  `);

  let user = query.get(body) || null;
  if (user) {
    delete user.password;
    req.session.user = user;
  }

  res.json(user);
};

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    res.json({ message: "Logout sucessfull" });
  } else {
    res.json({ message: "No one to logout" });
  }
};

module.exports = {
  login,
  whoami,
  logout,
};
