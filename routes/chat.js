const express = require('express');
const chatcontroller = require('../controller/chatcontroller');
const router = express.Router();
router.get('/view', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ date: 1 }); // Tri des messages par date
        res.render('./views/chat', { chats });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des chats", details: err });
    }
});
router.post('/add', chatcontroller.add);

router.get('/list', chatcontroller.list);


module.exports = router;