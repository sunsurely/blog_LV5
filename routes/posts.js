const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middlewares/login-middleware.js');
const likeMiddleware = require('../middlewares/forLike-middleware');

const postsController = require('../controllers/posts.controller');

const PostsController = new postsController();

router.post('/', loginMiddleware, PostsController.createPost);

router.get('/', likeMiddleware, PostsController.getPosts);

router.get('/:postId', likeMiddleware, PostsController.getUserPost);

router.put('/:postId', loginMiddleware, PostsController.updatePost);

router.delete('/:postId', loginMiddleware, PostsController.deletePost);

router.put('/:postId/like', loginMiddleware, PostsController.updateLike);

module.exports = router;
