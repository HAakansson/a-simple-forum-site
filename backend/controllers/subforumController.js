const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getAllSubforums = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subforums
  `);

  res.json(query.all());
};

const getModeratorsForSubforum = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT u.email, u.username, u.role, s.name AS subforumName FROM users AS u
    JOIN usersXsubforums uxs ON u.id = uxs.user_id
    JOIN subforums AS s ON s.id = uxs.subforum_id
    WHERE s.name = $subforumName
  `);

  res.json(query.all(req.params));
};

module.exports = {
  getAllSubforums,
  getModeratorsForSubforum,
};
