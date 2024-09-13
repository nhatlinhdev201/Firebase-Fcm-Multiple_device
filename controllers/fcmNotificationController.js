const { sendMulticastMessageNetco } = require("../utils/fcmNetcoHelper");
const { sendMulticastMessageOvg } = require("../utils/fcmOvgHelper");

const sendFcmNotificationToMultiplpeDeviceNetco = async (req, res) => {
    try {
        // Kiểm tra xem message có tồn tại và các trường yêu cầu có đầy đủ hay không
        if (!req.body.message || !req.body.message.notification || !req.body.message.data || !req.body.message.registrationTokens) {
            return res.status(400).json({ message: 'Invalid request body. Required fields: notification, data, and registrationTokens' });
        }

        const { notification, data, registrationTokens } = req.body.message;

        // Tạo FCM message từ request
        const message = {
            notification: {
                title: notification.title || 'Thông báo',
                body: notification.body || 'Bạn có thông báo mới!',
            },
            data: {
                Id: data.Id || '',
                NotificationType: data.NotificationType || '',
                CreateBy: data.CreateBy || '',
                UrlCallback: data.UrlCallback || '',
            }
        };

        // Gửi thông báo tới nhiều thiết bị
        const result = await sendMulticastMessageNetco(message, registrationTokens);

        if (result.success) {
            res.status(200).json({
                message: 'Notification sent successfully',
                unregisteredTokens: result.unregisteredTokens,
            });
        } else {
            throw new Error(result.error || 'Failed to send notification');
        }

    } catch (error) {
        console.error('Error in sendNotificationToMultipleDevices:', error.message);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const sendFcmNotificationToMultiplpeDeviceOvg = async (req, res) => {
    try {
        // Kiểm tra xem message có tồn tại và các trường yêu cầu có đầy đủ hay không
        if (!req.body.message || !req.body.message.notification || !req.body.message.data || !req.body.message.registrationTokens) {
            return res.status(400).json({ message: 'Invalid request body. Required fields: notification, data, and registrationTokens' });
        }

        const { notification, data, registrationTokens } = req.body.message;

        // Tạo FCM message từ request
        const message = {
            notification: {
                title: notification.title || 'Thông báo',
                body: notification.body || 'Bạn có thông báo mới!',
            },
            data: {
                Id: data.Id || '',
                NotificationType: data.NotificationType || '',
                CreateBy: data.CreateBy || '',
                UrlCallback: data.UrlCallback || '',
            }
        };

        // Gửi thông báo tới nhiều thiết bị
        const result = await sendMulticastMessageOvg(message, registrationTokens);

        if (result.success) {
            res.status(200).json({
                message: 'Notification sent successfully',
                unregisteredTokens: result.unregisteredTokens,
            });
        } else {
            throw new Error(result.error || 'Failed to send notification');
        }

    } catch (error) {
        console.error('Error in sendNotificationToMultipleDevices:', error.message);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

module.exports = { sendFcmNotificationToMultiplpeDeviceNetco, sendFcmNotificationToMultiplpeDeviceOvg }