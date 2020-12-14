const express = require("express");
const session = require("express-session");
const store = require("better-express-store");

const app = express();

app.use(
  session({
    secret: require("./session-secret.json"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: store({ dbPath: "./database.db" }),
  })
);

app.use(express());
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
})
