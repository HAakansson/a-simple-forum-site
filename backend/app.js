const express = require("express");
const session = require("express-session");
const store = require("better-express-store");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./json/swagger.json");
const path = require("path");

const acl = require("./acl");

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

app.use(acl);

app.use("/auth/v1", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/forums", forumRoutes);
app.use("/api/v1/subforums", subforumRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/posts", postRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
