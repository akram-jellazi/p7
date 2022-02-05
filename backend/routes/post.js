const express = require('express');
const router = express.Router(); // création d'un router

const auth = require('../middleware/auth');//identification
const multer = require('../middleware/multer-config');//images

const postCtrl = require('../controllers/post'); // variable qui importent les sauces 

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;