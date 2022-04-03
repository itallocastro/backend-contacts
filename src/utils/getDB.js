const getDB = (dbName) => {
    const db = require('../models')
    return db[dbName]
}
module.exports = getDB