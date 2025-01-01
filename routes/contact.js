const express = require("express");
const router = express.Router();
const BatimentController = require("../controller/contactcontroller");

router.get("/getall", BatimentController.getallbatiemnt);

router.get("/batiment", (req, res, next) => {
    res.render("batiment");
});
module.exports = router;
