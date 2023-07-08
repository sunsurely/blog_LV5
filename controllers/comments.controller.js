const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  getComments = async (req, res, next) => {
    const { postId } = req.params;

    await this.commentService.findAllComments(postId, res);
  };

  createComment = async (req, res, next) => {
    const user = res.locals.user;
    const { comment } = req.body;
    const { postId } = req.params;

    try {
      const createCommentData = await this.commentService.createComment(
        postId,
        user.usersId,
        user.nickname,
        comment,
      );

      res.status(201).json({ data: createCommentData });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const { usersId } = res.locals.user;

    try {
      const nowComment = await this.commentService.updateComment(
        comment,
        usersId,
        commentId,
      );
      res.status(201).json({ data: nowComment });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };

  deleteComment = async (req, res, next) => {
    const { usersId } = res.locals.user;
    const { commentId } = req.params;
    try {
      await this.commentService.deleteComment(usersId, commentId);
      res.status(201).json({ message: '댓글을 삭제했습니다' });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };
}

module.exports = CommentsController;
