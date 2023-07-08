const CommentsRepository = require('../repositories/comments.repository');

class CommentService {
  commentsRepository = new CommentsRepository();

  findAllComments = async (postId, res) => {
    try {
      const allComments = await this.commentsRepository.findAllComment(postId);
      allComments;
      allComments.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      const responseComments = allComments.map((comment) => {
        return {
          commentId: comment.commentId,
          usersId: comment.UsersId,
          nickname: comment.Nickname,
          postId: comment.PostId,
          comment: comment.comment,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
      });

      return res.status(200).json({ data: responseComments });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };

  createComment = async (postId, usersId, nickname, comment) => {
    const comments = await this.commentsRepository.createComment(
      postId,
      usersId,
      nickname,
      comment,
    );

    return comments;
  };

  updateComment = async (comment, usersId, commentId) => {
    const nowComment = await this.commentsRepository.updateComment(
      comment,
      usersId,
      commentId,
    );

    return nowComment;
  };

  deleteComment = async (usersId, commentId) => {
    await this.commentsRepository.deleteComment(usersId, commentId);
  };
}

module.exports = CommentService;
