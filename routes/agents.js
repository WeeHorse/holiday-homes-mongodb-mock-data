// create a subrouter for agents
import Router from "express"
const agentsRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, {Schema} from "mongoose"

// create agent Schema (field definitions)
const agentSchema = new Schema({
    name: String,
    homes: [{type: mongoose.Schema.Types.ObjectId, ref: 'homes'}]
})

// create collection model
mongoose.model('agents', agentSchema)

// define routes

agentsRouter.post('/', async (request, response)=>{
    const agent = new mongoose.models.agents()
    agent.name = request.body.name
    agent.homes = request.body.homes
    const result = await agent.save()
    response.json(result)
})

agentsRouter.get('/', async (request, response)=>{
    const agents = await mongoose.models.agents.find().populate('homes') // SELECT * FROM agents
    response.json(agents)
})

agentsRouter.get('/:id', async (request, response)=>{
    const agent = await mongoose.models.agents.findById(request.params.id) // SELECT * FROM agents WHERE id = 
    response.json(agent)
})

agentsRouter.put('/:id')

agentsRouter.delete('/:id')


export default agentsRouter