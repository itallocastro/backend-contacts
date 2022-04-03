const getDB = require('../utils/getDB')
const checkFields = require('../utils/checkFields')
const { sequelize } = require('../models')
const uuid = require('uuid')
const dbPerson = getDB('person')
const dbEmail = getDB('email')
const dbPhone = getDB('phone')

const getPersonById = async (id) => {
    return await dbPerson.findByPk(id, {
        include: [
            {model: dbPhone, as: 'phones'},
            {model: dbEmail, as: 'emails'}
        ]
    })
}

exports.createPerson = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { name, emails, phones } = req.body

        if(!checkFields([name])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        const person = await dbPerson.create({
            id: uuid.v4(),
            name
        }, {transaction})

        if(emails && emails.length > 0) {
            for(const email of emails) {
                if(!checkFields([email.name])) {
                    await transaction.rollback()
                    return res.status(422).send({error: 'There are mandatory fields is empty.'})
                }

                if(!await dbEmail.findOne({where: {name: email.name, personId: person.id}}, {transaction})) {
                    await dbEmail.create({
                        id: uuid.v4(),
                        personId: person.id,
                        name: email.name
                    }, {transaction})
                }
            }
        }

        if(phones && phones.length > 0) {
            for(const phone of phones) {

                const {phoneNumber, isWhatsapp} = phone

                if(!checkFields([phoneNumber, isWhatsapp])) {
                    await transaction.rollback()
                    return res.status(422).send({error: 'There are mandatory fields is empty.'})
                }

                if(!await dbPhone.findOne({where: {phoneNumber: phoneNumber, personId: person.id}}, {transaction})) {
                    await dbPhone.create({
                        id: uuid.v4(),
                        personId: person.id,
                        phoneNumber,
                        isWhatsapp
                    }, {transaction})
                }
            }
        }

        await transaction.commit()

        return res.status(200).send(
            await getPersonById(person.id)
        )
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}

exports.updatePerson = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id } = req.params
        const { name } = req.body

        if(!checkFields([id ,name])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        const person = await dbPerson.findByPk(id, {transaction})

        if(!person) {
            return res.status(404).send({error: 'Person not found'})
        }

        person.name = name
        await person.save({transaction})

        await transaction.commit()

        return res.status(200).send(
            await getPersonById(person.id)
        )
    } catch (e) {
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}

exports.deletePerson = async (req, res) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { id } = req.params

        if(!checkFields([id])) {
            return res.status(422).send({error: 'There are mandatory fields is empty.'})
        }

        const person = await dbPerson.findByPk(id, {transaction})

        if(!person) {
            return res.status(404).send({error: 'Person not found'})
        }

        await dbEmail.destroy({where: {personId: person.id}}, {transaction})
        await dbPhone.destroy({where: {personId: person.id}}, {transaction})
        await person.destroy()

        await transaction.commit()

        return res.status(200).send(person)
    } catch (e) {
        console.log(e)
        if(transaction) {
            await transaction.rollback()
        }
        return res.status(406).send({error: 'Error occurred'})
    }
}

exports.getAllListPerson = async (req, res) => {
    try {
        const persons = await dbPerson.findAll({
            include: [
                {model: dbEmail, as: 'emails'},
                {model: dbPhone, as: 'phones'}
            ],
            order: [['name', 'ASC']]
        })
        return res.status(200).send(persons)
    } catch (e) {
        console.log(e)
        return res.status(406).send({error: 'Error occurred'})
    }
}
