const Encrypt = require("../classes/Encrypt");
const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

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

const registerUser = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT email FROM users WHERE email = $email
  `);
  let user = query.get(req.body);

  if (user) {
    res.status(400).json({ error: "Email finns redan registrerat" });
  }

  req.body.password = Encrypt.multiEncrypt(req.body.password);

  query = db.prepare(/*sql*/ `
    INSERT INTO users (email, password, username, role) VALUES ($email, $password, $username, $role)
  `);
  let info = query.run(req.body);

  if (info.changes) {
    res.json(info.lastInsertRowid);
  } else {
    res.status(404).json({ error: "Något gick fel." });
  }
};

module.exports = {
  login,
  whoami,
  logout,
  registerUser,
};
