const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getAllSubjects = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subjects
  `);

  res.json(query.all());
};

const getSubjectBySubjectId = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM subjects WHERE id = $subjectId
  `);

  res.json(query.get(req.params));
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
    SELECT s.id, s.name, s.subforum_id, s.user_id, u.username AS creator FROM subjects AS s
    JOIN users AS u ON s.user_id = u.id
    WHERE s.subforum_id = (SELECT id FROM subforums WHERE name = $subforumName)
  `);

  res.json(query.all(req.params));
};

module.exports = {
  getAllSubjects,
  getSubjectBySubjectId,
  getCountOfSubjects,
  getAllSubjectsBysubforumId,
};
