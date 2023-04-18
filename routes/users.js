// create a subrouter for users
import Router from "express"
const usersRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, {Schema} from "mongoose"

// create user Schema (field definitions)
const userSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true}
})

// create collection model
export const usersModel = mongoose.model('users', userSchema)

// define routes

usersRouter.post('/', async (request, response)=>{
    const user = new mongoose.models.users()
    user.name = request.body.name
    user.email = request.body.email
    let result
    try{
       result  = await user.save()
    }catch(e){
        result = e
    }
    response.json(result)
})

usersRouter.get('/', async (request, response)=>{
    const users = await mongoose.models.users.find() // SELECT * FROM users
    response.json(users)
})

usersRouter.get('/:id', async (request, response)=>{
    const user = await mongoose.models.users.findById(request.params.id) // SELECT * FROM users WHERE id = 
    response.json(user)
})

usersRouter.put('/:id')

usersRouter.delete('/:id')


export default usersRouter