import { faker } from '@faker-js/faker';
import mongoose from 'mongoose'
const connection = "mongodb+srv://benjamin:Vr5HASxvl1rSRW4S@holidayhomes.ypaythr.mongodb.net/test"

async function run(){
    mongoose.connect(connection, {dbName: 'holidayhomes'})
    await generateUsers(false)
    await generateHomes()
    await generateAgents()
    process.exit()
}
run()

import {usersModel} from './routes/users.js'
let users = []
async function generateUsers(clear = true){
    if(!clear){
        return users = await usersModel.find()
    }
    await usersModel.deleteMany()    
    for(let i=0; i<10; i++){
        const user = new usersModel()
        user.name = faker.name.firstName() + ' ' + faker.name.lastName()
        user.email = faker.internet.email()
        try{
            const result = await user.save()
            users.push(result)
        }catch(e){
            console.error(e)
        }
    }
}

import {homesModel} from './routes/homes.js'
const homes = []
async function generateHomes(clear = true){
    if(clear) await homesModel.deleteMany()    
    for(let i=0; i<100; i++){
        const home = new homesModel()
        home.name = null
        home.noOfRooms = faker.random.numeric(1, { bannedDigits: [7,8,9] })
        home.rating = faker.random.numeric(1, { bannedDigits: [6,7,8,9] })
        home.homeOwner = users[Math.floor(Math.random() * users.length)]
        try{
            const result = await home.save()
            homes.push(result)
        }catch(e){
            console.error(e)
        }
    }

}

import {agentModel} from './routes/agents.js'
const agents = []
async function generateAgents(clear = true){
    if(clear) await agentModel.deleteMany()    
    for(let i=0; i<100; i++){
        const agent = new agentModel()
        agent.name = faker.lorem.word({ length: { min: 4, max: 10 } })
        agent.homes = homes.filter(h => Math.random() < 0.2 ) // 20% chance
        try{
            const result = await agent.save()
            agents.push(result)
        }catch(e){
            console.error(e)
        }
    }

}