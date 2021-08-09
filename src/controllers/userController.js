import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { render } from "pug";

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

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIID,
    client_secret: process.env.GH_CLISECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("editProfile", { pageTitle: "Edit profile" });
};

export const postEdit = async (req, res) => {
  /*const {_id} = req.session.user;
  const {name, username, email, location} = req.body;*/
  const {
    session: {
      user: { _id },
    },
    body: { name, username, email, location },
  } = req;
  const findEmail = await User.findOne({ email });
  const findName = await User.findOne({ name });
  if (name === findName.name || email === findEmail.email) {
    return res.render("editProfile", {
      pageTitle: "Edit profile",
      errormessage: "이미 존재하는 Name 또는 Email입니다.",
    });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      username,
      email,
      location,
    },
    { new: true }
  );
  req.session.user = updateUser;
  return res.redirect("/users/editProfile");
};

export const see = (req, res) => res.send("Watch video");
export const remove = (req, res) => res.send("Delete User");
