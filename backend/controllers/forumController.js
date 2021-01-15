const sqlite3 = require("better-sqlite3");
const path = require("path");

const pathToDb = path.join(__dirname, "../forum.db");
const db = sqlite3(pathToDb);

const getAllForums = (req, res) => {
  let query = db.prepare(/*sql*/ `
    SELECT * FROM forums
  `);

  res.json(query.all());
};

module.exports = {
  getAllForums,
};
