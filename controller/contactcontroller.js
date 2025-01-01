const User = require('../model/user'); // Assuming you have a User model


// Add a user
const add = (req, res) => {
    const { name, pwd } = req.body;
    if (!name || !pwd) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    const newUser = new User({ name, pwd });
    newUser.save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: "Failed to save user", details: err }));
};

// List all users
const list = (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Failed to retrieve users", details: err }));
};

const supprimer = (req, res) => {
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                res.json({ message: "Utilisateur supprimé avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la suppression", details: err }));
};
const update = (req, res) => {
    const userId = req.params.id; // Récupère l'ID de l'utilisateur à partir des paramètres de la requête
    const { name, pwd } = req.body; // Récupère les nouvelles valeurs de name et pwd

    // Mettre à jour l'utilisateur
    User.findByIdAndUpdate(userId, { name, pwd }, { new: true }) // `new: true` renvoie l'utilisateur mis à jour
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                res.json({ message: "Utilisateur mis à jour avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour", details: err }));
};

const showuserbyname = (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(data);
        })
        .catch(err => res.status(500).json({ error: "Failed to retrieve user", details: err.message }));
};


const searchByName = (req, res) => {
    //const { name } = req.query; // On récupère le nom depuis les paramètres de la requête
    const name = req.params.name;

    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
    }

    User.find({ name: new RegExp(name, 'i') }) // Recherche insensible à la casse avec RegExp
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No users found with the given name" });
            }
            res.json(data);
        })
        .catch(err => res.status(500).json({ error: "Failed to search users by name", details: err.message }));
};
module.exports = { add, list, supprimer, update ,showuserbyname ,searchByName  };