import { Router, Response } from "express";
import { messages_data } from "../controllers/messages";

const router = Router();

router.get("/", async (_, res: Response) => {
  res.json(messages_data);
});

export default router;
