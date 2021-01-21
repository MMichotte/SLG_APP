import * as userService from '../services/userService'

async function login (httpRequest) {
    const userInfo = httpRequest.body

    const storedPwd = await userService.login(userInfo.username)
    console.log(storedPwd)

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'TEST'
        }
    }
}

export { login }
