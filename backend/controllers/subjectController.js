const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

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

const postNewSubject = (req, res) => {
  req.body.user_id = req.session.user.id;
  let query = db.prepare(/*sql*/ `
    SELECT id FROM subforums WHERE name = $subforumName
  `);
  let { id } = query.get(req.body);

  if (id) {
    req.body.subforum_id = id;
  } else {
    res.status(404).json({ error: "Could not find the subforum." });
  }

  query = db.prepare(/*sql*/ `
      INSERT INTO subjects (name, subforum_id, user_id) VALUES ($name, $subforum_id, $user_id)
  `);

  let info = query.run(req.body);
  if (info.changes) {
    res.json(info);
  } else {
    res.status(404).json({ error: "Post new subject failed." });
  }
};

const lockSubject = (req, res) => {
  let query = db.prepare(/*sql*/`
    UPDATE subjects SET locked = $locked WHERE id = $subjectId
  `);

  let info = query.run(req.body);
  if (info.changes) {
    res.json({message: "Update succesfull"})
  } else {
    res.status(404).json({error: "Update failed"})
  }
}

const getAllSubjectsByForumId = (req, res) => {
  let query = db.prepare(/*sql*/ `
  SELECT f.name AS forum_name, s.id, s.name, s.subforum_id, s.user_id, sf.name AS subforum_name, u.username AS creator FROM forums AS f
  JOIN subforums AS sf ON sf.forum_id = f.id
  JOIN subjects AS s ON s.subforum_id = sf.id
  JOIN users AS u ON u.id = s.user_id
  WHERE f.id = $forumId
  `);

  let subjects = query.all(req.params);
  res.json(subjects);
}

module.exports = {
  getAllSubjects,
  getSubjectBySubjectId,
  getCountOfSubjects,
  getAllSubjectsBysubforumId,
  postNewSubject,
  lockSubject,
  getAllSubjectsByForumId,
};
