const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const User = require('./model/user'); // Votre modèle User

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/revsion1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Middleware pour JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes statiques (pour servir les fichiers HTML et JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serveur avec Socket.io
io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    // Enregistrer un utilisateur
    socket.on('register', async ({ username, password }) => {
        try {
            const user = await User.findOne({ name: username, pwd: password });

            if (user) {
                socket.username = username;
                console.log(`${username} est connecté`);
                io.emit('userConnected', `${username} s'est connecté.`);
                socket.emit('loginSuccess', { message: 'Connexion réussie' }); // Ajout d'un message de succès
            } else {
                socket.emit('loginError', 'Nom d\'utilisateur ou mot de passe incorrect.');
            }
        } catch (err) {
            console.error(err);
            socket.emit('loginError', 'Erreur lors de la connexion.');
        }
    });

    // Envoyer un message de chat
    socket.on('chatMessage', (message) => {
        if (socket.username) {
            const data = {
                username: socket.username,
                message,
                date: new Date(),
            };
            io.emit('chatMessage', data);
        }
    });

    // Déconnexion
    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('userDisconnected', `${socket.username} s'est déconnecté.`);
        }
    });
});

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
