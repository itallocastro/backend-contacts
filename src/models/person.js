module.exports = (sequelize, Sequelize) => {
    const person = sequelize.define('person', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
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

    person.associate = (models) => {
        person.hasMany(models.phone, {foreignKey: 'personId'})
        person.hasMany(models.email, {foreignKey: 'personId'})
    }

    return person
}