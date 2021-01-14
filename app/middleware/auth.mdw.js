module.exports = {
  adminAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "admin") {
      res.render("404", {
        layout: "error",
      });
      next();
    }
  },
  studentAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "student") {
      res.render("404", {
        layout: "error",
      });
      next();
    }
    next();
  },
  teacherAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "teacher") {
      res.render("404", {
        layout: "error",
      });
      next();
    }
    next();
  },
};
