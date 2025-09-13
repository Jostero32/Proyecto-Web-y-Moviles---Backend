import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notification", error });
  }
};

export const createNotification = async (req, res) => {};
export const updateNotification = async (req, res) => {};
export const deleteNotification = async (req, res) => {};
