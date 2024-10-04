
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(messaage)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = {createCustomError, CustomAPIError}