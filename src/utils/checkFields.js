const checkFields = (fields) => {
    if (!fields) {
        return false
    }
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] === undefined || fields[i] === null) {
            return false
        }
    }
    return true
}

module.exports = checkFields