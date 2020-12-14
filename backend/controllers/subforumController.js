const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getAllSubforums = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subforums
  `);

  res.json(query.all().map((subforum) => subforum.name));
};

module.exports = {
  getAllSubforums,
};
