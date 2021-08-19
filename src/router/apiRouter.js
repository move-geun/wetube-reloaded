import express from "express";
import { apiviews } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", apiviews);

export default apiRouter;
