const express = require('express')
const router = express.Router()
const {getAllListPerson, createPerson, updatePerson, deletePerson} = require('../controllers/person.controller')

router.get('/', getAllListPerson)
router.post('/add', createPerson)
router.put('/update/:id', updatePerson)
router.delete('/delete/:id', deletePerson)

module.exports = router