// create a subrouter for homes
import Router from "express"
const homesRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, {Schema} from "mongoose"

// create home Schema (field definitions)
const homeSchema = new Schema({
    name: String,
    noOfRooms: Number,
    rating: Number,
    homeOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users"} // will change later for a reference to a user
})

// create collection model
export const homesModel = mongoose.model('homes', homeSchema)

// define routes

homesRouter.post('/', async (request, response)=>{
    const home = new mongoose.models.homes()
    home.name = request.body.name
    home.noOfRooms = request.body.noOfRooms
    home.rating = request.body.rating
    home.homeOwner = request.body.homeOwner
    const result = await home.save()
    response.json(result)
})

homesRouter.get('/', async (request, response)=>{
    const homes = await mongoose.models.homes.find().populate('homeOwner') // SELECT * FROM homes
    response.json(homes)
})

homesRouter.get('/:id', async (request, response)=>{
    const home = await mongoose.models.homes.findById(request.params.id).populate('homeOwner') // SELECT * FROM homes WHERE id = 
    response.json(home)
})

homesRouter.put('/:id', async (request, response)=>{
    // OBS! add {new: true} to end of arguments to include new props
    const home = await mongoose.models.homes.findByIdAndUpdate(request.params.id, request.body, {new:true}) 
    response.json(home)
})

homesRouter.delete('/:id')


export default homesRouter
