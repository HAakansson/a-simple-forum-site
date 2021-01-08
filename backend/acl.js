const aclJson = require("./json/acl.json");

module.exports = (req, res, next) => {
  let roles = ["*"]; // Everyone always has the "*" (all) role.

  if (req.session.user) {
    // Just change from roles expressed in integers to be roles express in their corresponding string role, accordning tp the DB.
    if (req.session.user.role === 1) {
      req.session.user.role = "admin";
    } else if (req.session.user.role === 2) {
      req.session.user.role = "moderator";
    } else if (req.session.user.role === 3) {
      req.session.user.role = "author";
    }
    // Take the role from the session and add them to the "roles" list.
    roles = [...roles, ...req.session.user.role];
  } else {
    roles.push("anon");
  }

  // Remove last "/"" from the request path.
  let requestPath = req.path.endsWith("/")
    ? req.path.replace(/\/$/, "").toLowerCase()
    : req.path.toLowerCase();

  let controlList = Object.entries(aclJson).filter(([url, method]) => {
    // This if handles matching URL with wildcard endings.
    if (url.includes("*")) {
      return requestPath.startsWith(url.replace("*", ""));
    } else {
      return url === requestPath;
    }
  });

  function hasRole(permission) {
    if (!permission) {
      return false;
    }
    for (let role of roles) {
      if (permission.includes(role)) {
        return true;
      }
    }
  }

  // Find acl paths that matches the role.
  controlList = controlList.filter(([url, permission]) => {
    return hasRole(permission["ALL"]) || hasRole(permission[req.method]);
  });

  if (Object.keys(controlList).length > 0) {
    next();
  } else {
    res.status(403).json({error: "You are not allowed."})
  }
};
