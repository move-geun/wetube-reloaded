import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { loginOnly, guestOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loginOnly, logout);
userRouter.route("/editProfile").all(loginOnly).get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", guestOnly, startGithubLogin);
userRouter.get("/github/finish", guestOnly, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
