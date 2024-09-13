const admin = require('firebase-admin');
const netcoAdmin = require('../admin/netcoAdmin');
const ovgAdmin = require('../admin/ovgAdmin');


const sendNotificationToTopicNetco = async (req, res) => {
    try {
        const { notification, data, registrationTokens, topic } = req.body.message;

        await admin.messaging(netcoAdmin).subscribeToTopic(registrationTokens, topic);

        const response = await admin.messaging(netcoAdmin).send({
            topic: topic,
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: data
        });

        res.status(200).json({
            success: true,
            message: 'Notification sent from netco successfully!',
            response: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send notification from ovg',
            error: error.message
        });
    }
};

const sendNotificationToTopicOvg = async (req, res) => {
    try {
        const { notification, data, registrationTokens, topic } = req.body.message;

        await admin.messaging(ovgAdmin).subscribeToTopic(registrationTokens, topic);

        const response = await admin.messaging(ovgAdmin).send({
            topic: topic,
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: data
        });

        res.status(200).json({
            success: true,
            message: 'Notification sent from ovg successfully!',
            response: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send notification from ovg',
            error: error.message
        });
    }
};

module.exports = {
    sendNotificationToTopicNetco,
    sendNotificationToTopicOvg
}