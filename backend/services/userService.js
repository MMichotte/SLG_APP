import User from '../database/models/user'

async function login (username) {
    return User.findOne({
        where: {
            username: username
        },
        attributes: ['password']
    })
}

export { login }
