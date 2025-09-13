import Message from "../models/message.model.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message", error });
  }
};

export const createMessage = async (req, res) => {};
export const updateMessage = async (req, res) => {};
export const deleteMessage = async (req, res) => {};
