import {Router} from "express";
import {CheckAuthentication, LoginUser, LogoutUser, RegisterUser} from "../controller/Auth.controller.js";
import {CreateToDoList, DeleteToDoList, GetToDoList, UpdateToDoList} from "../controller/ToDoList.controller.js";
import {Authenticate} from "../middleware/Authenticate.middleware.js";

const router = Router();

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/logout', LogoutUser)
router.get('/check-auth', Authenticate, CheckAuthentication)

//authenticated routes
router.post('/create-todo',Authenticate, CreateToDoList)
router.get('/get-todo',Authenticate, GetToDoList)
router.put('/update-todo/:id',Authenticate, UpdateToDoList)
router.delete('/delete-todo/:id',Authenticate, DeleteToDoList)

export default router;