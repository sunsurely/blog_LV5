const { Op } = require('sequelize');
const { Posts } = require('../models');
const { Comments } = require('../models');
const { Likes } = require('../models');

class PostRepository {
  findAllPost = async () => {
    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'nickname',
        'title',
        'createdAt',
        'updatedAt',
        'likes',
      ],
      include: [
        {
          model: Likes,
          attributes: ['UsersId'],
        },
      ],
    });

    return posts;
  };

  findUserPost = async (postId) => {
    const post = await Posts.findOne({
      attributes: [
        'postId',
        'title',
        'nickname',
        'content',
        'likes',
        'createdAt',
        'updatedAt',
      ],
      where: { postId },
      include: [
        {
          model: Likes,
          attributes: ['UsersId'],
        },
      ],
    });

    return post;
  };

  createPost = async (nickname, usersId, title, content) => {
    const createPostData = await Posts.create({
      nickname,
      UsersId: usersId,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postId, usersId, title, content) => {
    const updatePostData = await Posts.update(
      {
        title: title,
        content: content,
      },
      {
        where: {
          [Op.and]: [{ postId }, { usersId }],
        },
      },
    );

    return updatePostData;
  };

  deletePost = async (postId, usersId) => {
    await Posts.destroy({
      where: { [Op.and]: [{ postId }, { UsersId: usersId }] },
    });
  };

  findLike = async (postId, usersId) => {
    const myLike = await Likes.findOne({
      where: { [Op.and]: [{ PostId: postId }, { UsersId: usersId }] },
    });
    return myLike;
  };

  createLike = async (postId, usersId, t) => {
    const like = await Likes.create(
      {
        PostId: postId,
        UsersId: usersId,
      },
      { transaction: t },
    );

    return like;
  };

  deleteLike = async (postId, usersId, t) => {
    await Likes.destroy(
      {
        where: { [Op.and]: [{ PostId: postId }, { UsersId: usersId }] },
      },
      { transaction: t },
    );
  };

  addPostLike = async (postId, t) => {
    const post = await Posts.findOne({
      where: { postId },
    });

    await post.update({ likes: post.likes + 1 }, { transaction: t });
  };

  subPostLike = async (postId, t) => {
    const post = await Posts.findOne({
      where: { postId },
    });

    await post.update({ likes: post.likes - 1 }, { transaction: t });
  };
}

module.exports = PostRepository;
