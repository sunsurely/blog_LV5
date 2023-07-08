const { Users } = require('../models');

class UsersRepository {
  createUser = async (nickname, password) => {
    await Users.create({
      nickname,
      password,
    });
  };

  findUser = async (nickname) => {
    const isExistUser = await Users.findOne({
      where: { nickname },
    });

    return isExistUser;
  };
}

module.exports = UsersRepository;
