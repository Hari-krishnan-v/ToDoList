import {ValidateTodoData} from "../utils/helper.js";
import Todo from "../models/to-do.model.js";

export const CreateToDoList = async (req, res,next) => {
    try {
        ValidateTodoData(req.body);
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const newToDo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            userId: user.id
        });
        res.status(201).json({
            message: 'To-Do item created successfully',
            data: {
                id: newToDo._id,
                title: newToDo.title,
                description: newToDo.description,
                status: newToDo.status,
                createdAt: newToDo.createdAt,
                updatedAt: newToDo.updatedAt
            }
        });
    }
    catch (error) {
        next(error);
    }
}

export const GetToDoList = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const todos = await Todo.find({ userId: user.id }).sort({ createdAt: -1 });
        console.log("todos", todos);
        res.status(200).json({
            message: 'To-Do list retrieved successfully',
            data: todos ,
        });
    } catch (error) {
        next(error);
    }
}

export const UpdateToDoList = async (req, res, next) => {
    try {
        ValidateTodoData(req.body);
        const user = req.user;
        const todoId = req.params.id;
        const { title, description, status } = req.body;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, userId: user.id },
            { title: title, description: description, status: status },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: 'To-Do item not found' });
        }

        res.status(200).json({
            message: 'To-Do item updated successfully',
            data: todo
        });
    } catch (error) {
        next(error);
    }
}

export const DeleteToDoList = async (req, res, next) => {
    try {
        const user = req.user;
        const todoId = req.params.id;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const todo = await Todo.findOneAndDelete({ _id: todoId, userId: user.id });
        console.log("todo", todo);

        if (!todo) {
            return res.status(404).json({ error: 'To-Do item not found' });
        }

        res.status(200).json({
            message: 'To-Do item deleted successfully',

        });
    } catch (error) {
        next(error);
    }
}