module.exports = (sequelize, Sequelize) => {
    const email = sequelize.define('email', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        personId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {freezeTableName: true})

    email.associate = (models) => {
        email.belongsTo(models.person, {foreignKey: 'id'})
    }

    return email
}