const PostRepository = require('../repositories/posts.repository');
const { Transaction } = require('sequelize');
const { sequelize } = require('../models');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async (res) => {
    const { usersId } = res.locals.user;
    try {
      const allPost = await this.postRepository.findAllPost();

      allPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      const allPosts = allPost.map((post) => {
        return {
          usersId: post.Likes.map((like) => like.UsersId),
          postId: post.postId,
          nickname: post.nickname,
          title: post.title,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          likes: post.likes,
        };
      });

      const responseData = { data: allPosts, userId: usersId };

      if (!usersId) {
        return res.status(200).json({ data: allPosts });
      }

      return res.status(200).json(responseData);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  findUserPost = async (postId, res) => {
    const { usersId } = res.locals.user;

    try {
      const post = await this.postRepository.findUserPost(postId);
      const nowPost = {
        usersId: post.Likes.map((like) => like.UsersId),
        postId: post.postId,
        title: post.title,
        nickname: post.nickname,
        likes: post.likes,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      if (!usersId) {
        return res.status(200).json({ data: nowPost });
      }
      const responseData = { data: nowPost, usersId: usersId };

      return res.status(200).json(responseData);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  createPost = async (nickname, usersId, title, content, res) => {
    try {
      const createPostData = await this.postRepository.createPost(
        nickname,
        usersId,
        title,
        content,
      );

      return res.status(201).json({ data: createPostData });
    } catch (error) {
      res.status(401).json({ error: error });
    }

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.postId,
      likes: createPostData.likes,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (postId, usersId, title, content, res) => {
    try {
      const updatePostData = await this.postRepository.updatePost(
        postId,
        usersId,
        title,
        content,
      );
      return res.status(201).json({ data: updatePostData });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  };

  deletePost = async (postId, usersId, res) => {
    try {
      await this.postRepository.deletePost(postId, usersId);
      res.status(201).json({ message: '게시글을 삭제했습니다.' });
    } catch (error) {
      res.status(400).json({ errorMessage: error });
    }
  };

  updateLike = async (postId, usersId, res) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const myLike = await this.postRepository.findLike(postId, usersId);
      if (myLike) {
        await this.postRepository.deleteLike(postId, usersId, t);
        const sub = await this.postRepository.subPostLike(postId, t);
        await t.commit();
        return res.status(201).json({ message: '좋아요 취소' });
      }

      if (myLike === null) {
        const createLike = await this.postRepository.createLike(
          postId,
          usersId,
          t,
        );
        const add = await this.postRepository.addPostLike(postId, t);
        t.commit();
        return res.status(201).json({ message: '좋아요 추가' });
      }
    } catch (error) {
      res.status(400).json({ error: error });
      await t.rollback();
    }
  };
}

module.exports = PostService;
