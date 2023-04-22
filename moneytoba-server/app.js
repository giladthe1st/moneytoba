//import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require("dotenv").config()

//app
const app = express()

//db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Connection Error', err))

//middleware
app.use(cors({origin: true, credentials: true}));
app.use(morgan('dev'))

//routes
const testRoutes  = require('./routes/test')
app.use('/test', testRoutes)

//port
const port = process.env.PORT || 8080


//listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}'...`))
