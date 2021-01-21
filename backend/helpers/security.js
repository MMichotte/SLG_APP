import bcrypt from 'bcrypt'

function hashPassword (password) {
    return bcrypt.hashSync(password, 10)
}

async function checkPassword (password, passwordHash) {
    return await bcrypt.compare(password, passwordHash)
}

export { hashPassword, checkPassword }
