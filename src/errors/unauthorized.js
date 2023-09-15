const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require("./customError")

class Unauthentiacated extends CustomAPIError {
    constructor (message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
 }

 module.exports = Unauthentiacated