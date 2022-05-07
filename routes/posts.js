const postController = require('../controllers/post');
const express = require('express');
const router = express.Router();

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

router.post('/', postController.createPost);


module.exports = router;
