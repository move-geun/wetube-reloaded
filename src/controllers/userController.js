import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    const errormessage = "비밀번호가 맞지 않습니다.";
    return res.status(400).render("join", { pageTitle: "Join", errormessage });
  }
  const exists = await User.exists({ $or: [{ name }, { email }] });
  if (exists) {
    const errormessage = "이미 존재하는 Name or Email 입니다.";
    return res.status(400).render("join", { pageTitle: "Join", errormessage });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const edit = (req, res) => res.send("User Edit");
export const remove = (req, res) => res.send("Delete User");
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Log In",
      errormessage: "해당 Username으로 가입한 계정이 없습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Log In",
      errormessage: "틀린 Password입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("Watch video");
