module.exports = (sequelize, Sequelize) => {
    const phone = sequelize.define('phone', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isWhatsapp: {
            type: Sequelize.BOOLEAN
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
        },
    }, { freezeTableName: true })

    phone.associate = (models) => {
        phone.belongsTo(models.person, {foreignKey: 'id'})
    }

    return phone
}