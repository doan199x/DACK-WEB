module.exports = {
  adminAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "admin") {
      res.render("render", {
        contain:"response/404"
      });
    }
    next();
  },
  studentAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "student") {
      res.render("render", {
        contain:"response/404"
      });
    }
    next();
  },
  teacherAuth: (req, res, next) => {
    if (!req.session.user || req.session.user.role != "teacher") {
      res.render("render", {
        contain:"response/404"
      });
    }
    next();
  },
  adminStudentAuth: (req, res, next) => {
    if (!req.session.user) {
      res.render("render", {
        contain:"response/404"
      });
    } else if (req.session.user.role == "admin" || req.session.user.role == "student") {
      next();
    } else {
      res.render("render", {
        contain:"response/404"
      });
    }
  },
  adminTeacherAuth: (req, res, next) => {
    if (!req.session.user) {
      res.render("render", {
        contain:"response/404"
      });
    } else if (req.session.user.role == "admin" || req.session.user.role == "teacher") {
      next();
    } else {
      res.render("render", {
        contain:"response/404"
      });
    }
  }
};
