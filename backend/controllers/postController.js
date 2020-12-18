const sqlite3 = require("better-sqlite3");

const db = sqlite3("./forum.db"); // I dont understand why only one "./"" works and not "../". Should be "../"

const getCountOfPostsBySubforumId = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT COUNT() AS count FROM posts
    JOIN subjects ON posts.subject_id = subjects.id
    WHERE subjects.subforum_id = $subforumId 
  `);

  let result = query.get(req.params);
  res.json(result.count);
};

const getTotalNumberOfPosts = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT COUNT() AS count FROM posts
  `);

  let result = query.get();
  res.json(result.count);
};

const getPostsBySubjectId = (req, res) => {
  let query = db.prepare(/*sql*/`SELECT * FROM posts WHERE subject_id = $subjectId`);
  res.json(query.all(req.params));
}

module.exports = {
  getCountOfPostsBySubforumId,
  getTotalNumberOfPosts,
  getPostsBySubjectId,
};
