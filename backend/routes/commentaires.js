const express = require('express');
const router = express.Router(); // création d'un router
const auth = require('../middleware/auth');//identification

const commentairesCtrl = require('../controllers/commentaires'); // variable qui importent les commentaires 

router.post('/', auth, commentairesCtrl.createCommentaires);
router.delete('/:id', auth, commentairesCtrl.deleteCommentaires);
router.get('/',auth, commentairesCtrl.findAllbypost);

module.exports = router;