const express = require("express");
const session = require("express-session");
const store = require("better-express-store");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(
  session({
    secret: require("./json/session-secret.json"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: store({ dbPath: "./forum.db" }),
  })
);

app.use(express.json());
app.use("/auth/v1", authRoutes);
app.use("/api/v1", apiRoutes)

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
