const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getAllSubjects = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subjects
  `);

  res.json(query.all());
};

const getCountOfSubjects = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT COUNT() as count FROM subjects WHERE subforum_id = $subforumId
  `);

  let result = query.get(req.params);
  res.json(result.count);
};

const getAllSubjectsBysubforumId = (req, res) => {
  let query = db.prepare(/*sql*/ `
      SELECT * FROM subjects WHERE subforum_id = (
        SELECT id from subforums WHERE name = $subforumName
      )
  `);

  res.json(query.all(req.params));
};

module.exports = {
  getAllSubjects,
  getCountOfSubjects,
  getAllSubjectsBysubforumId,
};
