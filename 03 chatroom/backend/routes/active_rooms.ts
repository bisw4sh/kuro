import { Router, Response } from "express";
import { active_rooms } from "../controllers/active_rooms";

const router = Router();

router.get("/", async (_, res: Response) => {
  res.json(active_rooms);
});

export default router;
