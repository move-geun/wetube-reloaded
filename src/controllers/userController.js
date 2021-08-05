import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
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
