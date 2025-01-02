const joueur = require('../model/joueur'); // Assurez-vous que le chemin est correct
const partie = require('../model/partie'); // Assurez-vous que le chemin est correct

// Ajouter un joueur
const add = (req, res) => {
    const { pseudo } = req.body;

    // Validation des champs requis
    if (!pseudo) {
        return res.status(400).json({ error: "Le pseudo est requis." });
    }

    // Création d'un nouveau joueur
    const newJoueur = new joueur({ pseudo });
    newJoueur.save()
        .then(data => res.status(201).json({ message: "Joueur ajouté avec succès.", joueur: data }))
        .catch(err => res.status(500).json({ error: "Échec de l'ajout du joueur.", details: err.message }));
};

const list = (req, res) => {
    joueur.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Failed to retrieve joueur", details: err }));
};


const getjoueur = (req, res) => {
    const joueurId = req.params.id;

    joueur.findById(joueurId)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "joueur not found" });
            }
            res.json(data);
        })
        .catch(err => res.status(500).json({ error: "Failed to retrieve joueur", details: err.message }));
};

const supprimer = (req, res) => {
    const joueurId = req.params.id;
    joueur.findByIdAndDelete(joueurId)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "joueur non trouvé" });
            } else {
                res.json({ message: "joueur supprimé avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la suppression", details: err }));
};

const update = (req, res) => {
    const joueurId = req.params.id;
    const { pseudo } = req.body;

    // Mettre à jour l'utilisateur
    joueur.findByIdAndUpdate(joueurId, { pseudo }, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "joueur non trouvé" });
            } else {
                res.json({ message: "joueur mis à jour avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour", details: err }));
};

/*
const attaque = (req, res) => {
    const joueurid1 = req.params.id;
  const joueurid2 = req.params.id;

    const joueur1 = new joueur({ score });
    const  score = joueur1.score +10











    joueur1.findByIdAndUpdate(joueurid1, {score}, { new : true } )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "joueur non trouvé" });
            } else {
                res.json({ message: "joueur mis à jour avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour", details: err }));
    const joueur2 = new joueur({sante  });
    const  sante = joueur2.sante -20

    joueur2.findByIdAndUpdate(joueurid2,{sante},{ new: true } )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "joueur non trouvé" });
            } else {
                res.json({ message: "joueur mis à jour avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour", details: err }));
}

*/
const attaque = async (req, res) => {
    try {
        // Fetch the player documents asynchronously
        const attaquant = await joueur.findById(req.params.id1);
        const victime = await joueur.findById(req.params.id2);

        // Calculate the new values for score and sante
        const j1 = attaquant.score + 10;
        const j2 = victime.sante - 20;

        // Update both players asynchronously
        const joueur1 = await joueur.findByIdAndUpdate(
            req.params.id1,
            { score: j1 },
            { new: true }
        );
        const joueur2 = await joueur.findByIdAndUpdate(
            req.params.id2,
            { sante: j2 },
            { new: true }
        );

        // Send the updated players as a response
        res.send(joueur1 + "    " + joueur2);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
};

async function newPartie(req, res) {
    try {
        console.log(req.body);
        const newpartie = new Partie({
            nom: req.body.nom,
            joueur_1: req.params.id1,
            joueur_2: req.params.id2,
            etat: "en cours",
        });
        await newpartie.save();
        res.status(200).json(newpartie);
    } catch (err) {
        console.log(err);
    }
}
async function newPartiesocket(data) {
    try {
        //console.log(req.body);
        const newpartie = new partie({
            nom: data.nompartie,
            joueur_1: data.id1,
            joueur_2: data.id2,
            etat: "en cours",
        });
        await newpartie.save();
        // res.status(200).json(newpartie);
    } catch (err) {
        console.log(err);
    }
}


async function affichersocket(data) {
    try {
        const joueur1 = await joueur.findById(data.id1);
        const joueur2 = await joueur.findById(data.id2);
        //res.status(200).json(user);
        return {j1:joueur1,j2:joueur2}
    } catch (err) {
        console.log(err);
    }
}

module.exports = { add , list ,getjoueur , supprimer, update, attaque ,newPartie, affichersocket ,newPartiesocket};
