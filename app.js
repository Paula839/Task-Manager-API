const express = require("express")
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config();

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
// app.use(express.static('./public'))
app.use(express.json())

//routes
const tasks = require('./router/tasks')



app.use('/api/v1/tasks', tasks)
app.use('/api/v1/tasks/:id', tasks)
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

const start = async () => {
    try {
        
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server is listening on port ${port}`))


    }
    catch(error) {
        console.log(error);
    }
}


start()