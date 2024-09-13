const express = require("express");
const bodyParser = require("body-parser");

const fcmTokenRouter = require("./routes/fcmTokenRouter");
const fcmNotificationRouter = require("./routes/fcmNotificationRouter");
const fcmNotificationTopicRouter = require("./routes/fcmNotificationTopicRouter");

const app = express();

app.use(bodyParser.json());

app.use('/api/fcmToken', fcmTokenRouter);
app.use('/api/notification', fcmNotificationRouter);
app.use('/api/notification-topic', fcmNotificationTopicRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
