const Chat = require('../model/chat'); // Assuming you have a Chat model


// Add a chat
const add = (req, res) => {
    const { message, date } = req.body;
    if (!message ) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    const newChat = new Chat({ message, date });
    newChat.save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: "Failed to save chat", details: err }));
};

// List all chats
const list = (req, res) => {
    Chat.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Failed to retrieve chats", details: err }));
};

module.exports = { add, list };