const express = require('express');
const userService = require('../controller/contactcontroller');
const router = express.Router();

router.post('/add', userService.add);

router.get('/list', userService.list);
router.delete('/delete/:id', userService.supprimer);
router.put('/update/:id', userService.update);
router.get('/showuserbyname/:id', userService.showuserbyname);
router.get('/search/:name', userService.searchByName);

module.exports = router;