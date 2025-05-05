import { UserService, IUserService } from '@services/userService'
import {Router} from 'express'
import { User } from '@models/User'
import { UserRepository, IUserRepository } from '@repositories/UserRepository'

const router = Router()

const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)

export default () => {
    router.get("/health", (req, res)=>{
        res.send("Api is Healty!!!")
    })

    // GET USERS
    router.get("/users", async(req, res) => {
        const users = await userService.findUsers()
        res.json(users)
    })

    // GET USER BY ID
    router.get("/users/:id", async(req, res) => {
        const users = await userService.findUsersById(req.params.id)
        res.json(users)
    })


    // CREATE
    router.post("/users", async(req, res) =>{
        const newUser: User = req.body
        const result = await userService.createUser(newUser)

        res.json(result)
    })

    // UPDATE USER BY ID
    router.put("/users/:id", async(req, res) => {
        const user = await userService.updateUser(req.params.id, req.body)
        res.json(user)
    })

    router.delete("/users/:id", async(req, res) => {
        const user = await userService.deleteUser(req.params.id)
        res.json(user)
    })

    return router;
}