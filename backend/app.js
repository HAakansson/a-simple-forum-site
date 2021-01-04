const express = require("express");
const session = require("express-session");
const store = require("better-express-store");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const forumRoutes = require("./routes/forumRoutes");
const subforumRoutes = require("./routes/subforumRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: require("./json/session-secret.json"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: store({ dbPath: "./forum.db" }),
  })
);

app.use("/auth/v1", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/forums", forumRoutes);
app.use("/api/v1/subforums", subforumRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/posts", postRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
