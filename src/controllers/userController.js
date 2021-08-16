import User from "../models/User";
import fetch from "node-fetch";
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
        name: userData.name ? userData.name : "Guest",
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    console.log(user.avatarUrl);
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

/* 제발 되기를
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/editProfile");
};
*/

export const postEdit = async (req, res) => {
  /*
  주석 처리 하세요 여기부터//////////////////////////////////
  const {_id} = req.session.user;
  const {name, username, email, location} = req.body;
  여기까지//////////////////////////////////////////////
 */
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, username, email, location },
    file,
  } = req;

  const findEmail = await User.findOne({ email });
  const findName = await User.findOne({ name });
  /*
  여기부터도 //////////////////////////////////////////////
  if(findName != null && findName._id != _id){
    return res.render("editProfile", {
      pageTitle: "Edit profile",
      errormessage: `동일한 ${name}이 이미 존재합니다.`,
    });
  } else if(findEmail != null && findEmail._id != _id){
    return res.render("editProfile", {
      pageTitle: "Edit profile",
      errormessage: `동일한 ${email}이 이미 존재합니다.`,
    });
  };
   여기까지는 /////////////////////////////////////////////////
   */
  if (findName !== null && findName._id != _id) {
    console.log(
      "1번에서 말합니다 findName = ",
      findName._id,
      "findEmail = ",
      findEmail,
      "name = ",
      name
    );
    return res.render("editProfile", {
      pageTitle: "Edit Profile",
      errormessage: `이미 존재하는 ${name}입니다. `,
    });
  }
  if (findEmail !== null && findEmail._id != _id) {
    console.log(
      "2번에서 말합니다 findName = ",
      findName,
      "findEmail = ",
      findEmail
    );
    return res.render("editProfile", {
      pageTitle: "Edit Profile",
      errormessage: `이미 존재하는 ${email}입니다.`,
    });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      username,
      email,
      location,
    },
    { new: true }
  );
  req.session.user = updateUser;
  console.log("findName = ", findName, "findEmail = ", findEmail);
  return res.redirect("/users/editProfile");
};

/*
 일단 문제 해결 할 것 
 1. name과 email 중복값 확인해서 멈추게 하는 것
 2. 기존에 avatarUrl이 없을 경우, 적용이 잘 되지만, 있을 경우 사진이 뜨지 않음("/" 추가 하는거 때문인데, 이거 수정할 것)

*/

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("changePassword", {
      pageTitle: "Change Password",
      errormessage: "기존 비밀번호가 맞지 않습니다.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("changePassword", {
      pageTitle: "Change Password",
      errormessage: "새로운 비밀번호가 맞지 않습니다. 다시 확인해주세요.",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("logout");
};
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(400).render("404", { pageTitle: "User not found." });
  }
  res.render("profile", { pageTitle: user.name, user });
};

export const remove = (req, res) => res.send("Delete User");
