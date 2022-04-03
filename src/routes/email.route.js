const express = require('express')
const router = express.Router()
const {createEmail, editEmail, deleteEmail} = require('../controllers/email.controller')

router.post('/add/:personId', createEmail)
router.put('/update/:personId/:id', editEmail)
router.delete('/delete/:id', deleteEmail)

module.exports = router