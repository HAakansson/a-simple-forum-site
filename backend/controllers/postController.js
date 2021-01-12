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

const getAllPostsBySubjectId = (req, res) => {
  let query = db.prepare(
    /*sql*/ `SELECT * FROM posts WHERE subject_id = $subjectId ORDER BY timestamp ASC`
  );
  res.json(query.all(req.params));
};

const getAllPostsBySubforumName = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM posts AS p
    JOIN subjects AS s ON p.subject_id = s.id
    JOIN subforums AS sub ON s.subforum_id = sub.id
    WHERE sub.name = $subforumName`);

  res.json(query.all(req.params));
};

const postNewPost = (req, res) => {
  req.body.user_id = req.session.user.id;
  req.body.timestamp = Date.now();

  console.log("BODY: ", req.body)

  let query = db.prepare(/*sql*/ `
    INSERT INTO posts (content, subject_id, user_id, timestamp, important) VALUES ($content, $subject_id, $user_id, $timestamp, $important)
  `);

  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Post successfull" });
  } else {
    res.json({ error: "Post failed." });
  }
};

const deletePost = (req, res) => {
  let query = db.prepare(/*sql*/ `
    DELETE FROM posts WHERE id = $id
  `);
  let info = query.run(req.params);
  if (info.changes) {
    res.json({ message: "Delete successfull" });
  } else {
    res.status(404).json({ error: "Delete unsuccessfull" });
  }
};

module.exports = {
  getCountOfPostsBySubforumId,
  getTotalNumberOfPosts,
  getAllPostsBySubjectId,
  getAllPostsBySubforumName,
  postNewPost,
  deletePost,
};
