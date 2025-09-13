import Conversation from "../models/conversation.model.js";

export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findByPk(req.params.id);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation", error });
  }
};

export const createConversation = async (req, res) => {};
export const updateConversation = async (req, res) => {};
export const deleteConversation = async (req, res) => {};
