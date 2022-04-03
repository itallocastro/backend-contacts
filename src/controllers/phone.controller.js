const getDB = require('../utils/getDB')
const checkFields = require('../utils/checkFields')
const { sequelize } = require('../models')
const uuid = require('uuid')
const dbPerson = getDB('person')
const dbPhone= getDB('phone')

exports.createPhone = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { personId } = req.params
        const { phoneNumber, isWhatsapp } = req.body

        if(!checkFields([phoneNumber, isWhatsapp, personId])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let phone = await dbPhone.findOne({where: {phoneNumber, personId}}, {transaction})

        if(phone) {
            return res.status(409).send({error: 'Email already exists.'})
        }
        if(!await dbPerson.findByPk(personId, {transaction})) {
            return res.status(404).send({error: 'Person not found'})
        }

        phone = await dbPhone.create({
            id: uuid.v4(),
            personId,
            phoneNumber,
            isWhatsapp
        }, {transaction})


        await transaction.commit()

        return res.status(200).send(phone)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}

exports.editPhone = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id, personId } = req.params
        const { phoneNumber, isWhatsapp } = req.body

        if(!checkFields([id, phoneNumber, isWhatsapp, personId])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let phone = await dbPhone.findByPk(id, {transaction})

        if(!phone || phone.personId !== personId) {
            return res.status(404).send({error: 'Phone not found.'})
        }

        if(!await dbPerson.findByPk(personId, {transaction})) {
            return res.status(404).send({error: 'Person not found'})
        }

       await dbPhone.update({
            phoneNumber,
            isWhatsapp
       }, {where: {id}}, {transaction})


        phone = await dbPhone.findByPk(id, {transaction})

        await transaction.commit()

        return res.status(200).send(phone)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}
exports.deletePhone = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id } = req.params

        if(!checkFields([id])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        let phone = await dbPhone.findByPk(id, {transaction})

        if(!phone) {
            return res.status(404).send({error: 'Email not found.'})
        }

        await phone.destroy({transaction})

        await transaction.commit()

        return res.status(200).send(phone)
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}
