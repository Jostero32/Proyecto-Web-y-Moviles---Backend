import { Notification, NotificationType } from "../models/index.js";

// ===============================================
//                  VALIDACIONES
// ===============================================
const validateNotificationAccess = async (notificationId, userId) => {
  const notification = await Notification.findByPk(notificationId);

  if (!notification) {
    const error = new Error("Notification not found");
    error.status = 404;
    throw error;
  }

  if (notification.userId !== userId) {
    const error = new Error("No autorizado");
    error.status = 403;
    throw error;
  }

  return notification;
};
// ===============================================
//                    METODOS
// ===============================================

// ===============================================
// Obtener todas las notificaciones del usuario
// ===============================================
export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// =====================================================
// Obtiene una notificación específica (verifica acceso)
// =====================================================
export const getNotificationById = async (req, res) => {
  try {
    const userId = req.user.id;
    const notification = await validateNotificationAccess(req.params.id, userId);
    res.json(notification);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// crea notificación para probra, ya la notificacion entre usuarios esta en message.controller.
export const createNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { typeName, message } = req.body;

    if (!typeName || !message)
      return res.status(400).json({ message: "typeName y message requeridos" });

    // Busca o crea el tipo de notificación
    let type = await NotificationType.findOne({ where: { typeName } });
    if (!type) type = await NotificationType.create({ typeName });

    // Crea la notificación
    const notif = await Notification.create({
      userId,
      typeId: type.id,
      message,
    });

    res.status(201).json(notif);
  } catch (error) {
    res.status(500).json({ message: "Error creando notificación", error });
  }
};

// ===============================================
// Actualiza el estado de una notificación
// ===============================================
export const updateNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const notification = await validateNotificationAccess(req.params.id, userId);
    const { read } = req.body;

    await notification.update({ read: !!read });
    res.json(notification);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// ===============================================
// Elimina notificacion
// ===============================================
export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const notification = await validateNotificationAccess(req.params.id, userId);

    await notification.destroy();
    res.json({ message: "Notificación eliminada" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
