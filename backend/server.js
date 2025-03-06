const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const apiId = process.env.TELEGRAM_API_ID;
const apiHash = process.env.TELEGRAM_API_HASH;

const app = express();
app.use(cors());
app.use(express.json());

let client;

// Function to initialize the bot
async function startBot(botToken) {
  console.log("bottoekn", botToken);
  client = new TelegramClient(new StringSession(""), apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    botAuthToken: botToken,
  });

  console.log("Bot Started!");

  client.addEventHandler(async (event) => {
    const message = event.message;

    if (message && message.action && message.action.users) {
      const newUser = message.action.users[0];
      const user = await client.getEntity(newUser);
      console.log("New User", user);
      await client.sendMessage(message.chatId, {
        message: `Hi ${user.firstName || "@" + user.username || "New User"}, Welcome to BitClub!`,
      });
    }
  });
}

// API to set bot token
app.post("/api/set-token", async (req, res) => {
  botToken = req.body.token;
  if (client) {
    await client.disconnect();
  }
  startBot(botToken);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
