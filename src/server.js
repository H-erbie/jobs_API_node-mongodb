require('dotenv').config()
require('express-async-handler')

const express = require('express')
const errorHandler = require('./midddleware/errorHandler')
const notFound = require('./midddleware/nofFound')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs') 
const connectDB = require('./db/connect')
const authUser = require('./midddleware/auth')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authUser, jobsRouter)



app.use(errorHandler)
app.use(notFound)

//routes

const start = async() => {
    try {
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(port, console.log(`server dey listen for port: ${port}...`))
    } catch (error) {
        console.log(error)
    }
}




start()