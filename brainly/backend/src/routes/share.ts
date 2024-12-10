import express, { Request, Response } from "express";
import { Content } from "../models/Content";

const router = express.Router();

router.get(
  "/share/:userId",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.userId;

      const sharedContent = await Content.find({ user: userId, share: true });

      if (sharedContent.length === 0) {
        return res.status(404).json({ error: "No shared content found" });
      }

      res.status(200).json(sharedContent);
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);

export default router;
