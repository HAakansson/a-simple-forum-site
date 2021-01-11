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
    SELECT u.*, s.name AS subforumName FROM users AS u
    JOIN usersXsubforums uxs ON u.id = uxs.user_id
    JOIN subforums AS s ON s.id = uxs.subforum_id
    WHERE s.name = $subforumName
  `);

  res.json(query.all(req.params));
};

const addNewModerator = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT id FROM subforums WHERE name = $subforumName
  `);
  let result = query.get(req.body);
  req.body.subforum_id = result.id;

  query = db.prepare(/*sql*/ `
    INSERT INTO usersXsubforums (user_id, subforum_id) VALUES ($user_id, $subforum_id)
  `);
  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Ny moderator tillagd" });
  } else {
    res.stauts(404).json({ error: "Misslyckades" });
  }
};

const removeModerator = (req, res) => {
  console.log();
  console.log(req.body);
  let query = db.prepare(/*sql*/ `
    SELECT id FROM subforums WHERE name = $subforumName
  `);
  let result = query.get(req.body);
  req.body.subforum_id = result.id;

  query = db.prepare(/*sql*/ `
    DELETE FROM usersXsubforums WHERE user_id = $user_id AND subforum_id = $subforum_id
  `);

  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Borttagning av moderator lyckades" });
  } else {
    res.status(404).json({ error: "Misslyckades" });
  }
};

const changeRoleOnUsers = (req, res) => {
  // Gets the number of subforums the moderator is moderating over.
  let query = db.prepare(/*sql*/ `
    SELECT COUNT() AS number FROM users AS u
    JOIN usersXsubforums uxs ON u.id = uxs.user_id
    JOIN subforums AS s ON s.id = uxs.subforum_id
    WHERE u.id = $user_id
  `);
  let result = query.get(req.body);

  // If the moderator is moderator for several subforums, this if will prevent the role being changed to author.
  if (result.number > 0 && req.body.new_role === 3) {
    req.body.new_role = 2;
  }

  query = db.prepare(/*sql*/ `
      UPDATE users SET role = $new_role WHERE id = $user_id
    `);
  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Uppdatering av roll lyckades" });
  } else {
    res.status(404).json({ error: "Uppdatering av roll misslyckades" });
  }
};

module.exports = {
  getAllSubforums,
  getModeratorsForSubforum,
  addNewModerator,
  removeModerator,
  changeRoleOnUsers,
};
