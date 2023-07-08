const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middlewares/login-middleware.js');
const likeMiddleware = require('../middlewares/forLike-middleware');

const postsController = require('../controllers/posts.controller');
const commentsController = require('../controllers/comments.controller');

const PostsController = new postsController();
const CommentsController = new commentsController();

router.post('/', loginMiddleware, PostsController.createPost);

router.get('/', likeMiddleware, PostsController.getPosts);

router.get('/:postId', likeMiddleware, PostsController.getUserPost);

router.put('/:postId', loginMiddleware, PostsController.updatePost);

router.delete('/:postId', loginMiddleware, PostsController.deletePost);

router.put('/:postId/like', loginMiddleware, PostsController.updateLike);

router.post(
  '/:postId/comments',
  loginMiddleware,
  CommentsController.createComment,
);

router.get('/:postId/comments', CommentsController.getComments);

router.patch(
  '/:postId/comments/:commentId',
  loginMiddleware,
  CommentsController.updateComment,
);

router.delete(
  '/:postId/comments/:commentId',
  loginMiddleware,
  CommentsController.deleteComment,
);

module.exports = router;
