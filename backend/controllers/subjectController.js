const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getAllSubjects = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subjects
  `);

  res.json(query.all());
};

module.exports = {
  getAllSubjects,
};
