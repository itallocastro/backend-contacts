const getDB = require('../utils/getDB')
const checkFields = require('../utils/checkFields')
const { sequelize } = require('../models')
const uuid = require('uuid')
const dbPerson = getDB('person')
const dbEmail = getDB('email')

exports.createEmail = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { personId } = req.params
        const { name } = req.body

        console.log(req.params, req.body)
        if(!checkFields([name, personId])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let email = await dbEmail.findOne({where: {name, personId}}, {transaction})

        if(email) {
            return res.status(409).send({error: 'Email already exists.'})
        }
        if(!await dbPerson.findByPk(personId, {transaction})) {
            return res.status(404).send({error: 'Person not found'})
        }

        email = await dbEmail.create({
            id: uuid.v4(),
            personId,
            name
        }, {transaction})


        await transaction.commit()

        return res.status(200).send(email)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}

exports.editEmail = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id, personId } = req.params
        const { name } = req.body

        if(!checkFields([id, name, personId])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let email = await dbEmail.findByPk(id, {transaction})

        if(!email) {
            return res.status(404).send({error: 'Email not found.'})
        }

        if(!await dbPerson.findByPk(personId, {transaction})) {
            return res.status(404).send({error: 'Person not found'})
        }

        email.name = name
        await email.save({transaction})

        await transaction.commit()

        return res.status(200).send(email)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}
exports.deleteEmail = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id } = req.params

        if(!checkFields([id])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let email = await dbEmail.findByPk(id, {transaction})

        if(!email) {
            return res.status(404).send({error: 'Email not found.'})
        }

        await email.destroy({transaction})

        await transaction.commit()

        return res.status(200).send(email)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}
