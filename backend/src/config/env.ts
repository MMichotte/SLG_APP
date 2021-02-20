import * as dotenv from 'dotenv';

dotenv.config();

const env = Object.freeze({ ...process.env });

export default env;
