import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config/env'

function hashPassword (password) {
    return bcrypt.hashSync(password, 10)
}

async function checkPassword (password, passwordHash) {
    return await bcrypt.compare(password, passwordHash)
}

function generateJwt (username) {
    const today = new Date(); const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(6)
    const timeDiff = (tomorrow - today) / 3600000

    return jwt.sign({ username: username }, env.JWT_PRIVATE_KEY, { expiresIn: `${timeDiff}h` })
}

export { hashPassword, checkPassword, generateJwt }
