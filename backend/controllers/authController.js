const Encrypt = require("../classes/Encrypt");
const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

const login = (req, res) => {
  let body = req.body;
  console.log(body);

  if (body.password) {
    body.password = Encrypt.multiEncrypt(body.password);
  } else {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  let query = db.prepare(/*sql*/ `
    SELECT * FROM users
    WHERE email = $email AND password = $password
  `);

  let user = query.get(body) || null;
  if (user) {
    delete user.password;
    req.session.user = user;
  } else {
    res.status(401).json({ error: "Bad credentials" });
    return;
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
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if(!req.body.role) {
    req.body.role = 3;
  }
  
  if (!emailRegex.test(req.body.email)) {
    res.status(400).json({
      error: "Badly formed email or password",
    });
    return;
  }

  let query = db.prepare(/*sql*/ `
    SELECT email FROM users WHERE email = $email
  `);
  let user = query.get(req.body);

  if (user) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  if (req.body.password && passwordRegex.test(req.body.password)) {
    req.body.password = Encrypt.multiEncrypt(req.body.password);
  } else {
    res.status(400).json({
      error: "Badly formed email or password",
    });
    return;
  }

  query = db.prepare(/*sql*/ `
    INSERT INTO users (email, password, username, role) VALUES ($email, $password, $username, $role)
  `);
  let info = query.run(req.body);

  if (info.changes) {
    res.json(info.lastInsertRowid);
    return;
  } else {
    res.status(404).json({ error: "Register Failed" });
    return;
  }
};

module.exports = {
  login,
  whoami,
  logout,
  registerUser,
};
