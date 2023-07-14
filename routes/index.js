const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const userRouter = require('./users');
const loginRouter = require('./login');

const defaultRoutes = [
  {
    path: '/posts',
    route: postsRouter,
  },
  {
    path: '/comments',
    route: commentsRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/login',
    route: loginRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
