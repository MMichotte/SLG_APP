import * as userService from '../services/userService'
import * as security from '../helpers/security'

async function login (httpRequest) {
    try {
        const error404 = {
            statusCode: 404,
            body: {
                success: false,
                message: 'Incorrect username or password!'
            }
        }

        const userInfo = httpRequest.body

        const storedUser = await userService.login(userInfo.username)
        if (!storedUser) {
            return error404
        }
        const isValidPwd = await security.checkPassword(userInfo.password, storedUser.dataValues.password)

        if (!isValidPwd) {
            return error404
        }

        return {
            statusCode: 200,
            body: {
                success: true,
                message: `Successfully authenticated as ${userInfo.username}.`,
                token: 'token'
            }
        }
    } catch (e) {
        console.log(e)
        return { statusCode: 400, body: { error: e.message } }
    }
}

export { login }
