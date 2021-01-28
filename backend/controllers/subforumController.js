const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

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

  let moderators = query.all(req.params);
  moderators = moderators.map((moderator) => ({ ...moderator, password: undefined }))
  res.json(moderators);
};

const addNewModerator = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT id FROM subforums WHERE name = $subforumName
  `);
  let result = query.get(req.body);
  if(result){
    req.body.subforum_id = result.id;
  } else {
    res.status(400).json({ error: "No such subforum exists" });
    return;
  }

  query = db.prepare(/*sql*/ `
    INSERT INTO usersXsubforums (user_id, subforum_id) VALUES ($user_id, $subforum_id)
  `);
  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Promoting the user was succesfull" });
    return;
  } else {
    res.stauts(404).json({ error: "Promotion failed" });
    return;
  }
};

const removeModerator = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT id FROM subforums WHERE name = $subforumName
  `);
  let result = query.get(req.body);
  if (result) {
    req.body.subforum_id = result.id;
  } else {
    res.status(400).json({ error: "No such subforum exists" });
    return;
  }

  query = db.prepare(/*sql*/ `
    DELETE FROM usersXsubforums WHERE user_id = $user_id AND subforum_id = $subforum_id
  `);

  let info = query.run(req.body);
  if (info.changes) {
    res.json({ message: "Demotion of user was successfull" });
    return;
  } else {
    res.status(404).json({ error: "Demotion failed" });
    return;
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
