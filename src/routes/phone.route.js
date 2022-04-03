const express = require('express')
const router = express.Router()
const {createPhone, deletePhone, editPhone} = require('../controllers/phone.controller')

router.post('/add/:personId', createPhone)
router.put('/update/:personId/:id', editPhone)
router.delete('/delete/:id', deletePhone)

module.exports = router