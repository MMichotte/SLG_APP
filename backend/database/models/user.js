import { Sequelize } from 'sequelize'
import dbConnection from '../../config/database'

const User = dbConnection.define('user',
    {
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
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        }
    },
    {
        freezeTableName: true
    }
)

export default User