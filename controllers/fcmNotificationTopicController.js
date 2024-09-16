
const axios = require('axios');
const admin = require('firebase-admin');
const netcoAdmin = require('../admin/netcoAdmin');
const ovgAdmin = require('../admin/ovgAdmin');
const MAX_BATCH_SIZE = 1000;

// chia nhỏ các token thành các batch
const splitTokensIntoBatches = (tokens, batchSize) => {
    let batches = [];
    for (let i = 0; i < tokens.length; i += batchSize) {
        batches.push(tokens.slice(i, i + batchSize));
    }
    return batches;
};

const sendNotificationToTopicNetco = async (req, res) => {
    console.log("handle send notification to topic netco", req.body)
    const { notification, data, registrationTokens, topic } = req.body.message;

    try {
        //#region xử lý gửi cho tất cả nhân viên
        if (data.NotificationType === '0') {
            // Gọi API tới server khác để lấy danh sách Token
            const apiResponse = await axios.post('http://api-v4-erp.chuyenphatnhanh.vn/api/ApiMain/API_spCallServer', {
                Json: "{\"NotificationType\":0}",
                func: "CPN_spOfficerTokenDeviceNotification_List",
                API_key: "netcoApikey2025"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Xử lý dữ liệu trả về từ API (dữ liệu trả về là chuỗi JSON chứa các Token)
            const tokenData = apiResponse.data;  // Đảm bảo bạn có thể truy cập đến phần data trả về
            let registrationTokensApi = [];

            // // Kiểm tra dữ liệu trả về và trích xuất Token
            if (tokenData && typeof tokenData === 'string') {
                const tokenArr = JSON.parse(tokenData);
                registrationTokensApi = tokenArr.map(token => token.Token);
            }

            // Đảm bảo rằng có ít nhất một registrationToken
            if (registrationTokensApi.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No registration tokens found'
                });
            }

            // Chia nhỏ registrationTokensApi thành các batch
            const tokenBatches = splitTokensIntoBatches(registrationTokensApi, MAX_BATCH_SIZE);

            // Đăng ký từng batch vào topic
            for (const batch of tokenBatches) {
                try {
                    const response = await admin.messaging(netcoAdmin).subscribeToTopic(batch, topic);
                    console.log(`Batch of ${batch.length} tokens successfully subscribed to topic: ${topic}`, response);
                } catch (error) {
                    console.error("Error subscribing batch to topic:", error);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to subscribe some tokens to topic',
                        error: error.message
                    });
                }
            }

            // await admin.messaging(netcoAdmin).subscribeToTopic(registrationTokensApi, topic);

            // Đợi một khoảng thời gian đảm bảo quá trình đăng ký đã hoàn tất
            setTimeout(async () => {
                try {
                    // Gửi thông báo tới topic
                    const response = await admin.messaging(netcoAdmin).send({
                        topic: topic,
                        notification: {
                            title: notification.title,
                            body: notification.body,
                        },
                        data: data
                    });

                    console.log("response handle send notification netco ------", response);
                    res.status(200).json({
                        success: true,
                        message: 'Notification sent from netco successfully!',
                        response: response
                    });
                } catch (error) {
                    console.error("Error sending notification:", error);
                    res.status(500).json({
                        success: false,
                        message: 'Failed to send notification',
                        error: error.message
                    });
                }
            }, 1500);
        }
        //#endregion

        //#region xử lý gửi cho tất cả nhân viên
        else {
            // await admin.messaging(netcoAdmin).subscribeToTopic(registrationTokens, topic);

            const tokenBatches = splitTokensIntoBatches(registrationTokens, MAX_BATCH_SIZE);

            // Đăng ký từng batch vào topic
            for (const batch of tokenBatches) {
                try {
                    const response = await admin.messaging(netcoAdmin).subscribeToTopic(batch, topic);
                    console.log(`Batch of ${batch.length} tokens successfully subscribed to topic: ${topic}`, response);
                } catch (error) {
                    console.error("Error subscribing batch to topic:", error);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to subscribe some tokens to topic',
                        error: error.message
                    });
                }
            }

            // Đợi một khoảng thời gian đảm bảo quá trình đăng ký đã hoàn tất
            setTimeout(async () => {
                try {
                    // Gửi thông báo tới topic
                    const response = await admin.messaging(netcoAdmin).send({
                        topic: topic,
                        notification: {
                            title: notification.title,
                            body: notification.body,
                        },
                        data: data
                    });

                    console.log("response handle send notification netco ------", response);
                    res.status(200).json({
                        success: true,
                        message: 'Notification sent from netco successfully!',
                        response: response
                    });
                } catch (error) {
                    console.error("Error sending notification:", error);
                    res.status(500).json({
                        success: false,
                        message: 'Failed to send notification',
                        error: error.message
                    });
                }
            }, 1500);
        }
        //#endregion

    } catch (error) {
        console.log("catch handle send notification netco ------", error)
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