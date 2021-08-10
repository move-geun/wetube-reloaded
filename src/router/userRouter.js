import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { loginOnly, guestOnly, avatarFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loginOnly, logout);
userRouter
  .route("/editProfile")
  .all(loginOnly)
  .get(getEdit)
  .post(avatarFiles.single("avatar"), postEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", guestOnly, startGithubLogin);
userRouter.get("/github/finish", guestOnly, finishGithubLogin);
userRouter
  .route("/changePassword")
  .all(loginOnly)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;
