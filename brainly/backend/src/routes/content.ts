import express, { Request, Response } from "express";
import { Content } from "../models/Content";
import { authenticate } from "../middleware/authenticate";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

router.post(
  "/content",
  authenticate,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { type, link, title, tags } = req.body;

      const newContent = new Content({
        user: req.userId,
        type,
        link,
        title,
        tags,
      });

      await newContent.save();
      res
        .status(201)
        .json({ message: "Content added successfully", content: newContent });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);

router.get(
  "/content",
  authenticate,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userContents = await Content.find({ user: req.userId });

      res.status(200).json(userContents);
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);

router.delete(
  "/content/:id",
  authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const contentId = req.params.id;
      const token = req.headers.authorization?.split(" ")[1];
      const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const userId = decoded.id;

      const content = await Content.findById(contentId);

      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }

      if (content.user.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "Forbidden: You can only delete your own content" });
      }

      await Content.deleteOne({ _id: contentId });

      res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);

router.put(
  "/content/share",
  authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const userId = decoded.id;

      const updatedContent = await Content.updateMany(
        { user: userId },
        { $set: { share: true } }
      );

      if (updatedContent.modifiedCount === 0) {
        return res.status(404).json({ error: "No content found to share" });
      }

      const shareableLink = `http://localhost:3000/share/${userId}`;

      res.status(200).json({
        message: "Content marked as shared",
        shareableLink,
      });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);
router.get(
  "/content/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const contentId = req.params.id;

      const content = await Content.findById(contentId);

      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }

      res.status(200).json(content);
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
);

export default router;
