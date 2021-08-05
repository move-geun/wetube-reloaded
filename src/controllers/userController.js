import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    const errormessage = "비밀번호가 맞지 않습니다.";
    return res.render("join", { pageTitle: "Join", errormessage });
  }
  const exists = await User.exists({ $or: [{ name }, { email }] });
  if (exists) {
    const errormessage = "이미 존재하는 ID or Email 입니다.";
    return res.render("join", { pageTitle: "Join", errormessage });
  }
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("User Edit");
export const remove = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Log In");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("Watch video");
