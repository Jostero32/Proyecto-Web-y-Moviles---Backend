import { Router } from "express";
import {
  getAllConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";

const router = Router();

router.get("/", getAllConversations);
router.get("/:id", getConversationById);
router.post("/", createConversation);
router.put("/:id", updateConversation);
router.delete("/:id", deleteConversation);

export default router;
