const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService();

  createUser = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;
    await this.usersService.createUser(nickname, password, confirm, res);
  };
}

module.exports = UsersController;
