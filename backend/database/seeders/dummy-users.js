'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user',
            [
                {
                    username: 'maxime',
                    password: '$2a$10$H92Uz..t6IhZTM7XHlWowOb28LCGAOer/41eX0Ctzi7NOaBXiWcSa',
                    role: 'direction',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user', null, {})
    }
}
