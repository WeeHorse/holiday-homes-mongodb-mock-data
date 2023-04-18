import { faker } from '@faker-js/faker'
import fs from 'fs'

let users = []
let homes = []
let agents = []

async function run(){
    await generateUsers()
    await generateHomes()
    await generateAgents()
    process.exit()
}
run()


async function generateUsers(clear = true){
    if(!clear){
        users =  JSON.parse(fs.readFileSync('./json/users.json'))
    }
    for(let i=0; i<10; i++){
        const user ={}
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        user.name = firstName + ' ' + lastName
        user.email = faker.internet.email(firstName, lastName)
        users.push(user)
    }
    fs.writeFileSync('./json/users.json', JSON.stringify(users))
}

async function generateHomes(clear = true){
    if(!clear){
        homes =  JSON.parse(fs.readFileSync('./json/homes.json'))
    }
    for(let i=0; i<100; i++){
        const home = {}
        home.name = faker.address.street()
        home.noOfRooms = faker.datatype.number({ min: 1, max: 19 })
        home.rating = faker.datatype.number({ min: 1, max: 5 })
        home.homeOwner = users[ faker.datatype.number({ min: 0, max: 19 }) ] // pick a random user from our array of users        
        homes.push(home)
    }
    fs.writeFileSync('./json/homes.json', JSON.stringify(homes))
}

async function generateAgents(clear = true){
    if(!clear){
        agents =  JSON.parse(fs.readFileSync('./json/agents.json'))
    } 
    for(let i=0; i<10; i++){
        const agent = {}
        // concat with a pick of a random item from the array
        agent.name = faker.address.cityName() + [' Rentals', ' Agent', ' Homes', ' Vacation Homes'][ faker.datatype.number({ min: 0, max: 3 }) ]
        agent.homes = homes.filter(home => Math.random() <= 0.15) // 15% chance
        agents.push(agent)
    }
    fs.writeFileSync('./json/agents.json', JSON.stringify(agents))
}