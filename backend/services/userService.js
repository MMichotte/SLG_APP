import User from '../database/models/User'

async function login (username) {
    return User.findOne({
        where: {
            username: username
        },
        attributes: ['password']
    })
}

export { login }
