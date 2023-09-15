const CustomAPIError = require("./customError");
const BadRequestError = require("./badRequest");
const UnauthentiacatedError = require("./unauthorized");
const NotFoundError = require("./notFound");


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthentiacatedError,
    NotFoundError
}