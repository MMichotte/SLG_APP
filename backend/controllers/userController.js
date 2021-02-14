import * as userService from '../services/userService';
import * as security from '../helpers/security';

async function login (httpRequest) {
  try {
    const error401 = {
      statusCode: 401,
      body: {
        message: 'Incorrect username or password!'
      }
    };

    const userInfo = httpRequest.body;

    const storedUser = await userService.getUser(userInfo.username);
    if (!storedUser) { return error401; }

    const isValidPwd = await security.checkPassword(userInfo.password, storedUser.dataValues.password);
    if (!isValidPwd) { return error401; }

    return {
      statusCode: 200,
      body: {
        token: security.generateJwt(storedUser)
      }
    };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: { error: e.message } };
  }
}

async function validateAuth (httpRequest) {
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully authenticated'
    }
  };
}

export { login, validateAuth };
