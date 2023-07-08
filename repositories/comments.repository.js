const { Op } = require('sequelize');
const { Comments } = require('../models');

class CommentsRepository {
  findAllComment = async (postId) => {
    const comments = await Comments.findAll({ where: { postId } });
    return comments;
  };

  createComment = async (postId, usersId, nickname, comment) => {
    const comments = await Comments.create({
      PostId: postId,
      UsersId: usersId,
      Nickname: nickname,
      comment,
    });

    return comments;
  };

  updateComment = async (comment, usersId, commentId) => {
    const myComment = await Comments.findOne({
      where: {
        [Op.and]: [{ UsersId: usersId }, { commentId }],
      },
    });

    const nowComment = await myComment.update({ comment });

    return nowComment;
  };

  deleteComment = async (usersId, commentId) => {
    const comment = await Comments.findOne({
      where: { [Op.and]: [{ commentId }, { usersId }] },
    });

    await comment.destroy();
  };
}

module.exports = CommentsRepository;
