import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const loginOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "로그인 이후 이용 가능합니다.");
    return res.redirect("/login");
  }
};

export const guestOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "로그아웃 이후 이용 가능합니다.");
    return res.redirect("/");
  }
};

export const avatarFiles = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});

export const videoFiles = multer({
  dest: "uploads/videos",
  limits: { fileSize: 1000000000 },
});
