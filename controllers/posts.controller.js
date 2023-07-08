// controllers/posts.controller.js

const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    await this.postService.findAllPost(res);
  };

  getUserPost = async (req, res, next) => {
    const { postId } = req.params;
    await this.postService.findUserPost(postId, res);
  };

  createPost = async (req, res, next) => {
    const user = res.locals.user;
    const { title, content } = req.body;
    await this.postService.createPost(
      user.nickname,
      user.usersId,
      title,
      content,
      res,
    );
  };

  updatePost = async (req, res, next) => {
    const user = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;

    await this.postService.updatePost(
      postId,
      user.usersId,
      title,
      content,
      res,
    );
  };

  deletePost = async (req, res, next) => {
    const { usersId } = res.locals.user;
    const { postId } = req.params;
    await this.postService.deletePost(postId, usersId, res);
  };

  updateLike = async (req, res, next) => {
    const { usersId } = res.locals.user;
    const { postId } = req.params;

    await this.postService.updateLike(postId, usersId, res);
  };
}

module.exports = PostsController;
