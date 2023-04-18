// express web server
import express from 'express'
const api = express()
api.use( express.json() )  // middleware för att kunna ta emot JSON i POST, etc

// mongoose database connector & ODM for mongodb
import mongoose from 'mongoose'
const connection = "mongodb+srv://benjamin:Vr5HASxvl1rSRW4S@holidayhomes.ypaythr.mongodb.net/test"

// start web server
api.listen(3456, ()=>{
    console.log('Connected to http://localhost:3456')
    // and connect to db
    mongoose.connect(connection, {dbName: 'holidayhomes'})
})

// ROUTES

// homes
import homesRouter from './routes/homes.js'
api.use('/api/homes', homesRouter)

// agents
import agentsRouter from './routes/agents.js'
api.use('/api/agents', agentsRouter)

// users
import usersRouter from './routes/users.js'
api.use('/api/users', usersRouter)
