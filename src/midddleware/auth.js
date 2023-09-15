const {UnauthentiacatedError} = require('../errors')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const auth = asyncHandler (async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthentiacatedError('Authentication invalid!')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach user to job routes
        req.user = {userId:payload.userId, name: payload.name}
        next()
    } catch (error) {
        throw new UnauthentiacatedError('Authentication invalid!')
    }

})

module.exports = auth