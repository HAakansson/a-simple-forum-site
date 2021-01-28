const Encrypt = require("../classes/Encrypt");
const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

const getAllUsers = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM users
  `);
  res.json(query.all().map((user) => ({ ...user, password: undefined })));
};

const getTotalNumbersOfUsers = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT COUNT() AS numberOfUsers FROM users
  `);

  let users = query.get();
  res.json(users.numberOfUsers);
};

const getUserById = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM users WHERE id = $id
  `);

  let user = query.get(req.params);

  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.status(404).json({ error: "A user with that id does not exist..." });
  }
};

const updateUser = (req, res) => {
  let body = req.body;
  body.id = req.params.id;

  let query = db.prepare(/*sql*/ `
    SELECT * FROM users
    WHERE id = $id
  `);

  if (!query.get(body)) {
    res.status(404).json({ error: "A user with that id does not exist..." });
    return;
  }

  if (body.password) {
    body.password = Encrypt.multiEncrypt(body.password);
  }

  query = db.prepare(/*sql*/ `
    UPDATE users SET ${Object.keys(body).map((key) => key + " = $" + key)}
    WHERE id = $id
  `);

  res.json(query.run(body));
};

const deleteUser = (req, res) => {
  let params = req.params;

  let query = db.prepare(/*sql*/ `
    SELECT * FROM users
    WHERE id = $id
  `);

  if (!query.get(params)) {
    res.status(404).json({ error: "A user with that id does not exist..." });
    return;
  }

  query = db.prepare(/*sql*/ `
    DELETE FROM users WHERE id = $id;
  `);

  res.json(query.run(params));
};

module.exports = {
  getAllUsers,
  getTotalNumbersOfUsers,
  getUserById,
  updateUser,
  deleteUser,
};
