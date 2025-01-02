const express = require("express");
const router = express.Router();
const joueurcontroller = require("../controller/joueurcontroller");

router.post("/newjoueur", joueurcontroller.add);
router.get("/getalljoueur", joueurcontroller.list);
router.get("/getjoueur/:id", joueurcontroller.getjoueur);
router.delete("/supprimer/:id", joueurcontroller.supprimer);
router.put("/modifier/:id", joueurcontroller.update);
router.put('/attaque/:id1/:id2', joueurcontroller.attaque);
router.post('/newpartie/:id1/:id2', joueurcontroller.newPartie);
router.get("/partie", (req, res) => {
    res.render("partie");
});

module.exports = router;
