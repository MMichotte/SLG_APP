import { Sequelize } from 'sequelize'
import dbConnection from '../../config/database'

const user = dbConnection.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
    }
})

export default user
