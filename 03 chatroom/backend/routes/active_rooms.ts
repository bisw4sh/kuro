import { Router, Response, Request } from "express";
import { active_rooms } from "../controllers/active_rooms";

const router = Router();

router.get("/", async (_, res: Response) => {
  res.json(active_rooms);
});

router.get("/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const exists = active_rooms.includes(roomId);
    if (!exists) active_rooms.push(roomId);

    res.json({ success: true, roomName: roomId, created: !exists });
  } catch (error) {
    res.json({ success: false, roomName: null, created: false });
  }
});

export default router;
