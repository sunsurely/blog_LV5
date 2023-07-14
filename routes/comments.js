const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middlewares/login-middleware.js');
const commentsController = require('../controllers/comments.controller');
const CommentsController = new commentsController();

router.post('/:postId', loginMiddleware, CommentsController.createComment);

router.get('/:postId', CommentsController.getComments);

router.patch(
  '/:postId/:commentId',
  loginMiddleware,
  CommentsController.updateComment,
);

router.delete(
  '/:postId/:commentId',
  loginMiddleware,
  CommentsController.deleteComment,
);

module.exports = router;
