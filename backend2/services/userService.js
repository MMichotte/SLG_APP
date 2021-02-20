import User from '../database/models/user';

async function getUser (username) {
  return User.findOne({
    where: {
      username: username
    }
  });
}

export { getUser };
