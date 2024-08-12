import { Router, Request, Response } from "express";
import { active_rooms } from "../controllers/active_rooms";

const router = Router();

router.get("/:roomId", async (req: Request, res: Response) => {
  if (active_rooms.includes(req.params.roomId)) {
    return res.json({
      exist: true,
    });
  }

  return res.json({ exist: false });
});

export default router;
