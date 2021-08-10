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
    return res.redirect("/login");
  }
};

export const guestOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFiles = multer({ dest: "uploads/" });
