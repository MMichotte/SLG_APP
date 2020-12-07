// import dotenv from 'dotenv'
const dotenv = require('dotenv')

dotenv.config()

const env = Object.freeze({ ...process.env })

// export default env
module.exports = env
