const express = require('express');
const router = express.Router(); // création d'un router

const auth = require('../middleware/auth');//identification
const multer = require('../middleware/multer-config');//images

const saucesCtrl = require('../controllers/sauces'); // variable qui importent les sauces 

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;