// faker random data api
import { faker } from '@faker-js/faker';

// mongoose database connector & ODM for mongodb
import mongoose from 'mongoose'
const connection = "mongodb+srv://benjamin:Vr5HASxvl1rSRW4S@holidayhomes.ypaythr.mongodb.net/test"

async function run(){
    // connect to db
    mongoose.connect(connection, {dbName: 'holidayhomes'})

    // run generators
    await generateUsers(false)
    await generateHomes(false)
    await generateAgents()

    // shut down
    process.exit()
}
run()


// USERS
import { userModel } from './routes/users.js'
let users = []
async function generateUsers(clear = true){
    if(!clear){
        return users = await userModel.find()
    }

    // delete all
    await userModel.deleteMany()

    for(let i=0; i<20;i++){
        // create user
        const user = new userModel()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        user.name = firstName + ' ' + lastName
        user.email = faker.internet.email(firstName, lastName)
        try{
            const result = await user.save()
            users.push(result)
        }catch(e){
            console.error(e)
        }
    }
}


// HOMES
import { homeModel } from './routes/homes.js';
let homes = []
async function generateHomes(clear = true){
    if(!clear){
        return homes = await homeModel.find()
    }
    // delete all
    await homeModel.deleteMany()
    // generate homes
    for(let i=0;i<100;i++){
        const home = new homeModel()
        home.name = faker.address.street()
        home.noOfRooms = faker.datatype.number({ min: 1, max: 19 })
        home.rating = faker.datatype.number({ min: 1, max: 5 })
        home.homeOwner = users[ faker.datatype.number({ min: 0, max: 19 }) ] // pick a random user from our array of users
        try{
            const result = await home.save()
            homes.push(result)
        }catch(e){
            console.error(e)
        }
    }

}


// AGENTS
import { agentModel } from './routes/agents.js';
let agents = []
async function generateAgents(clear = true){
    if(!clear){
        return agents = await agentModel.find()
    }
    // delete all
    await agentModel.deleteMany()
    // generate agents
    for(let i=0;i<10;i++){
        const agent = new agentModel()
        // concat with a pick of a random item from the array
        agent.name = faker.address.cityName() + [' Rentals', ' Agent', ' Homes', ' Vacation Homes'][ faker.datatype.number({ min: 0, max: 3 }) ]
        agent.homes = homes.filter(home => Math.random() <= 0.15) // 15% chance
        try{
            const result = await agent.save()
            agents.push(result)
        }catch(e){
            console.error(e)
        }
    }

}