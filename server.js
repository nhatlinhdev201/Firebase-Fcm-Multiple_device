const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const fcmTokenRouter = require("./routes/fcmTokenRouter");
const fcmNotificationRouter = require("./routes/fcmNotificationRouter");
const fcmNotificationTopicRouter = require("./routes/fcmNotificationTopicRouter");

const app = express();
// Cho phép tất cả các domain truy cập vào API
app.use(cors());

app.use(bodyParser.json());

app.use('/api/fcmToken', fcmTokenRouter);
app.use('/api/notification', fcmNotificationRouter);
app.use('/api/notification-topic', fcmNotificationTopicRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
